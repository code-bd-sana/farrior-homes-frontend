"use client";

import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  Home,
  LogOut,
  Settings as SettingsIcon,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CiHome } from "react-icons/ci";
import { LuUserCog } from "react-icons/lu";
import { MdOutlineDashboard, MdOutlineHomeRepairService } from "react-icons/md";
import { RiArticleLine } from "react-icons/ri";
import { IconType } from "react-icons";

// Type definitions
type UserRole = "user" | "admin";

interface DropdownItem {
  id: string;
  label: string;
  icon?: IconType;
  href: string;
  hash?: string;
}

interface RouteItem {
  id: string;
  label: string;
  icon: IconType;
  href: string;
  hasDropdown: boolean;
  dropdownItems?: DropdownItem[];
}

interface RouteConfig {
  user: RouteItem[];
  admin: RouteItem[];
}

const routeConfig: RouteConfig = {
  user: [
    {
      id: "profile",
      label: "Profile overview",
      icon: User,
      href: "/profile",
      hasDropdown: true,
      dropdownItems: [
        {
          id: "address",
          label: "Address",
          icon: Home,
          href: "/profile",
          hash: "profileAddress",
        },
      ],
    },
    {
      id: "subscription",
      label: "Subscription plan",
      icon: CreditCard,
      href: "/subscription",
      hasDropdown: false,
    },
    {
      id: "settings",
      label: "Settings",
      icon: SettingsIcon,
      href: "/settings",
      hasDropdown: true,
      dropdownItems: [
        {
          id: "notifications",
          label: "Notification settings",
          href: "/settings",
          hash: "notifications",
        },
        {
          id: "security",
          label: "Security settings",
          href: "/settings",
          hash: "security",
        },
      ],
    },
  ],
  admin: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: MdOutlineDashboard,
      href: "/admin",
      hasDropdown: false,
    },
    {
      id: "user-management",
      label: "User Management",
      icon: LuUserCog,
      href: "/admin/user-management",
      hasDropdown: false,
    },
    {
      id: "property-management",
      label: "Property Management",
      icon: CiHome,
      href: "/property-management",
      hasDropdown: false,
    },
    {
      id: "service-management",
      label: "Service Management",
      icon: MdOutlineHomeRepairService,
      href: "/service-management",
      hasDropdown: false,
    },
    {
      id: "blog-management",
      label: "Blog Management",
      icon: RiArticleLine,
      href: "/blog-management",
      hasDropdown: false,
    },
    {
      id: "settings",
      label: "Settings",
      icon: SettingsIcon,
      href: "/settings",
      hasDropdown: true,
      dropdownItems: [
        {
          id: "notifications",
          label: "Notification settings",
          href: "/settings",
          hash: "notifications",
        },
        {
          id: "security",
          label: "Security settings",
          href: "/settings",
          hash: "security",
        },
      ],
    },
  ],
};

export default function DashboardSidebar() {
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState<string>("");

  // This should come from your auth system
  const userRole: UserRole = "admin";

  // Check if user is admin
  const isAdminUser = userRole === "admin";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = setTimeout(
      () => setCurrentHash(window.location.hash.replace("#", "") || ""),
      0,
    );
    const onHashChange = () =>
      setCurrentHash(window.location.hash.replace("#", "") || "");
    window.addEventListener("hashchange", onHashChange);
    return () => {
      clearTimeout(t);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  // Open dropdown when route matches
  useEffect(() => {
    const routes = routeConfig[userRole] || [];
    routes.forEach((route) => {
      if (route.hasDropdown && pathname === route.href) {
        setOpenDropdowns((prev) =>
          prev.includes(route.id) ? prev : [...prev, route.id],
        );
      }
    });
  }, [pathname, userRole]);

  const toggleDropdown = (routeId: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(routeId)
        ? prev.filter((id) => id !== routeId)
        : [...prev, routeId],
    );
  };

  const isActive = (href: string, hash?: string): boolean => {
    if (hash) {
      return pathname === href && currentHash === hash;
    }
    return pathname === href;
  };

  const currentRoutes = routeConfig[userRole] || [];

  return (
    <div>
      <div className='sticky top-20 max-w-88 h-[calc(100vh-8rem)] border border-[#D1CEC6] border-t-0 flex flex-col justify-between bg-white'>
        <div className='p-4'>
          <h2 className='mb-4 text-[#70706C] font-medium'>
            {!isAdminUser ? "Profile Overview" : "Main Menu"}
          </h2>

          <ul className='space-y-1'>
            {currentRoutes.map((route) => (
              <li key={route.id}>
                {!route.hasDropdown ? (
                  // Simple link without dropdown
                  <Link
                    href={route.href}
                    className={`flex items-center gap-3 py-2.5 px-3 rounded-md transition-colors ${
                      isActive(route.href)
                        ? isAdminUser
                          ? "bg-[#f0f0f0] text-black font-medium"
                          : "text-black"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}>
                    <route.icon
                      size={isAdminUser ? 20 : 18}
                      className='text-gray-500'
                    />
                    <span>{route.label}</span>
                  </Link>
                ) : (
                  // Menu with dropdown
                  <div className='flex flex-col'>
                    <button
                      onClick={() => toggleDropdown(route.id)}
                      className={`text-left py-2.5 px-3 w-full rounded-md flex items-center justify-between transition-colors ${
                        isActive(route.href)
                          ? isAdminUser
                            ? "bg-[#f0f0f0] text-black"
                            : "text-black"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}>
                      <div className='flex items-center gap-3'>
                        <route.icon
                          size={isAdminUser ? 20 : 18}
                          className='text-gray-500'
                        />
                        <span>{route.label}</span>
                      </div>
                      {openDropdowns.includes(route.id) ? (
                        <ChevronUp size={18} className='text-gray-500' />
                      ) : (
                        <ChevronDown size={18} className='text-gray-500' />
                      )}
                    </button>

                    {openDropdowns.includes(route.id) &&
                      route.dropdownItems && (
                        <div className='mt-1 ml-4 pl-4 space-y-1 border-l-2 border-gray-200'>
                          {route.dropdownItems.map((item) => (
                            <Link
                              key={item.id}
                              href={{ pathname: item.href, hash: item.hash }}
                              className={`flex items-center gap-2 py-2 px-3 rounded-md transition-colors ${
                                isActive(item.href, item.hash)
                                  ? isAdminUser
                                    ? "text-black bg-gray-50"
                                    : "text-black"
                                  : "text-gray-600 hover:bg-gray-50"
                              }`}>
                              {item.icon && (
                                <item.icon
                                  size={15}
                                  className='text-gray-500'
                                />
                              )}
                              <span className='text-sm'>{item.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Logout button */}
        <div className='border-t border-[#D1CEC6] p-4'>
          <button
            onClick={() => {
              try {
                localStorage.setItem("isLoggedIn", "false");
              } catch {
                // Handle localStorage error silently
              }
              window.location.href = "/";
            }}
            className='flex items-center gap-3 py-2.5 px-3 rounded-md text-red-600 hover:bg-red-50 transition-colors w-full'>
            <LogOut size={isAdminUser ? 20 : 18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
