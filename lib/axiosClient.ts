import { config } from "@/config/config";
import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;