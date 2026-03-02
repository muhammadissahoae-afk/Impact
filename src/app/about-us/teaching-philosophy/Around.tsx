"use client";

import {
  OrbitRing,
  OrbitItem,
} from "../../../components/OrbitingFeatureSection/Orbit";
import { Bot, Atom } from "lucide-react";
import { cn } from "@/lib/utils";
import { useElementSize } from "../../../components/OrbitingFeatureSection/useElementSize";
import { Label } from "../../../components/ui/label";
import Image from "next/image";
import { useState } from "react";
import Frame from "./Frame.svg";
import share from "@/svgs/share.svg";
import noteText from "./note-text.svg";
import flowers from "@/svgs/flowers.gif";
import CPU from "@/svgs/cpu-charge.svg";
import Message from "./message-question.svg";
import Profile from "./profile.svg";
import SectionHeader from "@/components/SectionHeader";
import Option from "@/components/Option";

function OrbitIcon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid size-6 md:size-12 place-items-center rounded-full bg-white shadow-lg",
        "border border-slate-200",
        className,
      )}
    >
      {children}
    </div>
  );
}

const TextIcon = ({
  text,
  desc,
  className,
}: {
  text: string;
  desc: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col absolute left-14 md:left-24.5 text-i-primary w-40 md:w-max gap-1.5",
        className,
      )}
    >
      <Label className="text-[16px] md:text-[22px] font-normal leading-5.25 md:leading-11.25 md:tracking-[-1.1px]">
        {text}
      </Label>
      <Label className="text-[10px] md:text-base font-normal leading-normal tracking-[-0.8px] opacity-[0.5]">
        {desc}
      </Label>
    </div>
  );
};

const items = [
  {
    text: "Active Learning",
    desc: "Promotes engagement through hands-on activities.",
  },
  {
    text: "Social and Emotional Learning/Well-being",
    desc: `Supports students' overall well-being and success.`,
  },
  {
    text: "Project-Based Learning",
    desc: "Engages students in real-world projects.",
  },
  {
    text: "Technology Integration",
    desc: "Enhances learning experiences with digital tools.",
  },
  {
    text: "Student Centered Learning",
    desc: "Tailors instruction to individual needs and interests.",
  },
  {
    text: "Inquiry-Based Learning",
    desc: "Encourages curiosity and self-directed learning.",
  },
];
const useRings = () => {
  const { ref, width, height } = useElementSize<HTMLDivElement>();
  const base = Math.max(0, Math.min(width, height));

  const scale = base > 1330 ? 0 : 0.1;
  const ring1 = Math.round(base * (0.4 + scale));
  const ring2 = Math.round(base * (0.5 + scale));
  const ring3 = Math.round(base * (0.6 + scale));
  return { ref, ring1, ring2, ring3 };
};

type OrbitKey = "frame" | "share" | "note";

const ORBIT_KEYS: OrbitKey[] = ["frame", "share", "note"];
const SLOT_ANGLES = [40, 90, 140] as const; // top, middle, bottom

export default function AroundDemo() {
  const { ref, ring1, ring2, ring3 } = useRings();

  const normalizeDelta = (deg: number) => ((deg + 540) % 360) - 180; // [-180..180)

  // rotate so item 0 starts in the middle

  const START_ANGLE = 40;
  const MIDDLE_ANGLE = 90;
  const STEP = 50;

  const mod360 = (d: number) => ((d % 360) + 360) % 360;

  // shortest delta in [-180..180)
  const shortestDelta = (from: number, to: number) => {
    const diff = mod360(to - from);
    return diff >= 180 ? diff - 360 : diff;
  };

  // delta that forces a direction (optional)
  const deltaInDir = (from: number, to: number, dir: "cw" | "ccw") => {
    const diff = mod360(to - from); // [0..360)
    if (diff === 0) return 0;
    return dir === "cw" ? diff : diff - 360; // cw:+ , ccw:-
  };

  const baseTargetFor = (index: number) =>
    MIDDLE_ANGLE - (START_ANGLE + index * STEP);

  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationDeg, setRotationDeg] = useState(() => baseTargetFor(0));

  const rotateToIndex = (nextIndex: number, dir?: "cw" | "ccw") => {
    setActiveIndex(nextIndex);

    setRotationDeg((current) => {
      const baseTarget = baseTargetFor(nextIndex);

      // pick either shortest path OR forced direction
      const delta = dir
        ? deltaInDir(current, baseTarget, dir)
        : shortestDelta(current, baseTarget);

      return current + delta; // unbounded => infinite
    });
  };

  const ICONS = [
    {
      bg: "bg-i-secondary-2",
      src: Frame,
      alt: "Frame",
      img: "w-6 h-6 md:size-6",
    },
    { bg: "bg-i-secondary", src: share, alt: "share", img: "size-3 md:size-6" },
    {
      bg: "bg-i-light-blue",
      src: noteText,
      alt: "noteText",
      img: "size-3 md:size-6",
    },
    {
      bg: "bg-i-secondary-2",
      src: CPU,
      alt: "Frame",
      img: "w-6 h-6 md:size-6",
    },
    {
      bg: "bg-i-secondary",
      src: Profile,
      alt: "share",
      img: "size-3 md:size-6",
    },
    {
      bg: "bg-i-light-blue",
      src: Message,
      alt: "noteText",
      img: "size-3 md:size-6",
    },
  ] as const;

  return (
    <section
      ref={ref}
      className={cn(
        "hidden relative md:flex justify-center w-full pt-25",
        "py-25", // keep all rings visible
        "", // safe padding
        "overflow-hidden", // optional
      )}
    >
      <div className="flex flex-col items-center  justify-between w-[90vw] h-[85%] gap-5 md:gap-10">
        <SectionHeader
          richTitleDirection="left"
          richTitleProps={{
            excent: "Learning",
            text: "Approaches to Effective",
            className: " md:w-130.25 text-center",
          }}
          sectionTitleProps={{ variant: "white" }}
        >
          Pedagogical Approches
        </SectionHeader>

        <div className="self-end flex flex-col items-center gap-10 md:gap-22.25 ">
          <Image
            alt="flowers"
            src={flowers}
            className=" w-50 h-50  md:w-75 md:h-75 xL:w-[150%] xl:h-[150%]  lg:inline"
          />
          <div className=" flex gap-2.5 z-50">
            {" "}
            {items.map((item, i) => (
              <Option
                key={i}
                isActive={i === activeIndex}
                onClick={() => rotateToIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Viewport is the whole section; overflow-hidden clips the left half */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Orbit system: center sits on the LEFT edge */}
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ right: "calc(100% + 30px)" }}
        >
          {/* center dot (at the system center) */}
          <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400" />

          {/* rings */}
          <OrbitRing
            size={ring1}
            speed={1}
            className="border-white/30 bg-[#0857a003] shadow-[var(--shadow-ring-md)]"
          />

          <OrbitRing
            size={ring2}
            speed={1}
            className="border-white bg-[#0857a003] shadow-[var(--shadow-ring-lg)]"
          >
            {items.map((item, i) => {
              const icon = ICONS[i];

              const angle = START_ANGLE + i * STEP + rotationDeg;

              // show only 3: middle + neighbor above + neighbor below
              const distFromMiddle = normalizeDelta(angle - MIDDLE_ANGLE);
              const isVisible = Math.abs(distFromMiddle) <= STEP + 1;

              return (
                <OrbitItem
                  key={i}
                  angle={angle}
                  arcDeg={0}
                  motionClassName="orbit-item-rotate"
                  className={cn(
                    "transition-opacity duration-200",
                    isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
                  )}
                >
                  <div className="flex gap-10">
                    <OrbitIcon className={icon.bg}>
                      <Image
                        alt={icon.alt}
                        src={icon.src}
                        className={icon.img}
                      />
                    </OrbitIcon>

                    {/* Only active item shows text */}
                    {i === activeIndex && (
                      <TextIcon text={item.text} desc={item.desc} />
                    )}
                  </div>
                </OrbitItem>
              );
            })}

            <OrbitItem
              angle={270}
              arcDeg={0}
              motionClassName="orbit-item-pingpong"
              pingPongDirection="counterclockwise"
            >
              <OrbitIcon>
                <Atom className="size-5 text-orange-500" />
              </OrbitIcon>
            </OrbitItem>
          </OrbitRing>
        </div>
      </div>
    </section>
  );
}
