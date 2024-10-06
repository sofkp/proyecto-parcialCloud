CREATE TABLE categoria (
    id INT PRIMARY KEY AUTOINCREMENT,
    nombre_categoria TEXT NOT NULL
);
CREATE TABLE productos (
    id_producto INT PRIMARY KEY AUTOINCREMENT,
    precio DECIMAL(10, 2) NOT NULL,
    id_categoria INTEGER NOT NULL,
    FOREIGN KEY(id_categoria) REFERENCES categoria(id)
);
