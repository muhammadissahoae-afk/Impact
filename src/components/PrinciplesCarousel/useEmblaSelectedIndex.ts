"use client";
import React from "react";
import type { EmblaCarouselType } from "embla-carousel";

export function useEmblaSelectedIndex(emblaApi: EmblaCarouselType | undefined) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [snapCount, setSnapCount] = React.useState(0);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;

    const updateSnaps = () => setSnapCount(emblaApi.scrollSnapList().length);

    updateSnaps();
    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      updateSnaps();
      onSelect();
    });

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return { selectedIndex, snapCount };
}
