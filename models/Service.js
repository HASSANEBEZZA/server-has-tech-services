const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Service = sequelize.define('Service', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
  },
});

module.exports = Service;
