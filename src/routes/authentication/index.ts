import express from "express";
import authController from "../../controllers/authentication";
import { loginContract, signupContract } from "./contract";
import { validate } from "../../middleware/validater";
import { hashPassword } from "../../middleware/bcrypt";
import passport from "passport";
import { passportService } from "../../configs/passport/passport.service";

// Create an instance of Express Router
const authRoutes = express.Router();

// Route for user signup
authRoutes.post(
  "/signup",
  validate(signupContract),
  hashPassword, // Hash the password using the bcrypt middleware
  authController.signup
);

// Route for user login
authRoutes.post("/login", validate(loginContract), authController.login);

// Route for user logout
authRoutes.post("/logout", authController.logout);

// Route for initiating Google OAuth
authRoutes.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Route for Google OAuth callback
authRoutes.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/callback/failure",
  }),
  passportService.handleOauthCallback
);

// Export the authRoutes
export = authRoutes;
