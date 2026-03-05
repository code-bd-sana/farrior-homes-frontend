import axios from "axios";
import { cookies } from "next/headers";

export const axiosServer = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });

  return instance;
};
