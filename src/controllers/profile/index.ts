import { Request, Response } from "express";
import { databaseConfig } from "../../typeorm/config/dbConfig";
import { UserProfile } from "../../typeorm/entity/User";
import { StatusCodes } from "http-status-codes";
import { IVerifyTokenResponse } from "../../utils/constant";

class ProfileController {
  async getUserDetails(request: Request, response: Response) {
    try {
      // Retrieving the userId and username from the request, which were saved during the validation process in the validateRoute middleware.
      const { username } = request[`user`] as IVerifyTokenResponse;

      // Retrieve the user details from the database based on the user ID and username
      const userDetails = await databaseConfig
        .getRepository(UserProfile)
        .findOne({
          where: {
            username,
          },
        });

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
}

export const profileController = new ProfileController();
