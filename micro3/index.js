const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8083;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/micro3', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error', err));

const direccionesRouter = require('./routes/direcciones');
const pedidosRouter = require('./routes/pedidos');

app.use('/direcciones', direccionesRouter);
app.use('/pedidos', pedidosRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});