import express from "express";
import imageController from "../../controllers/image";

// Create an instance of Express Router
const imageRoutes = express.Router();

// Route for fetching the daily image
imageRoutes.get("/daily-image", imageController.getDailyImage);

// Export the imageRoutes
export = imageRoutes;
