//src/models/userModel.js
/**
 * This file defines model of a user for the application
 * @module userModel
 * @requires sequelize
 * @requires postgresDb
 * @requires DataTypes
 * @requires Model
 * @exports User
 * @example
 * const User = require('./userModel');
 * const user = await User.create({ email: 'example@example.com', password: 'password', role: 'consumer' });
 * console.log(user.email); // 'example@example.com'
 * console.log(user.password); // 'password'
 * console.log(user.role); // [['consumer', 'dermatologist', 'brand_admin', 'admin']],
 * user.password = 'XXXXXXXXXXX';
 * await user.save();
 * console.log(user.password); // 'newpassword'
 */
const {sequelize} = require('../config/postgresDb');
const { Model, DataTypes } = require('sequelize');

class User extends Model {}

User.init({
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Must be a valid email address',
      },
      notNull: {
        msg: 'Email is required',
      },
    },
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8],
        msg: 'Password must be at least 8 characters long',
      },
      notNull: {
        msg: 'Password is required',
      },
    },
  },
  first_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
});

module.exports = User;