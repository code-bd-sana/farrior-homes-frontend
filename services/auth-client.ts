"use client";

import axiosClient from "@/lib/axiosClient";
import type {
  AuthNavbarState,
  ChangePasswordPayload,
  LoginData,
  LoginPayload,
  RegisterPayload,
} from "@/services/auth";
import type { ApiResponse } from "@/lib/api";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

type ApiErrorResponse = {
  message?: string;
  success?: boolean;
};

function getClientErrorMessage(
  error: unknown,
  fallbackMessage: string,
): string {
  const axiosError = error as AxiosError<ApiErrorResponse>;

  return (
    axiosError.response?.data?.message || axiosError.message || fallbackMessage
  );
}

export async function registerClient(
  payload: RegisterPayload,
): Promise<ApiResponse<unknown>> {
  try {
    const response = await axiosClient.post<ApiResponse<unknown>>(
      "/auth/register",
      payload,
    );

    return response.data;
  } catch (error) {
    throw new Error(
      getClientErrorMessage(error, "Registration failed. Please try again."),
    );
  }
}

export async function loginClient(
  payload: LoginPayload,
): Promise<ApiResponse<LoginData>> {
  try {
    const response = await axiosClient.post<ApiResponse<LoginData>>(
      "/auth/login",
      payload,
    );

    const token = response.data.data?.accessToken;

    if (token) {
      Cookies.set("accessToken", token, {
        sameSite: "lax",
        secure: typeof window !== "undefined" && window.location.protocol === "https:",
        path: "/",
      });
    }

    return response.data;
  } catch (error) {
    throw new Error(
      getClientErrorMessage(error, "Login failed. Please try again."),
    );
  }
}

export async function getCurrentUserClient(): Promise<AuthNavbarState> {
  try {
    const response =
      await axiosClient.get<ApiResponse<{ role?: string; isSubscribed?: boolean | string }>>(
        "/users/me",
      );

    const normalizedRole =
      String(response.data.data?.role ?? "user").toLowerCase() === "admin"
        ? "admin"
        : "user";

    const isSubscribedRaw = response.data.data?.isSubscribed;
    const isSubscribed =
      typeof isSubscribedRaw === "string"
        ? isSubscribedRaw === "true"
        : Boolean(isSubscribedRaw);

    return {
      isLoggedIn: true,
      userRole: normalizedRole,
      isSubscribed,
    };
  } catch {
    return {
      isLoggedIn: false,
      userRole: "user",
      isSubscribed: false,
    };
  }
}

export async function changePasswordClient(
  payload: ChangePasswordPayload,
): Promise<ApiResponse<unknown>> {
  try {
    const response = await axiosClient.patch<ApiResponse<unknown>>(
      "/auth/change-password",
      payload,
    );

    return response.data;
  } catch (error) {
    throw new Error(
      getClientErrorMessage(error, "Failed to change password."),
    );
  }
}

export async function logoutClient(): Promise<{ success: boolean; message: string }> {
  try {
    Cookies.remove("accessToken", { path: "/" });

    return {
      success: true,
      message: "Logout successful",
    };
  } catch (error) {
    throw new Error(
      getClientErrorMessage(error, "Logout failed. Please try again."),
    );
  }
}
