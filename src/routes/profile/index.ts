import express from "express";
import { profileConroller } from "../../controllers/profile";

const profileRoutes = express.Router();

profileRoutes.get("/user-details", profileConroller.getUserDetails);

export = profileRoutes;
