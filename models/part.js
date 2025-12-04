// models/part.js
const { Model, DataTypes } = require('sequelize');

class Part extends Model {
  static initModel(sequelize){
    Part.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      serialNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
      carId: { type: DataTypes.INTEGER, allowNull: false }
    }, { sequelize, modelName: 'Part' });
    return Part;
  }
}

module.exports = Part;
