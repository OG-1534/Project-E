//src/models/paymentModel.js
/**
 * This module defines the payment model. 
 */
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/postgresDb');

const Payment = sequelize.define('Payment', {
    payment_id: {
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
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    payment_status: {
        type: DataTypes.ENUM('pending', 'successful', 'failed'),
        defaultValue: 'pending'
    },
    reference: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dermatologist_share: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true  // Set after payment verification
    },
    afrigem_share: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true  // Set after payment verification
    },
}, {
    timestamps: true,
    tableName: 'payments'
});

module.exports = Payment;