import TanstackProvider from "@/providers/TanstackProvider";
import { Jost } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata = {
  title: "Farrior Homes",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${jost.className} min-h-screen flex flex-col`}>
        <TanstackProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                fontSize: "16px",
                padding: "16px 20px",
                background: "#D1E3D9",
                color: "#619B7F",
                border: "1px solid #619B7F",
              },
            }}
          />
          {children}
        </TanstackProvider>
      </body>
    </html>
  );
}
