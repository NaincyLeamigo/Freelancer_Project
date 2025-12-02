import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";
import { responseStatus } from "../helper/response";
import { msg } from "../helper/messages";


export const AuthController = {
  // done
  async signup(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;
      const result = await AuthService.signup({ email, password, role });

      // send verification link via email (you should implement sendEmail)
      // For now return verifyToken in body (in prod, email it and do NOT return)
      // TODO: call your mailer to send verification link
      return responseStatus(res, 201, msg.common.success || "User created", {
        userId: result.user._id,
       ...(process.env.ENV === "dev" && { emailVerificationToken: result.verifyToken })
      });
    } catch (err: any) {
      const message = err.message || "Signup failed";
      return responseStatus(res, 400, message, null);
    }
  },

  // done
  async signin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await AuthService.signin({ email, password });

      // set cookie for access token (optional) — HttpOnly cookie example
      res.cookie("token", accessToken, {
        httpOnly: true,
        // secure: true, // enable in production (HTTPS)
        maxAge: 1000 * 60 * 60 * 24 * 2
      });

      // Return tokens in body as well (or only refresh token)
      return responseStatus(res, 200, msg.common.success || "Logged in", {
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          profileRef: user.profileRef
        },
        tokens: {
          accessToken,
          refreshToken
        }
      });
    } catch (err: any) {
      return responseStatus(res, 401, err.message || "Signin failed", null);
    }
  },

  // done
  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return responseStatus(res, 400, "Refresh token required", null);
      }
      const data = await AuthService.refresh({ refreshToken });
      return responseStatus(res, 200, "Tokens refreshed", data);
    } catch (err: any) {
      return responseStatus(res, 401, err.message || "Invalid token", null);
    }
  },

  // done
  async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      // get user from auth middleware if available
      const userId = (req as any).user?.payload?.sub ?? req.body.userId;
      if (!userId || !refreshToken) {
        return responseStatus(res, 400, msg.server.requiredField || "Missing fields", null);
      }
      await AuthService.logout({ userId, refreshToken });
      // clear cookie
      res.clearCookie("token");
      return responseStatus(res, 200, msg.common.success || "Logged out", null);
    } catch (err: any) {
      return responseStatus(res, 500, err.message, null);
    }
  },

  // done
  async verifyEmail(req: Request, res: Response) {
    try {
      const token = req.query.token as string || req.body.token;
      if (!token) return responseStatus(res, 400, msg.server.requiredField || "Missing token", null);
      await AuthService.verifyEmail(token);
      return responseStatus(res, 200, msg.common.success || "Email verified", null);
    } catch (err: any) {
      return responseStatus(res, 400, err.message || "Verification failed", null);
    }
  },

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      await AuthService.forgotPassword(email);
      // ✅ Always return success (security best practice)
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
  }
};
