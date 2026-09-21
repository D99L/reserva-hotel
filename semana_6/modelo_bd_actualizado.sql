-- Script de base de datos mejorado para la Semana 6
-- Integracion de usuario, login y pagos

CREATE DATABASE IF NOT EXISTS si_reserva_hotel;
USE si_reserva_hotel;

-- Tabla de Usuarios para manejar login de admin y turista
CREATE TABLE Usuario (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    rut VARCHAR(12) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    rol VARCHAR(20) DEFAULT 'Turista' -- Turista o Administrador
);

-- Tabla Hotel (con mas datos para que se vea mejor en las vistas)
CREATE TABLE Hotel (
    hotel_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    categoria INT NOT NULL
);

-- Tabla Habitación mejorada
CREATE TABLE Habitacion (
    habitacion_id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_id INT NOT NULL,
    numero VARCHAR(10) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    capacidad INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    estado VARCHAR(20) DEFAULT 'Disponible',
    FOREIGN KEY (hotel_id) REFERENCES Hotel(hotel_id) ON DELETE CASCADE
);

-- Tabla Reserva actualizada
CREATE TABLE Reserva (
    reserva_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    habitacion_id INT NOT NULL,
    fecha_reserva DATE NOT NULL,
    fecha_entrada DATE NOT NULL,
    fecha_salida DATE NOT NULL,
    cantidad_personas INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    estado VARCHAR(20) DEFAULT 'Pendiente',
    FOREIGN KEY (usuario_id) REFERENCES Usuario(usuario_id),
    FOREIGN KEY (habitacion_id) REFERENCES Habitacion(habitacion_id)
);

-- Nueva Tabla Pago para el checkout
CREATE TABLE Pago (
    pago_id INT AUTO_INCREMENT PRIMARY KEY,
    reserva_id INT NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    fecha_pago DATE NOT NULL,
    metodo VARCHAR(50) NOT NULL,
    estado VARCHAR(20) DEFAULT 'Aprobado',
    FOREIGN KEY (reserva_id) REFERENCES Reserva(reserva_id) ON DELETE CASCADE
);

-- DATOS PARA PROBAR EL CRUD
INSERT INTO Usuario (rut, nombre, apellido, correo, telefono, rol) VALUES
('1111111-1', 'Admin', 'Admin', 'admin@hotel.cl', '+569000000', 'Administrador'),
('2222222-2', 'Adolfo', 'Leal', 'adolfo.leal@correo.cl', '+569111111', 'Turista');

INSERT INTO Hotel (nombre, direccion, ciudad, categoria) VALUES
('Hotel Plaza', 'Providencia 123', 'Santiago', 4),
('Hotel Mar', 'San Martin 456', 'Vina del Mar', 5);

INSERT INTO Habitacion (hotel_id, numero, tipo, capacidad, precio, estado) VALUES
(1, '101', 'Simple', 1, 45000.00, 'Disponible'),
(1, '102', 'Doble', 2, 65000.00, 'Disponible'),
(2, 'A1', 'Doble', 2, 85000.00, 'Ocupada');

INSERT INTO Reserva (usuario_id, habitacion_id, fecha_reserva, fecha_entrada, fecha_salida, cantidad_personas, total, estado) VALUES
(2, 2, '2023-11-01', '2023-12-01', '2023-12-05', 2, 260000.00, 'Confirmada');

INSERT INTO Pago (reserva_id, monto, fecha_pago, metodo, estado) VALUES
(1, 260000.00, '2023-11-01', 'Tarjeta', 'Aprobado');
