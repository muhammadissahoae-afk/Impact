import Image, { StaticImageData } from "next/image";
import { Card, CardContent } from "@/components/ui/card";

import kinder from "@/svgs/kinder.png";
import elementary from "@/svgs/elementray.png";
import middle from "@/svgs/middle.png";
import high from "@/svgs/high.png";
import SectionHeader from "../SectionHeader";
import Link from "next/link";

const SCHOOL_CATEGORIES = [
  {
    name: "Kindergarten",
    image: kinder,
    href: "/academic-programs/kinder-garden",
  },
  {
    name: "Elementary School",
    image: elementary,
    href: "/academic-programs/elemntary-school",
  },
  {
    name: "Middle School",
    image: middle,
    href: "/academic-programs/middle-school",
  },
  { name: "High School", image: high, href: "/academic-programs/high-school" },
] as const;

const SchoolCard = ({
  name,
  image,
  href,
}: {
  name: string;
  image: StaticImageData;
  href: string;
}) => (
  <Link href={href}>
    <Card
      className="
      aspect-163/247
      p-0
      h-123.5
      rounded-4xl
      flex
        group  overflow-hidden border-0 shadow-none
         transition-transform duration-300
        sm:hover:scale-[1.03] cursor-pointer
        w-full
         md:w-81.5
      "
    >
      <CardContent className="p-0 h-full relative">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          placeholder="blur"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
        {/* Label */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center px-4">
          <Link
            href={href}
            className="flex items-center justify-center px-6 py-3 bg-white rounded-full shadow-md max-w-[291px] w-full"
          >
            <span className="font-poppins text-i-primary text-base sm:text-lg lg:text-xl tracking-tight text-center text-center break-words">
              {name}
            </span>
          </Link>
        </div>
      </CardContent>
    </Card>
  </Link>
);

export const SchoolLevelGrid = () => {
  return (
    <div className="w-full   flex flex-col items-center gap-14 sm:gap-19.25 sm:py-25 sm:px-14.25">
      {/* Header */}
      <SectionHeader
        richTitleDirection="right"
        richTitleProps={{
          excent: "Thrive",
          text: "Prepared to Lead, Ready to",
          className: "md:w-133",
          variant: "red-orange",
        }}
        sectionTitleProps={{
          variant: "gray",
        }}
      >
        Schools
      </SectionHeader>

      {/* GRID layout change here */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-7.5 justify-items-center">
        {SCHOOL_CATEGORIES.map((category) => (
          <SchoolCard key={category.name} {...category} />
        ))}
      </div>
    </div>
  );
};
