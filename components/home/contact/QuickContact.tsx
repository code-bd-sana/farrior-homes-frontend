import Title from "@/components/shared/Title/Title";
import React from "react";
import { FiPhone } from "react-icons/fi";
import { MdOutlineAccessTime, MdOutlineEmail } from "react-icons/md";
import { PiMapPinLine } from "react-icons/pi";

export default function QuickContact() {
  const contactInfo = [
    {
      icon: FiPhone,
      title: "Phone",
      value: "(708)953-1795",
    },
    {
      icon: MdOutlineEmail,
      title: "Email",
      value: "michaelfarrior@farriorhomes.com",
    },
    {
      icon: PiMapPinLine,
      title: "Address",
      value: "South Suburbs, Chicago",
    },
    {
      icon: MdOutlineAccessTime,
      title: "Business Hours",
      value: "Mon - Fri: 09:00 AM - 07:00 PM",
      closed: "Sat - Sun: Closed",
    },
  ];
  return (
    <div>
      <Title
        title={"Quick Contact"}
        titleClass={"text-[20px] md:text-[24px] jost-600 font-bold mb-4"}
      />
      <div>
        {contactInfo.map((info, index) => (
          <div
            key={index}
            className='flex items-start gap-4 mb-6 md:mb-10 text-sm md:text-[18px] text-(--primary-text-color)'>
            <div className='w-10 h-10 md:w-12 md:h-12 bg-[#A3C7B3] rounded-lg text-center flex items-center justify-center text-[#304C3E] text-lg md:text-2xl '>
              {React.createElement(info.icon)}
            </div>
            <div className='flex flex-col justify-start items-start text-left'>
              <p className='font-medium text-[#619B7F] text-sm'>{info.title}</p>
              <p className='text-(--primary-text-color) text-[14px]'>
                {info.value}
                {info.closed && (
                  <span className='block text-[14px] -mt-1'>
                    <span className='text-(--primary-text-color)'>
                      Sat - Sun:{" "}
                    </span>
                    <span className='text-red-600'>Closed</span>
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
