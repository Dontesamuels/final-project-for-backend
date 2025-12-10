// models/user.js
'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { isEmail: true }
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user'
    }
  }, {
    tableName: 'Users',
    timestamps: true,
    underscored: false
  });

  // Instance helper to validate password
  User.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.passwordHash);
  };

  // Before create/update hook to ensure passwordHash set when using virtual password
  User.beforeCreate(async (user) => {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.passwordHash = await bcrypt.hash(user.password, salt);
    }
  });

  return User;
};
