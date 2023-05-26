import { Request, Response, NextFunction } from "express";
import { param } from "express-validator";
import { StatusCodes } from "http-status-codes";

// Middleware function to validate request data against a schema
const validate = (schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataToValidate = { ...req.body };
      await schema.validateAsync(dataToValidate);
      next();
    } catch (error: Error | any) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        message: error.message,
      });
    }
  };
};

// Function to generate validation rules for request parameters
const validateParamData = (dataKey: string[]) =>
  dataKey.map((key) => param(key, `${key} is required`).exists());

export { validate, validateParamData };
