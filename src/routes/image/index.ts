import express from "express";
import imageController from "../../controllers/image";

const imageRoutes = express.Router();

imageRoutes.get("/daily-image", imageController.getDailyImage);

export = imageRoutes;
