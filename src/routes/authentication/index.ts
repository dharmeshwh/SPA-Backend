import express from "express";
import authController from "../../controllers/authentication";
import { loginContract, signupContract } from "./contract";
import { validate } from "../../middleware/validater";
import { hashPassword } from "../../middleware/bcrypt";
import passport from "passport";
import { passportService } from "../../configs/passport/passport.service";

const authRoutes = express.Router();

authRoutes.post(
  "/signup",
  validate(signupContract),
  hashPassword, // Hash the password using the bcrypt middleware
  authController.signup
);

authRoutes.post("/login", validate(loginContract), authController.login);

authRoutes.post("/logout", authController.logout);

// Auth
authRoutes.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Auth Callback
authRoutes.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/callback/failure",
  }),
  passportService.handleOauthCallback
);

export = authRoutes;
