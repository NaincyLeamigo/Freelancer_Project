// import api from "./Api";

// // ------------ SIGNUP --------------
// export const signupAPI = (payload) => {
//   return api.post("/api/auth/signup", payload);
// };

// // ------------ SIGNIN --------------
// export const signinAPI = (payload) => {
//   return api.post("/api/auth/signin", payload);
// };

// // ------------ VERIFY OTP --------------
// export const verifyOtpAPI = (payload) => {
//   return api.post("/api/auth/verify-otp", payload); 
// };

// // ------------ RESEND OTP --------------
// export const resendOtpAPI = (email) => {
//   return api.post("/api/auth/resend-otp", { email });
// };

// // ------------ REFRESH TOKEN --------------
// export const refreshTokenAPI = () => {
//   return api.post("/api/auth/refresh-token", {
//     refreshToken: localStorage.getItem("refreshToken"),
//   });
// };

// // ------------ LOGOUT --------------
// export const logoutAPI = () => {
//   return api.post("/api/auth/logout", {
//     refreshToken: localStorage.getItem("refreshToken"),
//   });
// };

// // ------------ FORGOT PASSWORD --------------
// export const forgotPasswordAPI = (email) => {
//   return api.post("/api/auth/forgot-password", { email });
// };

// // ------------ RESET PASSWORD --------------
// export const resetPasswordAPI = (token, newPassword) => {
//   return api.post("/api/auth/reset-password", { token, newPassword });
// };



import api from "./Api";

export const signupAPI = (payload) => api.post("/api/auth/signup", payload);

export const signinAPI = (payload) => api.post("/api/auth/signin", payload);

export const verifyOtpAPI = (payload) => api.post("/api/auth/verify-otp", payload);

export const resendOtpAPI = (payload) => api.post("/api/auth/resend-otp", payload);

export const refreshTokenAPI = () => api.post("/api/auth/refresh-token");

export const logoutAPI = () => api.post("/api/auth/logout");

export const meAPI = () => api.get("/api/auth/me");

export const forgotPasswordAPI = (payload) => api.post("/api/auth/forgot-password", payload);

export const resetPasswordAPI = (payload) => api.post("/api/auth/reset-password", payload);

