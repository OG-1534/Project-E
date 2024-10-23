//src/controllers/aiAnalysisController.js
/**
 * This module defines the controller for handling skin analysis requests.
 * It imports the necessary functions and models, and defines the `analyzeSkin` function.
 * The `analyzeSkin` function extracts the user ID and uploaded image file from the request,
 * calls the external AI service for skin analysis, stores the analysis result in MongoDB,
 * and returns the result to the client.
 * 
 * @module aiAnalysisController
 * @requires ../utils/aiUtils
 * @requires ../models/aiAnalysisModel
 * @exports analyzeSkin
 * @function
 * @param {Object} req - The HTTP request object
 * @param {string} req.body.userId - The ID of the user performing the analysis
 * @param {Object} req.file - The uploaded image file
 * @param {Object} res - The HTTP response object
 * @returns {Object} The HTTP response with the analysis result or an error message
 */

const sendAnalysisRequest = require('../utils/aiUtils');
const SkinAnalysisResult = require('../models/aiAnalysisModel');

// Controller for handling skin analysis requests
exports.analyzeSkin = async (req, res) => {
  const { userId } = req.body;  // The user performing the analysis
  const { file } = req;         // Image file uploaded by the user
  
  try {
    // Call external AI service for skin analysis
    const analysisResult = await sendAnalysisRequest(file);

    // Store the AI analysis result in MongoDB
    const analysisRecord = await SkinAnalysisResult.create({
      user_id: userId,
      skin_type: analysisResult.skin_type,
      concerns: analysisResult.concerns,
      image_url: analysisResult.image_url,
      ai_generated_report: analysisResult.report
    });

    // Return analysis result to the client
    return res.status(200).json({
      message: "Skin analysis complete",
      result: analysisRecord
    });
  } catch (error) {
    console.error("Error analyzing skin:", error);
    res.status(500).json({ message: "Skin analysis failed", error });
  }
};