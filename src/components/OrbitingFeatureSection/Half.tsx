"use client";

import React from "react";
import { Atom, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

import { OrbitRing } from "./Orbit";
import { OrbitBoostItem } from "./OrbitBoostItem";
import FeatureCard from "../FeatureCard";

import culturalValues from "@/svgs/culturalValues.svg";
import medal from "@/svgs/medal.gif";
import flower from "@/svgs/flowers.gif";
import flower2 from "@/svgs/flowers2.gif";
import CustomLabel from "../customLabel/CustomLabel";
import SectionTitle from "../SectionTitle";
import RichTitleRight from "../RichTitleRight";
import SectionHeader from "../SectionHeader";

function normalizeDeg(deg: number) {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

function shortestAngularDistance(a: number, b: number) {
  const da = normalizeDeg(a);
  const db = normalizeDeg(b);
  let diff = Math.abs(da - db);
  if (diff > 180) diff = 360 - diff;
  return diff; // 0..180
}

// Visible when the item is on the top half of the circle.
function isInTopVisibleHalf(deg: number) {
  const d = normalizeDeg(deg);
  return d >= 275 || d <= 90;
}

function applyOrbitTransform(
  el: HTMLDivElement,
  deg: number,
  radiusPx: number,
) {
  const d = normalizeDeg(deg);
  el.style.transform = `rotate(${d}deg) translateY(${-radiusPx}px) rotate(${-d}deg)`;
}
// ========== Context (shared state for compound components) ==========
type CirclesCtx = {
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  strokePx: number;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
};

const CirclesContext = React.createContext<CirclesCtx | null>(null);

function useCircles() {
  const ctx = React.useContext(CirclesContext);
  if (!ctx)
    throw new Error(
      "CirclesDemo components must be used within <CirclesDemo.Root>"
    );
  return ctx;
}

// ========== Compound Components ==========
type RootProps = {
  children: React.ReactNode;
  defaultActiveIndex?: number | null;
  strokePx?: number;
  className?: string;
};

function Root({
  children,
  defaultActiveIndex = 1,
  strokePx = 2,
  className,
}: RootProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex
  );
  const [isPaused, setIsPaused] = React.useState(false);

  return (
    <CirclesContext.Provider
      value={{ activeIndex, setActiveIndex, strokePx, isPaused, setIsPaused }}
    >
      <section
        className={cn(
          " flex-col items-center hidden md:flex relative w-full h-[800px] md:h-[1050px] overflow-hidden md:pt-25 bg-i-bg-alt ",
          className,
        )}
        data-nav-theme="dark"
      >
        {children}
      </section>
    </CirclesContext.Provider>
  );
}

function Header({
  title = "Four Pillars",
  heading,
  accent,
  className = "",
  textClassName,
}: {
  title?: string;
  heading: string;
  accent?: string;
  className?: string;
  textClassName?: string;
}) {
  return (
    <SectionHeader
      richTitleDirection="right"
      richTitleProps={{
        excent: accent!,
        text: heading,
        className: textClassName,
        variant: "red-orange",
      }}
      sectionTitleProps={{ variant: "white" }}
      className={className?.concat("mobile-padding md:p-0")}
    >
      {title}
    </SectionHeader>
  );
}

/**
 * Positions the orbit system (your translate-y).
 */
function System({
  children,
  translateY = 600,
  className,
}: {
  children: React.ReactNode;
  translateY?: number;
  className?: string;
}) {
  // const { setIsPaused } = useCircles();

  return (
    <div
      className={cn("absolute inset-0", className)}
      style={{ transform: `translateY(${translateY}px)` }}
      // onPointerEnter={() => setIsPaused(true)}
      // onPointerLeave={() => setIsPaused(false)}
    >
      {children}
    </div>
  );
}

type RingProps = {
  size: number;
  speed: number;
  reverse?: boolean;
  className?: string;
  children?: React.ReactNode;
};

function Ring({ size, speed, reverse, className, children }: RingProps) {
  return (
    <OrbitRing
      size={size}
      speed={speed}
      reverse={reverse}
      className={className}
    >
      {children}
    </OrbitRing>
  );
}
type BoostRingItemProps = {
  startDeg: number;
  onCenteredIndex?: number;
  children: React.ReactNode;
};

function BoostRingItem(_props: BoostRingItemProps) {
  // Marker component: rendered by BoostRing.
  return null;
}

type BoostRingProps = {
  radiusPx: number;
  visibleSpeedDps?: number;
  hiddenSpeedDps?: number;
  pauseOnCenterMs?: number;
  centerDeg?: number;
  centerToleranceDeg?: number;
  children: React.ReactNode;
};

function BoostRing({
  radiusPx,
  visibleSpeedDps = 10,
  hiddenSpeedDps = 70,
  pauseOnCenterMs = 5000,
  centerDeg = 0,
  centerToleranceDeg = 1.5,
  children,
}: BoostRingProps) {
  const { activeIndex, setActiveIndex, strokePx, isPaused } = useCircles();
  const adjRadius = radiusPx - strokePx / 2;

  const items = React.useMemo(() => {
    const out: Array<{
      key: React.Key;
      startDeg: number;
      onCenteredIndex?: number;
      node: React.ReactNode;
    }> = [];

    React.Children.forEach(children, (child, idx) => {
      if (!React.isValidElement(child)) return;
      if (child.type !== BoostRingItem) return;
      const p = child.props as BoostRingItemProps;
      out.push({
        key: child.key ?? idx,
        startDeg: p.startDeg,
        onCenteredIndex: p.onCenteredIndex,
        node: p.children,
      });
    });

    return out;
  }, [children]);

  const itemElsRef = React.useRef<Array<HTMLDivElement | null>>([]);
  const thetasRef = React.useRef<number[]>([]);
  const lastTRef = React.useRef<number | null>(null);
  const pausedUntilRef = React.useRef(0);

  // Which item we are currently trying to bring to top-center for pause
  const targetIdxRef = React.useRef<number | null>(null);

  const toCenterDecreasing = React.useCallback(
    (theta: number) =>
      (normalizeDeg(theta) - normalizeDeg(centerDeg) + 360) % 360,
    [centerDeg],
  );

  const speedForTheta = React.useCallback(
    (theta: number) =>
      isInTopVisibleHalf(theta) ? visibleSpeedDps : hiddenSpeedDps,
    [visibleSpeedDps, hiddenSpeedDps],
  );

  React.useLayoutEffect(() => {
    itemElsRef.current = itemElsRef.current.slice(0, items.length);
    thetasRef.current = items.map((it) => normalizeDeg(it.startDeg));
    targetIdxRef.current = null;

    for (let i = 0; i < items.length; i++) {
      const el = itemElsRef.current[i];
      if (!el) continue;
      applyOrbitTransform(el, thetasRef.current[i], adjRadius);
    }
  }, [items, adjRadius]);

  React.useEffect(() => {
    let raf = 0;
    const MAX_DT = 0.05;

    const SKIP_CENTER_DEG = Math.min(Math.max(centerToleranceDeg, 0.75), 3);

    const applyAll = () => {
      for (let i = 0; i < items.length; i++) {
        const el = itemElsRef.current[i];
        if (!el) continue;
        applyOrbitTransform(el, thetasRef.current[i], adjRadius);
      }
    };

    const pickNextTarget = () => {
      let bestIdx = 0;
      let bestTo = Infinity;

      for (let i = 0; i < items.length; i++) {
        const theta = thetasRef.current[i];
        let to = toCenterDecreasing(theta);
        // if it's basically at center, skip it so we choose the next one
        if (to <= SKIP_CENTER_DEG) to = 360;

        if (to < bestTo) {
          bestTo = to;
          bestIdx = i;
        }
      }

      return bestIdx;
    };

    const advanceAll = (deltaSec: number) => {
      const next = thetasRef.current.slice();

      for (let i = 0; i < next.length; i++) {
        const theta0 = next[i];
        const spd = speedForTheta(theta0);
        next[i] = theta0 - spd * deltaSec;
      }

      thetasRef.current = next;
      applyAll();
    };

    const tick = (t: number) => {
      if (lastTRef.current == null) lastTRef.current = t;
      const dt = Math.min((t - lastTRef.current) / 1000, MAX_DT);
      lastTRef.current = t;

      // Hover pause: freeze the pause countdown too
      if (isPaused) {
        if (pauseOnCenterMs && t < pausedUntilRef.current) {
          pausedUntilRef.current += dt * 1000;
        }
        raf = requestAnimationFrame(tick);
        return;
      }

      // Center pause window
      if (pauseOnCenterMs && t < pausedUntilRef.current) {
        raf = requestAnimationFrame(tick);
        return;
      }

      if (items.length === 0) {
        raf = requestAnimationFrame(tick);
        return;
      }

      if (targetIdxRef.current == null) {
        targetIdxRef.current = pickNextTarget();
      }

      const targetIdx = targetIdxRef.current;
      const thetaTarget0 = thetasRef.current[targetIdx];

      const spdTarget = speedForTheta(thetaTarget0);
      const stepTarget = spdTarget * dt;
      const toCenter = toCenterDecreasing(thetaTarget0);

      // If target will reach center within this frame, split the frame:
      // 1) move all items only until target hits center
      // 2) clamp target to exact center
      // 3) pause everything
      if (pauseOnCenterMs && toCenter <= stepTarget) {
        const frac = stepTarget > 0 ? toCenter / stepTarget : 0;
        const dtToCenter = dt * frac;

        // advance all by partial dt
        if (dtToCenter > 0) {
          advanceAll(dtToCenter);
        }

        // clamp target exactly at center (no jump; it already arrived this frame)
        const clamped = thetasRef.current.slice();
        clamped[targetIdx] = centerDeg;
        thetasRef.current = clamped;
        applyAll();

        // set active when pausing at center
        const onIdx = items[targetIdx].onCenteredIndex;
        if (typeof onIdx === "number" && activeIndex !== onIdx) {
          setActiveIndex(onIdx);
        }

        pausedUntilRef.current = t + pauseOnCenterMs;
        targetIdxRef.current = null;

        raf = requestAnimationFrame(tick);
        return;
      }

      // Normal full-frame advance (each item uses its own visibility-based speed)
      advanceAll(dt);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [
    items,
    adjRadius,
    isPaused,
    pauseOnCenterMs,
    centerDeg,
    centerToleranceDeg,
    visibleSpeedDps,
    hiddenSpeedDps,
    activeIndex,
    setActiveIndex,
    toCenterDecreasing,
    speedForTheta,
  ]);

  return (
    <>
      {items.map((it, i) => (
        <div
          key={it.key}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div
            ref={(node) => {
              itemElsRef.current[i] = node;
            }}
            style={{
              transform: `rotate(${it.startDeg}deg) translateY(${-adjRadius}px) rotate(${-it.startDeg}deg)`,
            }}
          >
            {it.node}
          </div>
        </div>
      ))}
    </>
  );
}
type BoostProps = {
  radiusPx: number;
  startDeg: number;
  visibleSpeedDps?: number;
  hiddenSpeedDps?: number;
  onCenteredIndex?: number; // helper: set activeIndex when centered
  onCenterChange?: (isCentered: boolean) => void; // raw hook-through
  children: React.ReactNode;
  pauseOnCenterMs?: number;
};

function Boost({
  radiusPx,
  startDeg,
  visibleSpeedDps,
  hiddenSpeedDps,
  onCenteredIndex,
  onCenterChange,
  children,
  pauseOnCenterMs,
}: BoostProps) {
  const { activeIndex, setActiveIndex, strokePx, isPaused } = useCircles();

  return (
    <OrbitBoostItem
      radiusPx={radiusPx - strokePx / 2}
      startDeg={startDeg}
      visibleSpeedDps={visibleSpeedDps}
      hiddenSpeedDps={hiddenSpeedDps}
      onCenterChange={(isCentered) => {
        onCenterChange?.(isCentered);
        if (
          isCentered &&
          typeof onCenteredIndex === "number" &&
          activeIndex !== onCenteredIndex
        ) {
          setActiveIndex(onCenteredIndex);
        }
      }}
      paused={isPaused}
      pauseOnCenterMs={pauseOnCenterMs}
    >
      {children}
    </OrbitBoostItem>
  );
}

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "grid size-12 place-items-center rounded-full bg-white shadow-lg",
        "border border-slate-200"
      )}
    >
      {children}
    </div>
  );
}

// Helper hook for FeatureCard usage (reads activeIndex)
function Active({
  index,
  children,
}: {
  index: number;
  children: (isActive: boolean) => React.ReactNode;
}) {
  const { activeIndex } = useCircles();
  return <>{children(activeIndex === index)}</>;
}

// ========== Public component with attached compounds ==========
function CirclesDemoBase() {
  // This base component is intentionally empty; usage is via compounds below.
  return null;
}

export const HalfCricles = Object.assign(CirclesDemoBase, {
  Root,
  Header,
  System,
  Ring,
  Boost,
  BoostRing,
  BoostRingItem,
  Icon,
  Active,
});
// ========== Example usage: same output as your original ==========
export default function CirclesDemoPage() {
  const strokePx = 2; // you can keep this external if you want

  return (
    <HalfCricles.Root defaultActiveIndex={1} strokePx={strokePx}>
      <HalfCricles.Header
        title="Four Pillars"
        heading="Building Minds and Boundless"
        accent="Futures"
        className="md:w-164.25"
        textClassName="text-center"
      />
      <HalfCricles.System translateY={600}>
        {/* ring 1 */}
        <HalfCricles.Ring
          size={560}
          speed={22}
          className="border-white/30 border-2 bg-[#0857a003] shadow-[var(--shadow-ring-sm)]"
        >
          <HalfCricles.Boost radiusPx={560 / 2} startDeg={0}>
            <HalfCricles.Icon>
              <Atom className="size-5 text-orange-500" />
            </HalfCricles.Icon>
          </HalfCricles.Boost>
        </HalfCricles.Ring>

        {/* ring 2 */}
        <HalfCricles.Ring
          size={700}
          speed={28}
          reverse
          className="border-white/30 border-2 bg-[#0857a003] shadow-[var(--shadow-ring-lg)]"
        >
          <HalfCricles.Boost radiusPx={700 / 2} startDeg={300}>
            <HalfCricles.Icon>
              <Bot className="size-5 text-red-600" />
            </HalfCricles.Icon>
          </HalfCricles.Boost>
        </HalfCricles.Ring>

        {/* ring 3 */}
        <HalfCricles.Ring
          size={840}
          speed={34}
          className="border-white border-2 bg-[#0857a003] shadow-[var(--shadow-ring-md)]"
        />

        {/* ring 4 */}
        <HalfCricles.Ring
          size={1300}
          speed={34}
          className="border-white border-2 bg-[#0857a003] shadow-[var(--shadow-ring-lg)]"
        >
          <HalfCricles.BoostRing
            radiusPx={1300 / 2}
            visibleSpeedDps={10}
            hiddenSpeedDps={400}
            pauseOnCenterMs={5000}
            centerDeg={0}
            centerToleranceDeg={1.5}
          >
            <HalfCricles.BoostRingItem startDeg={70} onCenteredIndex={2}>
              <HalfCricles.Active index={2}>
                {(isActive) => (
                  <FeatureCard
                    isActive={isActive}
                    icon={culturalValues}
                    text="Cultural Values"
                  />
                )}
              </HalfCricles.Active>
            </HalfCricles.BoostRingItem>

            <HalfCricles.BoostRingItem startDeg={10} onCenteredIndex={1}>
              <HalfCricles.Active index={1}>
                {(isActive) => (
                  <FeatureCard
                    isActive={isActive}
                    icon={medal}
                    text="Academic Excellence"
                    imageClassName="right-[-50px] bottom-[-55px] w-[80%]"
                  />
                )}
              </HalfCricles.Active>
            </HalfCricles.BoostRingItem>

            <HalfCricles.BoostRingItem startDeg={-50} onCenteredIndex={3}>
              <HalfCricles.Active index={3}>
                {(isActive) => (
                  <FeatureCard
                    isActive={isActive}
                    icon={flower}
                    text="Holistic Development & wellbeing"
                    textClassName="w-68"
                    imageClassName="w-[58%] right-[-22px]"
                    icon2={flower2}
                    image2ClassName="w-[30%] right-[100px] scale-x-[-1]"
                  />
                )}
              </HalfCricles.Active>
            </HalfCricles.BoostRingItem>
          </HalfCricles.BoostRing>
        </HalfCricles.Ring>
      </HalfCricles.System>
    </HalfCricles.Root>
  );
}
