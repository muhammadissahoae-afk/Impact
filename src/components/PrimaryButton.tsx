"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

type TProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  bg?: "blue" | "white";
};

const PrimaryButton = ({
  children,
  className,
  onClick = () => {},
  bg = "blue",
}: TProps) => {
  return (
    <Button
      className={cn(
        bg === "blue" ? "bg-i-primary" : "bg-i-bg-2",
        "  w-fit z-9 px-5.75 py-3.25 flex justify-center items-center  rounded-[26.5px]"
        // className
      )}
      onClick={onClick}
    >
      <Label
        className={cn(
          `font-normal text-[18px] tracking-[-0.9px] leading-[150%] text-center normal-case "  ${
            bg === "blue" ? "text-i-bg-2" : "text-i-primary"
          }`
        )}
      >
        {children}
      </Label>
    </Button>
  );
};

export default PrimaryButton;
