import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import Image, { StaticImageData } from "next/image";

type TProps = {
  icon?: string | StaticImageData;
  imageClassName?: string;
  imageWidth?: number;
  textClassName?: string;
  text: string;
  text2?: string;
  isActive: boolean;
  className?: string;
  textDirection?: "bottom" | "top";
};

const OrbitingCard = ({
  icon,
  imageClassName,
  imageWidth,
  textClassName,
  text,
  isActive = false,
  text2,
  className,
  textDirection = "bottom",
}: TProps) => {
  const styles = isActive
    ? "bg-linear-to-l from-i-secondary to-i-secondary-2 text-background "
    : "bg-i-bg-2 text-i-primary shadow-i-brand";
  return (
    <div
      className={cn(
        `w-84 h-69 flex flex-col  p-2 px-4 items-center  rounded-3xl`,
        icon ? "justify-around" : "justify-end",
        styles,
        className,
      )}
    >
      {textDirection === "top" && (
        <div className="flex flex-col justify-center  w-full">
          <Label
            className={cn(
              " font-poppins text-[22px] font-normal leading-6.25 text-bg-2 h-min",
              textClassName,
            )}
          >
            {text}
          </Label>
        </div>
      )}
      {icon && (
        <Image
          width={imageWidth}
          height={50}
          src={icon}
          alt="Cultural Values"
          className={imageClassName}
        />
      )}
      {textDirection === "bottom" && (
        <div className="flex flex-col justify-center  w-full">
          <Label
            className={cn(
              " font-poppins text-[22px] font-normal leading-6.25 text-bg-2 h-min",
              textClassName,
            )}
          >
            {text}
          </Label>
          <Label
            className={cn(
              "text-i-primary/50 font-normal text-[16px] leading-[1.5] tracking-[-0.8px]",
              isActive && "text-bg-2",
            )}
          >
            {text2}
          </Label>
        </div>
      )}
    </div>
  );
};

export default OrbitingCard;
