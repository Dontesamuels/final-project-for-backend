const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Owner = sequelize.define('Owner', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Owner;
