import * as jwt from "jsonwebtoken";
import { jwtSignIN } from "../config/config";


export const TokenUtil = {

  generateAccessToken(payload: object, expiresIn?: string) {
    // console.log("JWT SECRET =>", jwtSignIN.secret);
    return jwt.sign(
      payload,
      jwtSignIN.secret as string,
      {
        expiresIn: expiresIn || jwtSignIN.tokenExpiredTime || "2d",
      } as jwt.SignOptions
    );
  },


  verifyAccessToken(token: string) {
    return jwt.verify(token, jwtSignIN.secret as string);
  },

  generateRefreshToken(payload: object) {
    return jwt.sign(
      payload,
      jwtSignIN.secret as string,
      {
        expiresIn: jwtSignIN.refreshTokenExpiredTime || "7d",
      } as jwt.SignOptions
    );
  },

  verifyRefreshToken(token: string) {
    return jwt.verify(token, jwtSignIN.secret as string);
  }

};