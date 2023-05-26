import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

// Function to hash the password before storing it in the database
const hashPassword = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    let { password } = request.body;
    // Hash the password using bcrypt with a cost factor of 10
    request.body.password = await bcrypt.hash(password, 10);
    next();
  } catch (error: Error | any) {
    // Handle any errors that occur during the password hashing process
    return response
      .status(StatusCodes.BAD_REQUEST)
      .send({ status: false, message: error.message });
  }
};

export { hashPassword };
