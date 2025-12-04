// routes/parts.js
const express = require('express');
const router = express.Router();
const { Part, Car } = require('../models');

// GET all parts
router.get('/', async (req, res, next) => {
  try {
    const parts = await Part.findAll({ include: Car });
    res.json(parts);
  } catch (err) { next(err); }
});

// GET part by id
router.get('/:id', async (req, res, next) => {
  try {
    const part = await Part.findByPk(req.params.id, { include: Car });
    if (!part) return res.status(404).json({ error: 'Part not found' });
    res.json(part);
  } catch (err) { next(err); }
});

// POST create part
router.post('/', async (req, res, next) => {
  try {
    const { carId } = req.body;
    const car = await Car.findByPk(carId);
    if (!car) return res.status(400).json({ error: 'Car does not exist' });
    const part = await Part.create(req.body);
    res.status(201).json(part);
  } catch (err) { next(err); }
});

// PUT update part
router.put('/:id', async (req, res, next) => {
  try {
    const part = await Part.findByPk(req.params.id);
    if (!part) return res.status(404).json({ error: 'Part not found' });
    await part.update(req.body);
    res.json(part);
  } catch (err) { next(err); }
});

// DELETE part
router.delete('/:id', async (req, res, next) => {
  try {
    const part = await Part.findByPk(req.params.id);
    if (!part) return res.status(404).json({ error: 'Part not found' });
    await part.destroy();
    res.status(204).send();
  } catch (err) { next(err); }
});

module.exports = router;
