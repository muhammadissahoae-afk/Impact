"use client";

import idea from "@/svgs/idea.gif";
import bioData from "@/svgs/bioData.gif";
import HalfOrbitSection from "@/components/OrbitingFeatureSection/HalfSection";
import directionSign from "@/svgs/directionSign.gif";
import FeatureCard from "@/components/FeatureCard";
import OrbitingCard from "../student-support-services/OrbitingCard";

export default function HalfCircleMiddle() {
  return (
    <HalfOrbitSection
      header={{
        title: "Program Highlights",
        heading: "Exploring Ideas, Building ",
        accent: "Understanding",
        textClassName: "md:w-131.5",
      }}
      items={[
        {
          index: 2,
          startDeg: 70,
          render: (isActive) => (
            <FeatureCard
              isActive={isActive}
              text="Self-Directed learning"
              className="justify-start p-6"
              icon={directionSign}
              imageWidth={200}
            />
          ),
        },
        {
          index: 1,
          startDeg: 10,
          render: (isActive) => (
            <OrbitingCard
              isActive={isActive}
              icon={idea}
              text="Critical Thinking"
              text2="Challenges students to solve problems and innovate."
              imageWidth={151}
              imageClassName="relative left-[29%] bottom-[6px] -rotate-12 "
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
              className="justify-start p-6"
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
