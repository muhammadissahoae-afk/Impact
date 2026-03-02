/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type OrbitRingProps = {
  size: number; // diameter
  speed?: number; // seconds
  reverse?: boolean;
  className?: string;
  children?: React.ReactNode; // Made optional with ?
  pingPongEase?: string;
};

export function OrbitRing({
  size,
  speed = 18,
  reverse,
  className,
  children,
  pingPongEase = "cubic-bezier(0.45, 0, 0.55, 1)",
}: OrbitRingProps) {
  const radius = size / 2;

  return (
    <div
      className={cn(
        "absolute left-1/2 top-1/2  rounded-full border border-slate-200/60",
        "shadow-[inset_0_0_0_1px_rgba(2,43,82,0.06)]",
        className,
      )}
      style={
        {
          width: size,
          height: size,
          marginLeft: -radius,
          marginTop: -radius,
          // ring-level vars
          ["--orbit-radius" as any]: `${radius}px`,
          ["--orbit-duration" as any]: `${speed}s`,
          // reverse by using negative duration trick OR by flipping with rotateY.
          // easiest: override animation-direction on items using this var:
          ["--orbit-direction" as any]: reverse ? "reverse" : "normal",
          ["--orbit-pingpong-ease" as any]: pingPongEase,
        } as React.CSSProperties
      }
    >
      {/* just a container; items are absolutely positioned at center */}
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

type OrbitItemProps = {
  angle?: number; // degrees
  className?: string;
  arcDeg?: number;
  motionClassName?: string;
  pingPongDirection?: "clockwise" | "counterclockwise";
  children: React.ReactNode;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  radialOffsetPx?: number; // NEW: positive moves away from center
};

export function OrbitItem({
  angle = 0,
  className,
  motionClassName = "orbit-item",
  pingPongDirection,
  arcDeg,
  children,
  position,
  radialOffsetPx = 0, // NEW
}: OrbitItemProps) {
  const positionConfig: Record<string, string> = {
    "top-right": "left-[60%] top-1/2 ",
    "top-left": "left-4/9 top-1/2",
    "bottom-right": "left-3/5 lg:left-[70%] xl:left-[65%] top-1/2",
    "bottom-left": "left-2/6 top-1/2",
  };
  return (
    <div
      className={cn(
        "absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        className,
        position ? positionConfig[position] : "",
      )}
    >
      <div
        className={motionClassName}
        style={
          {
            ["--orbit-angle" as any]: `${angle}deg`,
            ["--orbit-offset" as any]: `${radialOffsetPx}px`, // NEW
            ...(arcDeg != null
              ? { ["--orbit-arc" as any]: `${arcDeg}deg` }
              : {}),
            ...(pingPongDirection
              ? {
                  ["--orbit-pingpong-delay" as any]:
                    pingPongDirection === "counterclockwise"
                      ? `calc(var(--orbit-duration, 0.1s) / -2)`
                      : "0s",
                }
              : {}),
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}
