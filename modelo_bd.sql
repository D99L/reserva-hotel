-- Creación de la base de datos
CREATE DATABASE si_reserva_hotel;
USE si_reserva_hotel;

-- Tabla Hotel
CREATE TABLE Hotel (
    hotel_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    categoria INT NOT NULL
);

-- Tabla Habitación
CREATE TABLE Habitacion (
    habitacion_id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_id INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    capacidad INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (hotel_id) REFERENCES Hotel(hotel_id) ON DELETE CASCADE
);

-- Tabla Cliente
CREATE TABLE Cliente (
    cliente_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(150) UNIQUE NOT NULL,
    telefono VARCHAR(20)
);

-- Tabla Reserva
CREATE TABLE Reserva (
    reserva_id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    habitacion_id INT NOT NULL,
    fecha_entrada DATE NOT NULL,
    fecha_salida DATE NOT NULL,
    cantidad_personas INT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES Cliente(cliente_id) ON DELETE CASCADE,
    FOREIGN KEY (habitacion_id) REFERENCES Habitacion(habitacion_id) ON DELETE CASCADE
);

-- Inserción de datos de prueba (opcional, para verificar CRUD)
INSERT INTO Hotel (nombre, direccion, categoria) VALUES ('Hotel Central', 'Av. Siempre Viva 123', 4);
INSERT INTO Habitacion (hotel_id, tipo, capacidad, precio) VALUES (1, 'Doble', 2, 50000.00);
INSERT INTO Cliente (nombre, apellido, correo_electronico, telefono) VALUES ('Juan', 'Perez', 'juan.perez@email.com', '+56912345678');
INSERT INTO Reserva (cliente_id, habitacion_id, fecha_entrada, fecha_salida, cantidad_personas) VALUES (1, 1, '2023-11-01', '2023-11-05', 2);
