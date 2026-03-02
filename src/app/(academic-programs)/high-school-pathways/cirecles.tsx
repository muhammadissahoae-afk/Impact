/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import Tabs from "@/components/Tabs";
import IconCard from "@/components/OrbitingFeatureSection/IconCard";
import OrbitCircles, {
  OrbitCirclesProps,
} from "@/components/OrbitingFeatureSection/OrbitCircles";

import MobileAround, {
  type MobileAroundItem,
} from "@/components/OrbitingFeatureSection/MobileAround";

import Frame from "./Frame.svg";
import Frame1 from "./Frame1.svg";
import Frame2 from "./Frame2.svg";
import briefcase from "./briefcase.svg";
import cpuCharge from "./cpu-charge.svg";

const tabs = ["Pathways", "Career Exploration"];

const RING_SM = "border-white/30 bg-[#0857a003] shadow-[var(--shadow-ring-sm)]";
const RING_MD = "border-white/30 bg-[#0857a003] shadow-[var(--shadow-ring-md)]";
const RING_LG = "border-white bg-[#0857a003] shadow-[var(--shadow-ring-lg)]";

type OrbitItemDef = {
  id: string;
  ring: 1 | 2 | 3;
  kind?: "item" | "edgeAligned";
  angle: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  pingPongDirection?: "clockwise" | "counterclockwise";
  label: string;
  icon: any;
  cardBgClassName: string; // used by IconCard + MobileAround
};

type HighSchoolTabDef = {
  tabLabel: string;
  root: {
    label: string;
    heading: string;
    accent: string;
    description: string;
    buttonText: string;
  };
  items: OrbitItemDef[];
};

function buildOrbitProps(tab: HighSchoolTabDef): OrbitCirclesProps {
  const ring1Items = tab.items.filter((x) => x.ring === 1);
  const ring2Items = tab.items.filter((x) => x.ring === 2);
  const ring3Items = tab.items.filter((x) => x.ring === 3);

  const toOrbitItem = (it: OrbitItemDef) => ({
    id: it.id,
    kind: it.kind,
    angle: it.angle,
    arcDeg: 18,
    pingPongDirection: it.pingPongDirection,
    position: it.position,
    content: (
      <IconCard
        icon={it.icon}
        label={it.label}
        className={it.cardBgClassName}
        directions="rtl"
      />
    ),
  });

  return {
    containerClassName: "hidden md:flex h-full", // ✅ desktop only (mobile handled by MobileAround)
    rootProps: {
      children: null,
      label: tab.root.label,
      heading: tab.root.heading,
      accent: tab.root.accent,
      buttonText: tab.root.buttonText,
      description: tab.root.description,
    },
    rings: [
      {
        id: `${tab.tabLabel}-ring-1`,
        ring: 1,
        speed: 3,
        className: RING_SM,
        items: ring1Items.map(toOrbitItem),
      },
      {
        id: `${tab.tabLabel}-ring-2`,
        ring: 2,
        speed: 3,
        className: RING_MD,
        items: ring2Items.map(toOrbitItem),
      },
      {
        id: `${tab.tabLabel}-ring-3`,
        ring: 3,
        speed: 3,
        className: RING_LG,
        items: ring3Items.map(toOrbitItem),
      },
    ],
  };
}

function buildMobileItems(tab: HighSchoolTabDef): MobileAroundItem[] {
  return tab.items.map((it) => ({
    id: it.id,
    text: it.label,
    desc: "",
    icon: it.icon,
    iconBgClassName: it.cardBgClassName,
  }));
}

export default function HighSchoolCircles() {
  const [selectedTab, setSelectedTab] = useState(0);

  // ✅ Single source of truth (desktop content) -> also drives mobile
  const TAB_DEFS: HighSchoolTabDef[] = useMemo(
    () => [
      {
        tabLabel: "pathways",
        root: {
          label: "Pathways",
          heading: "Learning",
          accent: "Customized",
          buttonText: "Register Now",
          description:
            "Develop multiple academic pathways catering to different interests and career aspirations",
        },
        items: [
          {
            id: "hs-pathways-it",
            ring: 1,
            kind: "edgeAligned",
            angle: 100,
            position: "bottom-right",
            pingPongDirection: "counterclockwise",
            label: "Information Technology, ICT",
            icon: cpuCharge,
            cardBgClassName: "bg-i-secondary",
          },
          {
            id: "hs-pathways-business",
            ring: 2,
            angle: 30,
            position: "top-right",
            pingPongDirection: "clockwise",
            label: "Business and Management",
            icon: briefcase,
            cardBgClassName: "bg-i-secondary-2",
          },
          {
            id: "hs-pathways-engineering",
            ring: 2,
            angle: 160,
            pingPongDirection: "clockwise",
            label: "Engineering , Manufacturing, & Technology",
            icon: Frame,
            cardBgClassName: "bg-i-light-blue",
          },
          {
            id: "hs-pathways-arts",
            ring: 2,
            angle: 240,
            position: "bottom-left",
            pingPongDirection: "clockwise",
            label: "Visual and Arts Performance",
            icon: Frame1,
            cardBgClassName: "bg-i-secondary-2",
          },
          {
            id: "hs-pathways-health",
            ring: 2,
            angle: 300,
            position: "top-left",
            pingPongDirection: "clockwise",
            label: "Health Services",
            icon: Frame2,
            cardBgClassName: "bg-i-light-blue",
          },
          // ring 3 empty (same as desktop)
        ],
      },

      {
        tabLabel: "career",
        root: {
          label: "Practical",
          heading: "Exploration",
          accent: "Career",
          buttonText: "Register Now",
          description:
            "Helps students make informed decisions about their future.",
        },
        items: [
          {
            id: "hs-career-shadowing",
            ring: 1,
            kind: "edgeAligned",
            angle: 100,
            position: "bottom-right",
            pingPongDirection: "counterclockwise",
            label: "Job Shadowing",
            icon: Frame,
            cardBgClassName: "bg-i-secondary",
          },
          {
            id: "hs-career-visits",
            ring: 2,
            angle: 30,
            position: "top-right",
            pingPongDirection: "clockwise",
            label: "Industry Visits",
            icon: Frame,
            cardBgClassName: "bg-i-secondary-2",
          },
          {
            id: "hs-career-speakers",
            ring: 2,
            angle: 160,
            pingPongDirection: "clockwise",
            label: "Guest Speakers",
            icon: Frame,
            cardBgClassName: "bg-i-light-blue",
          },
          {
            id: "hs-career-cultural",
            ring: 2,
            angle: 240,
            position: "bottom-left",
            pingPongDirection: "clockwise",
            label: "Cultural Exposure",
            icon: Frame,
            cardBgClassName: "bg-i-secondary-2",
          },
          {
            id: "hs-career-internships",
            ring: 2,
            angle: 300,
            position: "top-left",
            pingPongDirection: "clockwise",
            label: "Internships",
            icon: Frame,
            cardBgClassName: "bg-i-light-blue",
          },
        ],
      },
    ],
    [],
  );

  const activeTab = TAB_DEFS[selectedTab];

  const orbitProps = useMemo(() => buildOrbitProps(activeTab), [activeTab]);
  const mobileItems = useMemo(() => buildMobileItems(activeTab), [activeTab]);

  const mobileTitle =
    selectedTab === 0
      ? { excent: "Customized", text: "Learning Pathways" }
      : { excent: "Career", text: "Career Exploration" };

  return (
    <section className="w-full md:h-[65vh] lg:h-[96.8vh] items-center flex-nowrap flex flex-col rounded-3xl">
      <Tabs
        background="white"
        items={tabs}
        containerClassName="w-full pr-10 md:w-fit max-w-full h-fit ml-[2.7%]"
        tabClassName="w-fit flex-wrap"
        contentClassName="text-[16px] w-fit md:text-[18px]"
        onTabChange={(index) => setSelectedTab(index)}
      />

      {/* Desktop */}
      <OrbitCircles {...orbitProps} />

      {/* Mobile (auto hidden on md+) */}
      <div className="w-full">
        <MobileAround items={mobileItems} title={mobileTitle} />
      </div>
    </section>
  );
}
