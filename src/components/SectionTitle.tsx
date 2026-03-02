import { ReactNode } from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

type TProps = {
  children: ReactNode;
  variant: "gray" | "white";
};

const SectionTitle = ({ children, variant = "white" }: TProps) => {
  const variantConif = {
    gray: "bg-i-bg-alt",
    white: "bg-i-bg-2",
  };
  return (
    <Badge
      className={cn(
        "h-13.25 px-6.25 py-2.75  rounded-[26.5px]",
        variantConif[variant],
      )}
    >
      <span className="font-normal text-i-primary text-[16px] md:text-[20px] tracking-[-0.8px] md:tracking-[-1px] leading-[150%]   ">
        {children}
      </span>
    </Badge>
  );
};

export default SectionTitle;
