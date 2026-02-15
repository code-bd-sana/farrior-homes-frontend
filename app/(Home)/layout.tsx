import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='sticky top-0 z-50 border-b border-gray-200'>
        <Navbar />
      </div>

      {/* Main content */}
      <main className='flex-1'>{children}</main>

      <Footer />
    </>
  );
}
