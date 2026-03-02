/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { OrbitSystem } from "@/components/OrbitingFeatureSection";
import { useElementSize } from "@/components/OrbitingFeatureSection/useElementSize";
import { cn } from "@/lib/utils";

type PingPongDirection = "clockwise" | "counterclockwise";
type ItemPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

type OrbitCircleItemConfig = {
  id: string;

  // which Orbit component to use
  kind?: "item" | "edgeAligned";

  // shared orbit positioning
  angle: number;
  arcDeg?: number;
  pingPongDirection?: PingPongDirection;
  position?: ItemPosition;
  radialOffsetPx?: number;

  // extra props (used by OrbitEdgeAlignedItem in your codebase)
  gapPx?: number;

  // styling/motion (supported by OrbitItem, and usually also by EdgeAligned)
  className?: string;
  motionClassName?: string;

  content: React.ReactNode;
};

type OrbitRingConfig = {
  id: string;
  ring: 1 | 2 | 3;
  speed?: number;
  className?: string;
  items: OrbitCircleItemConfig[];
};

type RingsSizing = {
  threshold?: number; // default 1330
  scaleBelowThreshold?: number; // default 0.1
  factors?: { ring1: number; ring2: number; ring3: number }; // default 0.6/0.7/0.8
};

export type OrbitCirclesProps = {
  containerClassName?: string;
  rootProps: React.ComponentProps<typeof OrbitSystem.Root>;
  rings: OrbitRingConfig[];
  sizing?: RingsSizing;
  subContainerClassName?: string;

  // ✅ NEW: positive = move up
  centerShiftYPx?: number;
};

function useRings(sizing?: RingsSizing) {
  const { ref, width, height } = useElementSize<HTMLDivElement>();
  const base = Math.max(0, Math.min(width, height));
  const threshold = sizing?.threshold ?? 780;
  const scaleBelowThreshold = sizing?.scaleBelowThreshold ?? 0.1;
  const factors = sizing?.factors ?? { ring1: 0.6, ring2: 0.7, ring3: 0.8 };

  const scale = base > threshold ? 0.1 : scaleBelowThreshold;

  const ring1 = Math.round(base * (factors.ring1 + scale));
  const ring2 = Math.round(base * (factors.ring2 + scale));
  const ring3 = Math.round(base * (factors.ring3 + scale));

  return { ref, ring1, ring2, ring3 };
}

export default function OrbitCircles({
  containerClassName,
  rootProps,
  rings,
  sizing,
  centerShiftYPx = 0,
  subContainerClassName,
}: OrbitCirclesProps) {
  const { ref, ring1, ring2, ring3 } = useRings(sizing);

  const ringSizeByIndex: Record<1 | 2 | 3, number> = {
    1: ring1,
    2: ring2,
    3: ring3,
  };

  const sortedRings = React.useMemo(
    () => [...rings].sort((a, b) => a.ring - b.ring),
    [rings],
  );

  return (
    <div
      className={cn(
        "relative hidden md:flex justify-center w-full h-full overflow-hidden",
        containerClassName,
      )}
    >
      {" "}
      <div
        ref={ref}
        className={cn(
          "w-full h-full  flex justify-center",
          subContainerClassName,
        )}
        style={
          centerShiftYPx
            ? { transform: `translateY(-${centerShiftYPx}px)` }
            : undefined
        }
      >
        <OrbitSystem.Root {...rootProps}>
          {sortedRings.map((ringCfg) => (
            <OrbitSystem.Ring
              key={ringCfg.id}
              size={ringSizeByIndex[ringCfg.ring]}
              speed={ringCfg.speed ?? 3}
              className={ringCfg.className}
            >
              {ringCfg.items.map((it) => {
                const Comp =
                  it.kind === "edgeAligned"
                    ? OrbitSystem.OrbitEdgeAlignedItem
                    : OrbitSystem.Item;

                // avoid TS friction with mixed component prop sets
                const props: any = {
                  angle: it.angle,
                  pingPongDirection: it.pingPongDirection,
                  position: it.position,
                  radialOffsetPx: it.radialOffsetPx,
                  gapPx: it.gapPx,
                  className: it.className,
                  motionClassName: it.motionClassName,
                };

                if (it.arcDeg != null) props.arcDeg = it.arcDeg;

                return (
                  <Comp key={it.id} {...props}>
                    {it.content}
                  </Comp>
                );
              })}
            </OrbitSystem.Ring>
          ))}
        </OrbitSystem.Root>
      </div>
    </div>
  );
}
