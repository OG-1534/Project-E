//src/middlewares/authMiddleware.js
/**
 * This file contains the authentication middleware for the API.
 * It verifies the JWT token provided in the request header and adds the user information to the request object.
 * If the token is valid, the request is allowed to proceed to the next middleware or route handler.
 * If the token is invalid or not provided, an appropriate error message is returned.
 * @module middlewares/authMiddleware
 * @requires jsonwebtoken
 * @requires dotenv
 * @exports authMiddleware
 */
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user info to request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;