// src/models/productModel.js
/**
 * This module defines the Product model for the database.
 * @module productModel
 * @requires sequelize
 * @requires Model
 * @requires DataTypes
 * @requires postgresDb
 */
const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../config/postgresDb');

class Product extends Model {}

Product.init({
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  brand_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'brands',
      key: 'brand_id'
    },
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
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
  modelName: 'Product',
  tableName: 'products',
  timestamps: true,
});

module.exports = Product;