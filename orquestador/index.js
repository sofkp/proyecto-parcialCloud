const express = require('express');
const axios = require('axios');
const app = express();
const port = 8004;

app.use(express.json());

MICRO1_URL = "http://localhost:8081"; 
MICRO2_URL = "http://localhost:8082"; 
MICRO3_URL = "http://localhost:8083"; 

app.post('/pedido', async (req, res) => {
    const { cliente_id, direccion, productos_ids } = req.body;

    try {
        const userResponse = await axios.get(`${MICRO1_URL}/clientes/${cliente_id}`);
        if (!userResponse.data) {
            return res.status(404).send('Cliente no encontrado');
        }

        const productPromises = productos_ids.map(producto_id => 
            axios.get(`${MICRO2_URL}/productos/${producto_id}`)
        );
        const productResponses = await Promise.all(productPromises);

        const outOfStock = productResponses.some(resp => !resp.data.stock);
        if (outOfStock) {
            return res.status(400).send('Uno o más productos están fuera de stock');
        }

        const total = productResponses.reduce((sum, resp) => sum + resp.data.precio, 0);

        let direccion_id;
        if (direccion) {
            const direccionResponse = await axios.post(`${MICRO3_URL}/direcciones`, direccion);
            direccion_id = direccionResponse.data._id;
        }

        const orderResponse = await axios.post(`${MICRO3_URL}/pedidos`, {
            cliente_id,
            productos_ids,
            direccion_id,
            total
        });

        res.status(201).json(orderResponse.data);
    } catch (error) {
        console.error('Error al crear el pedido:', error);
        res.status(500).send('Error al crear el pedido');
    }
});

app.put('/pedido:id', async (req, res) => {
    const { cliente_id, productos_ids } = req.body;
    const orderId = req.params.id;

    try {
        const orderResponse = await axios.get(`${MICRO3_URL}/pedidos/${orderId}`);
        const pedido = orderResponse.data;
        if (pedido.cliente_id !== cliente_id) {
            return res.status(403).send('No tienes permiso para modificar este pedido');
        }

        const productPromises = productos_ids.map(producto_id =>
            axios.get(`${MICRO2_URL}/productos/${producto_id}`)
        );
        const productResponses = await Promise.all(productPromises);
        
        const outOfStock = productResponses.some(resp => !resp.data.stock);
        if (outOfStock) {
            return res.status(400).send('Uno o más productos están fuera de stock');
        }

        const total = productResponses.reduce((sum, resp) => sum + resp.data.precio, 0);

        const updatedOrder = await axios.put(`${MICRO3_URL}/pedidos/${orderId}`, {
            productos_ids,
            total
        });

        res.status(200).json(updatedOrder.data);
    } catch (error) {
        console.error('Error al modificar el pedido:', error);
        res.status(500).send('Error al modificar el pedido');
    }
});

app.listen(port, () => {
    console.log(`Orchestrator service listening on port ${port}`);
});
