import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CustomValidation from "../../utils/customValidation";
import bcrypt from "bcrypt";
import { databaseConfig } from "../../typeorm/config/dbConfig";
import { UserProfile } from "../../typeorm/entity/User";

class AuthController {
  /**
   *
   * @param request firstName, lastName, email, password, username
   * @param response userDetails
   * Flow:
   * validate username or email
   * check if user already exists
   * if not create an accout and send account details in response
   */
  async signup(request: Request, response: Response) {
    try {
      const { firstName, lastName, email, password, username } = request.body;

      const profileRepo = databaseConfig.getRepository(UserProfile);

      const isUserAlreadyExists = await profileRepo.findOne({
        where: { email },
      });

      if (isUserAlreadyExists) {
        return response.status(StatusCodes.BAD_REQUEST).send({
          status: false,
          message: "username or email already exists!",
        });
      }

      // Create a new UserProfile instance and set its properties
      const user = new UserProfile();
      user.firstname = firstName;
      user.lastname = lastName;
      user.email = email;
      user.password = password;
      user.username = username;

      // Save the new user profile to the database
      const userDetails = await profileRepo.save(user);

      // Return the success response with the user details
      return response
        .status(StatusCodes.OK)
        .send({ status: true, data: userDetails });
    } catch (error: Error | any) {
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ status: false, message: error.message });
    }
  }

  /**
   *
   * @param request username, password
   * @param response Jwt token
   * Flow:
   * check if user exist by using username
   * If exist match it's password
   * If password match create JWT token and send in response
   * else throw error
   */
  async login(request: Request, response: Response) {
    try {
      const { username, password } = request.body;

      const user = await databaseConfig.getRepository(UserProfile).findOne({
        where: {
          username,
        },
        select: ["password", "username", "id"],
      });

      if (!user) {
        // If user does not exist, return unauthorized response
        return response
          .status(StatusCodes.UNAUTHORIZED)
          .send({ status: false, message: "User not exits!!" });
      }

      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        //   // If the password is invalid, return unauthorized response
        return response
          .status(StatusCodes.UNAUTHORIZED)
          .send({ status: false, message: "username or password in invalid!" });
      }
      console.log({ user });

      // Generate a JWT token for authentication
      const token = CustomValidation.getJwtToken(user.username, user.id);

      // Return the success response with the token
      return response.status(StatusCodes.OK).send({ status: true, token });
    } catch (error: Error | any) {
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ status: false, message: error.message });
    }
  }
}

const authController = new AuthController();
export = authController;
