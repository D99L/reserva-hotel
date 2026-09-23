const express = require('express');
const session = require('express-session');
const path = require('path');
const db = require('./database');

const app = express();
const port = 3001;

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para procesar datos de formularios
app.use(express.urlencoded({ extended: true }));

// Configurar Session
app.use(session({
    secret: 'secreto_hotel',
    resave: false,
    saveUninitialized: false
}));

// Middleware para pasar usuario a las vistas
app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario || null;
    next();
});

// Middleware de autenticación y autorización
app.use((req, res, next) => {
    // Permitir acceso a la ruta de login sin autenticación
    if (req.path === '/login') {
        return next();
    }

    // Si no está autenticado, redirigir al login
    if (!req.session.usuario) {
        return res.redirect('/login');
    }

    const rol = req.session.usuario.rol;
    const path = req.path;

    // Aislamiento estricto de rutas para Administrador
    if (rol === 'Administrador' && (path === '/' || path.startsWith('/reservar') || path.startsWith('/checkout'))) {
        return res.redirect('/admin');
    }

    // Aislamiento estricto de rutas para Turista
    if (rol === 'Turista' && path.startsWith('/admin')) {
        return res.redirect('/');
    }

    next();
});

// --- RUTAS ---

// Login
app.get('/login', (req, res) => {
    if (req.session.usuario) {
        return res.redirect(req.session.usuario.rol === 'Administrador' ? '/admin' : '/');
    }
    res.render('login', { error: req.query.error });
});

app.post('/login', (req, res) => {
    const { correo, rut } = req.body;
    db.get("SELECT * FROM Usuario WHERE correo = ? AND rut = ?", [correo, rut], (err, row) => {
        if (err || !row) {
            return res.redirect('/login?error=credenciales_invalidas');
        }
        req.session.usuario = row;
        
        if (row.rol === 'Administrador') {
            res.redirect('/admin');
        } else {
            res.redirect('/');
        }
    });
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
});

// Vista Turista (Principal)
app.get('/', (req, res) => {
    const query = `
        SELECT h.habitacion_id, h.numero, h.tipo, h.capacidad, h.precio, h.estado,
               ht.nombre as hotel_nombre, ht.ciudad
        FROM Habitacion h
        JOIN Hotel ht ON h.hotel_id = ht.hotel_id
    `;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Error interno del servidor");
            return;
        }
        res.render('turista', { habitaciones: rows, query: req.query });
    });
});

// Acción de Reservar - Redirige a checkout
app.post('/reservar', (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/login?error=debe_iniciar_sesion');
    }

    const habitacion_id = req.body.habitacion_id;
    const fecha_entrada = req.body.fecha_entrada;
    const fecha_salida = req.body.fecha_salida;
    
    if (!fecha_entrada || !fecha_salida) {
        return res.redirect('/?error=fechas_invalidas');
    }

    const entrada = new Date(fecha_entrada);
    const salida = new Date(fecha_salida);
    const diffTime = salida - entrada;
    const noches = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (noches <= 0) {
        return res.redirect('/?error=fechas_invalidas');
    }

    // Buscar precio de habitación
    db.get(`
        SELECT h.*, ht.nombre as hotel_nombre, ht.ciudad 
        FROM Habitacion h 
        JOIN Hotel ht ON h.hotel_id = ht.hotel_id 
        WHERE h.habitacion_id = ?
    `, [habitacion_id], (err, row) => {
        if (err || !row) return res.redirect('/');
        
        const total = row.precio * noches;
        
        res.render('checkout', { 
            habitacion: row, 
            fecha_entrada, 
            fecha_salida, 
            noches, 
            total 
        });
    });
});

// Procesar Checkout
app.post('/checkout', (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/login?error=debe_iniciar_sesion');
    }

    const { habitacion_id, fecha_entrada, fecha_salida, total, metodo_pago } = req.body;
    const usuario_id = req.session.usuario.usuario_id;
    const fecha_actual = new Date().toISOString().split('T')[0];
    
    // Crear reserva
    db.run(`INSERT INTO Reserva (usuario_id, habitacion_id, fecha_reserva, fecha_entrada, fecha_salida, cantidad_personas, total, estado) 
            VALUES (?, ?, ?, ?, ?, 2, ?, 'Pendiente')`, 
            [usuario_id, habitacion_id, fecha_actual, fecha_entrada, fecha_salida, total], 
            function(err) {
                if (err) {
                    console.log(err);
                    return res.redirect('/?error=1');
                }
                
                const reserva_id = this.lastID;
                
                // Crear pago
                db.run(`INSERT INTO Pago (reserva_id, monto, fecha_pago, metodo, estado) VALUES (?, ?, ?, ?, 'Aprobado')`,
                    [reserva_id, total, fecha_actual, metodo_pago],
                    (err) => {
                        if (err) console.log(err);
                        // Actualizar estado de habitación a Ocupada (opcional, o mantener Disponible hasta confirmar)
                        // Para este flujo, dejaremos la habitación disponible hasta que el admin confirme.
                        res.redirect('/?success=reserva_creada');
                    }
                );
    });
});

// Vista Admin
app.get('/admin', (req, res) => {
    if (!req.session.usuario || req.session.usuario.rol !== 'Administrador') {
        return res.redirect('/login');
    }

    const query = `
        SELECT r.reserva_id, r.fecha_entrada, r.fecha_salida, r.estado, r.total, r.habitacion_id,
               u.nombre as nombre_cliente, u.apellido as apellido_cliente, u.correo as correo_cliente,
               h.numero as numero_habitacion, ht.nombre as hotel_nombre
        FROM Reserva r
        JOIN Usuario u ON r.usuario_id = u.usuario_id
        JOIN Habitacion h ON r.habitacion_id = h.habitacion_id
        JOIN Hotel ht ON h.hotel_id = ht.hotel_id
        ORDER BY r.reserva_id DESC
    `;
    
    db.all(query, [], (err, reservasRows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Error interno del servidor");
            return;
        }

        db.get(`SELECT 
                    COUNT(*) as total_rooms, 
                    SUM(CASE WHEN estado = 'Ocupada' THEN 1 ELSE 0 END) as occupied_rooms 
                FROM Habitacion`, [], (err, roomStats) => {
            
            if (err) {
                console.error(err.message);
                return res.status(500).send("Error interno del servidor");
            }
            
            let ingresosTotales = 0;
            let reservasPendientes = 0;

            reservasRows.forEach(r => {
                if (r.estado === 'Confirmada') ingresosTotales += r.total;
                if (r.estado === 'Pendiente') reservasPendientes++;
            });

            const occupied = roomStats.occupied_rooms || 0;
            const totalRooms = roomStats.total_rooms || 1; // avoid division by 0
            const tasaOcupacion = Math.round((occupied / totalRooms) * 100);

            res.render('admin', { 
                reservas: reservasRows,
                ingresosTotales,
                reservasPendientes,
                tasaOcupacion,
                occupied_rooms: occupied,
                total_rooms: totalRooms
            });
        });
    });
});

// Cambiar Estado Reserva
app.post('/admin/reserva/:id/estado', (req, res) => {
    if (!req.session.usuario || req.session.usuario.rol !== 'Administrador') {
        return res.status(403).send("Acceso denegado");
    }

    const reserva_id = req.params.id;
    const { estado, habitacion_id } = req.body;

    db.run("UPDATE Reserva SET estado = ? WHERE reserva_id = ?", [estado, reserva_id], (err) => {
        if (err) {
            console.error(err.message);
            return res.redirect('/admin');
        }

        if (estado === 'Confirmada' && habitacion_id) {
            db.run("UPDATE Habitacion SET estado = 'Ocupada' WHERE habitacion_id = ?", [habitacion_id], (err) => {
                res.redirect('/admin');
            });
        } else if (estado === 'Cancelada' && habitacion_id) {
            db.run("UPDATE Habitacion SET estado = 'Disponible' WHERE habitacion_id = ?", [habitacion_id], (err) => {
                res.redirect('/admin');
            });
        } else if (estado === 'Rechazada' && habitacion_id) {
            // Option to free room if it was previously confirmed, but we didn't book it as occupied originally
            res.redirect('/admin');
        } else {
            res.redirect('/admin');
        }
    });
});

// Vista Habitaciones Admin
app.get('/admin/habitaciones', (req, res) => {
    if (!req.session.usuario || req.session.usuario.rol !== 'Administrador') {
        return res.redirect('/login');
    }

    const query = `
        SELECT h.*, ht.nombre as hotel_nombre 
        FROM Habitacion h
        JOIN Hotel ht ON h.hotel_id = ht.hotel_id
        ORDER BY h.habitacion_id DESC
    `;
    db.all(query, [], (err, habitaciones) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send("Error interno del servidor");
        }
        
        db.all("SELECT * FROM Hotel", [], (err, hoteles) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send("Error interno del servidor");
            }
            res.render('admin_habitaciones', { habitaciones, hoteles });
        });
    });
});

// Crear Habitación
app.post('/admin/habitaciones', (req, res) => {
    if (!req.session.usuario || req.session.usuario.rol !== 'Administrador') {
        return res.status(403).send("Acceso denegado");
    }

    const { numero, tipo, capacidad, precio, hotel_id } = req.body;
    db.run(`INSERT INTO Habitacion (hotel_id, numero, tipo, capacidad, precio, estado) 
            VALUES (?, ?, ?, ?, ?, 'Disponible')`,
            [hotel_id, numero, tipo, capacidad, precio], (err) => {
        if (err) {
            console.error(err.message);
        }
        res.redirect('/admin/habitaciones');
    });
});

// Eliminar Habitación
app.post('/admin/habitaciones/:id/delete', (req, res) => {
    if (!req.session.usuario || req.session.usuario.rol !== 'Administrador') {
        return res.status(403).send("Acceso denegado");
    }

    const habitacion_id = req.params.id;
    db.run("DELETE FROM Habitacion WHERE habitacion_id = ?", [habitacion_id], (err) => {
        if (err) {
            console.error(err.message);
        }
        res.redirect('/admin/habitaciones');
    });
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
