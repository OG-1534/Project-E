// src/routes/userRoutes.js

const express = require('express');
const { getUserProfile, updateUserProfile, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Profile API
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get the current user's profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profile retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/me', authMiddleware, getUserProfile);

/**
 * @swagger
 * /api/users/me:
 *   put:
 *     summary: Update the current user's profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profile updated
 *       401:
 *         description: Unauthorized
 */
router.put('/me', authMiddleware, updateUserProfile);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;