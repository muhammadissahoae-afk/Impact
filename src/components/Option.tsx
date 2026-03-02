import Image from "next/image";
import EllipseActive from "@/svgs/EllipseActive.svg";
import Ellipse from "@/svgs/Ellipse.svg";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

const Option = ({
  isActive,
  onClick,
  label,
  dotColor,
}: {
  isActive: boolean;
  onClick: () => void;
  label?: string;
  dotColor?: string;
}) => {
  return (
    <div
      className={cn(
        "flex  h-13.25 px-5 py-2.75 md:w-13.5 md:h-13.25   justify-center items-center gap-2.5 rounded-[26.5px] bg-[rgba(2,43,82,0.05)] cursor-pointer",
        isActive && label && "px-12",
      )}
      onClick={onClick}
    >
      {!isActive && !dotColor && (
        <Image
          alt="Ellipse"
          className="w-3.5 h-3.5 "
          width={14}
          height={14}
          src={isActive ? EllipseActive : Ellipse}
        />
      )}

      {isActive && !label && (
        <Image
          alt="Ellipse"
          className="w-3.5 h-3.5 "
          width={14}
          height={14}
          src={isActive ? EllipseActive : Ellipse}
        />
      )}
      {!isActive && dotColor && (
        <div
          className="w-3.5 h-3.5 "
          style={{
            borderRadius: "50%",
            backgroundColor: dotColor,
            margin: "0 auto",
          }}
        />
      )}
      {isActive && label && (
        <Label className=" text-center text-i-primary text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[150%] tracking-[-1px] ">
          {label}
        </Label>
      )}
    </div>
  );
};

export default Option;
