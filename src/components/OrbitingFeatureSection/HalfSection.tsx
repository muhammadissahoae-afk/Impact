"use client";

import React from "react";
import { Atom, Bot } from "lucide-react";
import { HalfCricles } from "./Half";

export type HalfOrbitItem = {
  /** Logical active index used by HalfCricles.Active + onCenteredIndex */
  index: number;

  /** Initial angle (deg) of the item on the ring */
  startDeg: number;

  /** Optional per-item speeds (deg/sec). If omitted, section defaults are used. */
  visibleSpeedDps?: number;
  hiddenSpeedDps?: number;

  /** Render your existing card component (FeatureCard / OrbitingCard / etc.) */
  render: (isActive: boolean) => React.ReactNode;
};

export type HalfOrbitSectionProps = {
  header: {
    title: string;
    heading: string;
    accent?: string;
    textClassName?: string;
    className?: string;
  };

  /** Root options */
  defaultActiveIndex?: number | null;
  strokePx?: number;
  rootClassName?: string;

  /** Orbit system vertical offset */
  translateY?: number;

  /** Ring layout (defaults match your current pages) */
  ringSizes?: {
    ring1?: number;
    ring2?: number;
    ring3?: number;
    ring4?: number;
  };
  ringSpeeds?: {
    ring1?: number;
    ring2?: number;
    ring3?: number;
    ring4?: number;
  };
  ringClasses?: {
    ring1?: string;
    ring2?: string;
    ring3?: string;
    ring4?: string;
  };

  /** Ring 1 + 2 icons (optional override) */
  ring1Icon?: React.ReactNode;
  ring2Icon?: React.ReactNode;

  /** Ring 1 + 2 icon angles (optional override) */
  ring1StartDeg?: number;
  ring2StartDeg?: number;

  /** Default speeds for the cards ring (ring4) */
  cardsVisibleSpeedDps?: number;
  cardsHiddenSpeedDps?: number;

  /** Cards on the outer ring (ring4) */
  items: HalfOrbitItem[];
};

const DEFAULT_RING_SIZES = {
  ring1: 560,
  ring2: 700,
  ring3: 840,
  ring4: 1300,
};

const DEFAULT_RING_SPEEDS = {
  ring1: 22,
  ring2: 28,
  ring3: 34,
  ring4: 34,
};

const DEFAULT_RING_CLASSES = {
  ring1:
    "border-white/30 border-2 bg-[#0857a003] shadow-[var(--shadow-ring-sm)]",
  ring2:
    "border-white/30 border-2 bg-[#0857a003] shadow-[var(--shadow-ring-lg)]",
  ring3: "border-white border-2 bg-[#0857a003] shadow-[var(--shadow-ring-md)]",
  ring4: "border-white border-2 bg-[#0857a003] shadow-[var(--shadow-ring-lg)]",
};

export default function HalfOrbitSection({
  header,
  defaultActiveIndex = 1,
  strokePx = 2,
  rootClassName,
  translateY = 600,

  ringSizes,
  ringSpeeds,
  ringClasses,

  ring1Icon,
  ring2Icon,
  ring1StartDeg = 0,
  ring2StartDeg = 300,

  cardsVisibleSpeedDps = 18,
  cardsHiddenSpeedDps = 400,

  items,
}: HalfOrbitSectionProps) {
  const sizes = { ...DEFAULT_RING_SIZES, ...(ringSizes ?? {}) };
  const speeds = { ...DEFAULT_RING_SPEEDS, ...(ringSpeeds ?? {}) };
  const classes = { ...DEFAULT_RING_CLASSES, ...(ringClasses ?? {}) };

  return (
    <HalfCricles.Root
      defaultActiveIndex={defaultActiveIndex}
      strokePx={strokePx}
      className={rootClassName}
    >
      <HalfCricles.Header
        title={header.title}
        heading={header.heading}
        accent={header.accent}
        className={header.className}
        textClassName={header.textClassName}
      />

      <HalfCricles.System translateY={translateY}>
        {/* ring 1 */}
        <HalfCricles.Ring
          size={sizes.ring1}
          speed={speeds.ring1}
          className={classes.ring1}
        >
          <HalfCricles.Boost
            radiusPx={sizes.ring1 / 2}
            startDeg={ring1StartDeg}
          >
            <HalfCricles.Icon>
              {ring1Icon ?? <Atom className="size-5 text-orange-500" />}
            </HalfCricles.Icon>
          </HalfCricles.Boost>
        </HalfCricles.Ring>

        {/* ring 2 */}
        <HalfCricles.Ring
          size={sizes.ring2}
          speed={speeds.ring2}
          reverse
          className={classes.ring2}
        >
          <HalfCricles.Boost
            radiusPx={sizes.ring2 / 2}
            startDeg={ring2StartDeg}
          >
            <HalfCricles.Icon>
              {ring2Icon ?? <Bot className="size-5 text-red-600" />}
            </HalfCricles.Icon>
          </HalfCricles.Boost>
        </HalfCricles.Ring>

        {/* ring 3 */}
        <HalfCricles.Ring
          size={sizes.ring3}
          speed={speeds.ring3}
          className={classes.ring3}
        />

        {/* ring 4 (cards) */}
        <HalfCricles.Ring
          size={sizes.ring4}
          speed={speeds.ring4}
          className={classes.ring4}
        >
          {" "}
          <HalfCricles.BoostRing
            radiusPx={sizes.ring4 / 2}
            visibleSpeedDps={cardsVisibleSpeedDps}
            hiddenSpeedDps={cardsHiddenSpeedDps}
            pauseOnCenterMs={5000}
            centerDeg={0}
            centerToleranceDeg={1.5}
          >
            {items.map((it) => (
              <HalfCricles.BoostRingItem
                key={`${it.index}-${it.startDeg}`}
                startDeg={it.startDeg}
                onCenteredIndex={it.index}
              >
                <HalfCricles.Active index={it.index}>
                  {(isActive) => it.render(isActive)}
                </HalfCricles.Active>
              </HalfCricles.BoostRingItem>
            ))}
          </HalfCricles.BoostRing>
        </HalfCricles.Ring>
      </HalfCricles.System>
    </HalfCricles.Root>
  );
}
