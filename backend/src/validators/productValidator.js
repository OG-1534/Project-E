// src/validators/productValidator.js
/**
 * This module exports validation rules and a middleware function for handling validation errors.
 * The validation rules are defined using the express-validator library.
 * The `validateProduct` array contains validation rules for the `product_name`, `brand_id`, `price`, and `description` fields.
 * The `handleValidationErrors` middleware function checks if there are any validation errors and returns a 400 Bad Request response with the error messages if any. Otherwise, it proceeds to the next middleware.
 * 
 * @module validators/productValidator
 * @requires express-validator
 */

const { body, validationResult } = require('express-validator');

// Validation rules for creating and updating a product
exports.validateProduct = [
  body('product_name')
    .notEmpty().withMessage('Product name is required')
    .isLength({ max: 255 }).withMessage('Product name cannot exceed 255 characters'),
  
  body('brand_id')
    .notEmpty().withMessage('Brand ID is required')
    .isInt().withMessage('Brand ID must be an integer'),
  
  body('price')
    .notEmpty().withMessage('Price is required')
    .isDecimal().withMessage('Price must be a decimal number'),
  
  body('description')
    .optional()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
];

// Middleware to handle validation errors
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();  // Proceed to the next middleware if no errors
};