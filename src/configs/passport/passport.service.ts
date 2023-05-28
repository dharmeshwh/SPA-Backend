import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CustomValidation from "../../utils/customValidation";

class PassportService {
  handleOauthCallback(request: Request, response: Response) {
    try {
      // Handle OAuth callback and return the result
      return CustomValidation.handleCookies(request, response, true);
    } catch (error: Error | any) {
      // Clear AUTH_COOKIE if an error occurs
      response.clearCookie("AUTH_COOKIE", {
        httpOnly: true,
        signed: true,
        secure: true,
        sameSite: "none",
      });

      // Return an error response with the error message
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ status: false, message: error?.message });
    }
  }
}

// Create an instance of PassportService
export const passportService = new PassportService();
