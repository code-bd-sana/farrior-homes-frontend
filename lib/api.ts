import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

type ApiValidationError = {
  field: string;
  message: string;
};

type ApiErrorPayload = {
  message?: string;
  errors?: ApiValidationError[];
};

export function getApiErrorMessage(error: unknown): string {
  if (!axios.isAxiosError<ApiErrorPayload>(error)) {
    return "Something went wrong. Please try again.";
  }

  const responseData = error.response?.data;

  if (Array.isArray(responseData?.errors) && responseData.errors.length > 0) {
    return responseData.errors[0].message;
  }

  if (typeof responseData?.message === "string" && responseData.message) {
    return responseData.message;
  }

  if (typeof error.message === "string" && error.message) {
    return error.message;
  }

  return "Request failed. Please try again.";
}
