import api from "./Api";

// Save Basic Info (Step 1)
export const saveBasicInfoAPI = (data) => {
  return api.post("/api/freelancer/profile/basic", data);
};

// Save Professional Info (Step 2)
export const saveProfessionalInfoAPI = (data) => {
  return api.post("/api/freelancer/profile/professional", data);
};

// Save Availability (Step 3)
export const saveAvailabilityAPI = (data) => {
  return api.post("/api/freelancer/profile/availability", data);
};

// Complete Profile (Skip for Now)
export const completeProfileAPI = () => {
  return api.post("/api/freelancer/profile/complete");
};