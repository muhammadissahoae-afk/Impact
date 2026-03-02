"use client";
import CardPricing from "@/components/CanteenCard/PrincingCard";
import styles from "./canteen.module.css";
import ItemCard from "@/components/CanteenCard/ItemCard";
// import { Gallery } from "@/components/Gallery/Gallery";
import { Label } from "@radix-ui/react-label";
const data = [
  {
    priceing: "100,00",
    includes: [
      "Includes Recess and Lunch",
      "Includes Recess and Lunch",
      "Includes Recess and Lunch",
      "Includes Recess and Lunch",
      "Includes Recess and Lunch",
    ],
  },
  {
    priceing: "100,00",
    includes: [
      "Includes Recess and Lunch",
      "Includes Recess and Lunch",
      "Includes Recess and Lunch",
      "Includes Recess and Lunch",
      "Includes Recess and Lunch",
    ],
  },
  {
    priceing: "100,00",
    includes: [
      "Includes Recess and Lunch",
      "Includes Recess and Lunch",
      "Includes Recess and Lunch",
      "Includes Recess and Lunch",
      "Includes Recess and Lunch",
    ],
  },
];

import { useState } from "react";
import Footer from "@/components/layout/footer/Footer";
import PrimaryButton from "@/components/PrimaryButton";

export default function Canteen() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Rice & Meat", "Drinks", "Sandwiches"];

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    // You can add filter logic here later
  };
  return (
    <div
      className="flex flex-col items-center w-screen lg:px-[23px]  mobile-padding justify-center pt-[20px] md:pt-[100px] mobile-gap "
      data-nav-theme="light"
    >
      <div className="flex flex-col items-center w-full gap-[65px] pb-[20px] lg:pb-[100px]  ">
        <div className="flex flex-col items-center gap-5">
          <button
            className="GlassButtonMainUp"
            style={
              {
                "--btn-padding": "25px 40px 25px 40px",
              } as React.CSSProperties
            }
          >
            Monthly Plans
          </button>
          <h2 className="text-white text-[30px] lg:text-[48px]">
            Monthly Canteen Plan
          </h2>
        </div>
        <div className="w-full  grid gap-7.5 lg:grid-cols-3 md:grid-cols-2">
          {data.map((item, index) => (
            <CardPricing key={index} data={item} />
          ))}
        </div>
      </div>

      <div
        className="flex flex-col items-center justify-center w-full bg-white rounded-[25px] mobile-padding  py-5 gap-[20px] mb-[20px] lg:mb-[100px] "
        data-nav-theme="dark"
      >
        <div className="flex flex-col lg:flex-row items-center w-full justify-between gap-[20px]">
          <div className="flex flex-col items-start w-full justify-start  gap-[65px] ">
            <div className="flex flex-col items-center w-full justify-end lg:pl-[25%] gap-[20px]">
              <button className="btn-soft text-[18px] px-[25px] py-[11px]">
                Menu
              </button>
              <h2 className="text-i-primary text-[30px] lg:text-[48px]">
                Canteen Menu
              </h2>
            </div>
            <div className={styles.tabList}>
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
          </div>
          <div className="flex flex-col items-center justify-center gap-7.5 lg:hidden">
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </div>
          <div className={`${styles.cardOrang}`}>
            <div className={`${styles.box} ${styles.hiddenForMobile}`}>
              <p className="">Supporting Your Child’s Health and Nutrition</p>
              <PrimaryButton bg="white">Check BMI</PrimaryButton>
            </div>
          </div>
        </div>
        <div className="lg:grid gap-7.5 grid-cols-2 hidden">
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
        <div className={`${styles.box} ${styles.hiddenForDesktop} `}>
          <p className="">Supporting Your Child’s Health and Nutrition</p>
          <PrimaryButton bg="white">Check BMI</PrimaryButton>
        </div>
      </div>
      {/* <Gallery /> */}
      <Footer />
    </div>
  );
}
