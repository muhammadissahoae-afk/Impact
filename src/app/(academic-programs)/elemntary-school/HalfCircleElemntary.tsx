"use client";

import FeatureCard from "@/components/FeatureCard";
import kids from "./kids.png";
import settings from "./settings.gif";
import bioData from "@/svgs/bioData.gif";
import HalfOrbitSection from "@/components/OrbitingFeatureSection/HalfSection";
import OrbitingCard from "../student-support-services/OrbitingCard";

export default function HalfCircleElemntary() {
  return (
    <HalfOrbitSection
      header={{
        title: "Program Highlights",
        heading: "Think Deeply. Care Deeply. Act ",
        accent: "Boldly.",
        textClassName: "md:w-143.75",
      }}
      items={[
        {
          index: 2,
          startDeg: 70,
          render: (isActive) => (
            <FeatureCard
              isActive={isActive}
              icon={kids}
              text="Empathy & Caring"
            />
          ),
        },
        {
          index: 1,
          startDeg: 10,
          render: (isActive) => (
            <FeatureCard
              isActive={isActive}
              text="Project - Based learning"
              icon={settings}
              imageClassName="right-[-0px] bottom-[-20px] "
              imageWidth={228}
              textClassName="w-60"
            />
          ),
        },
        {
          index: 3,
          startDeg: -50,
          render: (isActive) => (
            <OrbitingCard
              isActive={isActive}
              text="Interdisciplinary Approach"
              textClassName="w-full"
              icon={bioData}
              imageWidth={150}
              textDirection="top"
            />
          ),
        },
      ]}
    />
  );
}
