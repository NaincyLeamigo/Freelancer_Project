import mongoose, { Document } from "mongoose";

export interface HirerModel extends Document {
  companyInfo: {
    companyName?: string;
    companyWebsite?: string;
    companySize?: string;  // "1-10", "11-50", "50-200", etc
    industry?: string;
    location?: string;
    about?: string;
  };

  roles: string[]; 
  postedJobsIds: mongoose.Types.ObjectId[];
  meta: {
    createdAt: Date;
    lastLogin: Date;
  };
}

const hirerSchema = new mongoose.Schema<HirerModel>(
  {
    companyInfo: {
      companyName: String,
      companyWebsite: String,
      companySize: String,
      industry: String,
      location: String,
      about: String,
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
