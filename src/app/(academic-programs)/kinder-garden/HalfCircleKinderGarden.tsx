"use client";

import FeatureCard from "@/components/FeatureCard";
import child from "./child.png";
import numberCubs from "@/svgs/numberCubs.gif";
import HalfOrbitSection from "@/components/OrbitingFeatureSection/HalfSection";
import flower from "@/svgs/flowers.gif";
import flower2 from "@/svgs/flowers2.gif";
export default function HalfCircleKinderGarden() {
  return (
    <HalfOrbitSection
      header={{
        title: "Program Highlights",
        heading: "Curious to Explore, Ready to",
        accent: "Grow",
        textClassName: "text-center md:w-152",
      }}
      items={[
        {
          index: 2,
          startDeg: 70,
          render: (isActive) => (
            <FeatureCard
              isActive={isActive}
              icon={child}
              text="Exploration & Independence"
            />
          ),
        },
        {
          index: 1,
          startDeg: 10,
          render: (isActive) => (
            <FeatureCard
              isActive={isActive}
              text="Play - Based learning"
              imageClassName=" bottom-[-15px] w-[60%]"
              icon={numberCubs}
              imageWidth={120}
            />
          ),
        },
        {
          index: 3,
          startDeg: -50,
          render: (isActive) => (
            <FeatureCard
              isActive={isActive}
              icon={flower}
              text="Holistic Development & wellbeing"
              textClassName="w-68"
              imageClassName="w-[58%] right-[-22px]"
              icon2={flower2}
              image2ClassName="w-[30%] right-[100px] scale-x-[-1]"
            />
          ),
        },
      ]}
    />
  );
}
