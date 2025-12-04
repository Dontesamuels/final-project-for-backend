// routes/owners.js
const express = require('express');
const router = express.Router();
const { Owner, Car } = require('../models');

// GET all owners
router.get('/', async (req, res, next) => {
  try {
    const owners = await Owner.findAll({ include: Car });
    res.json(owners);
  } catch (err) { next(err); }
});

// GET owner by id
router.get('/:id', async (req, res, next) => {
  try {
    const owner = await Owner.findByPk(req.params.id, { include: Car });
    if (!owner) return res.status(404).json({ error: 'Owner not found' });
    res.json(owner);
  } catch (err) { next(err); }
});

// POST create owner
router.post('/', async (req, res, next) => {
  try {
    const owner = await Owner.create(req.body);
    res.status(201).json(owner);
  } catch (err) { next(err); }
});

// PUT update owner
router.put('/:id', async (req, res, next) => {
  try {
    const owner = await Owner.findByPk(req.params.id);
    if (!owner) return res.status(404).json({ error: 'Owner not found' });
    await owner.update(req.body);
    res.json(owner);
  } catch (err) { next(err); }
});

// DELETE owner
router.delete('/:id', async (req, res, next) => {
  try {
    const owner = await Owner.findByPk(req.params.id);
    if (!owner) return res.status(404).json({ error: 'Owner not found' });
    await owner.destroy();
    res.status(204).send();
  } catch (err) { next(err); }
});

module.exports = router;
