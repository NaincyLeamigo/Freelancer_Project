import api from "./Api";

// ------------ SIGNUP --------------
export const signupAPI = (payload) => {
  return api.post("/api/auth/signup", payload);
};

// ------------ SIGNIN --------------
export const signinAPI = (payload) => {
  return api.post("/api/auth/signin", payload);
};

// ------------ VERIFY OTP --------------
export const verifyOtpAPI = (payload) => {
  return api.post("/api/auth/verify-otp", payload); 
};

export const resendOtpAPI = (email) => {
  return api.post("/api/auth/resend-otp", { email });
};

// ------------ REFRESH TOKEN --------------
export const refreshTokenAPI = () => {
  return api.post("/api/auth/refresh", {
    refreshToken: localStorage.getItem("refreshToken"),
  });
};

// ------------ LOGOUT --------------
export const logoutAPI = () => {
  return api.post("/api/auth/logout", {
    refreshToken: localStorage.getItem("refreshToken"),
  });
};

// ------------ FORGOT PASSWORD --------------
export const forgotPasswordAPI = (email) => {
  return api.post("/api/auth/forgot-password", { email });
};

// ------------ RESET PASSWORD --------------
export const resetPasswordAPI = (token, newPassword) => {
  return api.post("/api/auth/reset-password", { token, newPassword });
};
