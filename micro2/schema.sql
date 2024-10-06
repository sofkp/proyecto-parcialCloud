CREATE DATABASE bd_producto_categoria WITH TEMPLATE template0 ENCODING 'UTF8' LC_COLLATE='en_US.utf8' LC_CTYPE='en_US.utf8';
\c bd_producto_categoria;
CREATE TABLE categoria (
    id SERIAL PRIMARY KEY, 
    nombre_categoria VARCHAR(255) NOT NULL 
);

CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY, 
    precio DECIMAL(10, 2) NOT NULL,
    id_categoria INT NOT NULL, 
    FOREIGN KEY (id_categoria) REFERENCES categoria(id)
);