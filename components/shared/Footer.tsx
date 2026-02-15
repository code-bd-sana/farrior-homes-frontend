import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const footerItems = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
  ];
  const servicesItems = [
    { label: "Buy Property", href: "/services/buying" },
    { label: "Rent Property", href: "/services/renting" },
    { label: "Sell Property", href: "/services/selling" },
    { label: "Property Management", href: "/services/property-management" },
  ];
  const footerLogo = [
    {
      href: "facebook.com",
      icon: Facebook,
    },
    {
      href: "twitter.com",
      icon: Twitter,
    },
    {
      href: "instagram.com",
      icon: Instagram,
    },
    {
      href: "linkedin.com",
      icon: Linkedin,
    },
  ];
  return (
    <div>
      <div className='bg-[#304C3E] text-white py-20'>
        <div className='md:mx-12.5 px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div>
              {/* LOGO + tagline */}
              <Link href='/' className='flex flex-col items-start'>
                <div className='flex items-center gap-3'>
                  <Image
                    src='/logo-white.jpg'
                    alt='Farior Homes'
                    width={200}
                    height={80}
                    priority
                    className='h-15 w-auto object-contain'
                  />
                </div>
              </Link>
              <p className='text-sm mt-4'>
                “Saving Living, One House at a Time”
              </p>
              <div className='flex space-x-4 mt-10'>
                {footerLogo.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target='_blank'
                    rel='noopener noreferrer'>
                    <div
                      className='
                    w-10 h-10 md:w-11 md:h-11 bg-white rounded-full flex items-center justify-center mb-6 md:mb-8'>
                      <item.icon className='w-6 h-6 md:w-7 md:h-7 text-(--primary) font-extralight' />
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className='text-xl font-bold mb-4'>Quick Links</h3>
              <ul className='space-y-2 text-sm'>
                {footerItems.map((item, idx) => (
                  <li key={idx}>
                    <Link href={item.href} className='hover:underline'>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className='text-xl font-bold mb-4'>Services</h3>
              <ul className='space-y-2 text-sm'>
                {servicesItems.map((item, idx) => (
                  <li key={idx}>
                    <Link href={item.href} className='hover:underline'>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className='text-xl font-bold mb-4'>Contact</h3>
              <ul className='space-y-2 text-sm'>
                <li>
                  <div className='flex items-center gap-x-2'>
                    <MapPin className='h-4.5 w-4.5' />
                    <p>South Suburbs, Chicago</p>
                  </div>
                </li>
                <li>
                  <div className='flex items-center gap-x-2'>
                    <Mail className='h-4.5 w-4.5' />
                    <p>michaelfarrior@farriorhomes.com</p>
                  </div>
                </li>
                <li>
                  <div className='flex items-center gap-x-2'>
                    <Phone className='h-4.5 w-4.5' />
                    <p>(708)953-1795</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className='flex justify-between items-center md:mx-12.5 text-[#304C3E]'>
        <div className='text-center text-sm p-5'>
          Copyright &copy; {new Date().getFullYear()} 2026 Farrior Homes INC.
          All Rights Reserved.
        </div>
        <div>
          <ul className='flex space-x-4 justify-center text-sm'>
            <li>
              <Link href='/terms' className='text-sm hover:underline'>
                Terms of Us
              </Link>
            </li>
            <li>
              <Link href='/privacy' className='text-sm hover:underline'>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href='/cookie-policy' className='text-sm hover:underline'>
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
