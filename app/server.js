const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();
const port = 3000;

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para procesar datos de formularios
app.use(express.urlencoded({ extended: true }));

// --- RUTAS ---

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
        res.render('turista', { habitaciones: rows });
    });
});

// Acción de Reservar (Simulada para el prototipo)
app.post('/reservar', (req, res) => {
    const habitacion_id = req.body.habitacion_id;
    const usuario_id = 2; // ID del turista creado en los datos iniciales
    const fecha_actual = new Date().toISOString().split('T')[0];
    const fecha_entrada = "2024-01-10";
    const fecha_salida = "2024-01-15";
    
    // Buscar precio de habitación
    db.get("SELECT precio FROM Habitacion WHERE habitacion_id = ?", [habitacion_id], (err, row) => {
        if (err || !row) return res.redirect('/');
        
        const total = row.precio * 5; // 5 noches por defecto para prototipo
        
        // Crear reserva
        db.run(`INSERT INTO Reserva (usuario_id, habitacion_id, fecha_reserva, fecha_entrada, fecha_salida, cantidad_personas, total, estado) 
                VALUES (?, ?, ?, ?, ?, 2, ?, 'Confirmada')`, 
                [usuario_id, habitacion_id, fecha_actual, fecha_entrada, fecha_salida, total], 
                function(err) {
                    if (err) {
                        console.log(err);
                        return res.redirect('/');
                    }
                    
                    // Actualizar estado de habitación
                    db.run("UPDATE Habitacion SET estado = 'Ocupada' WHERE habitacion_id = ?", [habitacion_id], (err) => {
                        res.redirect('/admin');
                    });
        });
    });
});

// Vista Admin
app.get('/admin', (req, res) => {
    const query = `
        SELECT r.reserva_id, r.fecha_entrada, r.fecha_salida, r.estado, r.total,
               u.nombre as nombre_cliente, u.apellido as apellido_cliente, u.correo as correo_cliente,
               h.numero as numero_habitacion, ht.nombre as hotel_nombre
        FROM Reserva r
        JOIN Usuario u ON r.usuario_id = u.usuario_id
        JOIN Habitacion h ON r.habitacion_id = h.habitacion_id
        JOIN Hotel ht ON h.hotel_id = ht.hotel_id
        ORDER BY r.reserva_id DESC
    `;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Error interno del servidor");
            return;
        }
        res.render('admin', { reservas: rows });
    });
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
