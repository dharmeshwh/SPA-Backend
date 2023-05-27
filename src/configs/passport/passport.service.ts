import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CustomValidation from "../../utils/customValidation";

class PassportService {
  handleOauthCookies(request: Request, response: Response) {
    try {
      const { user } = request.body;
      const authToken = CustomValidation.getJwtToken(user?.username, user?.id);
      response.cookie("AUTH_COOKIE", authToken, {
        httpOnly: true,
        signed: true,
        secure: true,
        sameSite: "none",
      });
      response.redirect("/daily-image");
      return response.status(StatusCodes.ACCEPTED).send({ status: true });
    } catch (error: Error | any) {
      throw error;
    }
  }
}

export const passportService = new PassportService();
