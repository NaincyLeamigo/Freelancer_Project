import mongoose, { Document } from "mongoose";

export interface FreelancerProfileModel extends Document {

  personalInfo: {
    fullName?: string;
    username?: string;
    phone?: string;
    avatar?: string;
    location?: string;
    website?: string;
  };

  professionalInfo: {
    title?: string;
    bio?: string;
    category?: string;        
    subCategory?: string;     
    skills: { name: string; level: "Beginner" | "Intermediate" | "Expert" }[];
    languages: { name: string; level: "Basic" | "Fluent" | "Native" }[];
  };

  experience: {
    company: string;
    role: string;
    startDate: Date;
    endDate?: Date;
    description?: string;
  }[];

  education: {
    degree: string;
    institution: string;
    startDate: Date;
    endDate: Date;
  }[];

  certifications: {
    name: string;
    issuer: string;
    year: number;
  }[];

  portfolio: {
    title: string;
    description?: string;
    link?: string;
    file?: string;
  }[];

  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    dribbble?: string;
  };

  availability: {
    status: "Available" | "Busy";
    hoursPerWeek?: number;
    hourlyRate?: number;
  };

  stats: {
    rating: number;
    reviewCount: number;
    totalEarned: number;
    jobsCompleted: number;
    responseTime: string;
  };

  reviews: {
    reviewerId: mongoose.Types.ObjectId;
    reviewerName: string;
    comment: string;
    rating: number;
    date: Date;
  }[];

  meta: {
    memberSince: Date;
    lastSeen: Date;
  };

  visibility: "Free" | "Premium"; 
  isPaymentDone: boolean;         

  profileStatus: "Draft" | "Published" | "Suspended";
}

const freelancerProfileSchema = new mongoose.Schema<FreelancerProfileModel>(
  {
    personalInfo: {
      fullName: String,
      username: { type: String, unique: true, sparse: true },
      phone: String,
      avatar: String,
      location: String,
      website: String,
    },

    professionalInfo: {
      title: String,
      bio: String,
      category: String,
      subCategory: String,
      skills: [
        { 
          name: String, 
          level: { type: String, enum: ["Beginner", "Intermediate", "Expert"] } 
        },
      ],
      languages: [
        { 
          name: String, 
          level: { type: String, enum: ["Basic", "Fluent", "Native"] } 
        },
      ],
    },

    experience: [{
      company: String,
      role: String,
      startDate: Date,
      endDate: Date,
      description: String,
    }],

    education: [{
      degree: String,
      institution: String,
      startDate: Date,
      endDate: Date,
    }],

    certifications: [{ name: String, issuer: String, year: Number }],

    portfolio: [
      {
        title: String,
        description: String,
        link: String,
        file: String,
      },
    ],

    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      dribbble: String,
    },

    availability: {
      status: { type: String, enum: ["Available", "Busy"], default: "Available" },
      hoursPerWeek: Number,
      hourlyRate: { type: Number, default: 0 },
    },

    stats: {
      rating: { type: Number, default: 0 },
      reviewCount: { type: Number, default: 0 },
      totalEarned: { type: Number, default: 0 },
      jobsCompleted: { type: Number, default: 0 },
      responseTime: { type: String, default: "N/A" },
    },

    reviews: [
      {
        reviewerId: String,
        reviewerName: String,
        comment: String,
        rating: Number,
        date: { type: Date, default: Date.now },
      },
    ],

    meta: {
      memberSince: { type: Date, default: Date.now },
      lastSeen: { type: Date, default: Date.now },
    },

    visibility: { type: String, enum: ["Free", "Premium"], default: "Free" },
    isPaymentDone: { type: Boolean, default: false },

    profileStatus: {
      type: String,
      enum: ["Draft", "Published", "Suspended"],
      default: "Draft",
    },
  },
  { timestamps: true }
);

export const FreelancerProfile = mongoose.model<FreelancerProfileModel>(
  "FreelancerProfile",
  freelancerProfileSchema
);
