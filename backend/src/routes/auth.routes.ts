import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { signupSchema, signinSchema, refreshTokenSchema, verifyEmailSchema,forgotPasswordSchema,resetPasswordSchema } from "../validation/auth.validation";
import { validateRequest } from "../middleware/validateRequest";
import { checkJwtToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", validateRequest(signupSchema), AuthController.signup);
router.post("/signin", validateRequest(signinSchema), AuthController.signin);
router.post("/refresh-token", checkJwtToken, validateRequest(refreshTokenSchema), AuthController.refreshToken);
router.post("/logout",checkJwtToken, AuthController.logout);
router.get("/verify-email", validateRequest(verifyEmailSchema), AuthController.verifyEmail);
router.post("/verify-otp", AuthController.verifyOtp);

router.post("/forgot-password", validateRequest(forgotPasswordSchema), AuthController.forgotPassword);
router.post("/reset-password", validateRequest(resetPasswordSchema), AuthController.resetPassword);

export default router;
