const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  cliente_id: { type: String, required: true },
  productos_ids: [{ type: String, required: true }],
  fecha_envio: { type: Date },
  metodo_pago: { type: String },
  total_pago: { type: Number },
  observaciones: { type: String }
});

module.exports = mongoose.model('Pedido', pedidoSchema);
