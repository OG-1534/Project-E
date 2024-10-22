// src/controllers/productController.js
/**
 * This module exports functions to handle CRUD operations on products.
 * @module productController
 * @requires ../models/productModel
 */

const Product = require('../models/productModel');
const Brand = require('../models/brandModel');

exports.createProduct = async (req, res) => {
    const { brand_id, product_name, description, price } = req.body;

    try {
      // Check if the brand exists
      const brand = await Brand.findByPk(brand_id);
      if (!brand) {
        return res.status(400).json({ message: 'Brand not found' });
      }
  
      // Proceed with product creation
      const newProduct = await Product.create({
        brand_id,
        product_name,
        description,
        price,
      });
  
      res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: error.message });
    }
  };

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { brand_id, product_name, description, price } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update product details
    product.brand_id = brand_id || product.brand_id;
    product.product_name = product_name || product.product_name;
    product.description = description || product.description;
    product.price = price || product.price;

    await product.save();
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};