import axios, { AxiosError, AxiosInstance } from "axios";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL_BACKEND + '/api/v1/';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 7000,
});


api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("u-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const setupResponseInterceptor = (logout: () => void) => {
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );
};

export const useApi = () => {
  const { logout } = useAuth();
  
  setupResponseInterceptor(logout);

  return api;
};
