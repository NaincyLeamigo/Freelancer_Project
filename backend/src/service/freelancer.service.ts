import { User } from "../models/user.model";
import { FreelancerProfileRepository } from "../repository/freelancer.repository";

export const FreelancerService = {
  async getProfile(userId: string) {
    const user = await User.findById(userId).lean();
    if (!user?.profileRef) throw new Error("Freelancer profile not linked");
    const profile = await FreelancerProfileRepository.findByIdLean(user.profileRef.toString());
    if (!profile) throw new Error("Freelancer profile not found");
    return profile;
  },

  async getProfileData(userId: string) {
    return await this.getProfile(userId);
  },

  async saveBasicInfo(userId: string, payload: any) {
    const user = await User.findById(userId);
    if (!user?.profileRef) throw new Error("Profile not initialized");

    const personalInfo = {
      fullName: payload.fullName || "",
      avatar: payload.avatar || "",
      city: payload.city || "",
      country: payload.country || "",
      oneLineDescription: payload.oneLineDescription || "",
      description: payload.description || "",
      jobTitle: payload.jobTitle || "",
    };

    const professionalInfo = {
      title: payload.jobTitle || "",
      bio: payload.description || "",
    };

    await FreelancerProfileRepository.updatePersonalInfo(user.profileRef.toString(), personalInfo);
    const profile = await FreelancerProfileRepository.updateProfessionalInfo(user.profileRef.toString(), professionalInfo);
    return profile;
  },

  async saveProfessionalInfo(userId: string, payload: any) {
    const user = await User.findById(userId);
    if (!user?.profileRef) throw new Error("Profile not initialized");

    const professionalInfo = {
      category: payload.category || "",
      subCategory: payload.subCategory || "",
      services: Array.isArray(payload.services) ? payload.services : [],
      skills: Array.isArray(payload.skills) ? payload.skills : [],
      languages: Array.isArray(payload.languages) ? payload.languages : [],
      title: payload.title || "",
      bio: payload.bio || "",
    };

    const portfolio = (payload.portfolio || []).map((item: any) => ({
      title: item.title || "",
      description: item.description || "",
      link: item.link,
      file: item.file || "",
    }));

    await FreelancerProfileRepository.updateProfessionalInfo(user.profileRef.toString(), professionalInfo);
    const profile = await FreelancerProfileRepository.updatePortfolio(user.profileRef.toString(), portfolio);
    return profile;
  },

  async saveAvailability(userId: string, payload: any) {
    const user = await User.findById(userId);
    if (!user?.profileRef) throw new Error("Profile not initialized");

    const availability = {
      status: payload.status || "Available",
      timeZone: payload.timeZone || "",
      workingDays: Array.isArray(payload.workingDays) ? payload.workingDays : [],
      startTime: payload.startTime || "9:00 AM",
      endTime: payload.endTime || "6:00 PM",
      allowInstantAudio: Boolean(payload.allowInstantAudio),
      allowInstantVideo: Boolean(payload.allowInstantVideo),
      hoursPerWeek: payload.hoursPerWeek,
      hourlyRate: payload.hourlyRate,
    };

    const profile = await FreelancerProfileRepository.updateAvailability(user.profileRef.toString(), availability);
    return profile;
  },

  async completeProfile(userId: string) {
    const user = await User.findById(userId);
    if (!user?.profileRef) throw new Error("Profile not initialized");
    const profile = await FreelancerProfileRepository.completeProfile(user.profileRef.toString());
    return profile;
  },
};