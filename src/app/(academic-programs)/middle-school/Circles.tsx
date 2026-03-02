/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import Tabs from "@/components/Tabs";
import IconCard from "@/components/OrbitingFeatureSection/IconCard";
import OrbitCircles, {
  type OrbitCirclesProps,
} from "@/components/OrbitingFeatureSection/OrbitCircles";
import MobileAround, {
  type MobileAroundItem,
} from "@/components/OrbitingFeatureSection/MobileAround";

import Calc from "./calc.svg";
import Frame2 from "./Frame2.svg";
import Frame3 from "./Frame3.svg";
import social from "./social.svg";
import lang from "./lang.svg";
import Capa_1 from "./Capa_1.svg";
import cpucharge from "./cpu-charge.svg";

const RING_SM = "border-white/30 bg-[#0857a003] shadow-[var(--shadow-ring-sm)]";
const RING_MD = "border-white/30 bg-[#0857a003] shadow-[var(--shadow-ring-md)]";
const RING_LG = "border-white bg-[#0857a003] shadow-[var(--shadow-ring-lg)]";

type OrbitCardDef = {
  id: string;
  ring: 1 | 2 | 3;
  kind?: "item" | "edgeAligned";
  angle: number;
  arcDeg?: number;
  pingPongDirection?: "clockwise" | "counterclockwise";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  gapPx?: number;

  icon: any;
  label: string;
  directions?: "rtl" | "ltr";
  cardBgClassName: string; // used by IconCard + MobileAround
};

type TabDef = {
  tabName: string; // shown in Tabs
  rootProps: OrbitCirclesProps["rootProps"];
  items: OrbitCardDef[];
};

function buildOrbitProps(tab: TabDef): OrbitCirclesProps {
  const byRing = (r: 1 | 2 | 3) => tab.items.filter((x) => x.ring === r);

  const toOrbitItem = (it: OrbitCardDef) => ({
    id: it.id,
    kind: it.kind,
    angle: it.angle,
    arcDeg: it.arcDeg ?? 18,
    pingPongDirection: it.pingPongDirection,
    position: it.position,
    gapPx: it.gapPx,
    content: (
      <IconCard
        icon={it.icon}
        label={it.label}
        className={it.cardBgClassName}
        directions={it.directions}
      />
    ),
  });

  return {
    containerClassName: "h-full",
    rootProps: tab.rootProps,
    rings: [
      {
        id: `${tab.tabName}-ring-1`,
        ring: 1,
        speed: 3,
        className: RING_SM,
        items: byRing(1).map(toOrbitItem),
      },
      {
        id: `${tab.tabName}-ring-2`,
        ring: 2,
        speed: 3,
        className: RING_MD,
        items: byRing(2).map(toOrbitItem),
      },
      {
        id: `${tab.tabName}-ring-3`,
        ring: 3,
        speed: 3,
        className: RING_LG,
        items: byRing(3).map(toOrbitItem),
      },
    ],
  };
}

function buildMobileItems(tab: TabDef): MobileAroundItem[] {
  return tab.items.map((it) => ({
    id: it.id,
    text: it.label,
    desc: "",
    icon: it.icon,
    iconBgClassName: it.cardBgClassName,
  }));
}

export default function Circles() {
  const [selectedTab, setSelectedTab] = useState(0);

  // ✅ single source of truth for BOTH desktop + mobile
  const TAB_DEFS = useMemo<TabDef[]>(
    () => [
      // ✅ AERO
      {
        tabName: "AERO COMMON CORE Plus",
        rootProps: {
          children: null,
          label: "AERO",
          heading: "Program",
          accent: "Academic",
          buttonText: "Register Now",
          description:
            "The curriculum is thoughtfully designed with interdisciplinary, project-based units, challenging students to become critical thinkers and adept problem solvers. Every student is prepared to face the future confidently and competently.",
        },
        items: [
          {
            id: "ms-aero-social",
            ring: 1,
            kind: "edgeAligned",
            angle: 100,
            arcDeg: 18,
            pingPongDirection: "counterclockwise",
            position: "bottom-right",
            icon: social,
            label: "Social Studies",
            directions: "rtl",
            cardBgClassName: "bg-i-secondary",
          },
          {
            id: "ms-aero-world-lang",
            ring: 2,
            angle: 30,
            arcDeg: 18,
            pingPongDirection: "clockwise",
            position: "top-right",
            icon: lang,
            label: "World Languages",
            directions: "rtl",
            cardBgClassName: "bg-i-secondary-2",
          },
          {
            id: "ms-aero-science",
            ring: 2,
            angle: 160,
            arcDeg: 18,
            pingPongDirection: "clockwise",
            icon: Frame3,
            label: "Science",
            directions: "rtl",
            cardBgClassName: "bg-i-light-blue",
          },
          {
            id: "ms-aero-arts",
            ring: 2,
            angle: 240,
            arcDeg: 18,
            pingPongDirection: "clockwise",
            position: "bottom-left",
            icon: Frame2,
            label: "Visual and Arts Performance",
            cardBgClassName: "bg-i-secondary-2",
          },
          {
            id: "ms-aero-math",
            ring: 2,
            angle: 300,
            arcDeg: 18,
            pingPongDirection: "clockwise",
            position: "top-left",
            icon: Calc,
            label: "Math",
            cardBgClassName: "bg-i-light-blue",
          },
          // ring 3 intentionally empty (same as your desktop)
        ],
      },

      // ✅ SHAPE
      {
        tabName: "SHAPE",
        rootProps: {
          children: null,
          label: "SHAPE",
          heading: "Program",
          accent: "Academic",
          buttonText: "Register Now",
          className: "text-xs h-[95%]",
          description:
            "The curriculum is thoughtfully designed with interdisciplinary, project-based units, challenging students to become critical thinkers and adept problem solvers. Every student is prepared to face the future confidently and competently.",
        },
        items: [
          {
            id: "ms-shape-pe",
            ring: 2,
            angle: 300,
            arcDeg: 18,
            pingPongDirection: "clockwise",
            position: "top-left",
            icon: Capa_1,
            label: "Physical Education",
            cardBgClassName: "bg-i-light-blue",
          },
        ],
      },

      // ✅ ISTE
      {
        tabName: "ISTE",
        rootProps: {
          children: null,
          label: "ISTE",
          heading: "Program",
          accent: "Academic",
          buttonText: "Register Now",
          description:
            "The curriculum is thoughtfully designed with interdisciplinary, project-based units, challenging students to become critical thinkers and adept problem solvers. Every student is prepared to face the future confidently and competently.",
        },
        items: [
          {
            id: "ms-iste-tech",
            ring: 2,
            kind: "edgeAligned",
            angle: 50,
            arcDeg: 18,
            pingPongDirection: "clockwise",
            icon: cpucharge,
            label: "Technology Integration",
            directions: "rtl",
            cardBgClassName: "bg-i-secondary",
          },
        ],
      },
    ],
    [],
  );

  const tabs = useMemo(() => TAB_DEFS.map((t) => t.tabName), [TAB_DEFS]);
  const activeTab = TAB_DEFS[selectedTab];

  const orbitProps = useMemo(() => buildOrbitProps(activeTab), [activeTab]);
  const mobileItems = useMemo(() => buildMobileItems(activeTab), [activeTab]);

  const mobileTitle = useMemo(() => {
    const accent = (activeTab.rootProps as any)?.accent ?? "";
    const label = (activeTab.rootProps as any)?.label ?? "";
    const heading = (activeTab.rootProps as any)?.heading ?? "";
    return { excent: accent, text: `${label} ${heading}`.trim() };
  }, [activeTab]);

  return (
    <>
      {/* Desktop */}
      <section className="hidden w-full h-[96.8vh] flex-nowrap pt-12.5 md:flex flex-col bg-linear-to-b from-i-bg-2 via-i-bg-alt to-i-bg-2 rounded-3xl">
        <div className="flex flex-wrap justify-center">
          <Tabs
            background="gray"
            items={tabs}
            containerClassName="w-full pr-10 md:w-fit max-w-full h-fit ml-[2.7%]"
            tabClassName="w-fit flex-wrap"
            contentClassName="text-[16px] w-fit md:text-[18px]"
            onTabChange={(index) => setSelectedTab(index)}
          />
        </div>

        <OrbitCircles {...orbitProps} />
      </section>

      {/* Mobile */}
      <section className="md:hidden w-full flex flex-col bg-linear-to-b from-i-bg-2 via-i-bg-alt to-i-bg-2 rounded-3xl">
        <div className="flex flex-wrap justify-center pt-4">
          <Tabs
            background="gray"
            items={tabs}
            containerClassName="w-full px-4 max-w-full h-fit"
            tabClassName="w-fit flex-wrap"
            contentClassName="text-[16px] w-fit"
            onTabChange={(index) => setSelectedTab(index)}
          />
        </div>

        <MobileAround items={mobileItems} title={mobileTitle} />
      </section>
    </>
  );
}
