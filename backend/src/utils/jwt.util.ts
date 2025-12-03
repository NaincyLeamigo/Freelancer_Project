import * as jwt from "jsonwebtoken";
import { jwtSignIN } from "../config/config";


export const TokenUtil = {
  // done
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

  // done
  verifyAccessToken(token: string) {
    return jwt.verify(token, jwtSignIN.secret as string);
  },

  // done
  generateRefreshToken(payload: object) {
    return jwt.sign(
      payload,
      jwtSignIN.secret as string,
      {
        expiresIn: jwtSignIN.refreshTokenExpiredTime || "30d",
      } as jwt.SignOptions
    );
},
 // done
  verifyRefreshToken(token: string) {
    return jwt.verify(token, jwtSignIN.secret as string);
  }

};