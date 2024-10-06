DROP DATABASE IF EXISTS micro1;
CREATE DATABASE micro1 CHARACTER SET utf8mb4;
USE micro1;

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre TEXT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL, 
    celular VARCHAR(9) UNIQUE NOT NULL,
    tipo ENUM('cliente', 'empleado') NOT NULL
);

CREATE TABLE clientes (
    id_usuario INT PRIMARY KEY,
    pedidos TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE empleados (
    id_usuario INT PRIMARY KEY,
    cargo TEXT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

INSERT INTO usuarios (nombre, email, celular, tipo) VALUES 
('Juan Perez', 'juan.perez@mail.com', '123456789', 'cliente'),
('Maria Lopez', 'maria.lopez@mail.com', '098765432', 'empleado'),
('Carlos Gomez', 'carlos.gomez@mail.com', '555444332', 'cliente');

INSERT INTO clientes (id_usuario, pedidos) VALUES
(1, '1,2'),
(3, '3');

INSERT INTO empleados (id_usuario, cargo) VALUES
(2, 'cajero'),
(3, 'encargado de marketing');

commit;
