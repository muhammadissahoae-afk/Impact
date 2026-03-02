import { cn } from "@/lib/utils";

type TProps = {
  excent: string;
  text?: string;
  className?: string;
  variant?: "red-orange" | "orange-red";
  isItalic?: boolean;
};

const RichTitleLeft = ({
  excent,
  text,
  className,
  variant = "orange-red",
  isItalic = true,
}: TProps) => {
  const variantConfig = {
    "red-orange": " from-i-secondary  to-i-secondary-2",
    "orange-red": "from-i-secondary-2 to-i-secondary",
  };
  return (
    <h2
      className={cn(
        " font-normal text-i-primary text-[30px] md:text-[48px] leading-7.5 md:leading-13.75 tracking-[-1.5px] md:tracking-[-2.4px]",
        className,
      )}
    >
      <span
        className={cn(
          "bg-linear-to-r from-i-secondary-2 to-i-secondary bg-clip-text text-transparent ",
          isItalic && "italic",
          variantConfig[variant],
        )}
      >
        {excent}
      </span>{" "}
      {text}
    </h2>
  );
};

export default RichTitleLeft;
