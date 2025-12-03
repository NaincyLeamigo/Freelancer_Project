import axios from "axios";

const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 100000,
  withCredentials: true,
});

export const errorInterceptor = async (error, api) => {
  const { response } = error;

  const originalRequest = error.config;

  // Access token expired
  if (response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token");

      const res = await refreshApi.post("/api/auth/refresh", { refreshToken });

      const { accessToken, refreshToken: newRefresh } = res.data.data;

      // store new tokens
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", newRefresh);

      originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

      return api(originalRequest);
    } catch (err) {
      console.log("Refresh failed:", err.message);
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(err);
    }
  }

  return Promise.reject(error);
};
