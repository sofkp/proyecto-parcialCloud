const express = require('express');
const router = express.Router();
const Direccion = require('../models/direccion');

router.get('/', async (req, res) => {
  try {
    const direcciones = await Direccion.find();
    res.status(200).json(direcciones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { calle, ciudad, estado, codigoPostal, pais } = req.body;

  const nuevaDireccion = new Direccion({
    calle,
    ciudad,
    estado,
    codigoPostal,
    pais
  });

  try {
    const direccionGuardada = await nuevaDireccion.save();
    res.status(201).json(direccionGuardada);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const direccion = await Direccion.findById(req.params.id);
    if (!direccion) return res.status(404).json({ message: 'Dirección no encontrada' });

    const { calle, ciudad, estado, codigoPostal, pais } = req.body;

    direccion.calle = calle || direccion.calle;
    direccion.ciudad = ciudad || direccion.ciudad;
    direccion.estado = estado || direccion.estado;
    direccion.codigoPostal = codigoPostal || direccion.codigoPostal;
    direccion.pais = pais || direccion.pais;

    const direccionActualizada = await direccion.save();
    res.status(200).json(direccionActualizada);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const direccion = await Direccion.findById(req.params.id);
    if (!direccion) return res.status(404).json({ message: 'Dirección no encontrada' });

    await direccion.remove();
    res.status(200).json({ message: 'Dirección eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
