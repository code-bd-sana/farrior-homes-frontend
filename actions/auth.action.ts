"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/fetcher";
import type { ApiResponse } from "@/lib/api";
import type { UserProfile } from "@/types/user";

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

// Current user data type returned from the /users/me endpoint
type CurrentUserData = {
  role?: string;
};

// Authentication state for the navbar
export type AuthNavbarState = {
  isLoggedIn: boolean;
  userRole: "user" | "admin";
};

export type AddAddressPayload = {
  type: "home" | "office";
  address?: string;
  phone?: string;
};

/**
 * Registers a new user with the provided registration details.
 *
 * @param payload - An object containing the user's registration information, including name, email, phone, home address, office address, password, and confirm password.
 * @returns A promise that resolves to the API response containing the success status, message, and any relevant data.
 * @throws An error if the registration request fails, with a message describing the issue.
 */
export async function registerAction(payload: RegisterPayload) {
  try {
    return await apiFetch<ApiResponse<unknown>>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.",
      data: null,
    } as ApiResponse<unknown>;
  }
}

/**
 * Logs in a user with the provided email and password
 *
 * @param payload - An object containing the user's login credentials, including email and password.
 * @returns A promise that resolves to the API response containing the success status, message, and any relevant data, such as the access token and user information.
 * @throws An error if the login request fails, with a message describing the issue. The error may occur due to invalid credentials, server issues, or other reasons related to the authentication process.
 */
export async function loginAction(
  payload: LoginPayload,
): Promise<ApiResponse<LoginData | null>> {
  try {
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
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.",
      data: null,
    };
  }
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

/**
 * Fetch the full user profile from the backend using the server cookie token.
 * Returns `null` when the user is not authenticated or on error.
 */
export async function getUserProfileAction(): Promise<UserProfile | null> {
  try {
    const response = await apiFetch<ApiResponse<UserProfile>>("/users/me", {
      method: "GET",
      cache: "no-store",
    });

    return response.data ?? null;
  } catch {
    return null;
  }
}

export async function addAddressAction(payload: AddAddressPayload) {
  const body =
    payload.type === "home"
      ? {
          homeAddress: payload.address?.trim() || "",
          homePhone: payload.phone?.trim() || "",
        }
      : {
          officeAddress: payload.address?.trim() || "",
          officePhone: payload.phone?.trim() || "",
        };

  return apiFetch<ApiResponse<UserProfile>>("/users/me", {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export type UpdateProfilePayload = {
  name?: string;
  phone?: string;
};

/**
 * Update user's profile fields (name, phone) using PATCH /users/me
 */
export async function updateProfileAction(payload: UpdateProfilePayload) {
  return apiFetch<ApiResponse<UserProfile>>("/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

/**
 * Logs out the current user by deleting the access token cookie.
 *
 * @returns A promise that resolves to an object indicating the success of the logout operation. The object contains a `success` property set to `true` if the logout was successful.
 * @throws An error if there is an issue with deleting the access token cookie, which may occur due to server issues or other reasons related to cookie management. The error message will provide details about the failure.
 */
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");

  return { success: true };
}
