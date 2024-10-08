const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios'); 
const app = express();
const port = 8003;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/micro3', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error', err));

app.get('/api/products', async (req, res) => {
    try {
        const response = await axios.get('http://micro2:8082/productos');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const response = await axios.get('http://micro2:8081/clientes');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});