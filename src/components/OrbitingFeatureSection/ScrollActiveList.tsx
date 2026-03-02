import { cn } from "@/lib/utils";
import React from "react";

function ScrollActiveList({
  items,
  activeIndex,
  onActiveIndexChange,
  className,
}: {
  items: { text: string; desc: string }[];
  activeIndex: number;
  onActiveIndexChange: (idx: number) => void;
  className?: string;
}) {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const itemRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const rafRef = React.useRef<number | null>(null);
  const debounceRef = React.useRef<number | null>(null);
  const isSnappingRef = React.useRef(false);

  const getClosestIndexToCenter = React.useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return activeIndex;

    const scrollerRect = scroller.getBoundingClientRect();
    const centerY = scrollerRect.top + scrollerRect.height / 2;

    let bestIdx = activeIndex;
    let bestDist = Number.POSITIVE_INFINITY;

    itemRefs.current.forEach((el, idx) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const itemCenterY = r.top + r.height / 2;
      const dist = Math.abs(itemCenterY - centerY);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = idx;
      }
    });

    return bestIdx;
  }, [activeIndex]);

  const snapToIndex = React.useCallback((idx: number) => {
    const scroller = scrollerRef.current;
    const el = itemRefs.current[idx];
    if (!scroller || !el) return;

    const targetTop =
      el.offsetTop - (scroller.clientHeight / 2 - el.clientHeight / 2);

    isSnappingRef.current = true;
    scroller.scrollTo({ top: targetTop, behavior: "smooth" });

    // release after smooth scroll likely completes
    window.setTimeout(() => {
      isSnappingRef.current = false;
    }, 350);
  }, []);

  const scheduleRecalcAndSnap = React.useCallback(() => {
    // Throttle “closest to center” calculations to animation frames
    if (rafRef.current != null) return;

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      const idx = getClosestIndexToCenter();

      // Update active immediately (but don’t spam)
      if (idx !== activeIndex) onActiveIndexChange(idx);

      // Snap only after scroll ends (debounced)
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        // Re-evaluate at end to avoid snapping to outdated idx
        const finalIdx = getClosestIndexToCenter();
        if (finalIdx !== activeIndex) onActiveIndexChange(finalIdx);
        snapToIndex(finalIdx);
      }, 160);
    });
  }, [activeIndex, getClosestIndexToCenter, onActiveIndexChange, snapToIndex]);

  React.useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onScroll = () => {
      // While we’re snapping, still allow updates, but keep it light
      scheduleRecalcAndSnap();
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [scheduleRecalcAndSnap]);

  // Initial center on mount
  React.useLayoutEffect(() => {
    snapToIndex(activeIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If activeIndex changes by click/tap (or external), re-center it
  React.useEffect(() => {
    if (isSnappingRef.current) return;
    snapToIndex(activeIndex);
  }, [activeIndex, snapToIndex]);

  return (
    <div
      ref={scrollerRef}
      className={cn(
        "overflow-y-auto overscroll-contain",
        "rounded-2xl bg-white/70 backdrop-blur-md",
        "shadow-lg border border-white/60",
        "px-3",
        className,
      )}
      style={{
        // allow first/last item to be centered
        scrollBehavior: "smooth",
      }}
    >
      <div className="h-10" />
      {items.map((it, idx) => {
        const isActive = idx === activeIndex;
        return (
          <div
            key={idx}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            onClick={() => {
              onActiveIndexChange(idx);
              snapToIndex(idx);
            }}
            className={cn(
              "cursor-pointer select-none",
              "rounded-xl px-4 py-3 mb-3",
              "transition-all",
              isActive
                ? "bg-white shadow-md ring-1 ring-slate-200"
                : "bg-white/50 hover:bg-white/70",
            )}
          >
            <div
              className={cn(
                "font-semibold text-slate-900",
                isActive ? "" : "opacity-80",
              )}
            >
              {it.text}
            </div>
            <div
              className={cn(
                "text-sm text-slate-500 mt-1 leading-5",
                isActive ? "" : "opacity-70",
              )}
            >
              {it.desc}
            </div>
          </div>
        );
      })}
      <div className="h-10" />
    </div>
  );
}
