/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
//teaching-philosophy
import { useMemo, useState } from "react";

import Tabs from "@/components/Tabs";
import IconCard from "@/components/OrbitingFeatureSection/IconCard";
import OrbitCircles, {
  OrbitCirclesProps,
} from "@/components/OrbitingFeatureSection/OrbitCircles";

import book from "@/svgs/book.svg";
import Capa from "@/svgs/Capa.svg";
import brush from "@/svgs/brush.svg";
import people from "@/svgs/people.svg";
import share from "@/svgs/share.svg";
import CPU from "@/svgs/cpu-charge.svg";
import Profile from "./profile.svg";
import Note from "./note-text.svg";
import Message from "./message-question.svg";
import briefcase from "@/svgs/briefcase.svg";
import lampCharge from "./lamp-charge.svg";
import MobileAround, {
  MobileAroundItem,
} from "@/components/OrbitingFeatureSection/MobileAround";

const RING_SM = "border-white/30 bg-[#0857a003] shadow-[var(--shadow-ring-sm)]";
const RING_MD = "border-white/30 bg-[#0857a003] shadow-[var(--shadow-ring-md)]";
const RING_LG = "border-white bg-[#0857a003] shadow-[var(--shadow-ring-lg)]";

// Keep the same geometry you already used
const ANGLES = {
  right: 100,
  topRight: 30,
  left: 240,
  topLeft: 300,
  bottom: 160,
};
const iconsConfig = {
  right: {
    "Kinder Garden": book,
    "Elementary School": CPU,
    "Middle School": Profile,
    "High School": CPU,
  },
  topRight: {
    "Kinder Garden": Capa,
    "Elementary School": Note,
    "Middle School": Note,
    "High School": share,
  },
  left: {
    "Kinder Garden": brush,
    "Elementary School": Message,
    "Middle School": Message,
    "High School": Profile,
  },
  topLeft: {
    "Kinder Garden": share,
    "Elementary School": share,
    "Middle School": share,
    "High School": briefcase,
  },
  bottom: {
    "Kinder Garden": people,
    "Elementary School": people,
    "Middle School": lampCharge,
    "High School": lampCharge,
  },
};
const makeCircles = (
  gradeLabel: string,
  labels: {
    topLeft: string;
    topRight: string;
    left: string;
    right: string;
    bottom: string;
  },
): OrbitCirclesProps => ({
  rootProps: {
    // OrbitSystem.Root requires children in its type, OrbitCircles will provide real children.
    children: null,

    label: gradeLabel,
    heading: "Approaches per Grades",
    accent: "Teaching",
    buttonText: "Register Now",
  },
  rings: [
    // ring 1 (RIGHT card)
    {
      id: `${gradeLabel}-r1`,
      ring: 1,
      speed: 3,
      className: RING_SM,
      items: [
        {
          id: `${gradeLabel}-right`,
          kind: "edgeAligned",
          angle: ANGLES.right,
          arcDeg: 18,
          pingPongDirection: "counterclockwise",
          position: "bottom-right",
          content: (
            <IconCard
              icon={
                iconsConfig.right[gradeLabel as keyof typeof iconsConfig.right]
              }
              label={labels.right}
              className="bg-i-secondary"
              directions="rtl"
            />
          ),
        },
      ],
    },

    // ring 2 (TOP-RIGHT + LEFT + TOP-LEFT)
    {
      id: `${gradeLabel}-r2`,
      ring: 2,
      speed: 3,
      className: RING_MD,
      items: [
        {
          id: `${gradeLabel}-topRight`,
          kind: "item",
          angle: ANGLES.topRight,
          arcDeg: 18,
          pingPongDirection: "clockwise",
          position: "top-right",
          content: (
            <IconCard
              icon={
                iconsConfig.topRight[
                  gradeLabel as keyof typeof iconsConfig.topRight
                ]
              }
              label={labels.topRight}
              className="bg-i-secondary-2"
              directions="rtl"
            />
          ),
        },
        {
          id: `${gradeLabel}-left`,
          kind: "item",
          angle: ANGLES.left,
          arcDeg: 18,
          pingPongDirection: "clockwise",
          position: "bottom-left",
          content: (
            <IconCard
              icon={
                iconsConfig.left[gradeLabel as keyof typeof iconsConfig.left]
              }
              label={labels.left}
              className="bg-i-secondary-2"
            />
          ),
        },
        {
          id: `${gradeLabel}-topLeft`,
          kind: "item",
          angle: ANGLES.topLeft,
          arcDeg: 18,
          pingPongDirection: "clockwise",
          position: "top-left",
          content: (
            <IconCard
              icon={
                iconsConfig.topLeft[
                  gradeLabel as keyof typeof iconsConfig.topLeft
                ]
              }
              label={labels.topLeft}
              className="bg-i-light-blue"
            />
          ),
        },
      ],
    },

    // ring 3 (BOTTOM card)
    {
      id: `${gradeLabel}-r3`,
      ring: 3,
      speed: 3,
      className: RING_LG,
      items: [
        {
          id: `${gradeLabel}-bottom`,
          kind: "item",
          angle: ANGLES.bottom,
          arcDeg: 18,
          pingPongDirection: "clockwise",
          content: (
            <IconCard
              icon={
                iconsConfig.bottom[
                  gradeLabel as keyof typeof iconsConfig.bottom
                ]
              }
              label={labels.bottom}
              className="bg-i-light-blue"
              directions="rtl"
            />
          ),
        },
      ],
    },
  ],
});

export default function Circles() {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = useMemo(
    () => [
      "Kinder Garden",
      "Elementary School",
      "Middle School",
      "High School",
    ],
    [],
  );

  const circlesByTab = useMemo<OrbitCirclesProps[]>(
    () => [
      // ✅ Kinder Garden (as in image)
      makeCircles("Kinder Garden", {
        topLeft: "Exploration",
        topRight: "Play Based Learning",
        left: "Hands-on Experiences",
        right: "Literacy",
        bottom: "Social Emotional development",
      }),

      // ✅ Elementary School
      makeCircles("Elementary School", {
        topLeft: "Interdisciplinary Learning",
        topRight: "Project-based learning",
        left: "Inquiry-based learning",
        right: "Technology-Enhanced learning",
        bottom: "Social Emotional development",
      }),

      // ✅ Middle School
      makeCircles("Middle School", {
        topLeft: "Interdisciplinary Learning",
        topRight: "Project-based learning",
        left: "Inquiry-based learning",
        right: "Self-Directed Learning",
        bottom: "Critical Thinking",
      }),

      // ✅ High School
      makeCircles("High School", {
        topLeft: "Career-Connected Learning",
        topRight: "Holistic Education",
        left: "Soft Skills Sevelopment",
        right: "Technology-Enhanced Learning",
        bottom: "Experiential & Applied Learning",
      }),
    ],
    [],
  );
  const mobileItemsByTab: Record<number, MobileAroundItem[]> = {
    0: [
      {
        text: "Exploration",
        desc: "",
        icon: share,
        iconBgClassName: "bg-i-lightblue",
      },
      {
        text: "Play Based Learning",
        desc: "",
        icon: Capa,
        iconBgClassName: "bg-i-secondary-2",
      },
      {
        text: "Hands-on Experiences",
        desc: "",
        icon: brush,
        iconBgClassName: "bg-i-secondary",
      },
      {
        text: "Literacy",
        desc: "",
        icon: book,
        iconBgClassName: "bg-i-lightblue",
      },
      {
        text: "Social Emotional development",
        desc: "",
        icon: people,
        iconBgClassName: "bg-i-secondary-2",
      },
    ],
    1: [
      {
        text: "Interdisciplinary Learning",
        desc: "",
        icon: share,
        iconBgClassName: "bg-i-lightblue",
      },
      {
        text: "Project-based learning",
        desc: "",
        icon: Note,
        iconBgClassName: "bg-i-secondary-2",
      },
      {
        text: "Inquiry-based learning",
        desc: "",
        icon: Message,
        iconBgClassName: "bg-i-secondary",
      },
      {
        text: "Technology-Enhanced learning",
        desc: "",
        icon: CPU,
        iconBgClassName: "bg-i-lightblue",
      },
      {
        text: "Social Emotional development",
        desc: "",
        icon: people,
        iconBgClassName: "bg-i-secondary-2",
      },
    ],
    2: [
      {
        text: "Interdisciplinary Learning",
        desc: "",
        icon: share,
        iconBgClassName: "bg-i-lightblue",
      },
      {
        text: "Project-based learning",
        desc: "",
        icon: Note,
        iconBgClassName: "bg-i-secondary-2",
      },
      {
        text: "Inquiry-based learning",
        desc: "",
        icon: Message,
        iconBgClassName: "bg-i-secondary",
      },
      {
        text: "Self-Directed Learning",
        desc: "",
        icon: Profile,
        iconBgClassName: "bg-i-lightblue",
      },
      {
        text: "Critical Thinking",
        desc: "",
        icon: lampCharge,
        iconBgClassName: "bg-i-secondary-2",
      },
    ],
    3: [
      {
        text: "Career-Connected Learning",
        desc: "",
        icon: briefcase,
        iconBgClassName: "bg-i-lightblue",
      },
      {
        text: "Holistic Education",
        desc: "",
        icon: share,
        iconBgClassName: "bg-i-secondary-2",
      },
      {
        text: "Soft Skills Sevelopment",
        desc: "",
        icon: Profile,
        iconBgClassName: "bg-i-secondary",
      },
      {
        text: "Technology-Enhanced Learning",
        desc: "",
        icon: briefcase,
        iconBgClassName: "bg-i-lightblue",
      },
      {
        text: "Experiential & Applied Learning",
        desc: "",
        icon: lampCharge,
        iconBgClassName: "bg-i-secondary-2",
      },
    ],
  };

  const mobileTitle = {
    0: { excent: "", text: "Kinder Garden" },
    1: { excent: "", text: "Elementary School" },
    2: { excent: "", text: "Middle School" },
    3: { excent: "", text: "High School" },
  };
  console.log("circlesByTab[selectedTab]", circlesByTab[selectedTab]);
  return (
    <section className=" w-full h-[100.8vh] flex-nowrap  md:flex flex-col md:px-5">
      <div className="bg-linear-to-b from-i-bg-2 via-i-bg-alt to-i-bg-2 rounded-3xl w-full h-full  pt-12.5">
        <Tabs
          items={tabs}
          containerClassName="w-full  pr-10 md:w-fit max-w-full h-fit ml-[2.7%]"
          tabClassName="w-fit flex-wrap"
          contentClassName="text-[16px] w-fit md:text-[18px]"
          onTabChange={(index) => setSelectedTab(index)}
          background="gray"
        />
        <OrbitCircles {...circlesByTab[selectedTab]}  subContainerClassName="h-[90%]"/>
        <div className="w-full ">
          <MobileAround
            items={mobileItemsByTab[selectedTab]}
            title={mobileTitle[selectedTab as 0 | 1 | 2 | 3]}
          />
        </div>
      </div>
    </section>
  );
}
