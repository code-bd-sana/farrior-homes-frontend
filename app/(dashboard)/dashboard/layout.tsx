import UserShell from "@/components/dashboard/UserShell";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { ReactNode } from "react";

export default function UserDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <div className='sticky top-0 z-50 border-b border-gray-200'>
        <Navbar />
      </div>

      <main className='flex-1'>
        <UserShell>{children}</UserShell>
      </main>

      <Footer />
    </>
  );
}
