const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'reserva_hotel.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar con SQLite:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS Usuario (
                    usuario_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    rut TEXT UNIQUE NOT NULL,
                    nombre TEXT NOT NULL,
                    apellido TEXT NOT NULL,
                    correo TEXT UNIQUE NOT NULL,
                    telefono TEXT,
                    rol TEXT DEFAULT 'Turista'
                )
            `);
            
            db.run(`
                CREATE TABLE IF NOT EXISTS Hotel (
                    hotel_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT NOT NULL,
                    direccion TEXT NOT NULL,
                    ciudad TEXT NOT NULL,
                    categoria INTEGER NOT NULL
                )
            `);

            db.run(`
                CREATE TABLE IF NOT EXISTS Habitacion (
                    habitacion_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    hotel_id INTEGER NOT NULL,
                    numero TEXT NOT NULL,
                    tipo TEXT NOT NULL,
                    capacidad INTEGER NOT NULL,
                    precio REAL NOT NULL,
                    estado TEXT DEFAULT 'Disponible',
                    FOREIGN KEY (hotel_id) REFERENCES Hotel(hotel_id) ON DELETE CASCADE
                )
            `);

            db.run(`
                CREATE TABLE IF NOT EXISTS Reserva (
                    reserva_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    usuario_id INTEGER NOT NULL,
                    habitacion_id INTEGER NOT NULL,
                    fecha_reserva TEXT NOT NULL,
                    fecha_entrada TEXT NOT NULL,
                    fecha_salida TEXT NOT NULL,
                    cantidad_personas INTEGER NOT NULL,
                    total REAL NOT NULL,
                    estado TEXT DEFAULT 'Pendiente',
                    FOREIGN KEY (usuario_id) REFERENCES Usuario(usuario_id),
                    FOREIGN KEY (habitacion_id) REFERENCES Habitacion(habitacion_id)
                )
            `);

            db.run(`
                CREATE TABLE IF NOT EXISTS Pago (
                    pago_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    reserva_id INTEGER NOT NULL,
                    monto REAL NOT NULL,
                    fecha_pago TEXT NOT NULL,
                    metodo TEXT NOT NULL,
                    estado TEXT DEFAULT 'Aprobado',
                    FOREIGN KEY (reserva_id) REFERENCES Reserva(reserva_id) ON DELETE CASCADE
                )
            `);

            // Seed Data if empty
            db.get("SELECT COUNT(*) as count FROM Usuario", (err, row) => {
                if (row.count === 0) {
                    db.run(`INSERT INTO Usuario (rut, nombre, apellido, correo, telefono, rol) VALUES 
                        ('1111111-1', 'Admin', 'Admin', 'admin@hotel.cl', '+569000000', 'Administrador'),
                        ('2222222-2', 'Adolfo', 'Leal', 'adolfo.leal@correo.cl', '+569111111', 'Turista')`);
                    
                    db.run(`INSERT INTO Hotel (nombre, direccion, ciudad, categoria) VALUES 
                        ('Hotel Plaza', 'Providencia 123', 'Santiago', 4),
                        ('Hotel Mar', 'San Martin 456', 'Vina del Mar', 5)`);

                    db.run(`INSERT INTO Habitacion (hotel_id, numero, tipo, capacidad, precio, estado) VALUES 
                        (1, '101', 'Simple', 1, 45000.00, 'Disponible'),
                        (1, '102', 'Doble', 2, 65000.00, 'Disponible'),
                        (2, 'A1', 'Doble', 2, 85000.00, 'Ocupada')`);

                    db.run(`INSERT INTO Reserva (usuario_id, habitacion_id, fecha_reserva, fecha_entrada, fecha_salida, cantidad_personas, total, estado) VALUES 
                        (2, 2, '2023-11-01', '2023-12-01', '2023-12-05', 2, 260000.00, 'Confirmada')`);

                    db.run(`INSERT INTO Pago (reserva_id, monto, fecha_pago, metodo, estado) VALUES 
                        (1, 260000.00, '2023-11-01', 'Tarjeta', 'Aprobado')`);
                    
                    console.log('Datos iniciales insertados.');
                }
            });
        });
    }
});

module.exports = db;
