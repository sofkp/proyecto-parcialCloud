const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const port = 8004;

const MV_IP = "44.217.181.55";
const HOST_MYSQL = "http://" + MV_IP + ":8001/";
const express = require("express"); 

// Direccion API
app.get("/direccion", (req, res) => {
  axios.get(HOST_MSQL + "direccion")
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.post("/direccion", (req, res) => {
  axios.post(HOST_MSQL + "direccion", req.body)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.get("/direccion/:id", (req, res) => {
  axios.get(HOST_MSQL + "direccion/" + req.params.id)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.put("/direccion/:id", (req, res) => {
  axios.put(HOST_MSQL + "direccion/" + req.params.id, req.body)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.delete("/direccion/:id", (req, res) => {
  axios.delete(HOST_MSQL + "direccion/" + req.params.id)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

// Pedido API
app.get("/pedido", (req, res) => {
  axios.get(HOST_MSQL + "pedido")
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.post("/pedido", (req, res) => {
  axios.post(HOST_MSQL + "pedido", req.body)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.get("/pedido/:id", (req, res) => {
  axios.get(HOST_MSQL + "pedido/" + req.params.id)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.put("/pedido/:id", (req, res) => {
  axios.put(HOST_MSQL + "pedido/" + req.params.id, req.body)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.delete("/pedido/:id", (req, res) => {
  axios.delete(HOST_MSQL + "pedido/" + req.params.id)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

// Categoria API
app.get("/categoria", (req, res) => {
  axios.get(HOST_MSQL + "categoria")
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.post("/categoria", (req, res) => {
  axios.post(HOST_MSQL + "categoria", req.body)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.get("/categoria/:id", (req, res) => {
  axios.get(HOST_MSQL + "categoria/" + req.params.id)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.put("/categoria/:id", (req, res) => {
  axios.put(HOST_MSQL + "categoria/" + req.params.id, req.body)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.delete("/categoria/:id", (req, res) => {
  axios.delete(HOST_MSQL + "categoria/" + req.params.id)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

// Productos API
app.get("/productos", (req, res) => {
  axios.get(HOST_MSQL + "productos")
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.post("/productos", (req, res) => {
  axios.post(HOST_MSQL + "productos", req.body)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.get("/productos/:id", (req, res) => {
  axios.get(HOST_MSQL + "productos/" + req.params.id)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.put("/productos/:id", (req, res) => {
  axios.put(HOST_MSQL + "productos/" + req.params.id, req.body)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.delete("/productos/:id", (req, res) => {
  axios.delete(HOST_MSQL + "productos/" + req.params.id)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

// Usuarios API
app.get("/usuarios", (req, res) => {
  axios.get(HOST_MSQL + "usuarios")
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.post("/usuarios", (req, res) => {
  axios.post(HOST_MSQL + "usuarios", req.body)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.get("/usuarios/:id", (req, res) => {
  axios.get(HOST_MSQL + "usuarios/" + req.params.id)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.put("/usuarios/:id", (req, res) => {
  axios.put(HOST_MSQL + "usuarios/" + req.params.id, req.body)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.delete("/usuarios/:id", (req, res) => {
  axios.delete(HOST_MSQL + "usuarios/" + req.params.id)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

// Clientes API
app.get("/clientes", (req, res) => {
  axios.get(HOST_MSQL + "clientes")
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.post("/clientes", (req, res) => {
  axios.post(HOST_MSQL + "clientes", req.body)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.get("/clientes/:id", (req, res) => {
  axios.get(HOST_MSQL + "clientes/" + req.params.id)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.put("/clientes/:id", (req, res) => {
  axios.put(HOST_MSQL + "clientes/" + req.params.id, req.body)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.delete("/clientes/:id", (req, res) => {
  axios.delete(HOST_MSQL + "clientes/" + req.params.id)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

// Empleados API
app.get("/empleados", (req, res) => {
  axios.get(HOST_MSQL + "empleados")
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.post("/empleados", (req, res) => {
  axios.post(HOST_MSQL + "empleados", req.body)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.get("/empleados/:id", (req, res) => {
  axios.get(HOST_MSQL + "empleados/" + req.params.id)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.put("/empleados/:id", (req, res) => {
  axios.put(HOST_MSQL + "empleados/" + req.params.id, req.body)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.delete("/empleados/:id", (req, res) => {
  axios.delete(HOST_MSQL + "empleados/" + req.params.id)
    .then((response) => res.send(response.data))
    .catch((error) => console.log(error));
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
