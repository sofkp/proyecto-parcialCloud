const express = require('express');
const router = express.Router();
const Pedido = require('../models/pedido');

router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.status(200).json(pedidos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { cliente_id, productos_ids, direccion_id, fecha_envio, total_pago, observaciones } = req.body;
  
  const nuevoPedido = new Pedido({
    cliente_id,
    productos_ids,
    direccion_id, 
    fecha_envio,
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

router.put('/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) return res.status(404).json({ message: 'Pedido no encontrado' });

    const { cliente_id, productos_ids, direccion_id, fecha_envio, total_pago, observaciones } = req.body;
    
    pedido.cliente_id = cliente_id || pedido.cliente_id;
    pedido.productos_ids = productos_ids || pedido.productos_ids;
    pedido.direccion_id = direccion_id || pedido.direccion_id;
    pedido.fecha_envio = fecha_envio || pedido.fecha_envio;
    pedido.total_pago = total_pago || pedido.total_pago;
    pedido.observaciones = observaciones || pedido.observaciones;

    const pedidoActualizado = await pedido.save();
    res.status(200).json(pedidoActualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) return res.status(404).json({ message: 'Pedido no encontrado' });

    await pedido.remove();
    res.status(200).json({ message: 'Pedido eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
