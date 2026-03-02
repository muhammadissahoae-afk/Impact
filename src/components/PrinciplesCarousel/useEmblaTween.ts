"use client";
import React from "react";
import type { EmblaCarouselType } from "embla-carousel";

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

type TweenConfig = {
  minScale?: number;
  maxScale?: number;
  minOpacity?: number;
  maxOpacity?: number;
  maxTranslateY?: number;
  tweenFactor?: number;
  selector?: string; // node inside each slide to animate
};

export function useEmblaTween(
  emblaApi: EmblaCarouselType | undefined,
  {
    minScale = 0.94,
    maxScale = 1,
    minOpacity = 0.72,
    maxOpacity = 1,
    maxTranslateY = 14,
    tweenFactor = 2.8,
    selector = "[data-tween-node]",
  }: TweenConfig = {}
) {
  const tweenNodesRef = React.useRef<Array<HTMLElement | null>>([]);

  const setTweenNodes = React.useCallback(() => {
    if (!emblaApi) return;
    tweenNodesRef.current = emblaApi.slideNodes().map((slide) => slide.querySelector(selector) as HTMLElement | null);
  }, [emblaApi, selector]);

  const applyTween = React.useCallback(() => {
    if (!emblaApi) return;

    const engine: any = emblaApi.internalEngine?.();
    const scrollProgress = emblaApi.scrollProgress();
    const snaps = emblaApi.scrollSnapList();

    const isLoop = Boolean(engine?.options?.loop);
    const loopPoints = isLoop ? engine.slideLooper.loopPoints : [];

    for (let i = 0; i < snaps.length; i++) {
      const snap = snaps[i];
      let diffToTarget = snap - scrollProgress;

      if (isLoop && loopPoints?.length) {
        loopPoints.forEach((lp: any) => {
          if (lp.index !== i) return;
          const target = lp.target();
          if (target === 0) return;
          diffToTarget = snap + (target > 0 ? 1 : -1) - scrollProgress;
        });
      }

      const tween = clamp(1 - Math.abs(diffToTarget * tweenFactor), 0, 1);

      const scale = minScale + (maxScale - minScale) * tween;
      const opacity = minOpacity + (maxOpacity - minOpacity) * tween;
      const translateY = maxTranslateY * (1 - tween);

      const node = tweenNodesRef.current[i];
      if (!node) continue;

      node.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      node.style.opacity = String(opacity);
      node.style.transformOrigin = "center center";
      node.style.willChange = "transform, opacity";
    }
  }, [emblaApi, minScale, maxScale, minOpacity, maxOpacity, maxTranslateY, tweenFactor]);

  React.useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes();
    applyTween();

    emblaApi.on("scroll", applyTween);
    emblaApi.on("reInit", () => {
      setTweenNodes();
      applyTween();
    });

    return () => {
      emblaApi.off("scroll", applyTween);
    };
  }, [emblaApi, applyTween, setTweenNodes]);

  return { applyTween };
}
