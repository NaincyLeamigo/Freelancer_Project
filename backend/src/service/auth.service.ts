import { AuthRepo } from "../repository/auth.repository";
import { Hash } from "../utils/password.util";
import { TokenUtil } from "../utils/jwt.util";
import { responseStatus } from "../helper/response";
import { jwtSignIN } from "../config/config";
import { sendMail } from "./mail.service";
import { otpTemplate } from "../templates/otp.template";
import { verifyAccountTemplate } from "../templates/verifyaccount.template";
import mongoose from "mongoose";

export const AuthService = {

  async signup({ email, password, role , name }: { email: string; password: string; role: "freelancer" | "hirer"; name : string}) {
    const existing = await AuthRepo.findUserByEmail(email);
    if (existing) {
      throw new Error("Email already registered");
    }

    const hashed = await Hash.hashPassword(password);
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); 
    const user = await AuthRepo.createUser({
      email,
      password: hashed,
      role,
      name,
      isVerified: false,
      emailVerificationOTP: otp,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
    });
    let profileDocId: mongoose.Types.ObjectId;

    if (role === "freelancer") {
      const profile = await AuthRepo.createFreelancerProfile({ userId: user._id });
      profileDocId = profile._id;
    } else {
      const profile = await AuthRepo.createHirer({ userId: user._id });
      profileDocId = profile._id;
    }

    user.profileRef = profileDocId;
    await user.save();

      await sendMail(
      email,
      "Verify Your SkyOffice Account",
      verifyAccountTemplate(otp)
    );
      return {
        user
      };
    },

  async signin({ email, password }: { email: string; password: string }) {
    const user = await AuthRepo.findUserByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const ok = await Hash.compare(password, user.password);
    if (!ok) throw new Error("Invalid credentials");

    if (!user.isVerified) {
      throw new Error("Email not verified");
    }

    await AuthRepo.clearAllRefreshTokens(user._id.toString());
    const accessToken = TokenUtil.generateAccessToken({ sub: user._id, role: user.role });
    const refreshToken = TokenUtil.generateRefreshToken({ sub: user._id });
    await AuthRepo.setRefreshToken(user._id.toString(), refreshToken);

    return {
      user,
      accessToken,
      refreshToken
    };
  },

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

  async logout({ userId, refreshToken }: { userId: string; refreshToken: string }) {
    await AuthRepo.removeRefreshToken(userId, refreshToken);
    return { ok: true };
  },

  async verifyOtp(email: string, otp: string) {
    const user = await AuthRepo.findUserByEmail(email);
    if (!user) throw new Error("User not found");

    if (user.isVerified)
      throw new Error("Email already verified");

    if (user.emailVerificationOTP !== otp)
      throw new Error("Invalid OTP");

    if (user.otpExpiry < new Date())
      throw new Error("OTP expired");

    await AuthRepo.markUserVerified(user._id);

    user.emailVerificationOTP = null;
    user.otpExpiry = null;
    await user.save();

    return { verified: true };
  },

  async resendOtp(email: string) {
    const user = await AuthRepo.findUserByEmail(email);
    if (!user) throw new Error("User not found");

    if (user.isVerified)
      throw new Error("Email already verified");

    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();

    user.emailVerificationOTP = newOtp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    await sendMail(
      email,
      "Your OTP Code",
      otpTemplate(newOtp)
    );

    return { sent: true };
  },


  async forgotPassword(email: string) {
    const user = await AuthRepo.findUserByEmail(email);
    if (!user) {
      return true;
    }

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
  },

  async me(userId: string) {
    const user = await AuthRepo.findUserById(userId);
    if (!user) return null;
    return user;
}

};
