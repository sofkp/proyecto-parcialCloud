const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8083;

app.use(express.json());

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB', err));

const pedidosRoutes = require('./routes/pedidos');
const direccionesRoutes = require('./routes/direcciones');

app.use('/api', pedidosRoutes);
app.use('/api', direccionesRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
