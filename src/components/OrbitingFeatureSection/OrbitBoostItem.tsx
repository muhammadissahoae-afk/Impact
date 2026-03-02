"use client";

import React from "react";

type OrbitBoostItemProps = {
  radiusPx: number;
  startDeg?: number;

  // degrees per second
  visibleSpeedDps?: number;
  hiddenSpeedDps?: number;

  // Center window (top-center)
  centerDeg?: number; // top-center = 0 in your coordinate system
  centerToleranceDeg?: number; // +/- degrees around centerDeg
  onCenterChange?: (isCentered: boolean) => void;

  /** External pause (e.g. hover) */
  paused?: boolean;

  /** If provided, pause for this duration each time the item reaches center */
  pauseOnCenterMs?: number;

  children: React.ReactNode;
};

function normalizeDeg(deg: number) {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

function shortestAngularDistance(a: number, b: number) {
  const da = normalizeDeg(a);
  const db = normalizeDeg(b);
  let diff = Math.abs(da - db);
  if (diff > 180) diff = 360 - diff;
  return diff; // 0..180
}

// top half visible when bottom clipped:
// visible when angle is between ~270..360 OR 0..90
function isInTopVisibleHalf(deg: number) {
  const d = normalizeDeg(deg);
  return d >= 275 || d <= 90;
}

export function OrbitBoostItem({
  radiusPx,
  startDeg = 330,
  visibleSpeedDps = 18,
  hiddenSpeedDps = 600,
  centerDeg = 0,
  centerToleranceDeg = 20,
  onCenterChange,
  paused = false,
  pauseOnCenterMs,
  children,
}: OrbitBoostItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const thetaRef = React.useRef(startDeg);
  const lastTRef = React.useRef<number | null>(null);

  // Pause state (no rerenders)
  const pausedUntilRef = React.useRef<number>(0);

  // Arm/disarm pause trigger so it only triggers once per pass
  const centerArmedRef = React.useRef<boolean>(
    shortestAngularDistance(startDeg, centerDeg) > centerToleranceDeg,
  );

  // Track centered state without rerendering every frame
  const centeredRef = React.useRef(false);

  React.useEffect(() => {
    let raf = 0;

    const applyTransform = (deg: number) => {
      const el = ref.current;
      if (!el) return;
      const d = normalizeDeg(deg);
      el.style.transform = `rotate(${d}deg) translateY(${-radiusPx}px) rotate(${-d}deg)`;
    };

    const tick = (t: number) => {
      if (lastTRef.current == null) lastTRef.current = t;

      const MAX_DT = 0.05; // 50ms
      const rawDt = (t - lastTRef.current) / 1000;
      const dt = Math.min(rawDt, MAX_DT);

      // Always update lastT so resuming doesn't jump
      lastTRef.current = t;

      // Hover pause
      if (paused) {
        raf = requestAnimationFrame(tick);
        return;
      }

      // Center pause window
      if (pauseOnCenterMs && t < pausedUntilRef.current) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const theta = thetaRef.current;
      const inVisible = isInTopVisibleHalf(theta);
      const speed = inVisible ? visibleSpeedDps : hiddenSpeedDps;

      // COUNTERCLOCKWISE
      const next = theta - speed * dt;
      thetaRef.current = next;
      applyTransform(next);

      // Center detection
      const dist = shortestAngularDistance(next, centerDeg);
      const isCentered = dist <= centerToleranceDeg;

      // Pause-on-center: snap to exact center, then pause
      if (pauseOnCenterMs) {
        if (isCentered && centerArmedRef.current) {
          centerArmedRef.current = false;

          thetaRef.current = centerDeg; // snap
          applyTransform(centerDeg);

          pausedUntilRef.current = t + pauseOnCenterMs;
        } else if (!isCentered) {
          centerArmedRef.current = true; // re-arm after leaving center window
        }
      }

      if (isCentered !== centeredRef.current) {
        centeredRef.current = isCentered;
        onCenterChange?.(isCentered);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [
    radiusPx,
    visibleSpeedDps,
    hiddenSpeedDps,
    centerDeg,
    centerToleranceDeg,
    onCenterChange,
    paused,
    pauseOnCenterMs,
  ]);

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div
        ref={ref}
        style={{
          transform: `rotate(${startDeg}deg) translateY(${-radiusPx}px) rotate(${-startDeg}deg)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
