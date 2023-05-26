import express from "express";
import authRoutes from "./authentication";
import imageRoutes from "./image";
const apiRoutes = express.Router();

apiRoutes.use("/authentication", authRoutes);

apiRoutes.use("/", imageRoutes);

export = apiRoutes;
