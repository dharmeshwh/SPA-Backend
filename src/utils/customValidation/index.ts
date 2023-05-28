import Joi from "joi";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import UserModel from "../../modals/User.modal";

class CustomValidationClass {
  passwordValidation(name: string) {
    return Joi.string()
      .required()
      .min(8)
      .max(20)
      .pattern(/[*|;@#%^*+=()_\-&$]/)
      .pattern(/[*^\d+$|]/)
      .messages({
        "string.pattern.base": `${name} should contain at least one number or special character!`,
        "string.min": `${name} length should be greater than 8 characters`,
        "string.max": `${name} length should be less than 20 characters`,
      });
  }

  getJwtToken(username: string, userId: ObjectId) {
    const jwtSecret = process.env.JWT_SECRET || "";
    return jwt.sign({ username, userId }, jwtSecret, {
      expiresIn: 60 * 60 * 12,
    });
  }

  async validateGoogleUser(profile: any) {
    // Check if the user already exists in the database

    const isUserExists = await UserModel.findOne({
      $or: [{ email: profile?.email }, { oauthid: profile?.id }],
    });

    if (isUserExists) {
      // Return the existing user profile
      return isUserExists;
    }

    // Create a new user profile
    const newUser = new UserModel();
    newUser.firstname = profile?.given_name;
    newUser.lastname = profile?.family_name;
    newUser.email = profile?.email;
    newUser.username = profile?.displayName;
    newUser.oauthid = profile?.id;

    // Save the new user profile in the database
    const savedUser = await newUser.save();

    // Return the saved user profile
    return savedUser;
  }

  handleCookies(request: Request, response: Response, isGoogleOauth = false) {
    try {
      const { user } = request.body;

      // Generate a JWT token for authentication
      const authToken = CustomValidation.getJwtToken(user?.username, user?._id);

      // Set the authentication cookie in the response
      response.cookie("AUTH_COOKIE", String(authToken), {
        httpOnly: true,
        signed: true,
        secure: true,
        sameSite: "none",
      });

      if (isGoogleOauth) {
        // Redirect to the home page for Google OAuth
        return response.redirect(String(process.env.UI_BASE_URL));
      }

      // Send a success response with status true
      return response.status(StatusCodes.OK).send({ status: true });
    } catch (error: Error | any) {
      // Throw any errors that occur during the process
      throw error;
    }
  }
}

const CustomValidation = new CustomValidationClass();
export default CustomValidation;
