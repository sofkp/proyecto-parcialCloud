const express = require('express');
const axios = require('axios');
const app = express();
const port = 8004;

app.use(express.json());

MICRO1_URL = "http://localhost:8081"
MICRO2_URL = "http://localhost:8082"
MICRO3_URL = "http://localhost:8083"

app.get('/api/orders', async (req, res) => {
    try {
        const ordersResponse = await axios.get(MICRO3_URL + '/pedidos'); 
        const orders = ordersResponse.data;

        const productsResponse = await axios.get(MICRO2_URL + '/productos');
        const products = productsResponse.data;

        const userPromises = orders.map(order =>
            axios.get(MICRO1_URL + `/usuarios/${order.cliente_id}`)
        );
        const usersResponses = await Promise.all(userPromises);
        const users = usersResponses.map(response => response.data);

        const combinedData = orders.map(order => {
            return {
                ...order,
                productDetails: products.find(product => product.id === order.product_id),
                userDetails: users.find(user => user.id === order.cliente_id),
            };
        });

        res.json(combinedData);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send('Error fetching orders');
    }
});

app.post('/api/orders', async (req, res) => {
    const { numero_pedido, cliente_id, productos, total } = req.body;

    try {
        const userResponse = await axios.get(MICRO1_URL + `/usuarios/${cliente_id}`);
        
        if (!userResponse.data) {
            return res.status(404).send('User not found');
        }
        const productChecks = await Promise.all(productos.map(productId =>
            axios.get(MICRO2_URL + `/productos/${productId}`)
        ));

        const allProductsAvailable = productChecks.every(response => response.status === 200);

        if (!allProductsAvailable) {
            return res.status(400).send('Some products are not available');
        }

        const orderResponse = await axios.post(MICRO3_URL + '/pedidos', {
            numero_pedido,
            cliente_id,
            productos,
            total,
        });

        res.status(201).json(orderResponse.data);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send('Error creating order');
    }
});

app.listen(port, () => {
    console.log(`Orchestrator service listening on port ${port}`);
});