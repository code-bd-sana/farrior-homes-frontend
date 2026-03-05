import { config } from "@/config/config";
import axios from "axios";
import { cookies } from "next/headers";

export const axiosServer = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const instance = axios.create({
    baseURL: config.BASE_URL,
    withCredentials: true,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });

  return instance;
};
