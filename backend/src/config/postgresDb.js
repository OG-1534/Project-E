/**
 * This file contains the configuratiion for PostgreSQL databse connection.
 * It imports the necessary modules and sets up the connection using Sequelize.
 * The connection is established using the POSTGRES_URL environment variable
 * and enables SSL connection for secure communication.
 * sequelize.authenticate() is used to test the connection.
 * @module config/postgresDB
 * @requires sequelize
 * @requires dotenv
 * @requires cors
 */

const dotenv = require('dotenv');
const cors = require('cors');
const { Sequelize } = require('sequelize');


// Load environment variables
dotenv.config();

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
      ssl: {
          require: true,
          rejectUnauthorized: false // This is necessary for most RDS instances
      }
  }
});

const connectPostgresDB = async () => {
  try {
      await sequelize.authenticate();
      console.log('PostgreSQL connected successfully');
  } catch (error) {
      console.error('Unable to connect to PostgreSQL:', error);
      process.exit(1);
  }
};

module.exports = { sequelize, connectPostgresDB };