const express = require('express');
const db = require('./db');
const app = express();
const port = 8001;
const host='0.0.0.0';

app.use(express.json());

 //USUARIOS 
app.get('/usuarios', (req, res) => {
    db.all("SELECT * FROM usuarios", (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json(rows);
    });
});

app.post('/usuarios', (req, res) => {
    const { nombre, email, celular, tipo } = req.body;
    const query = `INSERT INTO usuarios (nombre, email, celular, tipo) VALUES (?, ?, ?, ?)`;
    db.run(query, [nombre, email, celular, tipo], function (err) {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({ id: this.lastID });
    });
});

app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM usuarios WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json(row);
    });
});

app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, email, celular, tipo } = req.body;
    const query = `UPDATE usuarios SET nombre = ?, email = ?, celular = ?, tipo = ? WHERE id = ?`;
    db.run(query, [nombre, email, celular, tipo, id], function (err) {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({ updatedID: this.changes });
    });
});

app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM usuarios WHERE id = ?", [id], function (err) {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({ deletedID: this.changes });
    });
});

//CLIENTES 
app.get('/clientes', (req, res) => {
    db.all("SELECT * FROM clientes", (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json(rows);
    });
});

app.post('/clientes', (req, res) => {
    const { id_usuario, pedidos } = req.body;
    const pedidosStr = pedidos.join(',');
    const query = `INSERT INTO clientes (id_usuario, pedidos) VALUES (?, ?)`;
    db.run(query, [id_usuario, pedidosStr], function (err) {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({ id: this.lastID });
    });
});

app.get('/clientes/:id', (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM clientes WHERE id_usuario = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        if (row) {
            row.pedidos = row.pedidos.split(',').map(Number);
        }
        res.json(row);
    });
});

app.put('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { pedidos } = req.body;
    const pedidosStr = pedidos.join(',');
    const query = `UPDATE clientes SET pedidos = ? WHERE id_usuario = ?`;
    db.run(query, [pedidosStr, id], function (err) {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({ updatedID: this.changes });
    });
});

app.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM clientes WHERE id_usuario = ?", [id], function (err) {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({ deletedID: this.changes });
    });
});

//empleados
app.get('/empleados', (req, res) => {
    db.all("SELECT * FROM empleados", (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json(rows);
    });
});

app.post('/empleados', (req, res) => {
    const { id_usuario, cargo } = req.body;
    const query = `INSERT INTO empleados (id_usuario, cargo) VALUES (?, ?)`;
    db.run(query, [id_usuario, cargo], function (err) {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({ id: this.lastID });
    });
});

app.get('/empleados/:id', (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM empleados WHERE id_usuario = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json(row);
    });
});

app.put('/empleados/:id', (req, res) => {
    const { id } = req.params;
    const { cargo } = req.body;
    const query = `UPDATE empleados SET cargo = ? WHERE id_usuario = ?`;
    db.run(query, [cargo, id], function (err) {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({ updatedID: this.changes });
    });
});

app.delete('/empleados/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM empleados WHERE id_usuario = ?", [id], function (err) {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({ deletedID: this.changes });
    });
});

app.listen(port, () => {
    console.log(`Microservicio escuchando en el puerto ${port_number}`);
});