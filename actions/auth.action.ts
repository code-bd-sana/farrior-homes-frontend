"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/fetcher";
import type { ApiResponse } from "@/lib/api";

// Register payload and response types
export type RegisterPayload = {
  name: string;
  email: string;
  phone: string;
  homeAddress?: string;
  officeAddress?: string;
  password: string;
  confirmPassword: string;
};

// Login payload and response types
export type LoginPayload = {
  email: string;
  password: string;
};

// Login response data type
export type LoginData = {
  accessToken: string;
  user: {
    role?: string;
  };
};

type CurrentUserData = {
  role?: string;
};

export type AuthNavbarState = {
  isLoggedIn: boolean;
  userRole: "user" | "admin";
};

/**
 * Registers a new user with the provided registration details.
 *
 * @param payload - An object containing the user's registration information, including name, email, phone, home address, office address, password, and confirm password.
 * @returns A promise that resolves to the API response containing the success status, message, and any relevant data.
 * @throws An error if the registration request fails, with a message describing the issue.
 */
export async function registerAction(payload: RegisterPayload) {
  return apiFetch<ApiResponse<unknown>>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Logs in a user with the provided email and password
 *
 * @param payload - An object containing the user's login credentials, including email and password.
 * @returns A promise that resolves to the API response containing the success status, message, and any relevant data, such as the access token and user information.
 * @throws An error if the login request fails, with a message describing the issue. The error may occur due to invalid credentials, server issues, or other reasons related to the authentication process.
 */
export async function loginAction(payload: LoginPayload) {
  const response = await apiFetch<ApiResponse<LoginData>>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const token = response.data?.accessToken;

  if (token) {
    const cookieStore = await cookies();

    cookieStore.set("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  return response;
}

/**
 * Fetch the Current User
 *
 * @returns A promise that resolves to an object containing the authentication state of the user, including whether they are logged in and their role (user or admin). If the user is authenticated, it returns `isLoggedIn: true` and their role; otherwise, it returns `isLoggedIn: false` and defaults the role to "user".
 * @throws An error if the request to fetch the current user's profile fails, which may occur due to an invalid token, server issues, or other reasons related to authentication. The error message will provide details about the failure.
 */
export async function getCurrentUserFromTokenAction(): Promise<AuthNavbarState> {
  try {
    const response = await apiFetch<ApiResponse<CurrentUserData>>("/users/me", {
      method: "GET",
      cache: "no-store",
    });

    const normalizedRole =
      String(response.data?.role ?? "user").toLowerCase() === "admin"
        ? "admin"
        : "user";

    return {
      isLoggedIn: true,
      userRole: normalizedRole,
    };
  } catch {
    return {
      isLoggedIn: false,
      userRole: "user",
    };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");

  return { success: true };
}
