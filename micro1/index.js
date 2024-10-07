const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 8001;
const host = '0.0.0.0';

app.use(express.json());

const db = mysql.createConnection({
    host: '52.72.186.244', 
    user: 'root', 
    password: 'utec', 
    database: 'mysql_c' 
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// USUARIOS 
app.get('/usuarios', (req, res) => {
    db.query("SELECT * FROM usuarios", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post('/usuarios', (req, res) => {
    const { nombre, email, celular, tipo } = req.body;
    const query = `INSERT INTO usuarios (nombre, email, celular, tipo) VALUES (?, ?, ?, ?)`;
    db.query(query, [nombre, email, celular, tipo], function (err, results) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: results.insertId });
    });
});

app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM usuarios WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row[0]);
    });
});

app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, email, celular, tipo } = req.body;
    const query = `UPDATE usuarios SET nombre = ?, email = ?, celular = ?, tipo = ? WHERE id = ?`;
    db.query(query, [nombre, email, celular, tipo, id], function (err, results) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ updatedID: results.affectedRows });
    });
});

app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM usuarios WHERE id = ?", [id], function (err, results) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ deletedID: results.affectedRows });
    });
});

// CLIENTES 
app.get('/clientes', (req, res) => {
    db.query("SELECT * FROM clientes", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post('/clientes', (req, res) => {
    const { id_usuario, pedidos } = req.body;
    const pedidosStr = pedidos.join(',');
    const query = `INSERT INTO clientes (id_usuario, pedidos) VALUES (?, ?)`;
    db.query(query, [id_usuario, pedidosStr], function (err, results) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: results.insertId });
    });
});

app.get('/clientes/:id', (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM clientes WHERE id_usuario = ?", [id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (rows.length > 0) {
            rows[0].pedidos = rows[0].pedidos.split(',').map(Number);
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Cliente no encontrado' });
        }
    });
});

app.put('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { pedidos } = req.body;
    const pedidosStr = pedidos.join(',');
    const query = `UPDATE clientes SET pedidos = ? WHERE id_usuario = ?`;
    db.query(query, [pedidosStr, id], function (err, results) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ updatedID: results.affectedRows });
    });
});

app.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM clientes WHERE id_usuario = ?", [id], function (err, results) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ deletedID: results.affectedRows });
    });
});

// EMPLEADOS
app.get('/empleados', (req, res) => {
    db.query("SELECT * FROM empleados", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post('/empleados', (req, res) => {
    const { id_usuario, cargo } = req.body;
    const query = `INSERT INTO empleados (id_usuario, cargo) VALUES (?, ?)`;
    db.query(query, [id_usuario, cargo], function (err, results) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: results.insertId });
    });
});

app.get('/empleados/:id', (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM empleados WHERE id_usuario = ?", [id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows[0]);
    });
});

app.put('/empleados/:id', (req, res) => {
    const { id } = req.params;
    const { cargo } = req.body;
    const query = `UPDATE empleados SET cargo = ? WHERE id_usuario = ?`;
    db.query(query, [cargo, id], function (err, results) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ updatedID: results.affectedRows });
    });
});

app.delete('/empleados/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM empleados WHERE id_usuario = ?", [id], function (err, results) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ deletedID: results.affectedRows });
    });
});

app.listen(port, () => {
    console.log(`Microservicio escuchando en el puerto ${port}`);
});
