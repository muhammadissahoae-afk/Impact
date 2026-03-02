"use client";

import OrbitingCard from "./OrbitingCard";
import Alarm from "./alarm.gif";
import Alarm2 from "./alarm2.gif";
import modification from "./modification.gif";
import modification2 from "./modification2.gif";
import eucationPlan from "./educationPlan.gif";
import HalfOrbitSection from "@/components/OrbitingFeatureSection/HalfSection";

export default function Orbiting() {
  return (
    <HalfOrbitSection
      header={{
        title: "Components",
        heading: "Components of High Quality",
        accent: "Learning",
      }}
      items={[
        {
          index: 2,
          startDeg: 70,
          render: (isActive) => (
            <OrbitingCard
              isActive={isActive}
              icon={isActive ? Alarm.src : Alarm2.src}
              text="After School Intervention"
              imageWidth={255}
              imageClassName="h-[170px] w-[170px]"
            />
          ),
        },
        {
          index: 1,
          startDeg: 10,
          render: (isActive) => (
            <OrbitingCard
              isActive={isActive}
              icon={isActive ? modification.src : modification2.src}
              text="Curriculum Modification"
              text2="Adjustments to the standard curriculum to meet the needs of students."
              imageWidth={255}
              imageClassName="h-[151px] w-[151px]"
            />
          ),
        },
        {
          index: 3,
          startDeg: -50,
          render: (isActive) => (
            <OrbitingCard
              isActive={isActive}
              text="Individual Education Plan"
              text2="Customized plans that outline goals & support strategies for each students."
              imageWidth={255}
              imageClassName="h-[170px] w-[170px]"
              icon={eucationPlan}
            />
          ),
        },
      ]}
    />
  );
}
