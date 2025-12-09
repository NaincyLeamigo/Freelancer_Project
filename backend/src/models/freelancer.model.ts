import mongoose, { Document } from "mongoose";


export type SkillLevel = "Beginner" | "Intermediate" | "Expert";
export type LanguageLevel = "Basic" | "Fluent" | "Native";
export type WeekDay = "Sun" | "Mon" | "Tue" | "Wed" | "Thur" | "Fri" | "Sat";


export interface Reviewer {
  reviewerId: mongoose.Types.ObjectId;
  reviewerName: string;
  comment: string;
  rating: number;
  date: Date;
}

export interface PersonalInfo {
  fullName?: string;
  phone?: string;
  avatar?: string;
  city?: string;
  country?: string;
  oneLineDescription?: string;
  description?: string;
  jobTitle?: string;
}

export interface ProfessionalInfo {
  title?: string;
  bio?: string;
  category?: string;
  subCategory?: string;
  services: string[];
  skills: { name: string; level: SkillLevel }[];
  languages: { name: string; level: LanguageLevel }[];
}

export interface Experience {
  company: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
}

export interface Education {
  degree: string;
  institution: string;
  startDate: Date;
  endDate: Date;
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
}

export interface PortfolioItem {
  title?: string;
  description?: string;
  link: string;
  file?: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  dribbble?: string;
}

export interface Availability {
  status: "Available" | "Busy";
  timeZone?: string;
  workingDays: WeekDay[];
  startTime: string;
  endTime: string;
  allowInstantAudio: boolean;
  allowInstantVideo: boolean;
  hoursPerWeek?: number;
  hourlyRate?: number;
}

export interface Stats {
  rating: number;
  reviewCount: number;
  totalEarned: number;
  jobsCompleted: number;
  responseTime: string;
}

export interface Meta {
  memberSince: Date;
  lastSeen: Date;
}

export interface FreelancerProfileModel extends Document {
  userId: mongoose.Types.ObjectId;
  personalInfo: PersonalInfo;
  professionalInfo: ProfessionalInfo;
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  portfolio: PortfolioItem[];
  socialLinks?: SocialLinks;
  availability: Availability;
  stats: Stats;
  reviews: Reviewer[];
  meta: Meta;
  visibility: "Free" | "Subscription";
  isPaymentDone: boolean;
  profileStatus: "Draft" | "Published" | "Suspended";
}

const freelancerProfileSchema = new mongoose.Schema<FreelancerProfileModel>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    personalInfo: {
      fullName: { type: String, default: "" },
      phone: { type: String, default: "" },
      avatar: { type: String, default: "" },
      city: { type: String, default: "" },
      country: { type: String, default: "" },
      oneLineDescription: { type: String, default: "" },
      description: { type: String, default: "" },
      jobTitle: { type: String, default: "" },
    },
    professionalInfo: {
      title: { type: String, default: "" },
      bio: { type: String, default: "" },
      category: { type: String, default: "" },
      subCategory: { type: String, default: "" },
      services: { type: [String], default: [] },
      skills: {
        type: [
          {
            name: { type: String },
            level: { type: String, enum: ["Beginner", "Intermediate", "Expert"] },
          },
        ],
        default: [],
      },
      languages: {
        type: [
          {
            name: { type: String },
            level: { type: String, enum: ["Basic", "Fluent", "Native"] },
          },
        ],
        default: [],
      },
     },
    experience: [
      {
        company: { type: String },
        role: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String, default: "" },
      },
    ],
    education: [
      {
        degree: { type: String },
        institution: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],
   certifications: [
      {
        name: { type: String },
        issuer: { type: String },
        year: { type: Number },
      },
    ],
   portfolio: {
      type: [
        {
          title: { type: String, default: "" },
          description: { type: String, default: "" },
          link: { type: String, required: true },
          file: { type: String, default: "" },
        },
      ],
      default: [],
    },
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      dribbble: { type: String, default: "" },
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
      hoursPerWeek: { type: Number, default: 0 },
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
        reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reviewerName: { type: String },
        comment: { type: String },
        rating: { type: Number },
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