import React from "react";
import { Label } from "@/components/ui/label";

export function OurRootsBadge() {
  return (
    <div className="flex relative z-30 justify-center items-center gap-2.5 rounded-[26.5px] border border-[rgb(24_214_217/20%)] bg-[rgb(24_214_217/30%)] h-13.25 px-6.25 py-2.75">
      <Label className="text-i-bg-2 text-[16px] md:text-[20px] font-normal leading-[150%] tracking-[-1px]">
        Our Roots
      </Label>
    </div>
  );
}
