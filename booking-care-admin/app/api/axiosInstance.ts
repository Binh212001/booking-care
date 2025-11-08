import axios from "axios";

// In Nuxt 4, public runtime config values are available via import.meta.env
// Values defined in nuxt.config.ts runtimeConfig.public are automatically exposed
const baseURL = "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config: any) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response.data;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
