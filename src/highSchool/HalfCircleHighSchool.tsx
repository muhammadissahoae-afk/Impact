"use client";

import FeatureCard from "@/components/FeatureCard";
// import OrbitingCard from "@/app/academic-programs/student-support-services/OrbitingCard";
import idea from "@/svgs/idea.gif";
import chat from "@/svgs/chat.gif";
import HalfOrbitSection from "@/components/OrbitingFeatureSection/HalfSection";
import child from "./child.png";
import OrbitingCard from "@/app/(academic-programs)/student-support-services/OrbitingCard";

export default function HalfCircleHighSchool() {
  return (
    <HalfOrbitSection
      header={{
        title: "Rich Elective Program",
        heading: "Our Rich Elective Program",
        accent: "Embeds ...",
        textClassName: "md:w-142.25",
      }}
      items={[
        {
          index: 2,
          startDeg: 70,
          render: (isActive) => (
            <FeatureCard
              isActive={isActive}
              icon={child}
              text="40 + Diverse Offerings"
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
              text="Innovative Learning "
              text2="project-based learning, research projects, and community initiatives."
              imageWidth={151}
              imageClassName="relative left-[29%] bottom-[6px] -rotate-12 "
            />
          ),
        },
        {
          index: 3,
          startDeg: -50,
          render: (isActive) => (
            <FeatureCard
              isActive={isActive}
              text="Student Voice & Feedback"
              textClassName="w-68"
              imageClassName="w-[58%] right-[-15px]"
              icon={chat}
              imageWidth={151}
            />
          ),
        },
      ]}
    />
  );
}
