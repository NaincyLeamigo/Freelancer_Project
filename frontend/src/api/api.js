/* eslint-disable no-use-before-define */
import axios from "axios";
import { errorInterceptor } from "./interceptor";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 100000,
  withCredentials: true,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => errorInterceptor(error, api)
);

export default api;
