import React from "react";

// --- Constants ---
const CLONE_COUNT = 3;
const ACTIVE_W = 810;
const STRIP_W = 220;
const GAP = 32;
const PAD_X = 96;

// --- Types ---
export type Metrics = {
  viewportW: number;
  widths: number[];
  centers: number[];
  totalW: number;
};

// --- Helpers ---
const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));
const mod = (n: number, m: number) => ((n % m) + m) % m;

function computeMetrics(
  count: number,
  activeIdx: number,
  vW: number,
  responsive: any,
): Metrics {
  const widths = Array.from({ length: count }, (_, i) =>
    i === activeIdx ? responsive.activeW : responsive.stripW,
  );
  const centers: number[] = [];
  let x = 0;
  for (let i = 0; i < count; i++) {
    const w = widths[i];
    centers[i] = x + w / 2;
    x += w + (i === count - 1 ? 0 : responsive.gap);
  }
  return { viewportW: vW, widths, centers, totalW: x };
}

function getTranslate(metrics: Metrics, activeIdx: number) {
  const target = metrics.viewportW / 2 - metrics.centers[activeIdx];
  return clamp(target, Math.min(0, metrics.viewportW - metrics.totalW), 0);
}

export const useCarousel = (itemsCount: number) => {
  const n = itemsCount;
  const k = Math.min(CLONE_COUNT, n);
  const virtualMap = React.useMemo(() => {
    const kk = Math.min(k, n);
    return [
      ...Array.from({ length: kk }, (_, i) => n - kk + i),
      ...Array.from({ length: n }, (_, i) => i),
      ...Array.from({ length: kk }, (_, i) => i),
    ];
  }, [n, k]);
  const jumpRafRef = React.useRef<number | null>(null);

  const virtualCount = virtualMap.length;
  const [logicalActive, setLogicalActive] = React.useState(0);
  const [virtualActive, setVirtualActive] = React.useState(k);
  const [viewportW, setViewportW] = React.useState(0);
  const [translateX, setTranslateX] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isJumping, setIsJumping] = React.useState(false);

  const viewportRef = React.useRef<HTMLDivElement>(null);
  const dirRef = React.useRef<1 | -1>(1);
  const dragRef = React.useRef({
    pointerId: null as number | null,
    startX: 0,
    startT: 0,
    moved: false,
  });

  const responsive = React.useMemo(() => {
    const inner = Math.max(0, viewportW - PAD_X * 2);
    return {
      activeW: viewportW === 0 ? ACTIVE_W : Math.min(ACTIVE_W, inner),
      stripW:
        viewportW === 0
          ? STRIP_W
          : Math.min(STRIP_W, Math.max(160, inner * 0.28)),
      gap: viewportW < 900 ? 20 : GAP,
    };
  }, [viewportW]);

  const metrics = React.useMemo(
    () => computeMetrics(virtualCount, virtualActive, viewportW, responsive),
    [virtualCount, virtualActive, viewportW, responsive],
  );

  // Sync translation when not dragging
  React.useEffect(() => {
    if (!viewportW || isDragging) return;
    setTranslateX(getTranslate(metrics, virtualActive));
  }, [viewportW, virtualActive, metrics, isDragging]);
  React.useEffect(() => {
    return () => {
      if (jumpRafRef.current != null) {
        cancelAnimationFrame(jumpRafRef.current);
        jumpRafRef.current = null;
      }
    };
  }, []);
  // Handle Resize
  React.useEffect(() => {
    if (!viewportRef.current) return;
    const observer = new ResizeObserver((entries) =>
      setViewportW(entries[0].contentRect.width),
    );
    observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const startOfReal = k;
    const endOfReal = k + n - 1;
    if (virtualActive >= startOfReal && virtualActive <= endOfReal) {
      setLogicalActive(virtualMap[virtualActive]);
    }
  }, [virtualActive, k, n, virtualMap]);

  // Infinite Loop Logic
  React.useLayoutEffect(() => {
    const startOfReal = k;
    const endOfReal = k + n - 1;
    if (virtualActive >= startOfReal && virtualActive <= endOfReal) return;

    const logical = virtualMap[mod(virtualActive, virtualCount)];
    const middleEquivalent = k + logical;

    setIsJumping(true);
    setVirtualActive(middleEquivalent);
    setLogicalActive(logical);

    const m = computeMetrics(
      virtualCount,
      middleEquivalent,
      viewportW,
      responsive,
    );
    setTranslateX(getTranslate(m, middleEquivalent));

    if (jumpRafRef.current != null) {
      cancelAnimationFrame(jumpRafRef.current);
    }

    jumpRafRef.current = requestAnimationFrame(() => {
      setIsJumping(false);
      jumpRafRef.current = null;
    });
  }, [virtualActive, k, n, virtualMap, virtualCount, viewportW, responsive]);

  const goTo = (delta: 1 | -1) => {
    dirRef.current = delta;
    setVirtualActive((prev) => prev + delta);
  };

  const goToLogical = (index: number) => {
    dirRef.current = index > logicalActive ? 1 : -1;
    setVirtualActive(k + index);
    setLogicalActive(index);
  };

  return {
    viewportRef,
    metrics,
    translateX,
    isDragging,
    isJumping,
    virtualActive,
    logicalActive,
    virtualMap,
    responsive,
    next: () => goTo(1),
    prev: () => goTo(-1),
    goToLogical,
    dragHandlers: {
      onPointerDown: (e: React.PointerEvent) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        setIsDragging(true);
        dragRef.current = {
          pointerId: e.pointerId,
          startX: e.clientX,
          startT: translateX,
          moved: false,
        };
      },
      onPointerMove: (e: React.PointerEvent) => {
        if (!isDragging || dragRef.current.pointerId !== e.pointerId) return;
        const dx = e.clientX - dragRef.current.startX;
        if (Math.abs(dx) > 4) dragRef.current.moved = true;
        setTranslateX(dragRef.current.startT + dx);
      },
      onPointerUp: (e: React.PointerEvent) => {
        if (!isDragging) return;
        setIsDragging(false);
        const center = -translateX + viewportW / 2;
        let bestIdx = 0;
        let bestDist = Infinity;
        metrics.centers.forEach((c, i) => {
          const d = Math.abs(c - center);
          if (d < bestDist) {
            bestDist = d;
            bestIdx = i;
          }
        });
        setVirtualActive(bestIdx);
        setLogicalActive(virtualMap[bestIdx]);
      },
    },
  };
};
