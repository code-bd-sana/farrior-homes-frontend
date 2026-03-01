"use server";

import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api";

type ApiFetchOptions = RequestInit & {
  headers?: HeadersInit;
};

type ApiErrorPayload = {
  message?: string;
  errors?: Array<{ message?: string }>;
};

function extractErrorMessage(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const data = payload as ApiErrorPayload;

  if (Array.isArray(data.errors) && data.errors.length > 0) {
    const firstMessage = data.errors[0]?.message;

    if (typeof firstMessage === "string" && firstMessage) {
      return firstMessage;
    }
  }

  if (typeof data.message === "string" && data.message) {
    return data.message;
  }

  return null;
}

export async function apiFetch<T>(
  endpoint: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    cache: options.cache ?? "no-store",
  });

  const contentType = response.headers.get("content-type") || "";
  let payload: unknown;

  if (contentType.includes("application/json")) {
    payload = await response.json();
  } else {
    const text = await response.text();

    try {
      payload = JSON.parse(text);
    } catch {
      payload = { message: text };
    }
  }

  if (!response.ok) {
    throw new Error(
      extractErrorMessage(payload) || "Request failed. Please try again.",
    );
  }

  return payload as T;
}
