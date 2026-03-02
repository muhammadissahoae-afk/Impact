"use client";

import React from "react";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { cn } from "@/lib/utils";
import { useTestimonialsCarousel } from "./useTestimonialsCarousel";
import image1 from "./image1.png";
import image2 from "./image2.png";
import image3 from "./image3.png";
import Vector from "./Vector.svg";
import Vector2 from "./Vector2.svg";
import { Label } from "../ui/label";
import Image from "next/image";
import SectionTitle from "../SectionTitle";
import RichTitleLeft from "../RichTitleLeft";
import SectionHeader from "../SectionHeader";
const carouselItemsRaw = [
  {
    src: image1.src,
    text: `Our school is committed to excellence and innovation in education, providing a safe, dynamic, and inclusive learning environment that addresses each student's unique and diverse needs. We optimize student well-being and foster moral, intellectual, social, emotional, and physical development. `,
  },
  {
    src: image2.src,
    text: `Our school is committed to excellence and innovation in education, providing a safe, dynamic, and inclusive learning environment that addresses each student's unique and diverse needs. We optimize student well-being and foster moral, intellectual, social, emotional, and physical development. `,
  },
  {
    src: image3.src,
    text: `Our school is committed to excellence and innovation in education, providing a safe, dynamic, and inclusive learning environment that addresses each student's unique and diverse needs. We optimize student well-being and foster moral, intellectual, social, emotional, and physical development. `,
  },
  {
    src: image1.src,
    text: `Our school is committed to excellence and innovation in education, providing a safe, dynamic, and inclusive learning environment that addresses each student's unique and diverse needs. We optimize student well-being and foster moral, intellectual, social, emotional, and physical development. `,
  },
  {
    src: image2.src,
    text: `Our school is committed to excellence and innovation in education, providing a safe, dynamic, and inclusive learning environment that addresses each student's unique and diverse needs. We optimize student well-being and foster moral, intellectual, social, emotional, and physical development. `,
  },
];

type ActiveCardProps = { src: string; text: string };

const ActiveCard = ({ src, text }: ActiveCardProps) => (
  <Card className="w-full h-auto md:h-97.5 bg-i-bg-alt rounded-[25px] border-i-bg-2 overflow-hidden shadow-[0_4px_5px_0_rgba(0,99,198,0.25)]  p-5 md:pb-5.5 md:pl-6 md:pt-6 md:pr-10.25">
    <CardContent className=" h-full flex flex-col md:flex-row gap-8 items-center p-0">
      <Image
        className="rounded-[25px] h-86  w-full md:w-60.5"
        alt="Testimonial author"
        src={src}
        width={242}
        height={344}
      />

      <div className="flex flex-col justify-between h-full py-4">
        <div className="space-y-4">
          <Image
            className="w-5 h-5 md:w-8 md:h-6"
            alt="Quote start"
            src={Vector}
          />
          <p className="text-i-primary/60 text-justify text-base font-normal leading-normal tracking-[-0.8px]">
            {text}
          </p>
          <Image
            className="w-5 h-5 md:w-8 md:h-6 ml-auto"
            alt="Quote end"
            src={Vector2}
          />
        </div>

        <div className="mt-6">
          <Label className="font-semibold text-i-primary text-[22px] md:text-[28px] tracking-tight">
            Shahd Mohammad
          </Label>
          <p className="text-i-primary/50  text-[16px] md:text-[20px] font-normal md:leading-[45px] tracking-[-1px]">
            Mother of Mohammad and Sama
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const InactiveStrip = ({ src }: { src: string }) => (
  <div className="w-full h-[390px] rounded-[25px] overflow-hidden relative">
    <img src={src} className="h-full w-full object-cover" alt="" />
    <div className="absolute inset-0 bg-white/30" />
  </div>
);

function SlideVisual(props: {
  src: string;
  text: string;
  slot: number;
  windowCenter: number;
  incomingSlot: number;
  dragProgress: number;
  isDragging: boolean;
  isAnimating: boolean;
  depthTweenMs: number;
}) {
  const {
    src,
    text,
    slot,
    windowCenter,
    incomingSlot,
    dragProgress,
    isDragging,
    isAnimating,
    depthTweenMs,
  } = props;

  const p = isDragging ? dragProgress : isAnimating ? 1 : 0;
  const isCenter = slot === windowCenter;
  const isIncoming = slot === incomingSlot;

  // Crossfade: Center fades out, Incoming fades in
  if (isCenter || isIncoming) {
    const activeOpacity = isCenter ? 1 - p : p;
    const stripOpacity = 1 - activeOpacity;

    return (
      <div className="relative h-full">
        <div
          className="absolute inset-0"
          style={{
            opacity: stripOpacity,
            transition: isDragging
              ? "none"
              : `opacity ${depthTweenMs}ms ease-out`,
          }}
        >
          <InactiveStrip src={src} />
        </div>

        <div
          className="absolute inset-0"
          style={{
            opacity: activeOpacity,
            transition: isDragging
              ? "none"
              : `opacity ${depthTweenMs}ms ease-out`,
          }}
        >
          <ActiveCard src={src} text={text} />
        </div>

        {/* keep height */}
        <div className="invisible">
          <ActiveCard src={src} text={text} />
        </div>
      </div>
    );
  }

  return <InactiveStrip src={src} />;
}

export const CommunityHighlights = () => {
  const [mobileAnimKey, setMobileAnimKey] = React.useState(0);
  const [mobileDir, setMobileDir] = React.useState<"next" | "prev">("next");
  const [mobilePhase, setMobilePhase] = React.useState<"idle" | "out">("idle");
  const [mobileEnterFrom, setMobileEnterFrom] = React.useState<number | null>(
    0
  );
  const mobileSwipeRef = React.useRef<{
    startX: number;
    startY: number;
    isSwiping: boolean;
  } | null>(null);

  const MOBILE_SWIPE_THRESHOLD_PX = 40; // keep small, feels responsive

  const onMobilePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only handle primary pointer (finger / primary mouse)
    if (e.pointerType === "mouse") return;

    mobileSwipeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      isSwiping: false,
    };
  };

  const onMobilePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = mobileSwipeRef.current;
    if (!s) return;

    const dx = e.clientX - s.startX;
    const dy = e.clientY - s.startY;

    // Decide intent once: horizontal swipe vs vertical scroll
    if (!s.isSwiping) {
      // If user is scrolling vertically, do nothing
      if (Math.abs(dy) > Math.abs(dx)) return;

      // lock swipe intent
      s.isSwiping = true;
    }

    // If swiping horizontally, prevent vertical scroll bounce
    e.preventDefault();
  };

  const onMobilePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = mobileSwipeRef.current;
    mobileSwipeRef.current = null;
    if (!s) return;

    const dx = e.clientX - s.startX;
    const dy = e.clientY - s.startY;

    // If it was mostly vertical, ignore
    if (Math.abs(dy) > Math.abs(dx)) return;

    if (dx <= -MOBILE_SWIPE_THRESHOLD_PX) {
      const next = (c.logicalActive + 1) % c.items.length;
      goMobile("next", next);
    } else if (dx >= MOBILE_SWIPE_THRESHOLD_PX) {
      const prev = (c.logicalActive - 1 + c.items.length) % c.items.length;
      goMobile("prev", prev);
    }
  };

  const onMobilePointerCancel = () => {
    mobileSwipeRef.current = null;
  };
  const config = React.useMemo(
    () => ({
      // base sizing
      activeW: 810,
      stripW: 220,
      gap: 32,
      padX: 96,

      // drag tuning
      dragRubber: 0.25,
      dragThresholdRatio: 0.28,

      // animation
      durationMs: 250,
      overshoot: 1.06,

      widthTweenMs: 260,
      depthTweenMs: 260,

      // window layout
      windowSize: 5,
      windowCenter: 2,
    }),
    []
  );

  const c = useTestimonialsCarousel({
    rawItems: carouselItemsRaw,
    initialActiveIndex: 1,
    config,
  });
  const MOBILE_ANIM_MS = 220;
  const MOBILE_OFFSET_PX = 12;

  const goMobile = (dir: "next" | "prev", nextIndex: number) => {
    setMobileDir(dir);

    // 1) animate current card out
    setMobilePhase("out");

    window.setTimeout(() => {
      // 2) swap content (new card mounts)
      c.goToLogical(nextIndex);

      // 3) mount new card at offset WITHOUT transition
      setMobileEnterFrom(dir === "next" ? MOBILE_OFFSET_PX : -MOBILE_OFFSET_PX);
      setMobileAnimKey((k) => k + 1);

      // 4) next frame: animate to 0
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setMobileEnterFrom(0);
          setMobilePhase("idle");
        });
      });
    }, MOBILE_ANIM_MS);
  };
  const activeItem = c.items[c.logicalActive];

  return (
    <div
      className="w-full flex flex-col gap-[65px] mx-auto bg-i-bg-alt rounded-[30px]  overflow-hidden py-5 md:py-25 md:px-8.5"
      data-nav-theme="dark"
    >
      <SectionHeader
        richTitleDirection="left"
        richTitleProps={{
          excent: "Voices",
          text: "of Our Learning Community",
          className: "md:w-148.5",
        }}
        sectionTitleProps={{ variant: "white" }}
      >
        Testimonials
      </SectionHeader>

      <div
        className="flex flex-col items-center gap-[65px] w-full focus-visible:outline-0"
        tabIndex={0}
        onKeyDown={c.onKeyDown}
        role="region"
        aria-roledescription="carousel"
        aria-label="Testimonials carousel"
      >
        {/* Desktop carousel (unchanged behavior) */}
        <div className="hidden md:block">
          {/* Viewport */}
          <div
            ref={c.viewportRef}
            className="w-full overflow-hidden-x px-6 md:px-12 lg:px-16 select-none"
            style={{
              paddingLeft: config.padX,
              paddingRight: config.padX,
              touchAction: "pan-y",
            }}
            onDragStart={(e) => e.preventDefault()}
            onPointerDown={c.onPointerDown}
            onPointerMove={c.onPointerMove}
            onPointerUp={c.onPointerUp}
            onPointerCancel={c.onPointerCancel}
            onClick={c.onViewportClick}
          >
            {/* Track */}
            <div
              className={cn(
                "flex items-stretch",
                c.isDragging ? "cursor-grabbing" : "cursor-grab"
              )}
              style={{
                gap: `${c.responsive.gap}px`,
                transform: `translate3d(${c.trackX}px, 0, 0)`,
                transition: c.trackTransition,
                willChange: "transform",
              }}
              onTransitionEnd={
                c.reducedMotion ? undefined : c.onTrackTransitionEnd
              }
            >
              {c.windowItems.map((item, slot) => {
                const w = c.widths[slot];
                const depth = c.depthForSlot(slot);
                const opacity = c.opacityForSlot(slot);

                return (
                  <div
                    key={`${item.id}-${slot}`}
                    className="shrink-0"
                    style={{
                      width: `${w}px`,
                      transition: c.reducedMotion
                        ? "none"
                        : `width ${config.widthTweenMs}ms ease-out`,
                    }}
                  >
                    <div
                      className="h-full"
                      style={{
                        transform: `scale(${depth})`,
                        opacity,
                        // boxShadow,
                        borderRadius: 25,
                        transition: c.reducedMotion
                          ? "none"
                          : [
                              `transform ${config.depthTweenMs}ms ease-out`,
                              `opacity ${config.depthTweenMs}ms ease-out`,
                              `box-shadow ${config.depthTweenMs}ms ease-out`,
                            ].join(", "),
                        willChange: "transform, opacity, box-shadow",
                      }}
                    >
                      <SlideVisual
                        src={item.src}
                        text={item.text}
                        slot={slot}
                        windowCenter={config.windowCenter}
                        incomingSlot={c.incomingSlot}
                        dragProgress={c.dragProgress}
                        isDragging={c.isDragging}
                        isAnimating={c.isAnimating || c.phase !== "idle"}
                        depthTweenMs={config.depthTweenMs}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: single full-width card */}
        <div
          className="md:hidden w-full "
          style={{ touchAction: "pan-y" }}
          onPointerDown={onMobilePointerDown}
          onPointerMove={onMobilePointerMove}
          onPointerUp={onMobilePointerUp}
          onPointerCancel={onMobilePointerCancel}
        >
          <div
            key={mobileAnimKey}
            style={{
              transition:
                mobileEnterFrom === null
                  ? "transform 220ms ease, opacity 220ms ease"
                  : "transform 220ms ease, opacity 220ms ease",
              opacity: mobilePhase === "out" ? 0 : 1,
              transform:
                mobilePhase === "out"
                  ? `translateX(${
                      mobileDir === "next"
                        ? -MOBILE_OFFSET_PX
                        : MOBILE_OFFSET_PX
                    }px)`
                  : `translateX(${mobileEnterFrom ?? 0}px)`,
              willChange: "transform, opacity",
            }}
          >
            <ActiveCard src={activeItem.src} text={activeItem.text} />
          </div>
        </div>

        {/* Pagination */}
        <nav
          className="flex items-center gap-2"
          aria-label="Carousel pagination"
        >
          {c.items.map((_, i) => {
            const isActive = i === c.logicalActive;
            return (
              <button
                key={i}
                onClick={() => {
                  const dir = i > c.logicalActive ? "next" : "prev";
                  goMobile(dir, i);
                }}
                className={cn(
                  "h-[4px] rounded-full transition-all",
                  isActive
                    ? "w-[47px] bg-[#022b52]"
                    : "w-[14px] bg-[#022b52]/20 hover:bg-[#022b52]/40"
                )}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={isActive ? "true" : "false"}
                type="button"
              />
            );
          })}
        </nav>
      </div>
    </div>
  );
};
