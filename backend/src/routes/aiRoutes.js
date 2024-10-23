//src/routes/aiRoutes.js
/** 
 * This module defines the routes for the AI functionality.
 * It imports the necessary controllers and sets up the routes using the Express.js framework.
 */


/**
 * Route for generating a new AI content.
 * HTTP Method: POST
 * Path: /ai/generate
 * Controller: aiController.generateAIContent
 */

const express = require('express');
const multer = require('multer');
const path = require('path');
const { analyzeSkin } = require('../controllers/aiAnalysisController');

const router = express.Router();

// Use multer for handling image uploads
const upload = multer({ dest: path.join(__dirname, '../uploads/') });

/**
 * @swagger
 * tags:
 *   name: AI Analysis
 *   description: AI-based skin analysis functionality
 */

// Route for uploading and analyzing a skin image
/**
 * @swagger
 * /api/ai/analyze-skin:
 *   post:
 *     summary: Upload an image for AI skin analysis
 *     description: This endpoint allows the user to upload an image file for AI-based skin analysis.
 *     tags:
 *       - AI Analysis
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
 *                 description: The image file to analyze.
 *     responses:
 *       200:
 *         description: Image analyzed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Skin analysis successful"
 *                 analysis:
 *                   type: object
 *                   description: AI-generated analysis results.
 *       400:
 *         description: Image upload failed
 *       500:
 *         description: Server error
 */
router.post('/analyze-skin', upload.single('file'), analyzeSkin);

module.exports = router;


module.exports = router;