import { jwtVerify, type JWTPayload } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type JwtPayload = JWTPayload & {
  role?: string;
  isSubscribed?: boolean;
  subscribed?: boolean;
  subscription?: string;
};

const jwtSecret = process.env.JWT_SECRET;
const jwtSecretKey = jwtSecret ? new TextEncoder().encode(jwtSecret) : null;
const apiBaseUrl = (
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  process.env.NEXT_PUBLIC_BASE_URL ??
  ""
).replace(/\/+$/, "");

async function verifyJwt(token: string): Promise<JwtPayload | null> {
  if (!token || !jwtSecretKey) return null;

  try {
    const { payload } = await jwtVerify(token, jwtSecretKey, {
      algorithms: ["HS256"],
    });

    return payload as JwtPayload;
  } catch {
    return null;
  }
}

async function getUserStateFromApi(token: string): Promise<{
  userRole: "user" | "admin";
  isSubscribed: boolean;
} | null> {
  if (!token || !apiBaseUrl) return null;

  try {
    const response = await fetch(`${apiBaseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const result = (await response.json()) as {
      data?: {
        role?: string;
        isSubscribed?: boolean | string;
      };
    };

    const normalizedRole =
      String(result.data?.role ?? "user").toLowerCase() === "admin"
        ? "admin"
        : "user";

    const isSubscribedRaw = result.data?.isSubscribed;
    const isSubscribed =
      typeof isSubscribedRaw === "string"
        ? isSubscribedRaw === "true"
        : Boolean(isSubscribedRaw);

    return {
      userRole: normalizedRole,
      isSubscribed,
    };
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  const authPages = ["/login", "/signup"];

  const publicPages = [
    "/",
    "/about",
    "/blog",
    "/contact",
    "/properties",
    "/resources",
    "/services",
  ];

  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("accessToken")?.value;

  // Get basic info from JWT first when the frontend knows the JWT secret.
  const payload = token ? await verifyJwt(token) : null;
  const isAuthenticated = Boolean(token);

  // Initialize default values
  let userRole = String(payload?.role ?? "").toLowerCase();
  let isSubscribed = false;

  // If authenticated, get full user data including subscription status.
  if (isAuthenticated && token) {
    const userState = await getUserStateFromApi(token);

    if (userState) {
      userRole = userState.userRole;
      isSubscribed = userState.isSubscribed;
    } else {
      // Fallback to JWT data if available.
      isSubscribed =
        payload?.isSubscribed === true ||
        payload?.subscribed === true ||
        String(payload?.subscription ?? "").toLowerCase() === "premium";
    }
  }

  // Public pages - allow access
  if (publicPages.includes(pathname)) {
    return NextResponse.next();
  }

  // Auth pages (login/signup) - redirect if already authenticated
  if (authPages.includes(pathname)) {
    if (isAuthenticated) {
      if (userRole === "admin") {
        return NextResponse.redirect(new URL("/admin", origin));
      }
      return NextResponse.redirect(new URL("/dashboard/profile", origin));
    }
    return NextResponse.next();
  }

  // Admin routes protection
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", origin);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (userRole !== "admin") {
      return NextResponse.redirect(new URL("/dashboard/profile", origin));
    }

    return NextResponse.next();
  }

  // Dashboard routes protection
  if (pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", origin);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Admin should not access user dashboard routes
    if (userRole === "admin") {
      return NextResponse.redirect(new URL("/admin", origin));
    }

    // User-only sections that require active subscription
    if (
      pathname.startsWith("/dashboard/main") ||
      pathname.startsWith("/dashboard/tools") ||
      pathname.startsWith("/dashboard/profile/message")
    ) {
      if (!isSubscribed) {
        return NextResponse.redirect(
          new URL("/dashboard/profile/subscription", origin),
        );
      }
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
