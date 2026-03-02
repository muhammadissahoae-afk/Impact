"use client";
import React from "react";

type Props = {
  snapCount: number;
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export function CarouselIndicator({ snapCount, selectedIndex, onSelect }: Props) {
  return (
    <div className="w-full flex justify-center mt-19.25">
      <div className="flex items-center gap-2">
        {Array.from({ length: snapCount }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => onSelect(i)}
            className="rounded-full"
            style={{
              width: i === selectedIndex ? 26 : 18,
              height: 3,
              backgroundColor: "rgba(255,255,255,0.45)",
              opacity: i === selectedIndex ? 1 : 0.35,
              transition: "opacity 200ms ease, width 200ms ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
