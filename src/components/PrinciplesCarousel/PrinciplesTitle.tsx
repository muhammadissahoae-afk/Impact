import React from "react";
import { Label } from "@/components/ui/label";

export function PrinciplesTitle() {
  return (
    <div className="flex relative items-center justify-center">
      <div className=" absolute right-[15%] -top-px   h-[428%] w-[72.3%] rounded-[470px] blur-[74px] bg-i-light-blue" />
      <div className=" absolute right-[15%] -top-30.5   h-[428%] w-[72.3%] rounded-[470px] blur-[74px] bg-[radial-gradient(44.53%_75.64%_at_50%_37.23%,#0857A0_0%,rgba(0,154,220,0)_100%)]" />
      <div className=" absolute right-[15%] top-9   h-[428%] w-[71%] rounded-[460px] blur-[22px] bg-[radial-gradient(59.34%_101.52%_at_50%_14.46%,#18D6D9_0%,rgba(24,214,217,0)_71.05%)]" />
      <Label className=" z-20 font-normal text-i-bg-2 text-[30px] md:text-[48px] leading-7.5 md:leading-13.75 tracking-[-1.5px] md:tracking-[-2.4px]">
        Our Purpose, Our Promise, Our Principles
      </Label>
    </div>
  );
}
