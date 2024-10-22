/**
 * This file contains the configuration for the MongoDB database connection.
 * It imports the necessary modules and sets up the MongoDB connection using the provided MONGO_URL environment variable.
 * If the connection is successful, it logs a success message. If there is an error, it logs the error message and exits the process.
 * @module config/mongoDB
 * @requires mongoose
 * @requires dotenv
 * @requires cors
 */
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectMongoDB;