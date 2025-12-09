import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";
import { responseStatus } from "../helper/response";
import { msg } from "../helper/messages";
import { TokenUtil } from "../utils/jwt.util";


export const AuthController = {

  async signup(req: Request, res: Response) {
    try {
      const { email, password, role, name } = req.body;
      const result = await AuthService.signup({ email, password, role, name });
      return responseStatus(res, 201, msg.auth.signup_success || "User created", result);
    } catch (err: any) {
      const message = err.message || "Signup failed";
      return responseStatus(res, 400, message, null);
    }
  },

  async signin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await AuthService.signin({ email, password });

      // set cookie for access token (optional) — HttpOnly cookie example
      res.cookie("token", accessToken, {
        httpOnly: true,
        // secure: false,
        secure: process.env.ENV === "prod",
        sameSite: "lax", 
        maxAge: 1000 * 60 * 60 * 24 * 2,
        path: "/",
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        // secure: false,
        secure: process.env.ENV === "prod",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      return responseStatus(res, 200, msg.auth.login_success || "Logged in", {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profileRef: user.profileRef
        }
      });
    } catch (err: any) {
      return responseStatus(res, 401, err.message || "Signin failed", null);
    }
  },

  async refreshToken(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return responseStatus(res, 400, "Refresh token missing", null);
      }
      const data = await AuthService.refresh({ refreshToken });
      return responseStatus(res, 200, "Tokens refreshed", data);
    } catch (err: any) {
      return responseStatus(res, 401, err.message || "Invalid token", null);
    }
  },

  async logout(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return responseStatus(res, 400, "Refresh token missing", null);
      }

      let payload;
      try {
        payload = TokenUtil.verifyRefreshToken(refreshToken);
      } catch (err) {
        return responseStatus(res, 401, "Invalid or expired refresh token", null);
      }

      const userId = payload.sub;
      await AuthService.logout({ userId, refreshToken });

      res.clearCookie("token", { path: "/" });
      res.clearCookie("refreshToken", { path: "/" });

      return responseStatus(res, 200, "Logged out", null);
    } catch (err: any) {
      return responseStatus(res, 500, err.message, null);
    }
  },

  async verifyOtp(req : Request, res : Response) {
    try {
      const { email, otp } = req.body;
      const result = await AuthService.verifyOtp(email, otp);

      return responseStatus(res, 200, "Email verified successfully", result);
    } catch (err) {
      return responseStatus(res, 400, err.message, null);
    }
  },

  async resendOtp(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const result = await AuthService.resendOtp(email);
      return responseStatus(res, 200, "New OTP sent successfully", result);
    } catch (err: any) {
      return responseStatus(res, 400, err.message, null);
    }
  },


  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      await AuthService.forgotPassword(email);
      return responseStatus(res, 200, "If email exists, reset link has been sent", null);
    } catch (err: any) {
      return responseStatus(res, 500, "Request failed", null);
    }
  },

  async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body;
      await AuthService.resetPassword(token, newPassword);
      return responseStatus(res, 200, "Password reset successfully", null);
    } catch (err: any) {
      return responseStatus(res, 400, err.message, null);
    }
  },

  async me(req: Request & { user?: any }, res: Response) {
  try {
    const userId = req.user?.payload?.sub;
    if (!userId) {
      return responseStatus(res, 401, "Unauthorized", null);
    }

    const user = await AuthService.me(userId);
    if (!user) {
      return responseStatus(res, 404, "User not found", null);
    }

    return responseStatus(res, 200, "User fetched successfully", {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        profileRef: user.profileRef,
      },
    });
  } catch (err: any) {
    return responseStatus(res, 500, err.message || "Failed to fetch user", null);
  }
},

};
