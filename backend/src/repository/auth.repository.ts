import { User } from "../models/user.model"; 
import { FreelancerProfile, FreelancerProfileModel  } from "../models/freelancer.model";
import { Hirer, HirerModel } from "../models/hirer.model";
import mongoose from "mongoose";

export const AuthRepo = {

  async findUserByEmail(email: string) {
    return User.findOne({ email }).exec();
  },

  async findUserById(id: string) {
    return User.findById(id).exec();
  },

  async createUser(payload: {
    email: string;
    password: string;
    role: "freelancer" | "hirer";
    name: string;
    profileRef?: mongoose.Types.ObjectId | null;
    isVerified?: boolean;
    emailVerificationOTP?: string;
    otpExpiry?: Date;
  }) {
    const user = new User(payload);
    return user.save();
  },

  async setRefreshToken(userId: string, refreshToken: string) {
    return User.findByIdAndUpdate(userId, {
      $addToSet: { refreshTokens: refreshToken },
    }, { new: true }).exec();
  },

  async removeRefreshToken(userId: string, refreshToken: string) {
    return User.findByIdAndUpdate(userId, {
      $pull: { refreshTokens: refreshToken },
    }, { new: true }).exec();
  },

  async clearAllRefreshTokens(userId: string) {
    return User.findByIdAndUpdate(
      userId,
      { refreshTokens: [] },
      { new: true }
    ).exec();
  },

  async createFreelancerProfile(init: Partial<FreelancerProfileModel>): Promise<FreelancerProfileModel> {
    if (!init.userId) {
      throw new Error("userId is required to create Freelancer profile");
    }
    const profile = new FreelancerProfile(init);
    return profile.save();
  },

  async createHirer(init: Partial<HirerModel>): Promise<HirerModel> {
    if (!init.userId) {
      throw new Error("userId is required to create Hirer profile");
    }
    const hirer = new Hirer(init);
    return hirer.save();
  },


  async markUserVerified(userId: string | mongoose.Types.ObjectId) {
    return User.findByIdAndUpdate(userId, { isVerified: true }, { new: true }).exec();
  },
    
  async updateUserPassword(userId: string, hashedPassword: string) {
    return User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    ).exec();
  }

};
