const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8003;

app.use(express.json());

mongoose.connect('mongodb://44.217.181.55:27017/micro3', {
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
