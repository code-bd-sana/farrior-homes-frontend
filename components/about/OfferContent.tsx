"use client";

import { useState } from "react";
import Title from "../shared/Title/Title";

export default function OfferContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='md:mx-12.5 px-6 lg:px-8 mt-12 md:mt-28 mb-6 md:mb-12'>
      <div className='md:mx-24'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-18 items-center justify-between'>
          {/* Left Content — Accordion */}
          <div className='col-span-1 md:col-span-7'>
            <div
              className='rounded-2xl overflow-hidden'
              style={{ backgroundColor: "#619B7F" }}>
              {communityData.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={`border-white/20 ${
                      index !== 0 ? "border-t" : ""
                    }`}>
                    {/* Header Row */}
                    <button
                      onClick={() => handleToggle(index)}
                      className='w-full flex items-center justify-between px-8 py-6 text-left'>
                      <span className='text-white text-xl md:text-2xl'>
                        {item.title}
                      </span>
                      <span className='text-white text-2xl md:text-3xl font-light leading-none shrink-0 ml-4'>
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {/* Drawer Content */}
                    {isOpen && (
                      <div className='px-8 pb-8'>
                        <p className='text-white/80 text-[16px] max-w-200 leading-relaxed'>
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
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
