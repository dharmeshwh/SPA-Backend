import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { IVerifyTokenResponse } from "../../utils/constant";

// Function to verify the JWT token and return the decoded data
const verifyToken = async (token): Promise<IVerifyTokenResponse | null> => {
  return new Promise((resolve, reject) => {
    if (!process.env.JWT_SECRET) {
      throw new Error(`No JWT_SECRET exists`);
    }
    // Verify the token using the JWT_SECRET
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Middleware function to validate the route based on the JWT token
const validateRoute = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    // Get the JWT token from the request header
    const authCookie = request.signedCookies[`AUTH_COOKIE`];

    // Verify the token and get the user credentials
    const userCreds = await verifyToken(authCookie);

    // Assign the user credentials to the `request.user` object
    request[`user`] = {
      userId: userCreds?.userId,
      username: userCreds?.userName,
    };

    next();
  } catch (error: Error | any) {
    // Handle any errors that occur during token verification
    return response
      .status(StatusCodes.UNAUTHORIZED)
      .send({ status: false, message: error.message });
  }
};

export { validateRoute };
