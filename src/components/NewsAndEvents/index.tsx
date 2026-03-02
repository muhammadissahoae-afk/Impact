"use client";
import NewsCard from "../NewsCard";
import girl from "@/svgs/girl.png";
import SectionTitle from "../SectionTitle";
import RichTitleLeft from "../RichTitleLeft";
import styles from "./NewEvents.module.css";
import { useState } from "react";
import SectionHeader from "../SectionHeader";

const NEWS_ITEMS = [
  {
    id: 1,
    date: "21 September 2024",
    title: "What we stand by at Impact School",
    description:
      "IAS is committed to academic excellence; providing an international perspective and ...",
    image: girl.src,
  },
  {
    id: 2,
    date: "21 September 2024",
    title: "What we stand by at Impact School",
    description:
      "IAS is committed to academic excellence; providing an international perspective and ...",
    image: girl.src,
  },
  {
    id: 3,
    date: "21 September 2024",
    title: "What we stand by at Impact School",
    description:
      "IAS is committed to academic excellence; providing an international perspective and ...",
    image: girl.src,
  },
] as const;
const categories = [
  { id: "Events", label: "Events", color: "#022b52" },
  { id: "News", label: "News", color: "#8B4513" },
];

// Sub-component for individual News Cards
interface Props {
  headerType: "home" | "events";
}
export const NewsAndEvents = ({ headerType }: Props) => {
  const [activeCategory, setActiveCategory] = useState("Events");

  return (
    <div className="w-full flex flex-col items-center gap-[65px]  sm:py-25">
      {/* Header Section */}
      {headerType === "home" ? (
        <SectionHeader
          richTitleDirection="left"
          richTitleProps={{
            excent: "Highlights",
            text: "from Our School Community",
            className: "md:w-148.5",
          }}
          sectionTitleProps={{ variant: "gray" }}
        >
          News & Events
        </SectionHeader>
      ) : (
        <header className="flex flex-col items-center gap-10   text-center animate-fade-in">
          <div className={styles.buttonList}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`${
                  activeCategory === category.id
                    ? styles.buttonActive
                    : styles.buttonUnActive
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </header>
      )}

      {/* Grid Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 items-center gap-7.5 w-fit justify-items-center">
        {NEWS_ITEMS.map((item, index) => (
          <NewsCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};
