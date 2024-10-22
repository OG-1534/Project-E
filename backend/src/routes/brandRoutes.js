// src/routes/brandRoutes.js
/**
 * This module defines the routes for managing brands.
 * @module routes/brandRoutes
 * @requires express
 * @requires ../controllers/brandController
*/

const express = require('express');
const { createBrand, getBrands, getBrandById, deleteBrand } = require('../controllers/brandController');
const router = express.Router();

// Create a new brand
/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Brand Management API
 */

/**
 * @swagger
 * /api/brands:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand_name:
 *                 type: string
 *               integration_type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Brand created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 brand:
 *                   $ref: '#/components/schemas/Brand'
 */
router.post('/brands', createBrand);

// Get all brands
/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: List of all brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 */
router.get('/brands', getBrands);

// Get a brand by ID
/**
 * @swagger
 * /api/brands/{id}:
 *   get:
 *     summary: Get a brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The brand ID
 *     responses:
 *       200:
 *         description: Brand retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Brand not found
 */
router.get('/brands/:id', getBrandById);

// Delete a brand by ID
/**
 * @swagger
 * /api/brands/{id}:
 *   delete:
 *     summary: Delete a brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The brand ID
 *     responses:
 *       200:
 *         description: Brand deleted successfully
 *       404:
 *         description: Brand not found
 */
router.delete('/brands/:id', deleteBrand);

module.exports = router;