"use client";

import Link from "next/link";
import Title from "../shared/Title/Title";

const HomeBanner = () => {
  return (
    <section className='w-full relative'>
      {/* Hero container */}
      <div className='relative h-140 md:h-190 overflow-hidden'>
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster='/banner.png'
          className='absolute inset-0 w-full h-full object-cover'>
          <source src='/banner.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for text contrast */}
        <div className='absolute inset-0 bg-black/55 md:bg-black/35' />

        {/* Content overlay */}
        <div className='relative z-10 h-full flex items-center justify-start text-start md:mx-12.5 px-6 lg:px-8  mt-10'>
          <div className='max-w-5xl '>
            <Title
              title={"Your Trusted Real Estate Partner in the South Suburbs"}
              subtitle={
                "Providing exceptional real estate services while proudly advocating for the communities we serve."
              }
              titleClass={
                "text-white max-w-210 text-5xl md:text-[64px] font-bold"
              }
              subtitleClass={
                "text-white/90 text-lg font-light sm:text-xl md:text-2xl mb-10 md:mb-12 max-w-3xl mt-3.25"
              }
            />

            {/* Buttons */}
            <div className='flex flex-col sm:flex-row items-start justify-start gap-3 sm:gap-6 mb-10 md:mb-0'>
              <Link
                href='/properties'
                className='
                  inline-flex items-center justify-center
                  px-8 py-4 rounded-lg
                  bg-(--primary) hover:bg-emerald-700
                  text-white text-lg md:text-xl
                  transition-colors duration-200
                  shadow-md hover:shadow-lg min-w-10
                  md:min-w-20 
                '>
                Search properties
              </Link>

              <Link
                href='/services'
                className='
                  inline-flex items-center justify-center
                  px-8 py-4 rounded-lg
                  border border-white
                  text-white text-lg md:text-xl
                  hover:bg-white/30
                  transition-colors duration-200
                  min-w-10 md:min-w-20
                '>
                Look for services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
