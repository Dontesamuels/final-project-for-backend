// routes/cars.js
const express = require('express');
const router = express.Router();
const { Car, Owner, Part } = require('../models');

// GET all cars
router.get('/', async (req, res, next) => {
  try {
    const cars = await Car.findAll({ include: [Owner, Part] });
    res.json(cars);
  } catch (err) { next(err); }
});

// GET car by id
router.get('/:id', async (req, res, next) => {
  try {
    const car = await Car.findByPk(req.params.id, { include: [Owner, Part] });
    if (!car) return res.status(404).json({ error: 'Car not found' });
    res.json(car);
  } catch (err) { next(err); }
});

// POST create car
router.post('/', async (req, res, next) => {
  try {
    const { ownerId } = req.body;
    const owner = await Owner.findByPk(ownerId);
    if (!owner) return res.status(400).json({ error: 'Owner does not exist' });
    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (err) { next(err); }
});

// PUT update car
router.put('/:id', async (req, res, next) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) return res.status(404).json({ error: 'Car not found' });
    await car.update(req.body);
    res.json(car);
  } catch (err) { next(err); }
});

// DELETE car
router.delete('/:id', async (req, res, next) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) return res.status(404).json({ error: 'Car not found' });
    await car.destroy();
    res.status(204).send();
  } catch (err) { next(err); }
});

module.exports = router;
