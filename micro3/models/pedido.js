const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  cliente_id: { type: String, required: true },
  productos_ids: [{ type: String, required: true }],
  direccion_id: { type: String, required: true },
  fecha_envio: { type: Date,  required: true},
  total_pago: { type: Number,  required: true },
  observaciones: { type: String,  required: true }
});

module.exports = mongoose.model('Pedido', pedidoSchema);
