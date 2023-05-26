import Joi from "joi";
import CustomValidation from "../../utils/customValidation";

// Contract for validating login request
const loginContract = Joi.object({
  password: Joi.string().required(),
  username: Joi.string().required(),
});

// Contract for validating signup request
const signupContract = Joi.object({
  username: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().required(),
  password: CustomValidation.passwordValidation("Password"),
});

export { loginContract, signupContract };
