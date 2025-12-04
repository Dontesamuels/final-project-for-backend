// app.js
const express = require('express');
const { sequelize } = require('./models');
require('dotenv').config();

const ownersRouter = require('./routes/owners');
const carsRouter = require('./routes/cars');
const partsRouter = require('./routes/parts');

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => res.json({ message: 'MVP API running' }));

app.use('/api/owners', ownersRouter);
app.use('/api/cars', carsRouter);
app.use('/api/parts', partsRouter);

app.use(errorHandler);

module.exports = app;
