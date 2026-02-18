"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Bell,
  User,
  ChevronDown,
  ChevronUp,
  Settings as SettingsIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Properties", href: "/properties" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "Contact us", href: "/contact" },
];

const USER_ROLE: "user" | "admin" = "user";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const [mobileOverviewOpen, setMobileOverviewOpen] = useState(false);
  const [mobileSettingsOpen, setMobileSettingsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = setTimeout(() => {
      try {
        setIsLoggedIn(localStorage.getItem("isLoggedIn") !== "false");
      } catch (e) {
        console.error(e);
        setIsLoggedIn(false);
      }
    }, 0);

    const onStorage = (e: StorageEvent) => {
      if (e.key === "isLoggedIn") setIsLoggedIn(e.newValue !== "false");
    };
    window.addEventListener("storage", onStorage);
    return () => {
      clearTimeout(t);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const router = useRouter();
  const profilePath = USER_ROLE === "admin" ? "/admin" : "/profile";

  const doLogin = () => {
    try {
      localStorage.setItem("isLoggedIn", "true");
    } catch {}
    setIsLoggedIn(true);
    router.push(profilePath);
  };
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    // Schedule state sync asynchronously to avoid synchronous setState inside effect
    const t = setTimeout(() => {
      if (pathname === "/profile") {
        setMobileOverviewOpen(true);
        setMobileSettingsOpen(false);
      } else if (pathname === "/notifications" || pathname === "/security") {
        setMobileOverviewOpen(false);
        setMobileSettingsOpen(true);
      } else {
        setMobileOverviewOpen(false);
        setMobileSettingsOpen(false);
      }
    }, 0);
    return () => clearTimeout(t);
  }, [pathname, isLoggedIn]);

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

  return (
    <header
      className={`w-full transition-colors duration-200  ${
        scrolled || open
          ? "bg-white/80 border-b border-gray-200 shadow-sm backdrop-blur-sm "
          : "bg-transparent border-b border-transparent "
      }`}>
      <div className='md:mx-12.5 px-6 lg:px-8 '>
        <div className='flex items-center justify-between h-20'>
          {/* LOGO + tagline */}
          <Link href='/' className='flex flex-col items-start'>
            <div className='flex items-center gap-3'>
              <Image
                src='/logo.png'
                alt='Farrior Homes'
                width={200}
                height={80}
                priority
                className='h-15 w-auto object-contain'
              />
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav
            className={`hidden ${pathname.includes("admin") && "lg:hidden"} lg:flex items-center gap-6 flex-1 justify-start ml-25`}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`
                    text-xl transition-colors duration-200
                    ${
                      isActive
                        ? "text-(--primary) font-semibold"
                        : "text-(--primary-text-color) hover:text-(--primary)"
                    }
                  `}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* DESKTOP ACTIONS - right side */}
          <div className='hidden lg:flex items-center gap-4'>
            {!isLoggedIn ? (
              <>
                <button
                  onClick={doLogin}
                  className='text-xl text-(--primary-text-color) hover:text-gray-900 transition-colors duration-200'>
                  Login
                </button>

                <Link
                  href='/signup'
                  className='px-6 py-2.5 rounded-md bg-[#5B8C7E] text-white text-xl hover:bg-[#4a7365] transition-colors duration-200 shadow-sm'>
                  Sign up
                </Link>
              </>
            ) : (
              <div className='flex items-center gap-4'>
                <button aria-label='Notifications' className='text-gray-700'>
                  <Bell size={20} />
                </button>

                <Link
                  href={profilePath}
                  aria-label='Profile'
                  className='text-gray-700'>
                  <User size={22} />
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
          <div className='flex items-center gap-3 lg:hidden'>
            {isLoggedIn && (
              <div className='relative'>
                <button
                  onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
                  className='text-gray-800 focus:outline-none'
                  aria-label='Mobile profile'>
                  <User size={26} />
                </button>

                {mobileProfileOpen && (
                  <div className='absolute right-0 mt-2 w-60 bg-white border rounded-md shadow-md z-50 p-2'>
                    <button
                      onClick={() => setMobileOverviewOpen(!mobileOverviewOpen)}
                      className={`w-full text-left py-2 px-2 rounded flex items-center justify-between ${
                        mobileOverviewOpen ? "text-black" : "hover:bg-gray-50"
                      }`}>
                      <div className='flex items-center gap-2'>
                        <User size={18} />
                        <span>Profile overview</span>
                      </div>
                      {mobileOverviewOpen ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>

                    {mobileOverviewOpen && (
                      <div className='ml-4 pl-4 border-l-2 border-gray-300'>
                        <Link
                          href='/profile#profileAddress'
                          onClick={(e) => {
                            if (pathname === "/profile") {
                              e.preventDefault();
                              const el =
                                document.getElementById("profileAddress");
                              if (el) {
                                el.scrollIntoView({ behavior: "smooth" });
                                window.history.pushState(
                                  null,
                                  "",
                                  "#profileAddress",
                                );
                                window.dispatchEvent(
                                  new HashChangeEvent("hashchange"),
                                );
                              }
                            }
                            setMobileProfileOpen(false);
                          }}
                          className={`block py-2 px-2 rounded ${
                            pathname === "/profile" &&
                            currentHash === "#profileAddress"
                              ? "text-black"
                              : "hover:bg-gray-50 text-gray-700"
                          }`}>
                          Address
                        </Link>
                      </div>
                    )}

                    <Link
                      href='/subscription'
                      onClick={() => setMobileProfileOpen(false)}
                      className={`block py-2 px-2 rounded ${
                        pathname === "/subscription"
                          ? "text-black"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}>
                      Subscription plan
                    </Link>

                    <div>
                      <button
                        className={`w-full text-left py-2 px-2 rounded flex items-center justify-between ${
                          mobileSettingsOpen ? "text-black" : "hover:bg-gray-50"
                        }`}
                        onClick={() =>
                          setMobileSettingsOpen(!mobileSettingsOpen)
                        }>
                        <div className='flex items-center gap-2'>
                          <SettingsIcon size={18} />
                          <span>Settings</span>
                        </div>
                        {mobileSettingsOpen ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>

                      {mobileSettingsOpen && (
                        <div className='ml-4 pl-4 border-l-2 border-gray-300'>
                          <Link
                            href='/settings#notifications'
                            onClick={(e) => {
                              if (pathname === "/settings") {
                                e.preventDefault();
                                const el =
                                  document.getElementById("notifications");
                                if (el) {
                                  el.scrollIntoView({ behavior: "smooth" });
                                  window.history.pushState(
                                    null,
                                    "",
                                    "#notifications",
                                  );
                                  window.dispatchEvent(
                                    new HashChangeEvent("hashchange"),
                                  );
                                }
                              }
                              setMobileProfileOpen(false);
                            }}
                            className={`block py-2 px-2 rounded ${
                              pathname === "/settings" &&
                              currentHash === "#notifications"
                                ? "text-black"
                                : "hover:bg-gray-50 text-gray-700"
                            }`}>
                            Notification settings
                          </Link>
                          <Link
                            href='/settings#security'
                            onClick={(e) => {
                              if (pathname === "/settings") {
                                e.preventDefault();
                                const el = document.getElementById("security");
                                if (el) {
                                  el.scrollIntoView({ behavior: "smooth" });
                                  window.history.pushState(
                                    null,
                                    "",
                                    "#security",
                                  );
                                  window.dispatchEvent(
                                    new HashChangeEvent("hashchange"),
                                  );
                                }
                              }
                              setMobileProfileOpen(false);
                            }}
                            className={`block py-2 px-2 rounded ${
                              pathname === "/settings" &&
                              currentHash === "#security"
                                ? "text-black"
                                : "hover:bg-gray-50 text-gray-700"
                            }`}>
                            Security settings
                          </Link>
                        </div>
                      )}
                      {/* Mobile logout under settings */}
                      <button
                        onClick={() => {
                          try {
                            localStorage.setItem("isLoggedIn", "false");
                          } catch {}
                          setIsLoggedIn(false);
                          setMobileProfileOpen(false);
                          // reload to ensure layout updates across app
                          window.location.href = "/";
                        }}
                        className='w-full text-left py-2 px-2 rounded text-red-600 hover:bg-gray-50'>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setOpen(!open)}
              className='text-gray-800 focus:outline-none'
              aria-label='Toggle navigation menu'>
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {open && (
          <div className='lg:hidden border-t border-gray-200 py-5 px-4 bg-white'>
            <nav className='flex flex-col gap-2'>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`
                      py-3 px-4 rounded-lg text-base font-medium
                      transition-colors duration-200
                      ${
                        isActive
                          ? "bg-emerald-50 text-emerald-700"
                          : "text-gray-700 hover:bg-gray-50 hover:text-emerald-700"
                      }
                    `}>
                    {item.label}
                  </Link>
                );
              })}

              {!isLoggedIn && (
                <div className='mt-6 pt-6 border-t border-gray-200 flex flex-col gap-4'>
                  <button
                    onClick={() => {
                      setOpen(false);
                      doLogin();
                    }}
                    className='py-3 px-4 text-center text-base font-medium text-(--primary-text-color) hover:bg-gray-50 rounded-lg transition-colors'>
                    Login
                  </button>

                  <Link
                    href='/signup'
                    onClick={() => setOpen(false)}
                    className='py-3 px-4 text-center rounded-lg text-base font-medium bg-[#5B8C7E] text-white hover:bg-[#4a7365] transition-colors'>
                    Sign up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
