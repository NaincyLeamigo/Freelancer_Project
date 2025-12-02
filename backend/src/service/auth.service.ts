import { AuthRepo } from "../repository/auth.repository";
import { Hash } from "../utils/password.util";
import { TokenUtil } from "../utils/jwt.util";
import { responseStatus } from "../helper/response";
import { jwtSignIN } from "../config/config";
import { sendMail } from "./mail.service";

export const AuthService = {
  //done
  async signup({ email, password, role }: { email: string; password: string; role: "freelancer" | "hirer"}) {
    const existing = await AuthRepo.findUserByEmail(email);
    if (existing) {
      throw new Error("Email already registered");
    }

    const hashed = await Hash.hashPassword(password);
    let profileDocId = null;
    if (role === "freelancer") {
      const p = await AuthRepo.createFreelancerProfile({});
      profileDocId = p._id;
      }else {
          const h = await AuthRepo.createHirer({});
          profileDocId = h._id;
      }

    const user = await AuthRepo.createUser({
      email,
      password: hashed,
      role,
      profileRef: profileDocId,
      isVerified: false,
    });

    // create verification token
    const verifyToken = TokenUtil.generateAccessToken({ sub: user._id, action: "verify_email" });

    // Send verification email (production)
    const link = `${process.env.FRONTEND_URL || "http://localhost:3000"}/verify-email?token=${encodeURIComponent(verifyToken)}`;
    const sent = await sendMail(
    email,
    "Verify your email",
    `<p>Hello,</p><p>Please verify your email by clicking the link below:</p><p><a href="${link}">${link}</a></p>`
    );
    // (Optional) store verification token somewhere or send via email
    // We'll return token to controller for now (controller can call sendEmail)
    return {
      user,
      verifyToken: sent ? null : verifyToken, // if mail sent we don't return token; for dev we return token only if mail fails
    };
  },

  // done
  async signin({ email, password }: { email: string; password: string }) {
    const user = await AuthRepo.findUserByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const ok = await Hash.compare(password, user.password);
    if (!ok) throw new Error("Invalid credentials");

    if (!user.isVerified) {
      throw new Error("Email not verified");
    }

    const accessToken = TokenUtil.generateAccessToken({ sub: user._id, role: user.role });
    const refreshToken = TokenUtil.generateRefreshToken({ sub: user._id });

    await AuthRepo.setRefreshToken(user._id.toString(), refreshToken);

    return {
      user,
      accessToken,
      refreshToken
    };
  },

  // done
  async refresh({ refreshToken }: { refreshToken: string }) {
    try {
      const payload: any = TokenUtil.verifyRefreshToken(refreshToken);
      const userId = payload.sub;

      const user = await AuthRepo.findUserById(userId);
      if (!user) throw new Error("User not found");

      if (!user.refreshTokens?.includes(refreshToken)) {
        throw new Error("Token not recognized");
      }

      const newAccessToken = TokenUtil.generateAccessToken({ sub: user._id, role: user.role });
      const newRefreshToken = TokenUtil.generateRefreshToken({ sub: user._id });

      await AuthRepo.removeRefreshToken(userId, refreshToken);
      await AuthRepo.setRefreshToken(userId, newRefreshToken);

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (err) {
      throw new Error("Invalid or expired refresh token");
    }
  },

  // done
  async logout({ userId, refreshToken }: { userId: string; refreshToken: string }) {
    await AuthRepo.removeRefreshToken(userId, refreshToken);
    return { ok: true };
  },

  //done
  async verifyEmail(token: string) {
    try {
      const payload: any = TokenUtil.verifyAccessToken(token);
      if (!payload || payload.action !== "verify_email") {
        throw new Error("Invalid verification token");
      }
      const userId = payload.sub;
      const user = await AuthRepo.findUserById(userId);
      if (!user) throw new Error("User not found");
      if (user.isVerified) throw new Error("Email already verified");
      
      await AuthRepo.markUserVerified(userId);
      return true;
    } catch (err) {
      throw new Error("Invalid or expired verification token");
    }
  },

  // done
  async forgotPassword(email: string) {
    const user = await AuthRepo.findUserByEmail(email);
    if (!user) {
      // ⚠️ Still return success to prevent email enumeration
      return true;
    }

    // Generate password reset token (JWT, 1 hour expiry)
    const resetToken = TokenUtil.generateAccessToken(
      { sub: user._id, action: "reset_password" },
      "1h"
    );

    const resetLink = `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset-password?token=${encodeURIComponent(resetToken)}`;

    await sendMail(
      email,
      "Reset your password",
      `<p>You requested a password reset.</p><p><a href="${resetLink}">Click here to reset</a></p><p>Link expires in 1 hour.</p>`
    );

    return true;
  },

  async resetPassword(token: string, newPassword: string) {
    try {
      const payload: any = TokenUtil.verifyAccessToken(token);
      if (!payload || payload.action !== "reset_password") {
        throw new Error("Invalid reset token");
      }

      const userId = payload.sub;
      const hashed = await Hash.hashPassword(newPassword);

      await AuthRepo.updateUserPassword(userId, hashed);
      return true;
    } catch (err) {
      throw new Error("Invalid or expired reset token");
    }
  }
};
