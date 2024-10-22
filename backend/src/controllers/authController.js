const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
require('dotenv').config();

// Register a new user
exports.register = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password_hash: hashedPassword,
      first_name,
      last_name,
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      
      // Send validation error messages to the client
      return res.status(400).json({
        errors: error.errors.map(err => err.message),
      });
    }
    res.status(500).json({ message: error.message });
  }
};
  
// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Update lastLogin field to current time
    user.lastLogin = new Date();
    await user.save();
    logger.info(`User ${user.email} logged in at ${user.lastLogin}`);

    const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};