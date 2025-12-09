import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { signupSchema, signinSchema,forgotPasswordSchema,resetPasswordSchema } from "../validation/auth.validation";
import { validateRequest } from "../middleware/validateRequest";
import { checkJwtToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", validateRequest(signupSchema), AuthController.signup);
router.post("/signin", validateRequest(signinSchema), AuthController.signin);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/logout", AuthController.logout);
router.post("/verify-otp", AuthController.verifyOtp);
router.post("/resend-otp", AuthController.resendOtp);

router.get("/me", checkJwtToken, AuthController.me);


router.post("/forgot-password", validateRequest(forgotPasswordSchema), AuthController.forgotPassword);
router.post("/reset-password", validateRequest(resetPasswordSchema), AuthController.resetPassword);

export default router;
