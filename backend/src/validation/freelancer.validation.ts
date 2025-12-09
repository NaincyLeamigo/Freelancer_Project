import * as Joi from "joi";

export const basicInfoSchema = Joi.object({
  fullName: Joi.string().min(2).max(50).required(),
  city: Joi.string().min(2).max(50).required(),
  country: Joi.string().min(2).max(50).required(),
  jobTitle: Joi.string().min(2).max(80).required(),
  oneLineDescription: Joi.string().min(5).max(120).required(),
  description: Joi.string().min(10).max(500).required(),
  phone: Joi.string().pattern(/^[0-9+\-() ]{0,25}$/).allow("").optional(),
  avatar: Joi.string().uri().allow("").optional(),
});
