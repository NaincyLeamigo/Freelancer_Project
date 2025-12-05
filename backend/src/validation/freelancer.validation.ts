import * as Joi from "joi";

export const basicInfoSchema = Joi.object({
  fullName: Joi.string().min(2).max(50).required(),

  city: Joi.string().min(2).max(50).required(),
  country: Joi.string().min(2).max(50).required(),

  jobTitle: Joi.string().min(2).max(80).required(),

  oneLineDescription: Joi.string().min(5).max(120).required(),
  description: Joi.string().min(10).max(500).required(),

  phone: Joi.string().allow("").optional(),
  avatar: Joi.string().uri().allow("").optional(),
  username: Joi.string().min(3).max(40).allow("").optional()
});


export const professionalInfoSchema = Joi.object({
  category: Joi.string().min(2).max(50).required(),

  subCategory: Joi.string().allow("").optional(),

  skills: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().min(1).required(),
        level: Joi.string().valid("Beginner", "Intermediate", "Expert").required()
      })
    )
    .min(1)
    .required(),

  languages: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().min(1).required(),
        level: Joi.string().valid("Basic", "Fluent", "Native").required()
      })
    )
    .min(1)
    .required(),

  services: Joi.array().items(Joi.string().min(2)).min(1).required(),

  portfolioLink: Joi.string().uri().allow("").optional()
});

