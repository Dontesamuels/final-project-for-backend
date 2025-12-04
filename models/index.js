const Owner = require('./owner');
const Car = require('./car');
const sequelize = require('../database/index');

// Associations
Owner.hasMany(Car, { foreignKey: 'ownerId' });
Car.belongsTo(Owner, { foreignKey: 'ownerId' });

module.exports = { Owner, Car, sequelize };
