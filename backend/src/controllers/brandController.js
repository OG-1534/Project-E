// src/controllers/brandController.js
/**
 * This module exports functions to handle CRUD operations on brands.
 * @module brandController
 */

/**
 * Create a new brand.
 * @function createBrand
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The created brand or an error message.
 */

/**
 * Get all brands.
 * @function getBrands
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} - An array of brands or an error message.
 */

/**
 * Get a single brand by ID.
 * @function getBrandById
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The requested brand or an error message.
 */

/**
 * Delete a brand by ID.
 * @function deleteBrand
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - A success message or an error message.
 */

const { Op } = require('sequelize');
const Brand = require('../models/brandModel');

// Create a new brand
exports.createBrand = async (req, res) => {
  const { brand_name, integration_type } = req.body;

  try {
    // Check if the brand already exists
    const existingBrand = await Brand.findOne({ where: { brand_name } });
    if (existingBrand) {
      return res.status(400).json({ message: 'Brand already exists' });
    }

    const newBrand = await Brand.create({
      brand_name,
      integration_type,
    });

    res.status(201).json({ message: 'Brand created successfully', brand: newBrand });
  } catch (error) {
    console.error('Error creating brand:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all brands
exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll();
    res.status(200).json(brands);
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get a single brand by ID
exports.getBrandById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.status(200).json(brand);
  } catch (error) {
    console.error('Error fetching brand:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a brand
exports.deleteBrand = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    await brand.destroy();
    res.status(200).json({ message: 'Brand deleted successfully' });
  } catch (error) {
    console.error('Error deleting brand:', error);
    res.status(500).json({ message: error.message });
  }
};