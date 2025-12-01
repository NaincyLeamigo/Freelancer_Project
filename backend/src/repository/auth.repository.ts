import { User } from "../models/user.model"; 
import { FreelancerProfile } from "../models/freelancer.model";
import { Hirer } from "../models/hirer.model";
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
    profileRef?: mongoose.Types.ObjectId | null;
    isVerified?: boolean;
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

  async createFreelancerProfile(init: Partial<any> = {}) {
    const p = new FreelancerProfile(init);
    return p.save();
  },

  async createHirer(init: Partial<any> = {}) {
    const h = new Hirer(init);
    return h.save();
  },

  async markUserVerified(userId: string) {
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
