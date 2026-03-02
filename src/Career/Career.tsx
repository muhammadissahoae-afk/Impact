"use client";
import CustomFAQ from "@/components/CustomFAQ";
import { FAQ } from "@/components/FQA";
import Tabs from "@/components/Tabs";
import Footer from "@/components/layout/footer/Footer";
import { useState } from "react";
import styles from "./Carrer.module.css";
import { cn } from "@/lib/utils";

const data = [
  {
    id: "item-1",
    title: "Admission Policies",
    content:
      "IAS is committed to academic excellence; providing an international perspective and a comprehensive education; and preparing every student to be future ready IAS is committed to academic excellence.",
  },
  {
    id: "item-2",
    title: "How do I apply for the next academic year?",
    content:
      "You can apply directly through our website by visiting the Admissions page and filling out the online form.",
  },
  {
    id: "item-3",
    title: "What is the tuition fee structure?",
    content:
      "Tuition fees vary by grade level. Please contact our finance department or download the fee structure PDF from our portal.",
  },
  {
    id: "item-4",
    title: "Are there transportation services available?",
    content:
      "Yes, we provide safe and reliable bus transportation covering most major routes in the city.",
  },
];
export default function Career() {
  const [activeFilter, setActiveFilter] = useState("All");
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    // You can add filter logic here later
  };
  const filters = [
    "Content Creator",
    "HR Manager",
    "Content Creator1",
    "Content Creator2",
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full py-[45px] md:py-10 gap-[65px] mobile-padding ">
      <div className="flex lg:flex-row flex-col items-center justify-center h-full lg:gap-1 gap-[10px] w-full">
        <div className={cn(styles.tabList)}>
          {filters.map((filter) => (
            <button
              key={filter}
              className={`px-[25px] py-[11px] text-[16px] lg:text-[18px] ${
                activeFilter === filter
                  ? "btn-blue rounded-[26.5px]"
                  : "btn-soft"
              }`}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        {/* <button
          className={
            careerSelected === "Teacher" ? "btn  btn-blue" : "btn  btn-soft"
          }
          onClick={() => setCareer("Teacher")}
        >
          Teacher
        </button>
        <button
          className={
            careerSelected === "HR Manager" ? "btn  btn-blue" : "btn  btn-soft"
          }
          onClick={() => setCareer("HR Manager")}
        >
          HR Manager
        </button>
        <button
          className={
            careerSelected === "Content Creator"
              ? "btn  btn-blue"
              : "btn  btn-soft"
          }
          onClick={() => setCareer("Content Creator")}
        >
          Content Creator
        </button>
        <button
          className={
            careerSelected === "Content Creator1"
              ? "btn  btn-blue"
              : "btn  btn-soft"
          }
          onClick={() => setCareer("Content Creator1")}
        >
          Content Creator
        </button> */}
      </div>
      <CustomFAQ bg="bg-[#E9EEF3]" faqData={data} />
      {/* <FAQ color="bg-i-bg-alt" items={data} /> */}
      <Footer />
    </div>
  );
}
