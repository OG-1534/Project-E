//src/models/subscriptionModels.js
/**
 * This module defines the Subscription model for the database.
 * It includes fields for subscription ID, user ID, package type, start date, end date, and active status.
 * The model is associated with the 'users' table through a foreign key 'user_id'.
 * The model uses the Sequelize ORM for database operations.
 * @module models/Subscription
 * @requires sequelize
 * @requires config/postgresDb
 */
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/postgresDb');

const Subscription = sequelize.define('Subscription', {
    subscription_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    package_type: {
        type: DataTypes.STRING,  // free, premium, dermatologist_review
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATEONLY
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true,
    tableName: 'user_subscriptions'
});

module.exports = Subscription;