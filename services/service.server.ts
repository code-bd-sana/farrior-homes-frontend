"use server";

import { AxiosError } from "axios";
import { axiosServer } from "../lib/axiosServer";
import { ApiResponse, PaginatedServicesResponse } from "./service";

interface ApiErrorResponse {
  message?: string;
  success?: boolean;
  errors?: Record<string, string[]>;
}

// Helper function to get the axios instance with server-side configuration
async function getAxiosInstance() {
  return await axiosServer();
}

/**
 * Get all services
 */
export async function getAllServices(): Promise<PaginatedServicesResponse> {
  try {
    const axiosInstance = await getAxiosInstance();
    const response = await axiosInstance.get<
      ApiResponse<PaginatedServicesResponse>
    >("/service/many", {
      params: {
        page: 1,
        limit: 100,
      },
    });
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const errorData = axiosError.response?.data as ApiErrorResponse | undefined;
    console.warn("Get all services error:", {
      message: axiosError.message,
      response: errorData,
      status: axiosError.response?.status,
    });
    throw new Error(
      errorData?.message || axiosError.message || "Failed to get services.",
    );
  }
}
