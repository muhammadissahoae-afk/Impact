/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Label } from "@/components/ui/label";
import IconCard from "@/components/OrbitingFeatureSection/IconCard";
import MobileAround, {
  type MobileAroundItem,
} from "@/components/OrbitingFeatureSection/MobileAround";

import Frame from "./Frame.svg";
import Frame2 from "./Frame2.svg";
import Frame3 from "./Frame3.svg";
import Frame4 from "./Frame4.svg";
import people from "./people.svg";
import profile from "./profile-2user.svg";
import OrbitCircles, {
  OrbitCirclesProps,
} from "@/components/OrbitingFeatureSection/OrbitCircles";

type OrbitCardDef = {
  id: string;
  kind: "item" | "edgeAligned";
  ring: 1 | 2 | 3;
  angle: number;
  arcDeg?: number;
  pingPongDirection?: "clockwise" | "counterclockwise";
  gapPx?: number;

  icon: any;
  label: string;
  directions?: "rtl" | "ltr";
  cardBgClassName: string;
};

const INTRO_TEXT =
  "Our Early Years Program (ages 3–5) promotes holistic growth through exploration, independence, and foundational skills.";

const DESKTOP_ROOT: OrbitCirclesProps["rootProps"] = {
  children: null,
  label: "Outcomes",
  heading: "Development",
  accent: "Holistic",
  buttonText: "Register Now",
  description:
    "Our teachers create individualized, developmentally informed experiences that build self-awareness, social skills, confidence, and friendships.",
};

const DESKTOP_ITEMS: OrbitCardDef[] = [
  // Ring 2
  {
    id: "outcomes-esteem",
    kind: "edgeAligned",
    ring: 2,
    angle: 20,
    arcDeg: 18,
    pingPongDirection: "clockwise",
    icon: Frame,
    label: "Esteem, self-confidence & independence",
    directions: "rtl",
    cardBgClassName: "bg-i-secondary-2",
  },
  {
    id: "outcomes-group",
    kind: "edgeAligned",
    ring: 1,
    angle: 180,
    arcDeg: 18,
    pingPongDirection: "clockwise",
    icon: profile,
    label: "Group Interactions",
    directions: "rtl",
    cardBgClassName: "bg-i-light-blue",
  },

  // Ring 3
  {
    id: "outcomes-belonging",
    kind: "edgeAligned",
    ring: 3,
    angle: 70,
    arcDeg: 18,
    pingPongDirection: "clockwise",
    gapPx: 8,
    icon: Frame2,
    label: "Belonging, and emotional well-being",
    directions: "rtl",
    cardBgClassName: "bg-i-secondary",
  },
  {
    id: "outcomes-selfcontrol",
    kind: "edgeAligned",
    ring: 3,
    angle: 120,
    arcDeg: 18,
    pingPongDirection: "clockwise",
    icon: Frame3,
    label: "Self-control & positive behavior",
    directions: "rtl",
    cardBgClassName: "bg-i-secondary-2",
  },
  {
    id: "outcomes-social",
    kind: "edgeAligned",
    ring: 3,
    angle: 250,
    arcDeg: 18,
    pingPongDirection: "counterclockwise",
    icon: people,
    label: "Social & cognitive development",
    cardBgClassName: "bg-i-secondary",
  },
  {
    id: "outcomes-tailored",
    kind: "item",
    ring: 3,
    angle: 290,
    arcDeg: 18,
    pingPongDirection: "counterclockwise",
    icon: Frame4,
    label: "Tailored experiences",
    cardBgClassName: "bg-i-light-blue",
  },
];

function buildOrbitCirclesProps(): OrbitCirclesProps {
  const ring1Items = DESKTOP_ITEMS.filter((x) => x.ring === 1);
  const ring2Items = DESKTOP_ITEMS.filter((x) => x.ring === 2);
  const ring3Items = DESKTOP_ITEMS.filter((x) => x.ring === 3);

  const toOrbitItem = (it: OrbitCardDef) => ({
    id: it.id,
    kind: it.kind,
    angle: it.angle,
    arcDeg: it.arcDeg ?? 18,
    pingPongDirection: it.pingPongDirection,
    gapPx: it.gapPx,
    content: (
      <IconCard
        icon={it.icon}
        label={it.label}
        directions={it.directions}
        className={it.cardBgClassName}
      />
    ),
  });

  return {
    containerClassName: "h-full",
    rootProps: DESKTOP_ROOT,
    rings: [
      {
        id: "outcomes-ring-1",
        ring: 1,
        speed: 3,
        className:
          "border-white/30 bg-[#0857a003] shadow-[var(--shadow-ring-sm)]",
        items: ring1Items.map(toOrbitItem), // empty (same as your current UI)
      },
      {
        id: "outcomes-ring-2",
        ring: 2,
        speed: 3,
        className:
          "border-white/30 bg-[#0857a003] shadow-[var(--shadow-ring-md)]",
        items: ring2Items.map(toOrbitItem),
      },
      {
        id: "outcomes-ring-3",
        ring: 3,
        speed: 3,
        className: "border-white bg-[#0857a003] shadow-[var(--shadow-ring-lg)]",
        items: ring3Items.map(toOrbitItem),
      },
    ],
  };
}

function buildMobileItems(): MobileAroundItem[] {
  // same content as desktop (order matters)
  return DESKTOP_ITEMS.map((it) => ({
    id: it.id,
    text: it.label,
    desc: "",
    icon: it.icon,
    iconBgClassName: it.cardBgClassName,
  }));
}

export default function Circles() {
  const orbitProps = buildOrbitCirclesProps();
  const mobileItems = buildMobileItems();

  return (
    <>
      {/* Desktop */}
      <section className="hidden w-full h-[96.8vh] flex-nowrap pt-5 md:pt-12.5 md:flex flex-col bg-linear-to-b from-i-bg-2 via-i-bg-alt to-i-bg-2 rounded-3xl">
        <Label className="w-[90%] ml-5 lg:w-[30%] z-10 text-i-primary opacity-[0.5] text-[12px] lg:text-[16px] font-normal leading-[150%] tracking-[-0.8px] not-italic">
          {INTRO_TEXT}
        </Label>

        <OrbitCircles {...orbitProps} />
      </section>

      {/* Mobile */}
      <section className="md:hidden w-full">
        <Label className="w-[90%] mx-auto pt-6 z-10 text-i-primary opacity-[0.5] text-[12px] font-normal leading-[150%] tracking-[-0.8px] not-italic">
          {INTRO_TEXT}
        </Label>

        <MobileAround
          items={mobileItems}
          title={{ excent: "Holistic", text: "Development" }}
        />
      </section>
    </>
  );
}
