// import axios from "axios";

// const refreshApi = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   timeout: 100000,
//   withCredentials: true,
// });

// export const errorInterceptor = async (error, api) => {
//   const { response } = error;

//   const originalRequest = error.config;

//   // Access token expired
//   if (response?.status === 401 && !originalRequest._retry) {
//     originalRequest._retry = true;

//     try {
//       const refreshToken = localStorage.getItem("refreshToken");
//       if (!refreshToken) throw new Error("No refresh token");

//       const res = await refreshApi.post("/api/auth/refresh", { refreshToken });

//       const { accessToken, refreshToken: newRefresh } = res.data.data;

//       // store new tokens
//       localStorage.setItem("accessToken", accessToken);
//       localStorage.setItem("refreshToken", newRefresh);

//       originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

//       return api(originalRequest);
//     } catch (err) {
//       console.log("Refresh failed:", err.message);
//       localStorage.clear();
//       window.location.href = "/login";
//       return Promise.reject(err);
//     }
//   }

//   return Promise.reject(error);
// };



import axios from "axios";

const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

export const errorInterceptor = async (error, apiInstance) => {
  const original = error.config;
  const status = error.response?.status;

  // Handle 401 (access token expired / unauthorized)
  if (status === 401 && !original._retry) {
    original._retry = true;
    try {
      // Ask backend to refresh tokens using refreshToken cookie
      await refreshApi.post("/api/auth/refresh-token");
      // Retry original request — cookies will now include new token
      return apiInstance(original);
    } catch (err) {
      // Refresh failed: force sign-out behavior
      try {
        await refreshApi.post("/api/auth/logout"); // best-effort cleanup
      } catch (e) {
        // ignore
      }
      // Clear client-side app state (not cookies; HttpOnly cookies can't be cleared by JS)
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
      return Promise.reject(err);
    }
  }

  return Promise.reject(error);
};
