import { Request, Response } from "express";
import { FreelancerService } from "../service/freelancer.service";
import { responseStatus } from "../helper/response";

export const FreelancerController = {
  async getProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user.payload.sub;
      const data = await FreelancerService.getProfileData(userId);
      return responseStatus(res, 200, "Profile fetched successfully", data);
    } catch (error: any) {
      return responseStatus(res, 400, error.message || "Failed to fetch profile", null);
    }
  },

  async saveBasicInfo(req: Request, res: Response) {
    try {
      const userId = (req as any).user.payload.sub;
      const data = await FreelancerService.saveBasicInfo(userId, req.body);
      return responseStatus(res, 200, "Basic info saved successfully", data);
    } catch (error: any) {
      return responseStatus(res, 400, error.message || "Failed to save basic info", null);
    }
  },

  async saveProfessionalInfo(req: Request, res: Response) {
    try {
      const userId = (req as any).user.payload.sub;
      const data = await FreelancerService.saveProfessionalInfo(userId, req.body);
      return responseStatus(res, 200, "Professional details saved", data);
    } catch (error: any) {
      return responseStatus(res, 400, error.message || "Failed to save professional info", null);
    }
  },

  async saveAvailability(req: Request, res: Response) {
    try {
      const userId = (req as any).user.payload.sub;
      const data = await FreelancerService.saveAvailability(userId, req.body);
      return responseStatus(res, 200, "Availability saved", data);
    } catch (error: any) {
      return responseStatus(res, 400, error.message || "Failed to save availability", null);
    }
  },

  async completeProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user.payload.sub;
      const data = await FreelancerService.completeProfile(userId);
      return responseStatus(res, 200, "Profile completed and published", data);
    } catch (error: any) {
      return responseStatus(res, 400, error.message || "Failed to complete profile", null);
    }
  },

  async getAllFreelancers(req: Request, res: Response) {
  try {
    const { category, search, sortBy } = req.query;
    const data = await FreelancerService.getAllFreelancers({
      category: category as string,
      search: search as string,
      sortBy: sortBy as string,
    });
    return responseStatus(res, 200, "Freelancers fetched successfully", data);
  } catch (error: any) {
    return responseStatus(res, 400, error.message || "Failed to fetch freelancers", null);
  }
},

async getFreelancerById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = await FreelancerService.getFreelancerById(id);
    return responseStatus(res, 200, "Freelancer fetched successfully", data);
  } catch (error: any) {
    return responseStatus(res, 400, error.message || "Failed to fetch freelancer", null);
  }
},
};