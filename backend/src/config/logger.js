//src/config/config.js
/**
 * This file defines log data for user actions in the system
 * 
 */
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({ filename: 'logs/user-actions.log' }),  // Logs user actions to a file
  ],
});

module.exports = logger;