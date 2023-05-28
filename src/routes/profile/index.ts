import express from "express";
import { profileController } from "../../controllers/profile";

// Create an instance of Express Router
const profileRoutes = express.Router();

// Route for fetching user details
profileRoutes.get("/user-details", profileController.getUserDetails);

// Export the profileRoutes
export = profileRoutes;
