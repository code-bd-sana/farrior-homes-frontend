"use client";

import { useState } from "react";

export interface AccordionItem {
  title: string;
  description: string;
}

interface AccordionProps {
  items: AccordionItem[];
  bgColor?: string;
  containerClass?: string;
  itemClass?: string;
  headerClass?: string;
  titleClass?: string;
  toggleClass?: string;
  contentClass?: string;
  descriptionClass?: string;
}

export default function Accordion({
  items,
  bgColor = "bg-[#619B7F]",
  containerClass = "rounded-2xl overflow-hidden",
  itemClass = "border-white/20 border-b",
  headerClass = "w-full flex items-center justify-between py-4 text-left transition-opacity duration-200",
  titleClass = "text-white text-2xl md:text-2xl",
  toggleClass = "text-white text-2xl md:text-3xl font-light leading-none shrink-0 ml-4",
  contentClass = "pb-4",
  descriptionClass = "text-white/80 text-[13px] md:text-[14px] max-w-300 leading-relaxed",
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`${containerClass} ${bgColor}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`${itemClass} ${index !== 0 ? "border-t" : ""}`}>
            {/* Header Row */}
            <button onClick={() => handleToggle(index)} className={headerClass}>
              <span className={titleClass}>{item.title}</span>
              <span className={toggleClass}>{isOpen ? "−" : "+"}</span>
            </button>

            {/* Drawer Content */}
            {isOpen && (
              <div className={contentClass}>
                <p className={descriptionClass}>{item.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
