import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { responseStatus } from "../helper/response";
import { msg } from "../helper/messages";
import { jwtSignIN } from "../config/config";

export const checkJwtToken = async (req: Request & { user: any }, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return responseStatus(res, 403, msg.token.tokenNotFound, null);
    }
    const decoded = jwt.verify(token, jwtSignIN.secret);
    if (!decoded) {
      return responseStatus(res, 401, msg.token.invalid, null);
    }

    req.user = { payload: decoded };
    next();
  } catch (error: any) {
    console.log("Error in checkJwtToken::", error);
    return responseStatus(res, 500, error.message, error);
  }
};
