import mongoose, { Document } from "mongoose";

export const USER_ROLES = ["freelancer", "hirer"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export interface UserModel extends Document {
  email: string;
  name?: string;
  password: string;
  role: UserRole;
  profileRef?: mongoose.Types.ObjectId;
  isVerified: boolean;
  refreshTokens?: string[];
  emailVerificationOTP?: string;
  otpExpiry?: Date,
}

const userSchema = new mongoose.Schema<UserModel>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required : false},
  password: { type: String, required: true },
  role: { type: String, enum: USER_ROLES, required: true },
  profileRef: { type: mongoose.Schema.Types.ObjectId},
  isVerified: { type: Boolean, default: false },
  refreshTokens: [{ type: String }],
  emailVerificationOTP: { type: String },
  otpExpiry: { type: Date, default: null },
}, { timestamps: true });

export const User = mongoose.model<UserModel>("User", userSchema);

