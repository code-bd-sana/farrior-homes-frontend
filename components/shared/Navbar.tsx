"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Properties", href: "/properties" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "Contact us", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
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
                alt='Farior Homes'
                width={200}
                height={80}
                priority
                className='h-15 w-auto object-contain'
              />
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className='hidden lg:flex items-center gap-6 flex-1 justify-start ml-25'>
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
          <div className='hidden lg:flex items-center gap-6'>
            <Link
              href='/login'
              className='
                text-xl text-(--primary-text-color)
                hover:text-gray-900 transition-colors duration-200
              '>
              Login
            </Link>

            <Link
              href='/signup'
              className='
                px-6 py-2.5 rounded-md
                bg-[#5B8C7E] text-white text-xl 
                hover:bg-[#4a7365] transition-colors duration-200
                shadow-sm
              '>
              Sign up
            </Link>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setOpen(!open)}
            className='lg:hidden text-gray-800 focus:outline-none'
            aria-label='Toggle navigation menu'>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
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

              <div className='mt-6 pt-6 border-t border-gray-200 flex flex-col gap-4'>
                <Link
                  href='/login'
                  onClick={() => setOpen(false)}
                  className='
                    py-3 px-4 text-center text-base font-medium
                    text-(--primary-text-color) hover:bg-gray-50 rounded-lg transition-colors
                  '>
                  Login
                </Link>

                <Link
                  href='/signup'
                  onClick={() => setOpen(false)}
                  className='
                    py-3 px-4 text-center rounded-lg text-base font-medium
                    bg-[#5B8C7E] text-white hover:bg-[#4a7365] transition-colors
                  '>
                  Sign up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
