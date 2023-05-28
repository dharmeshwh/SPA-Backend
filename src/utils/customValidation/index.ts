import Joi from "joi";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { databaseConfig } from "../../typeorm/config/dbConfig";
import { UserProfile } from "../../typeorm/entity/User";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

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
    const userRepo = databaseConfig.getRepository(UserProfile);
    const isUserExists = await userRepo.findOne({
      where: {
        id: profile?.id,
      },
    });

    if (isUserExists) {
      return isUserExists;
    }
    const newUser = new UserProfile();
    newUser.firstname = profile?.given_name;
    newUser.lastname = profile?.family_name;
    newUser.email = profile?.email;
    newUser.username = profile?.displayName;
    newUser.id = profile?.id;
    const savedUser = await userRepo.save(newUser);
    return savedUser;
  }

  handleCookies(request: Request, response: Response, isGoogleOauth = false) {
    try {
      const { user } = request.body;

      const authToken = CustomValidation.getJwtToken(user?.username, user?.id);

      response.cookie("AUTH_COOKIE", String(authToken), {
        httpOnly: true,
        signed: true,
        secure: true,
        sameSite: "none",
      });
      if (isGoogleOauth) {
        return response.redirect("http://localhost:3000/");
      }
      return response.status(StatusCodes.OK).send({ status: true });
    } catch (error: Error | any) {
      throw error;
    }
  }
}

const CustomValidation = new CustomValidationClass();
export default CustomValidation;
