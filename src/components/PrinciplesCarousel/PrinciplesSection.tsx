"use client";
import React from "react";
import { PrinciplesCarousel } from "./PrinciplesCarousel";
import { PRINCIPLES_CARDS } from "./principles.data";
import { OurRootsBadge } from "./OurRootsBadge";
import { PrinciplesTitle } from "./PrinciplesTitle";

export default function PrinciplesSection() {
  const [isWide, setIsWide] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia("(min-width: 1514px)");
    const onChange = () => setIsWide(mql.matches);

    onChange();
    mql.addEventListener?.("change", onChange);
    // Safari fallback
    mql.addListener?.(onChange);

    return () => {
      mql.removeEventListener?.("change", onChange);
      mql.removeListener?.(onChange);
    };
  }, []);

  // Header stays at design baseline
  const headerMaxWidth = 1513;

  // Carousel stage can grow on wide screens
  const carouselMaxWidth = isWide ? 1840 : 1513;

  // Extra space for peeks + arrows on wide screens
  const viewportPadding = isWide
    ? "clamp(140px, 10vw, 220px)"
    : "clamp(12px, 7vw, 140px)";


  return (
    <div className="w-full flex flex-col items-center gap-19.25">
      {/* Header (1513px) */}
      <div
        className="w-full flex flex-col items-center px-[clamp(16px,3vw,48px)]"
        style={{ maxWidth: headerMaxWidth }}
      >
        <div className="w-full flex flex-col items-center gap-10">
          <OurRootsBadge />
          <div className="md:w-162.5 text-center">
            <PrinciplesTitle />
          </div>
        </div>
      </div>

      {/* Carousel (grows beyond 1513px on wide screens) */}
      <div
        className="w-full focus-visible:outline-0 px-0 sm:px-[clamp(16px,3vw,48px)]"
        style={{
          maxWidth: carouselMaxWidth,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <PrinciplesCarousel
          cards={PRINCIPLES_CARDS}
          viewportPadding={viewportPadding}
          isWide={isWide}
        />
      </div>
    </div>
  );
}
