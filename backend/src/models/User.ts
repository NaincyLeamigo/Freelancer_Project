import mongoose, { Document } from "mongoose";

export interface UserModel extends Document {
  email: string;
  password: string;
  role: "Freelancer" | "Hirer";
  profileId: mongoose.Types.ObjectId; 
}

const userSchema = new mongoose.Schema<UserModel>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Freelancer", "Hirer"], required: true },
  profileId: { type: mongoose.Schema.Types.ObjectId, required: true },
}, { timestamps: true });

export const User = mongoose.model<UserModel>("User", userSchema);
