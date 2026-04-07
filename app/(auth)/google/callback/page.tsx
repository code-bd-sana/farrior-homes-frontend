"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const role = searchParams.get("role")?.toLowerCase() || "user";

    if (!token) {
      router.push("/login");
      return;
    }

    Cookies.set("accessToken", token, {
      sameSite: "lax",
      secure: typeof window !== "undefined" && window.location.protocol === "https:",
      path: "/",
      expires: 1,
    });

    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard/profile");
    }
  }, [router, searchParams]);

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='text-center'>
        <div className='w-16 h-16 border-4 border-[#619B7F] border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
        <h2 className='text-xl'>Completing login...</h2>
      </div>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen flex items-center justify-center'>
          <div className='text-center'>
            <div className='w-16 h-16 border-4 border-[#619B7F] border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
            <h2 className='text-xl'>Loading...</h2>
          </div>
        </div>
      }>
      <GoogleCallbackContent />
    </Suspense>
  );
}
