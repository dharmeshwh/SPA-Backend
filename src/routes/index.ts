import express from "express";
import authRoutes from "./authentication";
import imageRoutes from "./image";
import { validateRoute } from "../middleware/tokenHandler";
import profileRoutes from "./profile";
const apiRoutes = express.Router();

apiRoutes.use("/auth", authRoutes);

apiRoutes.use("/profile", validateRoute, profileRoutes);

apiRoutes.use("/", validateRoute, imageRoutes);

export = apiRoutes;
