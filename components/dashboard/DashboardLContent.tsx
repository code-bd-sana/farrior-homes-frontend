"use client";

import { usePathname } from "next/navigation";
import SubscriptionContent from "./subscription/SubscriptionContent";
import TestTablePage from "../table/testTable";

export default function DashboardLContent() {
  const pathname = usePathname();

  return (
    <div
      className={`h-full border ${pathname === "/subscription" ? "border-none p-0" : "border-[#D1CEC6] p-4 "} rounded-lg`}>
      {/* Profile Page */}
      {pathname === "/profile" && (
        <div>
          <h1 className='text-2xl font-bold mb-6'>Profile</h1>

          {/* Profile Overview Section */}
          <div id='profileOverview' className='mb-8'>
            <h2 className='text-xl font-semibold mb-3 border-b-2 border-gray-300 pb-2'>
              Profile Overview
            </h2>
            <div className='space-y-3'>
              <p>
                <strong>Name:</strong> John Doe
              </p>
              <p>
                <strong>Email:</strong> john@example.com
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 000-0000
              </p>
              <p>
                <strong>Member Since:</strong> January 2024
              </p>
            </div>
          </div>

          {/* Address Section */}
          <div className='mb-8'>
            <h2 className='text-xl font-semibold mb-3 border-b-2 border-gray-300 pb-2'>
              Address
            </h2>
            <div className='space-y-3'>
              <p>
                <strong>Street:</strong> 123 Main Street
              </p>
              <p>
                <strong>City:</strong> New York
              </p>
              <p>
                <strong>State:</strong> NY
              </p>
              <p>
                <strong>ZIP Code:</strong> 10001
              </p>
              <p>
                <strong>Country:</strong> United States
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Page */}
      {pathname === "/subscription" && (
        <div>
          <SubscriptionContent />
        </div>
      )}
      {pathname === "/testTable" && (
        <div>
          <TestTablePage />
        </div>
      )}

      {/* Settings Page */}
      {pathname === "/settings" && (
        <div>
          <h1 className='text-2xl font-bold mb-6'>Settings</h1>

          {/* Notification Settings Section */}
          <div className='mb-8'>
            <h2 className='text-xl font-semibold mb-3 border-b-2 border-gray-300 pb-2'>
              Notification Settings
            </h2>
            <div className='space-y-3'>
              <label className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  defaultChecked
                  style={{ accentColor: "var(--primary)" }}
                />{" "}
                Email Notifications
              </label>
              <label className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  defaultChecked
                  style={{ accentColor: "var(--primary)" }}
                />{" "}
                SMS Alerts
              </label>
              <label className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  style={{ accentColor: "var(--primary)" }}
                />{" "}
                Push Notifications
              </label>
            </div>
          </div>

          {/* Security Settings Section */}
          <div className='mb-8'>
            <h2 className='text-xl font-semibold mb-3 border-b-2 border-gray-300 pb-2'>
              Security Settings
            </h2>
            <div className='space-y-3'>
              <button
                className='px-4 py-2 text-white rounded'
                style={{ backgroundColor: "var(--primary)" }}>
                Change Password
              </button>
              <p>
                <strong>Last Login:</strong> Today at 2:30 PM
              </p>
              <label className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  defaultChecked
                  style={{ accentColor: "var(--primary)" }}
                />{" "}
                Two-Factor Authentication
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Default State */}
      {pathname !== "/profile" &&
        pathname !== "/subscription" &&
        pathname !== "/settings" && (
          <div>
            <h1 className='text-2xl font-bold mb-4'>Dashboard Content</h1>
            <p>Select an option from the sidebar to view content.</p>
          </div>
        )}
    </div>
  );
}
