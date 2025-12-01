import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { responseStatus } from "../helper/response";
import { msg } from "../helper/messages";

export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const toValidate = {
      ...req.body,
      ...req.query,
      ...req.params
    };
    const { error } = schema.validate(toValidate, { abortEarly: false, allowUnknown: true });
    if (error) {
      const details = error.details.map((d) => d.message).join(", ");
      return responseStatus(res, 400, details || msg.server.validation || "Validation failed", null);
    }
    next();
  };
};
