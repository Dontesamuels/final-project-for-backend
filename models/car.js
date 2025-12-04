const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Car = sequelize.define('Car', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  make: { type: DataTypes.STRING, allowNull: false },
  model: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false },
  ownerId: { type: DataTypes.INTEGER, allowNull: false } // ONLY ONE FK
});

module.exports = Car;
