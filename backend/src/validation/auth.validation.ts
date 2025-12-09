import * as Joi from "joi";

export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required(),
  role: Joi.string().valid("freelancer", "hirer").required(),
  name: Joi.string().min(2).max(50).optional(),
});

export const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});


export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required()
});

export const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string().min(8).max(128).required()
});