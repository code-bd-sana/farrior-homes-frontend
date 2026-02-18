"use client";

import Title from "@/components/shared/Title/Title";
import Accordion from "@/components/shared/Accordion/Accordion";

export default function OfferContent() {
  const communityData = [
    {
      title: "Free Consultations",
      description:
        "We offer free initial consultations to understand your real estate needs, goals, and budget. During this session, our experts provide honest guidance, market insights, and personalized recommendations—helping you make informed decisions without any obligation.",
    },
    {
      title: "Creative and Smart Solutions",
      description:
        "We bring innovative thinking and strategic expertise to every transaction. Our team leverages the latest market data and creative approaches to find solutions that maximize value for buyers and sellers alike.",
    },
    {
      title: "24/7 Premium Support",
      description:
        "Real estate doesn't stop at 5pm, and neither do we. Our dedicated team is available around the clock to answer your questions, address concerns, and guide you through every step of the process.",
    },
  ];

  return (
    <div className='md:mx-12.5 px-6 lg:px-8 mt-12 md:mt-28 mb-6 md:mb-12'>
      <div className='md:mx-24'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-18 items-center justify-between'>
          {/* Left Content — Accordion */}
          <div className='col-span-1 md:col-span-7'>
            <Accordion
              items={communityData}
              bgColor='bg-[#619B7F]'
              titleClass='text-white !text-[18px] md:!text-2xl'
              containerClass='rounded-2xl overflow-hidden px-5'
            />
          </div>

          {/* Right Content */}
          <div className='flex flex-col justify-center cols-span-1 md:col-span-5'>
            <div className='flex items-center gap-3  bg-[#F4F8F6] w-max px-3 py-1 rounded-full'>
              <div className='w-2 h-2 rounded-full bg-[#5A7B6C]'></div>
              <p className='text-[#5A7B6C] text-sm font-medium'>
                What We Offer
              </p>
            </div>

            <Title
              title={"Comprehensive Services Focused on South Suburbs Living"}
              subtitle={
                "We provide a full suite of real estate services specifically tailored for the South Suburbs market. Our goal is to make every transaction seamless, successful, and aligned with our mission of local community support."
              }
              titleClass={"text-3xl md:text-[48px] mt-5 max-w-[600px]"}
              subtitleClass={
                "text-xl md:text-[22px] text-[#70706C] max-w-[570px] jost-400 mt-5 md:mt-28"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
