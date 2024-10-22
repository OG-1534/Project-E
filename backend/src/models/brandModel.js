// src/models/brandModel.js
/**
 * This module defines the Brand model using Sequelize.
 * @module brandModel
 * @requires sequelize
 * @requires ../config/postgresDb
 */
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/postgresDb');

class Brand extends Model {}

Brand.init({
  brand_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  brand_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  integration_type: {
    type: DataTypes.STRING,
    allowNull: false,
},
created_at: {
  type: DataTypes.DATE,
  defaultValue: DataTypes.NOW,
},
updated_at: {
  type: DataTypes.DATE,
  defaultValue: DataTypes.NOW,
},
}, {
sequelize,
modelName: 'Brand',
tableName: 'brands',
timestamps: true,
createdAt: 'created_at',
updatedAt: 'updated_at',
});

module.exports = Brand;