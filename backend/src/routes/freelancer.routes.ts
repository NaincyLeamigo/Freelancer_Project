
import { Router } from "express";
import { checkJwtToken } from "../middleware/auth.middleware";
import { FreelancerController } from "../controller/freelancer.controller";

const router = Router();

router.get("/profile", checkJwtToken, FreelancerController.getProfile);
router.post("/profile/basic", checkJwtToken, FreelancerController.saveBasicInfo);
router.post("/profile/professional", checkJwtToken, FreelancerController.saveProfessionalInfo);
router.post("/profile/availability", checkJwtToken, FreelancerController.saveAvailability);
router.post("/profile/complete", checkJwtToken, FreelancerController.completeProfile);
router.get("/all", FreelancerController.getAllFreelancers);
router.get("/:id", FreelancerController.getFreelancerById);

export default router;