"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  User,
  ChevronDown,
  ChevronUp,
  Settings as SettingsIcon,
  Home,
  CreditCard,
  LogOut,
} from "lucide-react";
import Link from "next/link";

export default function DashboardSidebar() {
  const [showProfileOverview, setShowProfileOverview] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = setTimeout(() => setCurrentHash(window.location.hash || ""), 0);
    const onHash = () => setCurrentHash(window.location.hash || "");
    window.addEventListener("hashchange", onHash);
    return () => {
      clearTimeout(t);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProfileOverview(pathname === "/profile");
      setShowSettings(pathname === "/settings");
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className='sticky top-20 h-[calc(100vh-8rem)] p-4 border border-[#D1CEC6] rounded-lg flex flex-col justify-between'>
      <div>
        <h2 className='mb-4 text-[#70706C]'>Profile Overview</h2>
        <ul className='space-y-2'>
          <li>
            <div className='flex flex-col'>
              <button
                onClick={() => setShowProfileOverview(!showProfileOverview)}
                className={`text-left py-2 px-4 w-full rounded flex items-center justify-between ${
                  pathname === "/profile"
                    ? "text-black"
                    : "hover:bg-gray-100 text-gray-700"
                }`}>
                <div className='flex items-center gap-2'>
                  <User size={18} />
                  <Link href='/profile'>Profile overview</Link>
                </div>
                {showProfileOverview ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>

              {showProfileOverview && (
                <div className='mt-2 ml-4 pl-4 border-l-2 border-gray-300'>
                  <a
                    href='/profile#profileAddress'
                    className={`flex items-center gap-2 py-2 px-2 rounded ${
                      pathname === "/profile" &&
                      currentHash === "#profileAddress"
                        ? "text-black "
                        : "hover:bg-gray-50 text-gray-700"
                    }`}>
                    <Home size={15} className='text-gray-500' />
                    Address
                  </a>
                </div>
              )}
            </div>
          </li>

          <li>
            <div className='mt-2 ml-4 border-gray-300 flex justify-start items-center '>
              <CreditCard size={16} className=' text-gray-500' />
              <Link
                href='/subscription'
                className={`block py-2 px-2 rounded ${
                  pathname === "/subscription"
                    ? "text-black "
                    : "hover:bg-gray-200 text-gray-700"
                }`}>
                Subscription plan
              </Link>
            </div>
          </li>

          <li>
            <div>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`w-full text-left py-2 px-4 rounded flex items-center justify-between ${
                  pathname === "/settings"
                    ? "text-black"
                    : "hover:bg-gray-100 text-gray-700"
                }`}>
                <div className='flex items-center gap-2'>
                  <SettingsIcon size={18} />
                  <Link href='/settings'>Settings</Link>
                </div>
                {showSettings ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>

              {showSettings && (
                <div className='mt-2 ml-4 pl-4 space-y-1 border-l-2 border-gray-300'>
                  <a
                    href='/settings#notifications'
                    className={`block py-2 px-3 rounded ${
                      pathname === "/settings" &&
                      currentHash === "#notifications"
                        ? "text-black "
                        : "hover:bg-gray-50 text-gray-700"
                    }`}>
                    Notification settings
                  </a>
                  <a
                    href='/settings#security'
                    className={`block py-2 px-3 rounded ${
                      pathname === "/settings" && currentHash === "#security"
                        ? "text-black "
                        : "hover:bg-gray-50 text-gray-700"
                    }`}>
                    Security settings
                  </a>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>

      <div className='mt-6'>
        <button
          onClick={() => {
            try {
              localStorage.setItem("isLoggedIn", "false");
            } catch {}
            window.location.href = "/";
          }}
          className='py-2 px-4 rounded text-red-600 hover:bg-gray-50'>
          <div className='flex items-center justify-start gap-x-1'>
            <LogOut />
            Logout
          </div>
        </button>
      </div>
    </div>
  );
}
