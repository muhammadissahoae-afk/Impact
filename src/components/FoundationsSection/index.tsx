import Cards from "@/highSchool/Cards";
import { cn } from "@/lib/utils";

import SectionHeader from "../SectionHeader";

type TProps = {
  cardClassName?: string;
  cards: React.ComponentProps<typeof Cards>[];
  label: string;
  text: string;
  specialText: string;
  className?: string;
};

const FoundationsSection = ({
  cardClassName,
  cards,
  label,
  text,
  specialText,
  className,
}: TProps) => {
  const gridConfig: Record<number, string> = {
    2: "lg:grid-cols-1 xl:grid-cols-[repeat(2,max-content)]",
    3: "grid-cols-1 xl:grid-cols-[repeat(3,max-content)]",
    4: "md:grid-cols-[repeat(2,max-content)] 2xl:grid-cols-[repeat(4,max-content)]",
  };

  // Inside your component:
  const gridClasses =
    gridConfig[cards.length] || "lg:grid-cols-3 xl:grid-cols-3";
  return (
    <div className="flex flex-col  gap-19.25 items-center w-full mobile-padding lg:px-26  ">
      <SectionHeader
        richTitleDirection="right"
        richTitleProps={{
          excent: specialText,
          text,
          variant: "red-orange",
          className: "md:w-131.5 text-center",
        }}
        sectionTitleProps={{ variant: "white" }}
      >
        {label}
      </SectionHeader>

      <div
        className={cn(
          "grid grid-cols-1 gap-7.5 justify-center justify-items-center items-center md:pb-5 w-auto",
          gridClasses,
          className
        )}
      >
        {cards.map((card, index) => (
          <Cards key={index} {...card} className={cn(cardClassName)} />
        ))}
      </div>
    </div>
  );
};

export default FoundationsSection;
