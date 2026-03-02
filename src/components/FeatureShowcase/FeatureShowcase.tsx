"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { FeatureShowcaseItem } from "./FeatureShowcase.data";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import PrimaryButton from "../PrimaryButton";
import Option from "../Option";

type Props = {
  items: FeatureShowcaseItem[];
  defaultActiveId?: string;
  className?: string;
};

function getDotColor(dotColor?: FeatureShowcaseItem["dotColor"]) {
  switch (dotColor) {
    case "red":
      return "#ef4444";
    case "orange":
      return "#f97316";
    case "amber":
    default:
      return "#f59e0b";
  }
}

export default function FeatureShowcase({
  items,
  defaultActiveId,
  className,
}: Props) {
  const initialIndex = React.useMemo(() => {
    if (!defaultActiveId) return 0;
    const idx = items.findIndex((i) => i.id === defaultActiveId);
    return idx >= 0 ? idx : 0;
  }, [defaultActiveId, items]);

  const [activeIndex, setActiveIndex] = React.useState(initialIndex);
  const active = items[activeIndex];

  // For smooth image transitions
  const [fadeKey, setFadeKey] = React.useState(0);
  React.useEffect(() => {
    setFadeKey((k) => k + 1);
  }, [activeIndex]);

  // Keyboard navigation (Left/Right)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % items.length);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + items.length) % items.length);
    }
  };

  return (
    <section
      className={cn(
        // responsive padding + constrain width
        "w-full flex flex-col gap-10 pt-[20px] sm:py-25",
        className,
      )}
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-label="Feature showcase"
      data-nav-theme="dark"
    >
      <div className=" lg:hidden flex gap-2.5 z-50 w-full items-center justify-center">
        {items.map((item, i) => {
          return (
            <Option
              key={i}
              isActive={i === activeIndex}
              onClick={() => setActiveIndex(i)}
              label={item.tabLabel}
              dotColor={getDotColor(item.dotColor)}
            />
          );
        })}
      </div>

      <div className="flex flex-row justify-center items-center  mx-auto w-full max-w-6xl ">
        {/* Layout: stacked on mobile, 2-col on lg */}
        <div className="flex flex-col lg:flex-row w-full lg:max-w-6xl items-center gap-10 lg:gap-25">
          {/* Media card */}
          <div className="relative overflow-hidden rounded-[36px] bg-i-primary">
            {/* Responsive height (prevents h-full issues) */}
            <div className="relative flex h-[320px] items-end justify-center pt-8 sm:h-[380px] md:h-[460px] lg:h-[520px]">
              <div className="absolute -top-4 h-[85%] w-[90%] rounded-[470px] blur-[74px] bg-i-light-blue" />
              <div className="absolute -bottom-4 h-[75%] w-[90%] rounded-[470px] blur-[74px] bg-[radial-gradient(44.53%_75.64%_at_50%_37.23%,#0857A0_0%,rgba(0,154,220,0)_100%)]" />
              <div className="absolute top-5 h-[83%] w-[90%] rounded-[460px] blur-[22px] bg-[radial-gradient(59.34%_101.52%_at_50%_14.46%,#18D6D9_0%,rgba(24,214,217,0)_71.05%)]" />

              <div className="z-20 flex  items-center justify-center">
                <Image
                  key={fadeKey}
                  src={active.imageSrc}
                  alt={active.imageAlt}
                  className={cn(
                    "max-h-full object-cover ",
                    "transition-opacity duration-300 ease-out",
                    "w-[504px] h-[571px]",
                  )}
                  priority
                />
              </div>
            </div>
          </div>

          {/* Controls + content */}
          <div className="flex flex-col gap-8 sm:gap-10 min-w-0 flex-1 w-75 md:w-fit">
            {/* Pills */}
            <div className="hidden lg:flex flex-wrap items-start gap-2.5">
              {items.map((item, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      "flex items-center justify-center rounded-[26.5px]  ",
                      "h-11  sm:h-13 ", // responsive size
                      "transition-colors",
                      isActive
                        ? "bg-slate-200/70 text-[#022B52]"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200/50",
                      // make inactive pills small dots, active pills auto-size
                      isActive ? "min-w-[160px]" : "w-11 sm:w-13",
                    )}
                    aria-pressed={isActive}
                  >
                    {!isActive ? (
                      <div
                        style={{
                          width: "14px",
                          height: "14px",
                          borderRadius: "50%",
                          backgroundColor: getDotColor(item.dotColor),
                          margin: "0 auto",
                        }}
                      />
                    ) : (
                      // </div>
                      <Label className="text-center font-poppins text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[150%] tracking-[-1px] text-i-primary">
                        {item.tabLabel}
                      </Label>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-col gap-4 sm:gap-6 max-w-[400px]  min-w-0">
              <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-normal leading-tight text-[#022B52] wrap-break-word">
                {active.richTitleDirection === "left" && (
                  <span className="bg-linear-to-l from-i-secondary to-i-secondary-2 bg-clip-text font-medium italic text-transparent">
                    {active.titleAccent}
                  </span>
                )}{" "}
                <span>{active.subtitle}</span>
                {active.richTitleDirection === "right" && (
                  <span className="bg-linear-to-r from-i-secondary to-i-secondary-2 bg-clip-text font-medium italic text-transparent">
                    {active.titleAccent}
                  </span>
                )}
              </h2>

              <p className="text-[14px] sm:text-[16px] text-i-primary/55 break-words whitespace-normal">
                {active.description}
              </p>
            </div>

            {/* CTA */}
            {!!active.ctaHref && !!active.ctaLabel && (
              <PrimaryButton>
                <Link href={active.ctaHref}>{active.ctaLabel}</Link>
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
