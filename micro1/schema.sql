CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    celular INTEGER UNIQUE NOT NULL,
    direccion_id TEXT,
    tipo TEXT CHECK(tipo IN ('cliente', 'empleado')) NOT NULL,
    FOREIGN KEY direccion_id REFERENCES direccion(id)
);
CREATE TABLE clientes (
    id_usuario INTEGER PRIMARY KEY,
    pedidos TEXT,
    FOREIGN KEY(id_usuario) REFERENCES usuarios(id)
);
CREATE TABLE empleados (
    id_usuario INTEGER PRIMARY KEY,
    cargo TEXT NOT NULL,
    FOREIGN KEY(id_usuario) REFERENCES usuarios(id)
)