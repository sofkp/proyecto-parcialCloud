const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            celular INTEGER UNIQUE NOT NULL,
            tipo TEXT CHECK(tipo IN ('cliente', 'empleado')) NOT NULL
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS clientes (
            id_usuario INTEGER,
            pedidos TEXT,
            FOREIGN KEY(id_usuario) REFERENCES usuarios(id)
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS empleados (
            id_usuario INTEGER,
            cargo TEXT NOT NULL,
            FOREIGN KEY(id_usuario) REFERENCES usuarios(id)
        );
    `);
});

module.exports = db;
