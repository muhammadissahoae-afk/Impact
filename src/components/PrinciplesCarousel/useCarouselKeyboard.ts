"use client";
import React from "react";
import type { EmblaCarouselType } from "embla-carousel";

type Args = {
  emblaApi: EmblaCarouselType | undefined;
  snapCount: number;
};

export function useCarouselKeyboard({ emblaApi, snapCount }: Args) {
  return React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!emblaApi) return;

      // Only handle keys when the carousel container itself has focus
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        emblaApi.scrollPrev();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        emblaApi.scrollNext();
        return;
      }
      if (e.key === "Home") {
        e.preventDefault();
        emblaApi.scrollTo(0);
        return;
      }
      if (e.key === "End") {
        e.preventDefault();
        emblaApi.scrollTo(Math.max(0, snapCount - 1));
      }
    },
    [emblaApi, snapCount],
  );
}
