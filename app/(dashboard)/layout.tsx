"use client";

import Navbar from "@/components/shared/Navbar";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  return (
    <>
      {!isAdminRoute && (
        <div className='sticky top-0 z-50 border-b border-gray-200'>
          <Navbar />
        </div>
      )}

      {/* Main content */}
      <main className='flex-1'>{children}</main>
    </>
  );
}
