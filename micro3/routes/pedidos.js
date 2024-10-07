const express = require('express');
const router = express.Router();
const Pedido = require('../models/pedido');

router.get('/pedidos', async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.status(200).json(pedidos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/pedidos', async (req, res) => {
  const { cliente_id, productos_ids, fecha_envio, metodo_pago, total_pago, observaciones } = req.body;
  
  const nuevoPedido = new Pedido({
    cliente_id,
    productos_ids,
    fecha_envio,
    metodo_pago,
    total_pago,
    observaciones
  });

  try {
    const pedidoGuardado = await nuevoPedido.save();
    res.status(201).json(pedidoGuardado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
