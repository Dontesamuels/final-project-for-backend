// middleware/auth.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  const token = authHeader && authHeader.split(' ')[0] === 'Bearer' ? authHeader.split(' ')[1] : null;

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // attach minimal user info; if you want the full user, fetch from DB:
    const user = await User.findByPk(payload.id, { attributes: ['id', 'email', 'role'] });
    if (!user) return res.status(401).json({ message: 'Invalid token: user not found' });

    req.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch (err) {
    console.error('Auth middleware', err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = authenticateToken;
