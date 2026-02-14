import Navbar from "@/components/shared/Navbar";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div>
        <Navbar />
      </div>

      {/* Main content */}
      <main>{children}</main>

      {/* <Footer /> */}
    </>
  );
}
