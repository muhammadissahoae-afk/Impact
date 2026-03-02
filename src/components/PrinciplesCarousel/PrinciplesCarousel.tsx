"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";

import CarouselCard from "./CarouselCard";
import type { PrinciplesCardData } from "./principles.types";
import { useEmblaSelectedIndex } from "./useEmblaSelectedIndex";
import { useEmblaTween } from "./useEmblaTween";
import { useCarouselKeyboard } from "./useCarouselKeyboard";
import { CarouselIndicator } from "./CarouselIndicator";
import { CarouselNavButton } from "./CarouselNavButton";

type Props = {
  cards: readonly PrinciplesCardData[];
  startIndex?: number;
  loop?: boolean;
  viewportPadding?: string;
  isWide?: boolean; // NEW
};

export function PrinciplesCarousel({
  cards,
  startIndex = 1,
  loop = true,
  viewportPadding,
  isWide = false,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop,
    startIndex,
  });

  const { selectedIndex, snapCount } = useEmblaSelectedIndex(emblaApi);
  useEmblaTween(emblaApi); // keep your existing tween behavior
  const onViewportKeyDown = useCarouselKeyboard({ emblaApi, snapCount });

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = React.useCallback((idx: number) => emblaApi?.scrollTo(idx), [emblaApi]);

  const effectiveViewportPadding =
    viewportPadding ?? (isWide ? "clamp(140px, 10vw, 220px)" : "clamp(12px, 7vw, 140px)");

  const edgeMask = isWide
    ? "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)"
    : undefined;

  return (
    <div className="w-full relative">
      <CarouselNavButton direction="prev" onClick={scrollPrev} />
      <CarouselNavButton direction="next" onClick={scrollNext} />

      {/* Viewport (focusable for keyboard) */}
      <div
        ref={emblaRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Principles carousel"
        onKeyDown={onViewportKeyDown}
        className="w-full overflow-hidden outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-0"
        style={{
          paddingLeft: effectiveViewportPadding,
          paddingRight: effectiveViewportPadding,
          touchAction: "pan-y pinch-zoom",
          // NEW: edge fade on wide screens
          maskImage: edgeMask,
          WebkitMaskImage: edgeMask,
        }}
      >
        <div className="flex items-stretch focus-visible:outline-0">
          {cards.map((card, i) => {
            const isActive = i === selectedIndex;

            return (
              <div
                key={card.title}
                className="
                  shrink-0
                  basis-full
                  md:basis-[85%]
                  lg:basis-[810px]
                  py-1
                "
              >
                <button
                  type="button"
                  onClick={() => scrollTo(i)}
                  className="block w-full text-left bg-transparent p-0 border-0 focus:outline-none"
                  aria-label={`Go to ${card.title}`}
                >
                  <div data-tween-node>
                    <CarouselCard isActive={isActive} title={card.title} text={card.text} />
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <CarouselIndicator snapCount={snapCount} selectedIndex={selectedIndex} onSelect={scrollTo} />
    </div>
  );
}
