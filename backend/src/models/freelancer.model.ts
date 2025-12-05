import mongoose, { Document } from "mongoose";


export type SkillLevel = "Beginner" | "Intermediate" | "Expert";
export type LanguageLevel = "Basic" | "Fluent" | "Native";
export type WeekDay = "Sun" | "Mon" | "Tue" | "Wed" | "Thur" | "Fri" | "Sat";

export interface FreelancerProfileModel extends Document {
  personalInfo: {
    fullName?: string;
    username?: string;
    phone?: string;
    avatar?: string;
    city?: string;
    country?: string;
    oneLineDescription?: string;
    description?: string;
    jobTitle?: string;
  };

  professionalInfo: {
    title?: string;
    bio?: string;
    category?: string;
    subCategory?: string;
    services: string[];
    skills: { name: string; level: SkillLevel }[];
    languages: { name: string; level: LanguageLevel }[];
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
    title?: string;
    description?: string;
    link: string;
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
    timeZone?: string;
    workingDays: WeekDay[];
    startTime: string;
    endTime: string;
    allowInstantAudio: boolean;
    allowInstantVideo: boolean;
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

  visibility: "Free" | "Subscription";
  isPaymentDone: boolean;
  profileStatus: "Draft" | "Published" | "Suspended";
}

const freelancerProfileSchema = new mongoose.Schema<FreelancerProfileModel>(
  {
    personalInfo: {
      fullName: { type: String, default: "" },
      username: { type: String, unique: true, sparse: true },
      phone: { type: String, default: "" },
      avatar: { type: String, default: "" },
      city: { type: String, default: "" },
      country: { type: String, default: "" },
      oneLineDescription: { type: String, default: "" },
      description: { type: String, default: "" },
      jobTitle: { type: String, default: "" },
    },

    professionalInfo: {
      title: String,
      bio: String,
      category: String,
      subCategory: String,
      services: [String],
      skills: [
        {
          name: String,
          level: { type: String, enum: ["Beginner", "Intermediate", "Expert"] },
        },
      ],
      languages: [
        {
          name: String,
          level: { type: String, enum: ["Basic", "Fluent", "Native"] },
        },
      ],
    },

    experience: [
      {
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],

    education: [
      {
        degree: String,
        institution: String,
        startDate: Date,
        endDate: Date,
      },
    ],

    certifications: [{ name: String, issuer: String, year: Number }],

    portfolio: [
      {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        link: { type: String, required: true },
        file: { type: String, default: "" },
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
      timeZone: { type: String, default: "" },
      workingDays: {
        type: [
          {
            type: String,
            enum: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
          },
        ],
        default: [],
      },
      startTime: { type: String, default: "9:00 AM" },
      endTime: { type: String, default: "6:00 PM" },
      allowInstantAudio: { type: Boolean, default: true },
      allowInstantVideo: { type: Boolean, default: false },
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

    visibility: { type: String, enum: ["Free", "Subscription"], default: "Free" },
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