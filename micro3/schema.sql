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

use micro3
db.createCollection("pedidos");

db.pedidos.insertMany([
  {
    numero_pedido: 1001,
    cliente_id: 1,
    productos: [1, 2], 
    total: 99.97
  },
  {
    numero_pedido: 1002,
    cliente_id: 3,
    productos: [3], 
    total: 39.99
  }
]);

db.createCollection("direcciones");

db.direcciones.insertMany([
  {
    cliente_id: 1,
    direccion: "123 Calle Principal, Ciudad A",
    ciudad: "Ciudad A",
    codigo_postal: "10001"
  },
  {
    cliente_id: 3,
    direccion: "456 Avenida B, Ciudad B",
    ciudad: "Ciudad B",
    codigo_postal: "20002"
  }
]);
