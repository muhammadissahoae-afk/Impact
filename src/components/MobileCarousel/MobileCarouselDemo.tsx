"use client";
// import OrbitingCard from "@/app/academic-programs/student-support-services/OrbitingCard";
import MobileCarousel from "./index";
import SectionHeader from "../SectionHeader";
import { cn } from "@/lib/utils";
import OrbitingCard from "@/app/(academic-programs)/student-support-services/OrbitingCard";

type CardItem = {
  icon?: string;
  title: string;
  desc?: string;
};

const items: CardItem[] = [
  {
    title: "Knowledge",
    desc: "Broad and deep understanding across disciplines.",
  },
  { title: "Reasoning", desc: "Strong analysis and structured thinking." },
  { title: "Speed", desc: "Fast execution with quality." },
];

type TProps = React.ComponentProps<typeof SectionHeader> & {
  items: CardItem[];
};

export function MobileCardsSection(props: TProps) {
  return (
    <div className="md:hidden w-full flex flex-col mobile-pb-xl gap-16.25  ">
      <SectionHeader {...props} />
      <MobileCarousel
        items={props.items}
        slideWidth="300px"
        slideMaxWidth="450px"
        renderItem={(item, { isActive }) => (
          <OrbitingCard
            isActive={isActive}
            text={item.title}
            text2={item.desc}
            icon={item.icon}
            imageWidth={222}
            className={cn(
              "w-[300px] h-[450px] px-[25px]  ",
              !isActive && "opacity-[0.5] text-i-primary"
            )}
            textClassName={cn(!item.icon && "pb-10")}
          />
        )}
      />
    </div>
  );
}
