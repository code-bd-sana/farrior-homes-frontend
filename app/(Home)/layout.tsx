import Navbar from "@/components/shared/Navbar";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='sticky top-0 z-50'>
        <Navbar />
      </div>

      {/* Main content */}
      <main>{children}</main>
    </>
  );
}
