//src//models/aiAnalysisModel.js
/**
 * This module defines the schema for storing AI analysis results
 * in a MongoDB database using Mongoose.
 * 
 * @module models/aiAnalysisModel
 * @requires mongoose
 */
const mongoose = require('mongoose');

// Schema for storing AI analysis results
const SkinAnalysisResultSchema = new mongoose.Schema({
  user_id: { type: String, required: true },   // Reference to the user
  skin_type: { type: String, required: true }, // AI detected skin type
  concerns: [String],                          // Array of skin concerns
  image_url: { type: String },                 // URL of the analyzed image
  ai_generated_report: { type: String },       // AI generated report or details
  analysis_date: { type: Date, default: Date.now } // When the analysis was done
});

module.exports = mongoose.model('SkinAnalysisResult', SkinAnalysisResultSchema);