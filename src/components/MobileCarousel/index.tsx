"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import { cn } from "@/lib/utils";
import Option from "../Option";

type RenderMeta = { index: number; isActive: boolean };

export type MobileCarouselEmblaProps<T> = {
  items: T[];
  renderItem: (item: T, meta: RenderMeta) => React.ReactNode;
  getKey?: (item: T, index: number) => React.Key;

  className?: string;

  // sizing
  slideWidth?: string; // e.g. "78vw"
  slideMaxWidth?: string; // e.g. "360px"
  sidePaddingPx?: number; // outer padding inside viewport

  // stack look (visual-only)
  overlapPx?: number; // negative margin between slides
  stackShiftPrevPx?: number; // push previous left (clipped)
  stackShiftNextPx?: number; // push next right
  activePrevGapPx?: number; // extra gap between prev & active (visual)

  // behavior
  initialIndex?: number;
  options?: EmblaOptionsType;

  // dots
  renderDot?: (meta: {
    index: number;
    isActive: boolean;
    onClick: () => void;
  }) => React.ReactNode;
};

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(n, max));

export default function MobileCarouselEmbla<T>({
  items,
  renderItem,
  getKey,
  className,

  slideWidth = "78vw",
  slideMaxWidth = "360px",
  sidePaddingPx = 28,

  overlapPx = 44,
  stackShiftPrevPx = 34,
  stackShiftNextPx = 12,
  activePrevGapPx = 18,

  initialIndex = 1,
  options,
  renderDot,
}: MobileCarouselEmblaProps<T>) {
  const safeInitial = useMemo(() => {
    if (!items.length) return 0;
    return clamp(initialIndex, 0, items.length - 1);
  }, [initialIndex, items.length]);

  const mergedOptions: EmblaOptionsType = useMemo(
    () => ({
      // These match Embla defaults well for your UI (centered snaps).
      // Default align is "center" and containScroll is "trimSnaps". :contentReference[oaicite:2]{index=2}
      align: "center",
      containScroll: "trimSnaps",
      loop: false,
      skipSnaps: false,
      ...options,
      startSnap: safeInitial,
    }),
    [options, safeInitial],
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(mergedOptions);
  const [selectedIndex, setSelectedIndex] = useState(safeInitial);
  const [snapCount, setSnapCount] = useState(items.length);
  console.log("safeInitial", safeInitial, selectedIndex);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    console.log("api.selectedScrollSnap()", api.selectedScrollSnap());
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(safeInitial, true); // jump instantly to initial snap
  }, [emblaApi, safeInitial]);
  useEffect(() => {
    if (!emblaApi) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSnapCount(emblaApi.scrollSnapList().length);
    onSelect(emblaApi);

    emblaApi.on("select", () => onSelect(emblaApi));
    emblaApi.on("reInit", () => {
      setSnapCount(emblaApi.scrollSnapList().length);
      onSelect(emblaApi);
    });
  }, [emblaApi, onSelect]);

  // Click-to-select slide (ignore click after drag)
  const onSlideClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;

      // Embla exposes clickAllowed() in common setups to suppress clicks after dragging. :contentReference[oaicite:3]{index=3}
      const clickAllowedFn = (
        emblaApi as unknown as { clickAllowed?: () => boolean }
      ).clickAllowed;
      if (typeof clickAllowedFn === "function" && !clickAllowedFn()) return;

      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  if (!items.length) return null;

  return (
    <div className={cn(className, "flex flex-col gap-8.75 mb-5")}>
      <div className="relative overflow-hidden">
        <div
          ref={emblaRef}
          className="overflow-hidden"
          style={{ paddingLeft: sidePaddingPx, paddingRight: sidePaddingPx }}
        >
          <div className="flex items-stretch">
            {items.map((item, index) => {
              const key = getKey ? getKey(item, index) : index;
              const isActive = index === selectedIndex;

              const dist = Math.abs(index - selectedIndex);
              const zIndex = 30 - dist;
              const scale = dist === 0 ? 1 : dist === 1 ? 0.97 : 0.94;
              const opacity = dist === 0 ? 1 : dist === 1 ? 1 : 0.85;

              // visual-only spacing between prev and active
              const halfGap = activePrevGapPx / 2;
              const gapShiftX =
                index === selectedIndex
                  ? +halfGap
                  : index === selectedIndex - 1
                    ? -halfGap
                    : 0;

              // directional stack shift for clipping
              const stackShiftX =
                index === selectedIndex - 1
                  ? -stackShiftPrevPx
                  : index === selectedIndex + 1
                    ? +stackShiftNextPx
                    : 0;

              const shiftX = gapShiftX + stackShiftX;

              return (
                <div
                  key={key}
                  className="shrink-0 relative transition-transform duration-300"
                  style={{
                    width: slideWidth,
                    maxWidth: slideMaxWidth,
                    marginLeft: index === 0 ? 0 : -overlapPx,
                    zIndex,
                    opacity,
                    transform: `translateX(${shiftX}px) scale(${scale})`,
                  }}
                  onClick={() => {
                    if (!isActive) onSlideClick(index);
                  }}
                >
                  {renderItem(item, { index, isActive })}

                  {/* Optional: show pointer cursor for inactive */}
                  {!isActive && (
                    <div
                      className="absolute inset-0 cursor-pointer"
                      aria-hidden
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className=" flex gap-2.5 z-50 w-full items-center justify-center">
        {Array.from({ length: snapCount }).map((_, i) => {
          const meta = {
            index: i,
            isActive: i === selectedIndex,
            onClick: () => scrollTo(i),
          };
          return renderDot ? (
            <React.Fragment key={i}>{renderDot(meta)}</React.Fragment>
          ) : (
            <Option key={i} isActive={meta.isActive} onClick={meta.onClick} />
          );
        })}
      </div>
    </div>
  );
}
