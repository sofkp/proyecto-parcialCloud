const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8004;

app.use(bodyParser.json());

const USERS_MICROSERVICE_URL = 'http://localhost:8001';  
const PRODUCTS_MICROSERVICE_URL = 'http://localhost:8002'; 
const ORDERS_MICROSERVICE_URL = 'http://localhost:8003'; 

app.get('/cliente/:id', async (req, res) => {
    const clienteId = req.params.id;

    try {
        const clienteResponse = await axios.get(`${USERS_MICROSERVICE_URL}/clientes/${clienteId}`);
        const clienteData = clienteResponse.data;

        const pedidosResponse = await axios.get(`${ORDERS_MICROSERVICE_URL}/pedidos/cliente/${clienteId}`);
        const pedidosData = pedidosResponse.data;

        res.status(200).json({
            cliente: clienteData,
            pedidos: pedidosData
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al obtener los datos del cliente o sus pedidos' });
    }
});

app.get('/empleado/:id', async (req, res) => {
    const empleadoId = req.params.id;

    try {
        const empleadoResponse = await axios.get(`${USERS_MICROSERVICE_URL}/empleados/${empleadoId}`);
        const empleadoData = empleadoResponse.data;

        res.status(200).json({
            empleado: empleadoData,
            productos: productosData
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al obtener los datos del empleado o los productos' });
    }
});

app.post('/cliente/:id/pedido', async (req, res) => {
    const clienteId = req.params.id;
    const pedidoData = req.body;

    try {
        const clienteResponse = await axios.get(`${USERS_MICROSERVICE_URL}/clientes/${clienteId}`);
        if (!clienteResponse.data) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        const newPedidoResponse = await axios.post(`${ORDERS_MICROSERVICE_URL}/pedidos`, pedidoData);
        res.status(201).json({ message: 'Pedido creado', pedido: newPedidoResponse.data });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al crear el pedido' });
    }
});

app.get('/productos/:id/detalle', async (req, res) => {
    const productoId = req.params.id;

    try {
        const productoResponse = await axios.get(`${PRODUCTS_MICROSERVICE_URL}/productos/${productoId}`);
        const productoData = productoResponse.data;

        const disponibilidadResponse = await axios.get(`${ORDERS_MICROSERVICE_URL}/disponibilidad/${productoId}`);
        const disponibilidadData = disponibilidadResponse.data;

        res.status(200).json({
            producto: productoData,
            disponibilidad: disponibilidadData
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al obtener detalles del producto o su disponibilidad' });
    }
});

app.get('/resumen', async (req, res) => {
    try {
        const clientesResponse = await axios.get(`${USERS_MICROSERVICE_URL}/clientes`);
        const clientesData = clientesResponse.data;

        const productosResponse = await axios.get(`${PRODUCTS_MICROSERVICE_URL}/productos`);
        const productosData = productosResponse.data;

        const pedidosResponse = await axios.get(`${ORDERS_MICROSERVICE_URL}/pedidos`);
        const pedidosData = pedidosResponse.data;

        res.status(200).json({
            clientes: clientesData,
            productos: productosData,
            pedidos: pedidosData
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al obtener el resumen de los datos' });
    }
});

app.listen(PORT, () => {
    console.log(`Orchestrator running on http://localhost:${PORT}`);
});
