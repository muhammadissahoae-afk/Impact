"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { OrbitRing, OrbitItem } from "./Orbit";
import { Label } from "../ui/label";
import OrbitEdgeAlignedItem from "./OrbitEdgeAlignedItem";
import SectionTitle from "../SectionTitle";
import RichTitleLeft from "../RichTitleLeft";
import PrimaryButton from "../PrimaryButton";
import SectionHeader from "../SectionHeader";

type OrbitSystemProps = {
  children: React.ReactNode;
  className?: string;
  showCenterDot?: boolean;
  label: string;
  heading: string;
  accent?: string;
  description?: string;
  buttonText?: string;
};

function Root({
  children,
  className,
  showCenterDot = true,
  label,
  heading,
  accent,
  description,
  buttonText,
}: OrbitSystemProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center w-full  overflow-hidden ",
        className
      )}
    >
      {showCenterDot ? (
        <div className="absolute left-1/2 top-1/2   flex flex-col items-center justify-around  xl:w-[35%] 2xl:w-[20%] gap-4 lg:gap-10 -translate-x-1/2 -translate-y-1/2 rounded-full">
          <SectionHeader
            richTitleDirection="left"
            richTitleProps={{
              excent: accent || "",
              isItalic: false,
              text: heading,
              variant: "orange-red",
              className:
                "text-center font-normal md:text-[44px]  leading-[55px]  ",
            }}
            sectionTitleProps={{ variant: "white" }}
          >
            {label}
          </SectionHeader>

          <Label className="text-i-primary text-center text-[8px]  lg:text-[16px]  font-normal leading-[150%] lg:tracking-[-0.8px] not-italic opacity-[0.5]">
            {description}
          </Label>
          <PrimaryButton> {buttonText}</PrimaryButton>
        </div>
      ) : null}
      {children}
      
    </div>
  );
}

type RingProps = {
  size: number;
  speed: number;
  className?: string;
  children?: React.ReactNode;
};

function Ring({ size, speed, className, children }: RingProps) {
  return (
    <OrbitRing size={size} speed={speed} className={className}>
      {children}
    </OrbitRing>
  );
}

type ItemProps = {
  angle: number;
  arcDeg: number;
  motionClassName?: string;
  pingPongDirection?: "clockwise" | "counterclockwise";
  children: React.ReactNode;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  radialOffsetPx?: number;
};

function Item({
  angle,
  arcDeg,
  motionClassName = "orbit-item-pingpong",
  pingPongDirection = "clockwise",
  position,
  children,
  radialOffsetPx,
}: ItemProps) {
  return (
    <OrbitItem
      angle={angle}
      arcDeg={arcDeg}
      motionClassName={motionClassName}
      pingPongDirection={pingPongDirection}
      position={position}
      radialOffsetPx={radialOffsetPx}
    >
      {children}
    </OrbitItem>
  );
}

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "grid size-8 lg:size-12 place-items-center rounded-full bg-white shadow-lg",
        "border border-slate-200"
      )}
    >
      {children}
    </div>
  );
}

// Export as a compound object
function OrbitSystemBase() {
  return null;
}

export const OrbitSystem = Object.assign(OrbitSystemBase, {
  Root,
  Ring,
  Item,
  Icon,
  OrbitEdgeAlignedItem,
});
