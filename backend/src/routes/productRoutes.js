// src/routes/productRoutes.js
/**
 * This module defines the routes for the product API.
 * It imports the necessary controllers and sets up the routes
 * for creating, retrieving, updating, and deleting products.
 *
 * @module productRoutes
 * @requires express
 * @requires ../controllers/productController
 */

const express = require('express');
const Product = require('../models/productModel');
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const { validateProduct, handleValidationErrors } = require('../validators/productValidator');
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const router = express.Router();

// File upload setup using multer
const upload = multer({ dest: path.join(__dirname, '/uploads') });  // Temporary storage for uploaded files


/*const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});*/

// Create a new product
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Management API
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand_id:
 *                 type: integer
 *                 description: ID of the brand the product belongs to
 *               product_name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
router.post('/products',validateProduct, handleValidationErrors, createProduct);


// Bulk product upload (via CSV file)
/**
 * @swagger
 * /api/products/upload:
 *   post:
 *     summary: Upload multiple products via CSV file
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Products uploaded successfully
 *       500:
 *         description: Server error
 */

// Helper function to split the products array into smaller batches
function chunkArray(array, size) {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
        chunked.push(array.slice(i, i + size));
    }
    return chunked;
}
  
// Helper function to bulk insert products
async function bulkInsertProducts(products) {
    try {
        await Product.bulkCreate(products, { validate: true });
        console.log(`Inserted ${products.length} products.`);
    } catch (error) {
        console.error('Error inserting products:', error.message);
    }
}

// Bulk product upload (via CSV file)
router.post('/products/upload', upload.single('file'), async (req, res) => {
    const products = [];

    try {
        // Parse the uploaded CSV file
        fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => products.push(data))
        .on('end', async () => {
            // Determine how many products are already in the database
            const existingProducts = await Product.count(); // Count existing products

            // Start from the last inserted product
            const startIndex = existingProducts; // Products already in the DB
            
            // Split products into batches of 50
            const batches = chunkArray(products, 50);

            // Process each batch with bulk insert, starting from the last inserted index
            for (let i = startIndex; i < products.length; i++) {
                const batch = [];
                for (let j = 0; j < 50 && i < products.length; j++, i++) {
                    
                    const { brand_id, product_name, description, price } = products[i];
                    
                    batch.push({
                        brand_id: parseInt(brand_id),  // Ensure brand_id is an integer
                        product_name,
                        description,
                        price: parseFloat(price),  // Ensure price is a float
                        });
                    }
                    
                    await bulkInsertProducts(batch);
                }
                
                // Delete the uploaded file after processing
                fs.unlinkSync(req.file.path);

                res.status(200).json({ message: 'Products uploaded successfully', total: products.length });
            });
        
        } catch (error) {
            console.error('Error uploading products:', error);
            res.status(500).json({ message: 'Error uploading products', error: error.message });
        }
    });

// Get all products
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/products', getProducts);

// Get a single product by ID
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get('/products/:id', getProductById);

// Update a product by ID
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand_id:
 *                 type: integer
 *               product_name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.put('/products/:id', validateProduct, handleValidationErrors, updateProduct);

// Delete a product by ID
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete('/products/:id', deleteProduct);

module.exports = router;