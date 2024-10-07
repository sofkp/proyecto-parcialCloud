const express = require('express');
const router = express.Router();
const Direccion = require('../models/direccion');

router.get('/direcciones', async (req, res) => {
  try {
    const direcciones = await Direccion.find();
    res.status(200).json(direcciones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/direcciones', async (req, res) => {
  const { direccion_completa, distrito, provincia } = req.body;

  const nuevaDireccion = new Direccion({
    direccion_completa,
    distrito,
    provincia
  });

  try {
    const direccionGuardada = await nuevaDireccion.save();
    res.status(201).json(direccionGuardada);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
