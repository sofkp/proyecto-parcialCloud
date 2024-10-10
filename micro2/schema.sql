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
