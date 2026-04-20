import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className='bg-white min-h-dvh py-6 px-4 sm:py-8 sm:px-6 flex flex-col justify-center items-center'>
      {/* Logo at the top center - Clickable */}
      <div className='flex justify-center mb-8 sm:mb-10 fshrink-0'>
        <Link href='/' className='inline-block'>
          <Image
            src='/logo.png'
            alt='Farrior Homes Logo'
            width={190}
            height={52}
            priority
            className='h-9 sm:h-10 md:h-12 w-auto object-contain'
          />
        </Link>
      </div>

      {/* Main Content */}
      <div className=' flex items-center justify-center pb-12'>
        <div className='w-full max-w-md sm:max-w-lg text-center'>
          {/* 404 Number with Abhaya Libre */}
          <div className='mb-6'>
            <h1 className='abhaya-libre-extrabold text-[110px] sm:text-[140px] md:text-[160px] leading-none tracking-[-4px] text-(--primary-text-color)'>
              404
            </h1>
          </div>

          {/* Title */}
          <h2 className='text-2xl sm:text-3xl font-semibold text-(--primary-text-color) mb-3'>
            Page Not Found
          </h2>

          {/* Description */}
          <p className='text-sm sm:text-base text-(--shop-pagination-text) max-w-sm mx-auto mb-10'>
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved. Don&apos;t worry, let&apos;s get you back to Home.
          </p>

          {/* Primary Button - Back to Home */}
          <Link
            href='/'
            className='inline-block w-full sm:w-auto px-12 py-3.5 sm:py-4 bg-(--primary) hover:bg-[#437c61] text-(--button-text) font-semibold rounded-full transition-all duration-150 active:scale-[0.98] text-base shadow-sm'>
            Go Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
