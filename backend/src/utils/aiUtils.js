//src/utils/aiUtils.js
/** 
 * This module provides Utility functions for interacting with the AI service
 * */ 

// Import required modules
require('dotenv').config();

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// Function to send an image to the AI service for analysis
const sendAnalysisRequest = async (file) => {
  try {
    // Convert file to FormData to send as a multipart/form-data request
    const formData = new FormData();
    formData.append('file', fs.createReadStream(file.path));
    
    // Send the file to the third-party AI service
    const response = await axios.post('https://third-party-ai-service.com/analyze', formData, {
      headers: {
        ...formData.getHeaders(),  // Required for sending file
        'Authorization': `Bearer ${process.env.AI_API_KEY}` // API key for authentication
      }
    });

    // Return the AI analysis result
    return response.data;
  } catch (error) {
    console.error('Error sending analysis request:', error);
    throw new Error('Failed to analyze skin image');
  }
};

module.exports = sendAnalysisRequest;