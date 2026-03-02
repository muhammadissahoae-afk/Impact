/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ArrowLeft, ArrowRight, Atom, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";

import share from "@/svgs/share.svg";
import flowers from "@/svgs/flowers.gif";

import SectionHeader from "../SectionHeader";
import Image, { StaticImageData } from "next/image";
import { Label } from "../ui/label";

import Frame from "@/app/about-us/teaching-philosophy/Frame.svg";
import noteText from "@/app/about-us/teaching-philosophy/note-text.svg";
import CPU from "@/svgs/cpu-charge.svg";
import Message from "@/app/about-us/teaching-philosophy/message-question.svg";
import Profile from "@/app/about-us/teaching-philosophy/profile.svg";

type OrbitBoostItemProps = {
  radiusPx: number;
  startDeg?: number;

  // degrees per second
  visibleSpeedDps?: number;
  hiddenSpeedDps?: number;

  centerDeg?: number; // default 270 (top)
  centerToleranceDeg?: number; // +/- degrees around centerDeg
  onCenterChange?: (isCentered: boolean) => void;

  children: React.ReactNode;
};

type OrbitRingProps = {
  size: number; // diameter
  speed?: number; // seconds
  reverse?: boolean;
  className?: string;
  children?: React.ReactNode;

  offsetX?: number;
  offsetY?: number;
};
export function OrbitRing({
  size,
  speed = 18,
  reverse,
  className,
  children,
  offsetX = 0,
  offsetY = 0,
}: OrbitRingProps) {
  const radius = size / 2;

  return (
    <div
      className={cn(
        "absolute left-1/2 top-1/2  rounded-full border",
        className,
      )}
      style={
        {
          width: size,
          height: size,
          marginLeft: -radius,
          marginTop: -radius,
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          ["--orbit-radius" as any]: `${radius}px`,
          ["--orbit-duration" as any]: `${speed}s`,
          ["--orbit-direction" as any]: reverse ? "reverse" : "normal",
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

type OrbitItemProps = {
  angle?: number; // degrees
  className?: string;
  arcDeg?: number;
  motionClassName?: string;
  pingPongDirection?: "clockwise" | "counterclockwise";
  children: React.ReactNode;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  radialOffsetPx?: number;
};

export function OrbitItem({
  angle = 0,
  className,
  motionClassName = "orbit-item",
  pingPongDirection,
  arcDeg,
  children,
  position,
  radialOffsetPx = 0,
}: OrbitItemProps) {
  const positionConfig: Record<string, string> = {
    "top-right": "left-[60%] top-1/2 ",
    "top-left": "left-4/9 top-1/2",
    "bottom-right": "left-3/5 lg:left-[70%] xl:left-[65%] top-1/2",
    "bottom-left": "left-2/6 top-1/2",
  };
  return (
    <div
      className={cn(
        "absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        className,
        position ? positionConfig[position] : "",
      )}
    >
      <div
        className={motionClassName}
        style={
          {
            ["--orbit-angle" as any]: `${angle}deg`,
            ["--orbit-offset" as any]: `${radialOffsetPx}px`,
            ...(arcDeg != null
              ? { ["--orbit-arc" as any]: `${arcDeg}deg` }
              : {}),
            ...(pingPongDirection
              ? {
                  ["--orbit-pingpong-delay" as any]:
                    pingPongDirection === "counterclockwise"
                      ? `calc(var(--orbit-duration, 0.1s) / -2)`
                      : "0s",
                }
              : {}),
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}

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
  return diff;
}

function isInTopVisibleHalf(deg: number) {
  const d = normalizeDeg(deg);
  return d >= 275 || d <= 90;
}

export function OrbitBoostItem({
  radiusPx,
  startDeg = 330,
  visibleSpeedDps = 18,
  hiddenSpeedDps = 600,
  centerDeg = 0,
  centerToleranceDeg = 20,
  onCenterChange,
  children,
}: OrbitBoostItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const thetaRef = React.useRef(startDeg);
  const lastTRef = React.useRef<number | null>(null);

  const centeredRef = React.useRef(false);

  React.useEffect(() => {
    let raf = 0;

    const tick = (t: number) => {
      if (lastTRef.current == null) lastTRef.current = t;
      const MAX_DT = 0.05;

      const rawDt = (t - lastTRef.current) / 1000;
      const dt = Math.min(rawDt, MAX_DT);
      lastTRef.current = t;

      const theta = thetaRef.current;
      const inVisible = isInTopVisibleHalf(theta);

      const speed = inVisible ? visibleSpeedDps : hiddenSpeedDps;

      const next = theta - speed * dt;
      thetaRef.current = next;

      const el = ref.current;
      if (el) {
        const d = normalizeDeg(next);
        el.style.transform = `rotate(${d}deg) translateY(${-radiusPx}px) rotate(${-d}deg)`;
      }

      const dist = shortestAngularDistance(next, centerDeg);
      const isCentered = dist <= centerToleranceDeg;

      if (isCentered !== centeredRef.current) {
        centeredRef.current = isCentered;
        onCenterChange?.(isCentered);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [
    radiusPx,
    visibleSpeedDps,
    hiddenSpeedDps,
    centerDeg,
    centerToleranceDeg,
    onCenterChange,
  ]);

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div
        ref={ref}
        style={{
          transform: `rotate(${startDeg}deg) translateY(${-radiusPx}px) rotate(${-startDeg}deg)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

type CirclesCtx = {
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  strokePx: number;
};

const CirclesContext = React.createContext<CirclesCtx | null>(null);

function useCircles() {
  const ctx = React.useContext(CirclesContext);
  if (!ctx)
    throw new Error(
      "CirclesDemo components must be used within <CirclesDemo.Root>",
    );
  return ctx;
}

interface RootProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  defaultActiveIndex?: number | null;
  strokePx?: number;
}

const Root = React.forwardRef<HTMLElement, Omit<RootProps, "ref">>(
  (
    { children, defaultActiveIndex = 1, strokePx = 2, className, ...props },
    ref,
  ) => {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(
      defaultActiveIndex,
    );

    return (
      <CirclesContext.Provider
        value={{ activeIndex, setActiveIndex, strokePx }}
      >
        <section
          ref={ref}
          className={cn(
            "flex-col items-center hidden md:flex relative w-full h-[800px] md:h-[1050px] overflow-hidden md:pt-25 bg-i-bg-alt",
            className,
          )}
          data-nav-theme="dark"
          {...props}
        >
          {children}
        </section>
      </CirclesContext.Provider>
    );
  },
);

Root.displayName = "Root";

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

function System({
  children,
  translateY = 600,
  className,
}: {
  children: React.ReactNode;
  translateY?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("absolute ", className)}
      style={{ transform: `translateY(${translateY}px)` }}
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

  offsetX?: number;
  offsetY?: number;
};

function Ring({
  size,
  speed,
  reverse,
  className,
  children,
  offsetX,
  offsetY,
}: RingProps) {
  return (
    <OrbitRing
      size={size}
      speed={speed}
      reverse={reverse}
      className={className}
      offsetX={offsetX}
      offsetY={offsetY}
    >
      {children}
    </OrbitRing>
  );
}

type BoostProps = {
  radiusPx: number;
  startDeg: number;
  visibleSpeedDps?: number;
  hiddenSpeedDps?: number;
  onCenteredIndex?: number;
  onCenterChange?: (isCentered: boolean) => void;
  children: React.ReactNode;
};

function Boost({
  radiusPx,
  startDeg,
  visibleSpeedDps,
  hiddenSpeedDps,
  onCenteredIndex,
  onCenterChange,
  children,
}: BoostProps) {
  const { activeIndex, setActiveIndex, strokePx } = useCircles();

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
    >
      {children}
    </OrbitBoostItem>
  );
}

function Icon({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid size-12 place-items-center rounded-full bg-white shadow-lg",
        "border border-slate-200",
      )}
    >
      {children}
    </div>
  );
}

const IconSvg = ({
  src,
  className,
  text,
  desc,
}: {
  src: StaticImageData;
  className: string;
  text: string;
  desc?: string;
}) => {
  return (
    <div className="flex flex-col relative  items-center ">
      <div
        className={cn(
          "p-4.5 flex items-center justify-center rounded-[100px]",
          className,
        )}
      >
        <Image src={src} alt="icon" />
      </div>
      <div className="flex flex-col absolute top-17 w-48 text-center gap-2 ">
        <Label className="text-[22px] text-i-primary justify-center  font-normal leading-6 tracking-[-1.1px]">
          {text}
        </Label>
        <Label className="text-[16px] font-normal leading-[150%] tracking-[-0.8px] opacity-[0.5]">
          {desc}
        </Label>
      </div>
    </div>
  );
};

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

function CirclesDemoBase() {
  return null;
}

function useElementSize<T extends HTMLElement>() {
  const [node, setNode] = React.useState<T | null>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  const ref = React.useCallback((el: T | null) => {
    setNode(el);
  }, []);

  React.useLayoutEffect(() => {
    if (!node) return;

    const update = () => {
      const rect = node.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(node);

    return () => ro.disconnect();
  }, [node]);

  return { ref, node, ...size };
}

export const HalfCricles = Object.assign(CirclesDemoBase, {
  Root,
  Header,
  System,
  Ring,
  Boost,
  Icon,
  Active,
});

export default function HalfButtomMobile() {
  const {
    ref: rootRef,
    node: rootNode,
    width,
    height,
  } = useElementSize<HTMLElement>();

  const [activeOptions, setActiveOption] = useState(1);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const strokePx = 2;

  const headerWrapRef = useRef<HTMLDivElement | null>(null);
  const footerWrapRef = useRef<HTMLDivElement | null>(null);
  const [dragArea, setDragArea] = useState<{
    top: number;
    height: number;
  } | null>(null);

  const RING_TOP = 522;
  const RING_MID = 601;
  const RING_BOTTOM = 828;

  const pillars = useMemo(
    () => [
      {
        id: 1,
        title: "Active Learning",
        desc: "Promotes engagement through hands-on activities.",
        icon: Frame,
        iconBg: "bg-i-secondary-2",
      },
      {
        id: 2,
        title: "Social and Emotional Learning/Well-being",
        desc: `Supports students' overall well-being and success.`,
        icon: share,
        iconBg: "bg-i-secondary",
      },
      {
        id: 3,
        title: "Project-Based Learning",
        desc: "Engages students in real-world projects.",
        icon: noteText,
        iconBg: "bg-i-light-blue",
      },
      {
        id: 4,
        title: "Technology Integration",
        desc: "Enhances learning experiences with digital tools.",
        icon: CPU,
        iconBg: "bg-i-secondary-2",
      },
      {
        id: 5,
        title: "Student Centered Learning",
        desc: "Tailors instruction to individual needs and interests.",
        icon: Profile,
        iconBg: "bg-i-secondary",
      },
      {
        id: 6,
        title: "Inquiry-Based Learning",
        desc: "Encourages curiosity and self-directed learning.",
        icon: Message,
        iconBg: "bg-i-light-blue",
      },
    ],
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    skipSnaps: false,
  });

  useEffect(() => {
    if (!emblaApi) return;

    const sync = () => {
      setActiveOption(emblaApi.selectedScrollSnap() + 1);
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };

    sync();
    emblaApi.on("select", sync);
    emblaApi.on("reInit", sync);

    return () => {
      emblaApi.off("select", sync);
      emblaApi.off("reInit", sync);
    };
  }, [emblaApi]);

  // keep state in sync (safe even if not used directly)
  useEffect(() => {
    if (!emblaApi) return;
    const target = Math.max(0, Math.min(pillars.length - 1, activeOptions - 1));
    if (emblaApi.selectedScrollSnap() !== target) emblaApi.scrollTo(target);
  }, [emblaApi, activeOptions, pillars.length]);

  // ===== Active pillar orbit (driven by embla scroll) =====
  const ACTIVE_BASE_DEG = 180;
  const ACTIVE_MAX_SWING_DEG = 22;
  const activeOrbitRadiusPx = RING_BOTTOM / 2 - strokePx / 2;

  const activeOrbitElRef = useRef<HTMLDivElement | null>(null);
  const orbitRafRef = useRef<number | null>(null);
  const orbitAngleRef = useRef<number>(ACTIVE_BASE_DEG);

  const scheduleOrbitTransform = useCallback(
    (angleDeg: number) => {
      orbitAngleRef.current = angleDeg;
      if (orbitRafRef.current != null) return;

      orbitRafRef.current = requestAnimationFrame(() => {
        orbitRafRef.current = null;
        const el = activeOrbitElRef.current;
        if (!el) return;
        const d = normalizeDeg(orbitAngleRef.current);
        el.style.transform = `rotate(${d}deg) translateY(${-activeOrbitRadiusPx}px) rotate(${-d}deg)`;
      });
    },
    [activeOrbitRadiusPx],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const update = () => {
      const snaps = emblaApi.scrollSnapList();
      const selected = emblaApi.selectedScrollSnap();
      const progress = emblaApi.scrollProgress();

      const snapP = snaps[selected] ?? 0;
      const prevP = selected > 0 ? snaps[selected - 1] : snapP;
      const nextP = selected < snaps.length - 1 ? snaps[selected + 1] : snapP;
      const snapDist =
        selected < snaps.length - 1
          ? Math.max(1e-6, nextP - snapP)
          : Math.max(1e-6, snapP - prevP);

      const delta = progress - snapP;
      const normalized = Math.max(-1, Math.min(1, delta / snapDist));

      scheduleOrbitTransform(
        ACTIVE_BASE_DEG + normalized * ACTIVE_MAX_SWING_DEG,
      );
    };

    update();
    emblaApi.on("scroll", update);
    emblaApi.on("reInit", update);
    emblaApi.on("select", update);
    return () => {
      emblaApi.off("scroll", update);
      emblaApi.off("reInit", update);
      emblaApi.off("select", update);
    };
  }, [emblaApi, scheduleOrbitTransform]);

  // ===== Drag overlay bounds (between header and footer) =====
  const computeDragArea = useCallback(() => {
    if (!rootNode || !headerWrapRef.current || !footerWrapRef.current) return;

    const rootRect = rootNode.getBoundingClientRect();
    const headerRect = headerWrapRef.current.getBoundingClientRect();
    const footerRect = footerWrapRef.current.getBoundingClientRect();

    const rawTop = headerRect.bottom - rootRect.top;
    const rawBottom = rootRect.bottom - footerRect.top;

    const pad = 8;
    const top = Math.max(0, rawTop + pad);
    const bottom = Math.max(0, rawBottom + pad);
    const h = Math.max(0, rootRect.height - top - bottom);

    setDragArea({ top, height: h });
  }, [rootNode]);

  useLayoutEffect(() => {
    computeDragArea();
    if (!rootNode) return;

    const ro = new ResizeObserver(() => computeDragArea());
    ro.observe(rootNode);
    if (headerWrapRef.current) ro.observe(headerWrapRef.current);
    if (footerWrapRef.current) ro.observe(footerWrapRef.current);

    const onWin = () => computeDragArea();
    window.addEventListener("scroll", onWin, { passive: true });
    return () => {
      window.removeEventListener("scroll", onWin);
      ro.disconnect();
    };
  }, [computeDragArea, rootNode, width, height]);

  const activePillar = pillars[activeOptions - 1];

  const onPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
    else setActiveOption((v) => Math.max(1, v - 1));
  }, [emblaApi]);

  const onNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
    else setActiveOption((v) => Math.min(pillars.length, v + 1));
  }, [emblaApi, pillars.length]);
  
  return (
    <HalfCricles.Root
      ref={rootRef}
      defaultActiveIndex={null}
      strokePx={strokePx}
      className="md:hidden flex w-full h-[1080px] pb-10 pt-[29px] bg-[#eef5fb]"
    >
      {/* Invisible swipe surface (Embla) - only covers the rings area */}
      {dragArea && (
        <div
          className="absolute left-0 right-0 z-10"
          style={{ top: dragArea.top, height: dragArea.height }}
        >
          <div
            ref={emblaRef}
            className="h-full w-full overflow-hidden touch-pan-y"
            aria-label="Swipe to change active pillar"
          >
            <div className="flex h-full">
              {pillars.map((p) => (
                <div
                  key={p.id}
                  className="flex-[0_0_100%] h-full"
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[75%] justify-between items-center">
        <div ref={headerWrapRef}>
          <HalfCricles.Header
            title="Four Pillars"
            heading="Building minds and boundless"
            accent="futures"
            className="relative z-20  w-83.5! "
            textClassName="text-center text-[30px] leading-[30px] "
          />
        </div>

        {/* 3 stacked arcs */}
        <HalfCricles.System translateY={-100} className="pointer-events-none">
          <HalfCricles.Ring
            size={RING_BOTTOM}
            speed={34}
            offsetY={130}
            offsetX={0}
            className="border-white/60 border-2 bg-white/20 shadow-[0_18px_50px_rgba(2,43,82,0.10)]"
          >
            {activePillar && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div
                  ref={activeOrbitElRef}
                  style={{
                    transform: `rotate(${ACTIVE_BASE_DEG}deg) translateY(${-activeOrbitRadiusPx}px) rotate(${-ACTIVE_BASE_DEG}deg)`,
                    willChange: "transform",
                  }}
                >
                  <IconSvg
                    text={activePillar.title}
                    desc={activePillar.desc}
                    src={activePillar.icon}
                    className={activePillar.iconBg}
                  />
                </div>
              </div>
            )}

            <HalfCricles.Ring
              size={RING_MID}
              speed={30}
              reverse
              offsetY={0}
              offsetX={0}
              className="rounded-[421.458px] border border-i-bg-2 bg-[#0857A0]/1 shadow-[0_4px_40px_0_rgba(8,87,160,0.40)]"
            >
              <HalfCricles.Boost
                radiusPx={RING_MID / 2}
                startDeg={210}
                visibleSpeedDps={26}
                hiddenSpeedDps={26}
              >
                <HalfCricles.Icon>
                  <Bot className="size-5 text-red-600" />
                </HalfCricles.Icon>
              </HalfCricles.Boost>

              <HalfCricles.Ring
                size={RING_TOP}
                speed={26}
                offsetY={-0}
                offsetX={0}
                className="rounded-[421.458px] border border-i-bg-2 bg-[#0857A0]/1 shadow-[0_4px_40px_0_rgba(8,87,160,0.40)]"
              >
                <HalfCricles.Boost
                  radiusPx={RING_TOP / 2}
                  startDeg={20}
                  visibleSpeedDps={28}
                  hiddenSpeedDps={28}
                >
                  <HalfCricles.Icon>
                    <Atom className="size-5 text-orange-500" />
                  </HalfCricles.Icon>
                </HalfCricles.Boost>
              </HalfCricles.Ring>
            </HalfCricles.Ring>
          </HalfCricles.Ring>
        </HalfCricles.System>

        <div
          ref={footerWrapRef}
          className="flex flex-col items-center gap-13.75"
        >
          {/* <Image
            alt="flowers"
            src={flowers}
            className="w-80 h-80 md:w-75 md:h-75 xL:w-131.5 xl:h-131.5 lg:inline"
          /> */}

          {/* ✅ Arrows instead of dots (still swipe enabled) */}
          <div className="flex items-center gap-10">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous"
              className={cn(
                "grid place-items-center rounded-full",
                "size-14 bg-[#E3EBF2] shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
                "active:scale-95 transition",
              )}
              disabled={!canPrev}
            >
              <ArrowLeft />
            </button>

            <button
              type="button"
              onClick={onNext}
              aria-label="Next"
              className={cn(
                "grid place-items-center rounded-full",
                "size-14 bg-[#E3EBF2] shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
                "active:scale-95 transition",
              )}
              disabled={!canNext}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </HalfCricles.Root>
  );
}
