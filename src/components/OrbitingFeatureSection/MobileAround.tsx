/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import RichTitleLeft from "../RichTitleRight";
import { ArrowLeft, ArrowRight } from "lucide-react";

/* ----------------------------- UI bits ---------------------------- */

function OrbitIcon({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid size-10 place-items-center rounded-full bg-white shadow-lg",
        "border border-slate-200",
        className,
      )}
    >
      {children}
    </div>
  );
}

const TextIcon = ({ text, desc }: { text: string; desc?: string }) => {
  return (
    <div className="flex flex-col absolute left-14 md:left-24.5 text-i-primary w-40 md:w-max gap-1.5">
      <Label className="text-[16px] md:text-[22px] font-normal leading-5.25 md:leading-11.25 md:tracking-[-1.1px]">
        {text}
      </Label>
      {desc ? (
        <Label className="text-[10px] md:text-base font-normal leading-normal tracking-[-0.8px] opacity-[0.5]">
          {desc}
        </Label>
      ) : null}
    </div>
  );
};

/* --------------------------------- Helpers -------------------------------- */

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

/* ------------------------------ Orbit primitives --------------------------- */

type OrbitRingProps = {
  size: number;
  className?: string;
  children?: React.ReactNode;
};

function OrbitRing({ size, className, children }: OrbitRingProps) {
  const radius = size / 2;

  return (
    <div
      className={cn(
        "absolute left-1/2 top-1/2 rounded-full border border-slate-200/60",
        "shadow-[inset_0_0_0_1px_rgba(2,43,82,0.06)]",
        className,
      )}
      style={
        {
          width: size,
          height: size,
          marginLeft: -radius,
          marginTop: -radius,
          ["--orbit-radius" as any]: `${radius}px`,
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

type OrbitItemProps = {
  angle: number;
  radialOffsetPx?: number;
  className?: string;
  children: React.ReactNode;
};

function OrbitItem({
  angle,
  radialOffsetPx = 0,
  className,
  children,
}: OrbitItemProps) {
  return (
    <div
      className={cn(
        "absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        className,
      )}
    >
      <div
        className="transition-transform duration-700 ease-in-out"
        style={
          {
            transform: `
              rotate(${angle}deg)
              translateY(calc(-1 * (var(--orbit-radius) + ${radialOffsetPx}px)))
              rotate(${-angle}deg)
            `,
            willChange: "transform",
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}

/* ---------------------------------- Types --------------------------------- */

export type MobileAroundItem = {
  id?: string | number;
  text: string;
  desc?: string;
  icon?: StaticImageData | string;
  iconAlt?: string;
  iconBgClassName?: string;
};

export type MobileAroundProps = {
  items: MobileAroundItem[];
  title?: { excent: string; text: string; className?: string };

  outerRingSize?: number;
  innerRingSize?: number;

  /** Which angle is considered the “active / middle” slot. Default = 90° (right). */
  activeSlotDeg?: number;
  initialIndex?: number;

  /** Kept for backward-compatibility (scrolling is disabled). */
  pxPerTurn?: number;
  /** Kept for backward-compatibility (scrolling is disabled). */
  scrollTurns?: number;

  /** Shows big prev/next buttons like the provided design. */
  showArrows?: boolean;
  arrowsClassName?: string;

  className?: string;
};

/* -------------------------------- Component -------------------------------- */

export default function MobileAround({
  items,
  title = {
    excent: "Learning",
    text: "Approaches to Effective",
    className: "text-center",
  },
  outerRingSize = 485,
  innerRingSize = 333,
  activeSlotDeg = 90,
  initialIndex = 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pxPerTurn = 900,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scrollTurns = 4,
  showArrows = true,
  arrowsClassName,
  className,
}: MobileAroundProps) {
  const N = items?.length ?? 0;
  if (!N) return null;

  const STEP_DEG = 360 / N;

  // base angles: item 0 starts exactly at the active slot
  const baseAngles = React.useMemo(
    () => Array.from({ length: N }, (_, i) => activeSlotDeg + i * STEP_DEG),
    [N, activeSlotDeg, STEP_DEG],
  );

  const [activeIndex, setActiveIndex] = React.useState(mod(initialIndex, N));

  React.useEffect(() => {
    // re-clamp on items change
    setActiveIndex(mod(initialIndex, N));
  }, [N, initialIndex]);

  // Rotate wheel so active item always stays at the active slot.
  const rotationDeg = React.useMemo(
    () => -activeIndex * STEP_DEG,
    [activeIndex, STEP_DEG],
  );

  const goPrev = React.useCallback(
    () => setActiveIndex((i) => mod(i - 1, N)),
    [N],
  );
  const goNext = React.useCallback(
    () => setActiveIndex((i) => mod(i + 1, N)),
    [N],
  );

  const defaultPalette = [
    "bg-i-secondary-2",
    "bg-i-light-blue",
    "bg-i-secondary",
  ];

  return (
    <section
      className={cn(
        "relative flex md:hidden justify-end w-full pt-10 pr-6 h-145 overflow-hidden",
        className,
      )}
    >
      <div className="flex flex-col items-end justify-between w-47.75 h-[85%] gap-5 md:gap-10">
        <RichTitleLeft
          excent={title.excent}
          text={title.text}
          className={title.className}
        />
      </div>

      {/* Big Prev / Next arrows — scrolling disabled */}
      {showArrows && N > 1 ? (
        <div
          className={cn(
            "absolute bottom-8 -right-8 -translate-x-1/2 z-[60] flex items-center gap-10",
            arrowsClassName,
          )}
        >
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous"
            className={cn(
              "grid place-items-center rounded-full",
              "size-14 bg-[#E3EBF2] shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
              "active:scale-95 transition",
            )}
          >
            <ArrowLeft />
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next"
            className={cn(
              "grid place-items-center rounded-full",
              "size-14 bg-[#E3EBF2] shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
              "active:scale-95 transition",
            )}
          >
            <ArrowRight />
          </button>
        </div>
      ) : null}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] top-1/2 -translate-y-1/2">
          <OrbitRing
            size={outerRingSize}
            className="border-white/30 bg-[#0857a003] shadow-[var(--shadow-ring-md)]"
          >
            {items.map((it, i) => {
              const angle = baseAngles[i] + rotationDeg;
              const isActive = i === activeIndex;

              const bg =
                it.iconBgClassName ?? defaultPalette[i % defaultPalette.length];

              return (
                <OrbitItem key={it.id ?? i} angle={angle}>
                  <div className="flex gap-10">
                    <OrbitIcon
                      className={cn(
                        bg,
                        "transition-transform duration-200",
                        isActive ? "scale-120" : "",
                      )}
                    >
                      {it.icon ? (
                        <Image
                          alt={it.iconAlt ?? it.text}
                          src={it.icon}
                          width={24}
                          height={24}
                          className="w-5 h-5"
                        />
                      ) : null}
                    </OrbitIcon>

                    {isActive ? (
                      <TextIcon text={it.text} desc={it.desc} />
                    ) : null}
                  </div>
                </OrbitItem>
              );
            })}
          </OrbitRing>

          <OrbitRing
            size={innerRingSize}
            className="border-white bg-[#0857a003] shadow-[var(--shadow-ring-lg)]"
          />
        </div>
      </div>
    </section>
  );
}
