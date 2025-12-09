import { FreelancerProfile, FreelancerProfileModel } from "../models/freelancer.model";

export type UpdatePersonalInfoInput = Partial<FreelancerProfileModel["personalInfo"]>;
export type UpdateProfessionalInfoInput = Partial<FreelancerProfileModel["professionalInfo"]>;
export type UpdateAvailabilityInput = Partial<FreelancerProfileModel["availability"]>;
export type UpdatePortfolioInput = FreelancerProfileModel["portfolio"];

export const FreelancerProfileRepository = {
  findById(profileId: string) {
    return FreelancerProfile.findById(profileId).exec();
  },

  findByIdLean(profileId: string) {
    return FreelancerProfile.findById(profileId).lean().exec();
  },

  updatePersonalInfo(profileId: string, data: UpdatePersonalInfoInput) {
    return FreelancerProfile.findByIdAndUpdate(
      profileId,
      { personalInfo: data },
      { new: true, runValidators: true }
    ).exec();
  },

  updateProfessionalInfo(profileId: string, data: UpdateProfessionalInfoInput) {
    return FreelancerProfile.findByIdAndUpdate(
      profileId,
      { professionalInfo: data },
      { new: true, runValidators: true }
    ).exec();
  },

  updatePortfolio(profileId: string, portfolio: UpdatePortfolioInput) {
    return FreelancerProfile.findByIdAndUpdate(
      profileId,
      { portfolio },
      { new: true, runValidators: true }
    ).exec();
  },

  updateAvailability(profileId: string, data: UpdateAvailabilityInput) {
    return FreelancerProfile.findByIdAndUpdate(
      profileId,
      { availability: data },
      { new: true, runValidators: true }
    ).exec();
  },

  completeProfile(profileId: string) {
    return FreelancerProfile.findByIdAndUpdate(
      profileId,
      {
        profileStatus: "Published",
        visibility: "Free",
        isPaymentDone: false,
      },
      { new: true }
    ).exec();
  },
  
  findAllWithFilters(query: any, sort: any) {
    return FreelancerProfile.find(query)
      .sort(sort)
      .select("-__v")
      .lean()
      .exec();
  },
};