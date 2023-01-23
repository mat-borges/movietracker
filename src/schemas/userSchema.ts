import Joi from "joi";

export const signUpSchema = Joi.object({
  name: Joi.string().required().trim().label("name"),
  email: Joi.string().email().required().label("email"),
  password: Joi.string().min(3).max(70).required().label("password"),
});

export const signInSchema = Joi.object({
  email: Joi.string().email().required().label("email"),
  password: Joi.string().min(3).max(70).required().label("senha"),
});
