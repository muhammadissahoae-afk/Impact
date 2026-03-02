import Image, { StaticImageData } from "next/image";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type TProps = {
  isActive: boolean;
  icon?: string | StaticImageData;
  text?: string | React.ReactNode;
  text2?: string | React.ReactNode;
  imageWidth?: number | `${number}`;
  imageClassName?: string;
  textClassName?: string;
  icon2?: string | StaticImageData;
  image2ClassName?: string;
  image2width?: number | `${number}`;
  className?: string;
};

const FeatureCard = ({
  isActive = false,
  icon,
  text,
  text2,
  imageWidth,
  imageClassName,
  textClassName,
  icon2,
  image2ClassName,
  image2width,
  className,
}: TProps) => {
  const styles = isActive
    ? "bg-linear-to-l from-i-secondary to-i-secondary-2 text-background"
    : "bg-i-bg-2 text-i-primary shadow-i-brand";
  return (
    <div
      className={cn(
        "w-92 h-45.5 shadow-brand rounded-3xl flex justify-between pt-6 pl-6.5 relative",
        styles,
        className
      )}
    >
      <Label
        className={cn(
          "w-37.25 font-poppins text-[22px] font-normal leading-6.25 text-bg-2 h-min",
          textClassName
        )}
      >
        {text}
      </Label>
      <Label
        className={cn(
          " text-[16px] font-normal leading-[150%] tracking-[-0.8px] not-italic"
        )}
      >
        {text2}
      </Label>
      {icon && (
        <Image
          width={imageWidth}
          className={cn("absolute right-0 bottom-0", imageClassName)}
          src={icon}
          alt="Cultural Values"
        />
      )}
      {icon2 && (
        <Image
          width={image2width}
          className={cn("absolute right-0 bottom-0", image2ClassName)}
          src={icon2}
          alt="Cultural Values"
        />
      )}
    </div>
  );
};

export default FeatureCard;
