import mongoose, { Document } from "mongoose";
export interface PersonalInfo {
  name?: string;
  phone?: string;
  avatar?: string;
  email?: string;
}

export interface CompanyInfo {
  companyName?: string;
  companyWebsite?: string;
  companySize?: string;  
  industry?: string;
  location?: string;
  about?: string;
}

export interface Meta {
  createdAt: Date;
  lastLogin: Date;
}

export interface HirerModel extends Document {
  userId: mongoose.Types.ObjectId;
  personalInfo: PersonalInfo;
  companyInfo: CompanyInfo;
  roles: string[]; 
  postedJobsIds: mongoose.Types.ObjectId[];
  meta: Meta;
}

const hirerSchema = new mongoose.Schema<HirerModel>(
   {
     userId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true 
    },
    personalInfo: {
      name: { type: String, default: "" },
      phone: { type: String, default: "" },
      avatar: { type: String, default: "" },
      email: { type: String, default: "" }, 
    },
    companyInfo: {
      companyName: { type: String, default: "" },
      companyWebsite: { type: String, default: "" },
      companySize: { type: String, default: "" },
      industry: { type: String, default: "" },
      location: { type: String, default: "" },
      about: { type: String, default: "" },
    },
    roles: {
      type: [String],
      default: ["Admin"],
    },
    postedJobsIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
         required: false,
      },
    ],
    
    meta: {
      createdAt: { type: Date, default: Date.now },
      lastLogin: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);

export const Hirer = mongoose.model<HirerModel>("Hirer", hirerSchema);
