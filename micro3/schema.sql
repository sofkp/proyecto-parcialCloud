CREATE TABLE direccion (
    id INT PRIMARY KEY AUTOINCREMENT,
    direccion_completa TEXT NOT NULL,
    distrito TEXT NOT NULL,
    provincia TEXT NOT NULL
);
CREATE TABLE pedido (
    id INT PRIMARY KEY AUTOINCREMENT,
    fecha_envio DATE,
    metodo_pago TEXT,
    total_pago DECIMAL(10,2),
    observaciones TEXT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY(id_usuario) REFERENCES cliente(id)
);
