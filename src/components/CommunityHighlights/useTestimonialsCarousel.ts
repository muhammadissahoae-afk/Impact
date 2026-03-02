"use client";

import * as React from "react";
import { clamp, lerpClamp, rotateLeft, rotateRight } from "./carouselMath";

type RawItem = { src: string; text: string };

export type CarouselItem = {
  id: string;
  src: string;
  text: string;
  originalIndex: number;
};

type Config = {
  activeW: number;
  stripW: number;
  gap: number;
  padX: number;

  dragRubber: number;
  dragThresholdRatio: number;

  durationMs: number;
  overshoot: number;

  widthTweenMs: number;
  depthTweenMs: number;

  windowSize: number; // 5
  windowCenter: number; // 2
};

type Phase = "idle" | "overshoot" | "settle";
type Pending = null | "next" | "prev";

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const update = () => setReduced(!!mq.matches);
    update();

    // Safari old API fallback
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  return reduced;
}

export function useTestimonialsCarousel(params: {
  rawItems: RawItem[];
  initialActiveIndex?: number;
  config: Config;
}) {
  const { rawItems, initialActiveIndex = 1, config } = params;

  const items = React.useMemo<CarouselItem[]>(
    () =>
      rawItems.map((x, idx) => ({
        id: idx.toString(), // ideally use real IDs
        src: x.src,
        text: x.text,
        originalIndex: idx,
      })),
    [rawItems]
  );

  const n = items.length;

  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const [viewportW, setViewportW] = React.useState(0);

  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() =>
      setViewportW(el.getBoundingClientRect().width)
    );
    ro.observe(el);
    setViewportW(el.getBoundingClientRect().width);

    return () => ro.disconnect();
  }, []);

  const responsive = React.useMemo(() => {
    const inner = Math.max(0, viewportW - config.padX * 2);

    const activeW =
      viewportW === 0 ? config.activeW : Math.min(config.activeW, inner);

    const stripW =
      viewportW === 0
        ? config.stripW
        : Math.min(config.stripW, Math.max(160, inner * 0.28));

    const gap = viewportW < 900 ? 20 : config.gap;

    return { activeW, stripW, gap };
  }, [viewportW, config.activeW, config.stripW, config.gap, config.padX]);

  const step = responsive.stripW + responsive.gap;

  // Keep active always at windowCenter in rendered window
  const { windowSize, windowCenter } = config;

  const [deck, setDeck] = React.useState<CarouselItem[]>(() => {
    if (n === 0) return [];
    const start = clamp(initialActiveIndex, 0, n - 1);

    // rotate so deck[windowCenter] corresponds to start
    let d = [...items];
    let guard = 0;
    while (d[windowCenter]?.originalIndex !== start && guard < n + 5) {
      d = rotateLeft(d);
      guard++;
    }
    return d;
  });
  // If raw items change in length/order, rebuild deck
  React.useEffect(() => {
    if (n === 0) {
      setDeck([]);
      return;
    }
    const start = clamp(initialActiveIndex, 0, n - 1);
    let d = [...items];
    let guard = 0;
    while (d[windowCenter]?.originalIndex !== start && guard < n + 5) {
      d = rotateLeft(d);
      guard++;
    }
    setDeck(d);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  const activeItem = deck[windowCenter];
  const logicalActive = activeItem?.originalIndex ?? 0;

  const reducedMotion = useReducedMotion();

  const [translateX, setTranslateX] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [phase, setPhase] = React.useState<Phase>("idle");

  const pendingRef = React.useRef<Pending>(null);

  const dragRef = React.useRef<{
    pointerId: number | null;
    startX: number;
    moved: boolean;
  }>({ pointerId: null, startX: 0, moved: false });

  const windowItems = React.useMemo(() => {
    if (deck.length === 0) return [];
    const out: CarouselItem[] = [];
    for (let i = 0; i < windowSize; i++) {
      const idx = (windowCenter - 2 + i + deck.length) % deck.length;
      out.push(deck[idx]);
    }
    return out;
  }, [deck, windowSize, windowCenter]);

  // “active while dragging” interpolation
  const dragProgress = step > 0 ? clamp(Math.abs(translateX) / step, 0, 1) : 0;
  const dragDir: -1 | 1 = translateX < 0 ? 1 : -1; // left drag => next => right neighbor becomes active
  const incomingSlot = dragDir === 1 ? windowCenter + 1 : windowCenter - 1;

  const widths = React.useMemo(() => {
    const base = Array.from({ length: windowSize }, (_, i) =>
      i === windowCenter ? responsive.activeW : responsive.stripW
    );

    const p = isDragging ? dragProgress : phase !== "idle" ? 1 : 0;

    base[windowCenter] = lerpClamp(responsive.activeW, responsive.stripW, p);
    if (incomingSlot >= 0 && incomingSlot < base.length) {
      base[incomingSlot] = lerpClamp(responsive.stripW, responsive.activeW, p);
    }

    return base;
  }, [
    windowSize,
    windowCenter,
    responsive.activeW,
    responsive.stripW,
    isDragging,
    dragProgress,
    phase,
    incomingSlot,
  ]);
  const layoutWidths = React.useMemo(() => {
    return Array.from({ length: windowSize }, (_, i) =>
      i === windowCenter ? responsive.activeW : responsive.stripW
    );
  }, [windowSize, windowCenter, responsive.activeW, responsive.stripW]);
  const depthForSlot = React.useCallback(
    (slot: number) => {
      const p = isDragging ? dragProgress : phase !== "idle" ? 1 : 0;

      if (slot === windowCenter) return lerpClamp(1.0, 0.94, p);
      if (slot === incomingSlot) return lerpClamp(0.94, 1.0, p);

      if (slot === windowCenter - 1 || slot === windowCenter + 1) return 0.94;
      return 0.88;
    },
    [isDragging, dragProgress, phase, windowCenter, incomingSlot]
  );

  const opacityForSlot = React.useCallback(
    (slot: number) => {
      const p = isDragging ? dragProgress : phase !== "idle" ? 1 : 0;

      if (slot === windowCenter) return lerpClamp(1.0, 0.72, p);
      if (slot === incomingSlot) return lerpClamp(0.72, 1.0, p);

      if (slot === windowCenter - 1 || slot === windowCenter + 1) return 0.72;
      return 0.45;
    },
    [isDragging, dragProgress, phase, windowCenter, incomingSlot]
  );

  const shadowForSlot = React.useCallback(
    (slot: number) => {
      const p = isDragging ? dragProgress : phase !== "idle" ? 1 : 0;
      const active = "0 30px 70px rgba(2,43,82,0.22)";
      const mid = "0 18px 50px rgba(2,43,82,0.14)";
      const low = "0 12px 34px rgba(2,43,82,0.10)";

      if (slot === windowCenter) return p > 0.001 ? mid : active;
      if (slot === incomingSlot) return p > 0.001 ? active : mid;
      return low;
    },
    [isDragging, dragProgress, phase, windowCenter, incomingSlot]
  );

  const startAnimation = React.useCallback(
    (dir: "next" | "prev") => {
      if (n <= 1) return;
      if (isAnimating || isDragging) return;

      setIsAnimating(true);
      pendingRef.current = dir;
      setPhase("overshoot");

      const target =
        dir === "next" ? -step * config.overshoot : step * config.overshoot;
      setTranslateX(target);

      // Hard safety: recover if transitionend missed
      window.setTimeout(() => {
        if (!pendingRef.current) return;

        const pending = pendingRef.current;
        pendingRef.current = null;

        setDeck((d) => (pending === "next" ? rotateLeft(d) : rotateRight(d)));
        setTranslateX(0);
        setPhase("idle");
        setIsAnimating(false);
      }, config.durationMs + 120);
    },
    [n, isAnimating, isDragging, step, config.overshoot, config.durationMs]
  );

  const next = React.useCallback(
    () => startAnimation("next"),
    [startAnimation]
  );
  const prev = React.useCallback(
    () => startAnimation("prev"),
    [startAnimation]
  );

  const onTrackTransitionEnd = React.useCallback(() => {
    const pending = pendingRef.current;
    if (!pending) return;

    if (phase === "overshoot") {
      setPhase("settle");
      setTranslateX(pending === "next" ? -step : step);
      return;
    }

    if (phase === "settle") {
      pendingRef.current = null;

      setDeck((d) => (pending === "next" ? rotateLeft(d) : rotateRight(d)));

      requestAnimationFrame(() => {
        setTranslateX(0);
        setPhase("idle");
        setIsAnimating(false);
      });
    }
  }, [phase, step]);

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (isAnimating || isDragging) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    },
    [isAnimating, isDragging, prev, next]
  );

  // Pointer drag: limited to ~one step (+rubber)
  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      if (n <= 1) return;
      if (isAnimating) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;

      const el = viewportRef.current;
      if (!el) return;

      el.setPointerCapture(e.pointerId);

      dragRef.current.pointerId = e.pointerId;
      dragRef.current.startX = e.clientX;
      dragRef.current.moved = false;

      setIsDragging(true);
    },
    [n, isAnimating]
  );

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      if (dragRef.current.pointerId !== e.pointerId) return;

      const dx = e.clientX - dragRef.current.startX;
      if (Math.abs(dx) > 4) dragRef.current.moved = true;

      const max = step;
      const over = Math.abs(dx) - max;
      const rubber = over > 0 ? over * config.dragRubber : 0;
      const limited = Math.sign(dx) * (Math.min(Math.abs(dx), max) + rubber);

      requestAnimationFrame(() => setTranslateX(limited));
    },
    [isDragging, step, config.dragRubber]
  );

  const finishDrag = React.useCallback(
    (pointerId: number) => {
      if (dragRef.current.pointerId !== pointerId) return;
      dragRef.current.pointerId = null;

      setIsDragging(false);

      const threshold = step * config.dragThresholdRatio;

      if (translateX <= -threshold) {
        pendingRef.current = "next";
        setIsAnimating(true);
        setPhase("settle");
        setTranslateX(-step);
        return;
      }

      if (translateX >= threshold) {
        pendingRef.current = "prev";
        setIsAnimating(true);
        setPhase("settle");
        setTranslateX(step);
        return;
      }

      setTranslateX(0);

      requestAnimationFrame(() => {
        dragRef.current.moved = false;
      });
    },
    [translateX, step, config.dragThresholdRatio]
  );

  const onPointerUp = React.useCallback(
    (e: React.PointerEvent) => finishDrag(e.pointerId),
    [finishDrag]
  );
  const onPointerCancel = React.useCallback(
    (e: React.PointerEvent) => finishDrag(e.pointerId),
    [finishDrag]
  );

  const onViewportClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (dragRef.current.moved) return;
      if (isAnimating || isDragging) return;

      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      const x = e.clientX - rect.left;

      if (x < rect.width / 2) prev();
      else next();
    },
    [isAnimating, isDragging, prev, next]
  );

  const goToLogical = React.useCallback(
    (target: number) => {
      if (n <= 1) return;
      if (isAnimating || isDragging) return;

      const from = logicalActive;
      const to = clamp(target, 0, n - 1);
      if (from === to) return;

      const forward = (to - from + n) % n;
      const backward = (from - to + n) % n;

      const dir: "next" | "prev" = forward <= backward ? "next" : "prev";
      const steps = Math.min(forward, backward);

      let i = 0;
      const tick = () => {
        if (i >= steps) return;
        i++;
        startAnimation(dir);

        const wait = () => {
          if (pendingRef.current === null && !isAnimating && !isDragging)
            tick();
          else requestAnimationFrame(wait);
        };
        requestAnimationFrame(wait);
      };

      tick();
    },
    [n, isAnimating, isDragging, logicalActive, startAnimation]
  );
const baseTranslateX = React.useMemo(() => {
  if (viewportW <= 0) return 0;

  const innerW = Math.max(0, viewportW - config.padX * 2);

  let x = 0;
  for (let i = 0; i < windowCenter; i++) x += layoutWidths[i] ?? 0;
  x += responsive.gap * windowCenter;
  x += (layoutWidths[windowCenter] ?? 0) / 2;

  return innerW / 2 - x;
}, [viewportW, config.padX, layoutWidths, windowCenter, responsive.gap]);

  const trackX = baseTranslateX + translateX;
  const trackTransition =
    reducedMotion || isDragging || phase === "idle"
      ? "none"
      : `transform ${config.durationMs}ms cubic-bezier(0.22, 1, 0.36, 1)`;

  return {
    // data
    items,
    windowItems,
    logicalActive,
    trackX,
    // sizing/layout
    viewportRef,
    viewportW,
    responsive,
    step,

    // motion
    translateX,
    isDragging,
    isAnimating,
    phase,
    reducedMotion,
    incomingSlot,
    dragProgress,
    widths,
    depthForSlot,
    opacityForSlot,
    shadowForSlot,
    trackTransition,

    // handlers
    next,
    prev,
    goToLogical,
    onTrackTransitionEnd,
    onKeyDown,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onViewportClick,
  };
}
