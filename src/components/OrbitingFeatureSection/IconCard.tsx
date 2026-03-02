import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import Image, { StaticImageData } from "next/image";

type TProps = {
  label: string;
  icon: StaticImageData;
  className?: string;
  directions?: "ltr" | "rtl";
};

const IconCard = ({ label, icon, className, directions = "ltr" }: TProps) => {
  return (
    <div
      className={cn(
        "flex flex-col z-30  justify-center max-w-26  lg:max-w-fit direction-reverse  p-1   lg:p-1.75 xl:p-3.75   rounded-full bg-white shadow-[0_4px_4px_0_rgba(8,87,160,0.25)]",
        directions === "ltr"
          ? " pl-3 xl:pl-7.75 items-end "
          : "pr-3 xl:pr-7.75 items-start"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 xl:gap-4.5 lg:w-max",
          directions === "rtl" ? "flex-row-reverse" : "flex-row"
        )}
      >
        <Label className="text-[8px]  xl:text-[18px] font-normal  lg:leading-8.75  tracking-[-0.3px] lg:tracking-[-0.6px] not-italic">
          {label}
        </Label>
        <div
          className={cn(
            "flex w-8 h-6 lg:w-13.5 lg:h-13.5 p-2.25 items-center justify-center gap-2.5 rounded-[27px] ",
            className
          )}
        >
          <Image alt={label} src={icon} />
        </div>
      </div>
    </div>
  );
};

export default IconCard;
