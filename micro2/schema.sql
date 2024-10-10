DROP DATABASE IF EXISTS micro2;
CREATE DATABASE micro2 WITH TEMPLATE template0 ENCODING 'UTF8' LC_COLLATE='en_US.utf8' LC_CTYPE='en_US.utf8';
\c micro2;
CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    nombreCategoria VARCHAR(255) NOT NULL
);

CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre_producto VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    id_categoria INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id)
);

INSERT INTO categoria (nombre_categoria) VALUES
    ('Ropa'),
    ('Calzado');

INSERT INTO productos (nombre_producto, precio, id_categoria) VALUES
    ('Camiseta', 19.99, 1),
    ('Pantalones', 39.99, 1),
    ('Zapatos', 59.99, 2);

