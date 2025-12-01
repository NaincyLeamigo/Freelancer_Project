import mongoose, { Document } from "mongoose";

export type UserRole = "freelancer" | "hirer";

export interface UserModel extends Document {
  email: string;
  password: string;
  role: UserRole;
  profileRef?: mongoose.Types.ObjectId;
  isVerified: boolean;
  refreshTokens?: string[];
}

const userSchema = new mongoose.Schema<UserModel>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["freelancer", "hirer"], required: true },
  profileRef: { type: mongoose.Schema.Types.ObjectId, required: false },
  isVerified: { type: Boolean, default: false },
  refreshTokens: [{ type: String }],
}, { timestamps: true });

export const User = mongoose.model<UserModel>("User", userSchema);

