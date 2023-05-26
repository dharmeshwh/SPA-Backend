import express from "express";
import authController from "../../controllers/authentication";
import { loginContract, signupContract } from "./contract";
import { validate } from "../../middleware/validater";
import { hashPassword } from "../../middleware/bcrypt";

const authRoutes = express.Router();

authRoutes.post(
  "/signup",
  validate(signupContract),
  hashPassword, // Hash the password using the bcrypt middleware
  authController.signup
);

authRoutes.post("/login", validate(loginContract), authController.login);

export = authRoutes;
