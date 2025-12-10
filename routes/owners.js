// routes/owners.js 
const express = require('express');
const router = express.Router();
const { Owner } = require('../models');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/authorize');

// Require any authenticated user
router.get('/', authenticate, async (req, res) => {
  const owners = await Owner.findAll();
  res.json(owners);
});

// Only admins can delete an owner
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  const { id } = req.params;
  const found = await Owner.findByPk(id);
  if (!found) return res.status(404).json({ message: 'Owner not found' });
  await found.destroy();
  res.json({ message: 'Deleted' });
});

// User-specific ownership example: user can only update their own owner record
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const owner = await Owner.findByPk(id);
  if (!owner) return res.status(404).json({ message: 'Owner not found' });

  // assume Owner has userId field linking to User
  if (owner.userId && owner.userId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden - not owner' });
  }

  await owner.update(req.body);
  res.json(owner);
});

module.exports = router;
