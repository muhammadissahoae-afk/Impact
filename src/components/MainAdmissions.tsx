"use client";

import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

interface Props {
  borderType: "circle" | "radios";
  // تعديل هنا لاستقبال صورتين
  backgroundUp: string;
  backgroundUpMobile: string;
  backgroundDown?: string;
  button1: string;
  button2: string;
  title: string;
  body: React.ReactNode;
  navVariant?: "dark" | "light";
}

export default function MainAdmissions({
  borderType,
  backgroundUp,
  backgroundUpMobile,
  backgroundDown = "",
  button1,
  button2,
  title,
  body,
  navVariant,
}: Props) {
  return (
    <div className="flex flex-col w-screen h-full items-center">
      <div
        className="pt-[25vh] w-screen flex flex-col items-center gap-[45px] "
        data-nav-theme={navVariant}
      >
        {/* <div
          className="absolute inset-0 z-[-1] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundUpMobile})`,
          }}
        >
          <style jsx>{`
            @media (min-width: 1024px) {
              div {
                background-image: url(${backgroundUp}) !important;
              }
            }
          `}</style>
        </div> */}
        <div
          className="absolute inset-0 z-[-1] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: backgroundUpMobile,
          }}
        >
          <style jsx>{`
            @media (min-width: 1024px) {
              div {
                background-image: ${backgroundUp} !important;
              }
            }
          `}</style>
        </div>
        <button className="GlassButtonMainUp">{button1}</button>
        <Label
          className={cn(
            "text-[40px] md:text-[60px] font-normal leading-14 md:leading-16.25 tracking-[-3px] text-i-bg-2 text-center  md:w-188 ",
            title
          )}
        >
          {title}
        </Label>
        <button className="btn btn-text btn-sm btn-white">{button2}</button>
      </div>

      <div
        className={`mainDown ${borderType} ${backgroundDown} absolute xxl:top-[95vh] lg:top-[92vh] top-[85vh]`}
      >
        {body}
      </div>
    </div>
  );
}
