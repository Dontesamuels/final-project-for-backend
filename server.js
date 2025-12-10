// server.js 
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');

// Add these two lines if not present:
app.use(cors());
app.use(express.json());

// Mount auth routes
app.use('/api/auth', authRoutes);

// example health endpoint
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// mount other resource routers (example)
app.use('/api/owners', require('./routes/owners'));
// app.use('/api/cars', require('./routes/cars'));
// app.use('/api/parts', require('./routes/parts'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports = app;
