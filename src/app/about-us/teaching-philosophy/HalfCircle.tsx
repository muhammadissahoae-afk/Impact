"use client";

import FeatureCard from "@/components/FeatureCard";
import idea from "@/svgs/idea.gif";
import chat from "@/svgs/chat.gif";
import BioData from "@/svgs/bioData.gif";

import HalfOrbitSection from "@/components/OrbitingFeatureSection/HalfSection";
import OrbitingCard from "@/app/(academic-programs)/student-support-services/OrbitingCard";

export default function HalfCircle() {
  return (
    <HalfOrbitSection
      header={{
        title: "Rich Elective Program",
        heading: "Our Rich Elective Program",
        accent: "Embeds ...",
        textClassName: "text-center md:w-156.75",
      }}
      items={[
        {
          index: 2,
          startDeg: 70,
          render: (isActive) => (
            <OrbitingCard
              isActive={isActive}
              text="Understanding"
              text2="Effective comprehension and synthesis of information."
              icon={chat}
              imageWidth={151}
              imageClassName=" "
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
              text="Knowleldge"
              text2="Broad and deep understanding across disciplines."
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
              text="Skills Development"
              textClassName="w-68"
              icon={BioData}
              imageWidth={151}
              imageClassName="relative left-[0] bottom-[6px] -rotate-12 "
              textDirection="top"
            />
          ),
        },
      ]}
    />
  );
}
