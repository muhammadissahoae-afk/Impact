"use client";
import React, { useState } from "react";
import { FaqItem, FAQ_ITEMS } from "@/components/FQA";
import { cn } from "@/lib/utils";

interface Props {
  faqData: FaqItem[];
  bg: string;
  icon?: string;
}
const CustomFAQ = ({ faqData, bg, icon }: Props) => {
  // updated type annotation
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const data = faqData.length == 0 ? FAQ_ITEMS : faqData;
  return (
    <div className="flex flex-col lg:max-w-[75%] w-full  md:gap-7.5 mobile-gap">
      {data.map((item, index) => (
        <div
          key={index}
          className={cn(
            "w-full  rounded-[15px] px-[10px] overflow-hidden transition-all duration-300 cursor-pointer ",
            bg,
          )}
          onClick={() => toggleAccordion(index)}
        >
          <div className="flex items-center justify-between  w-full px-2.25 py-3.75 text-left">
            <p
              className={ cn('text-[16px] font-normal tracking-[-0.8] leading-[150%] text-i-primary',index !== openIndex && "opacity-[0.5]")}
              style={
                {
                  "lg:--custom-font-size": `${16}px`,
                  "--custom-font-size": `${14}px`,
                  letterSpacing: "-0.96px",
                } as React.CSSProperties
              }
            >
              {item.title}
            </p>

            <img
              src={icon ? icon : "/icons/arrow.svg"}
              className={`w-[10px] h-[10px] transition-transform duration-300 ${
                openIndex === index ? "-rotate-90" : ""
              }`}
              alt={openIndex === index ? "Collapse" : "Expand"}
            />
          </div>

          <div
            className={`grid transition-[grid-template-rows] duration-500 ease-out ${
              openIndex === index
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="pb-5 px-5 text-blue  text-light-blue leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomFAQ;
