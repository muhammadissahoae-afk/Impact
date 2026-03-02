/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
//extracurricular-activities
import { useMemo, useState } from "react";
import Tabs from "@/components/Tabs";
import IconCard from "@/components/OrbitingFeatureSection/IconCard";
import MobileAround, {
  MobileAroundItem,
} from "@/components/OrbitingFeatureSection/MobileAround";

// ✅ use the same icons you already had in this folder
import book from "@/svgs/book.svg";
import Capa from "@/svgs/Capa.svg";
import brush from "@/svgs/brush.svg";
import people from "@/svgs/people.svg";
import share from "@/svgs/share.svg";
import Capa1 from "@/svgs/Capa1.svg";
import briefcase from "@/svgs/briefcase.svg";
import Frame from "./Frame.svg";
import Message from "./message-question.svg";
import Clock from "./clock.svg";
import OrbitCircles, {
  OrbitCirclesProps,
} from "@/components/OrbitingFeatureSection/OrbitCircles";

const tabs = ["Extracurricular Activities", "Outcome"];

const RING_SM = "border-white/30 bg-[#0857a003] shadow-[var(--shadow-ring-sm)]";
const RING_MD = "border-white/30 bg-[#0857a003] shadow-[var(--shadow-ring-md)]";
const RING_LG = "border-white bg-[#0857a003] shadow-[var(--shadow-ring-lg)]";

// matches your existing geometry
const ANGLES = {
  right: 100,
  topRight: 30,
  left: 240,
  topLeft: 300,
  bottom: 160,
};

function buildConfig(content: {
  topLeft: { text: string; color: "blue" | "orange" | "red"; icon: any };
  topRight: { text: string; color: "blue" | "orange" | "red"; icon: any };
  left: { text: string; color: "blue" | "orange" | "red"; icon: any };
  right: { text: string; color: "blue" | "orange" | "red"; icon: any };
  bottom: { text: string; color: "blue" | "orange" | "red"; icon: any };
}): OrbitCirclesProps {
  const colorClass = (c: "blue" | "orange" | "red") => {
    if (c === "blue") return "bg-i-lightblue";
    if (c === "orange") return "bg-i-secondary-2";
    return "bg-i-secondary"; // ✅ red in your screenshot
  };

  return {
    containerClassName: "h-full",
    rootProps: {
      children: null,
      label: "Activities",
      heading: "Activities",
      accent: "Extracurricular",
      buttonText: "Register Now",
      // description: "", // optional
    },
    rings: [
      // Ring 1: RIGHT item
      {
        id: "ea-ring-1",
        ring: 1,
        speed: 3,
        className: RING_SM,
        items: [
          {
            id: "ea-right",
            kind: "edgeAligned",
            angle: ANGLES.right,
            arcDeg: 18,
            pingPongDirection: "counterclockwise",
            position: "bottom-right",
            content: (
              <IconCard
                icon={content.right.icon}
                label={content.right.text}
                className={colorClass(content.right.color)}
                directions="rtl"
              />
            ),
          },
        ],
      },

      // Ring 2: TOP-RIGHT + LEFT + TOP-LEFT
      {
        id: "ea-ring-2",
        ring: 2,
        speed: 3,
        className: RING_MD,
        items: [
          {
            id: "ea-top-right",
            kind: "item",
            angle: ANGLES.topRight,
            arcDeg: 18,
            pingPongDirection: "clockwise",
            position: "top-right",
            content: (
              <IconCard
                icon={content.topRight.icon}
                label={content.topRight.text}
                className={colorClass(content.topRight.color)}
                directions="rtl"
              />
            ),
          },
          {
            id: "ea-left",
            kind: "item",
            angle: ANGLES.left,
            arcDeg: 18,
            pingPongDirection: "clockwise",
            position: "bottom-left",
            content: (
              <IconCard
                icon={content.left.icon}
                label={content.left.text}
                className={colorClass(content.left.color)}
              />
            ),
          },
          {
            id: "ea-top-left",
            kind: "item",
            angle: ANGLES.topLeft,
            arcDeg: 18,
            pingPongDirection: "clockwise",
            position: "top-left",
            content: (
              <IconCard
                icon={content.topLeft.icon}
                label={content.topLeft.text}
                className={colorClass(content.topLeft.color)}
              />
            ),
          },
        ],
      },

      // Ring 3: BOTTOM item
      {
        id: "ea-ring-3",
        ring: 3,
        speed: 3,
        className: RING_LG,
        items: [
          {
            id: "ea-bottom",
            kind: "item",
            angle: ANGLES.bottom,
            arcDeg: 18,
            pingPongDirection: "clockwise",
            content: (
              <IconCard
                icon={content.bottom.icon}
                label={content.bottom.text}
                className={colorClass(content.bottom.color)}
                directions="rtl"
              />
            ),
          },
        ],
      },
    ],
  };
}

export default function Circles() {
  const [selectedTab, setSelectedTab] = useState(0);

  const configs = useMemo<OrbitCirclesProps[]>(
    () => [
      // ✅ Tab 1: Extracurricular Activities (left frame in your image)
      buildConfig({
        topLeft: {
          text: "Extracurricular Activities",
          color: "blue",
          icon: Capa,
        },
        topRight: { text: "Leadership Program", color: "orange", icon: Frame },
        right: {
          text: "Workshops & Competitions",
          color: "red",
          icon: briefcase,
        },
        bottom: {
          text: "Sports Programs & Competitions",
          color: "blue",
          icon: Capa1,
        },
        left: {
          text: "Student Volunteer Program",
          color: "orange",
          icon: people,
        },
      }),

      // ✅ Tab 2: Outcome (right frame in your image)
      buildConfig({
        topLeft: {
          text: "Boost Academic performance",
          color: "blue",
          icon: book,
        },
        topRight: {
          text: "Improve Time Management",
          color: "orange",
          icon: Clock,
        },
        right: { text: "Cultivate soft Skills", color: "red", icon: Message },
        bottom: {
          text: "Develop Journeys of Achievements",
          color: "blue",
          icon: Capa1,
        },
        left: { text: "Broaden Social Skills", color: "orange", icon: people },
      }),
    ],
    [],
  );
  const mobileItemsByTab: Record<number, MobileAroundItem[]> = {
    0: [
      {
        text: "Extracurricular Activities",
        desc: "",
        icon: Capa,
        iconBgClassName: "bg-i-lightblue",
      },
      {
        text: "Leadership Program",
        desc: "",
        icon: Frame,
        iconBgClassName: "bg-i-secondary-2",
      },
      {
        text: "Workshops & Competitions",
        desc: "",
        icon: briefcase,
        iconBgClassName: "bg-i-secondary",
      },
      {
        text: "Sports Programs & Competitions",
        desc: "",
        icon: Capa1,
        iconBgClassName: "bg-i-lightblue",
      },
      {
        text: "Student Volunteer Program",
        desc: "",
        icon: people,
        iconBgClassName: "bg-i-secondary-2",
      },
    ],
    1: [
      {
        text: "Boost Academic performance",
        desc: "",
        icon: book,
        iconBgClassName: "bg-i-lightblue",
      },
      {
        text: "Improve Time Management",
        desc: "",
        icon: Clock,
        iconBgClassName: "bg-i-secondary-2",
      },
      {
        text: "Cultivate soft Skills",
        desc: "",
        icon: Message,
        iconBgClassName: "bg-i-secondary",
      },
      {
        text: "Develop Journeys of Achievements",
        desc: "",
        icon: Capa1,
        iconBgClassName: "bg-i-lightblue",
      },
      {
        text: "Broaden Social Skills",
        desc: "",
        icon: people,
        iconBgClassName: "bg-i-secondary-2",
      },
    ],
  };

  const mobileTitle =
    selectedTab === 0
      ? { excent: "", text: "Extracurricular Activities" }
      : { excent: "", text: "Outcome" };
  console.log("mobileItemsByTab[selectedTab]", mobileItemsByTab[selectedTab]);
  return (
    <section className="w-full md:h-[65vh] lg:h-[96.8vh] items-center flex-nowrap flex flex-col rounded-3xl">
      <Tabs
        background="white"
        items={tabs}
        containerClassName="w-full pr-10 md:w-fit max-w-full h-fit  ml-[2.7%]"
        tabClassName="w-fit flex-wrap"
        contentClassName="text-[16px] w-fit md:text-[18px]"
        onTabChange={(index) => setSelectedTab(index)}
      />

      <OrbitCircles {...configs[selectedTab]} />

      <div className="w-full ">
        <MobileAround
          items={mobileItemsByTab[selectedTab]}
          title={mobileTitle}
        />
      </div>
    </section>
  );
}
