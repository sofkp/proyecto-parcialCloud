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
    direccion_id INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE empleados (
    id_usuario INT PRIMARY KEY,
    cargo TEXT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);
commit;

