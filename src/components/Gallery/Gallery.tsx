"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Gallery.module.css";
import PhotoViewer from "../PhotoViewer/PhotoViewer";
import PrimaryButton from "../PrimaryButton";
import { cn } from "@/lib/utils";

export type GalleryCategory = {
  id: string;
  label: string;
  color?: string;
};

export type GalleryImage = {
  src: string;
  alt?: string;
};

export type GalleryProps = {
  categories?: GalleryCategory[];
  imagesByCategory?: Record<string, GalleryImage[]>;
  initialCategoryId?: string;
  className?: string;
};

const DEFAULT_CATEGORIES: GalleryCategory[] = [
  { id: "community", label: "Community", color: "#022b52" },
  { id: "leadership", label: "Leadership", color: "#8B4513" },
  { id: "sports", label: "Sports", color: "#2E7D32" },
  { id: "competition", label: "Competition", color: "#C62828" },
];

const DEFAULT_IMAGES_BY_CATEGORY: Record<string, GalleryImage[]> = {
  community: [
    {
      src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=500&fit=crop",
      alt: "Community gathering",
    },
    {
      src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=500&fit=crop",
      alt: "Community event",
    },
    {
      src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=500&fit=crop",
      alt: "Community collaboration",
    },
    {
      src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=500&fit=crop",
      alt: "Community support",
    },
    {
      src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=500&fit=crop",
      alt: "Community unity",
    },
    {
      src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=500&fit=crop",
      alt: "Community teamwork",
    },
  ],
  leadership: [
    {
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=500&fit=crop",
      alt: "Leadership meeting",
    },
    {
      src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=500&fit=crop",
      alt: "Leadership presentation",
    },
    {
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=500&fit=crop",
      alt: "Leadership discussion",
    },
    {
      src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=500&fit=crop",
      alt: "Leadership strategy",
    },
    {
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
      alt: "Leadership vision",
    },
    {
      src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop",
      alt: "Leadership guidance",
    },
  ],
  sports: [
    {
      src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=500&fit=crop",
      alt: "Sports action",
    },
    {
      src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=500&fit=crop",
      alt: "Sports team",
    },
    {
      src: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=500&fit=crop",
      alt: "Sports training",
    },
    {
      src: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=500&fit=crop",
      alt: "Sports competition",
    },
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop",
      alt: "Sports victory",
    },
    {
      src: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=400&h=500&fit=crop",
      alt: "Sports dedication",
    },
  ],
  competition: [
    {
      src: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&h=500&fit=crop",
      alt: "Competition challenge",
    },
    {
      src: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=500&fit=crop",
      alt: "Competition focus",
    },
    {
      src: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=400&h=500&fit=crop",
      alt: "Competition intensity",
    },
    {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=500&fit=crop",
      alt: "Competition teamwork",
    },
    {
      src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=500&fit=crop",
      alt: "Competition achievement",
    },
    {
      src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=500&fit=crop",
      alt: "Competition excellence",
    },
  ],
};

export default function Gallery({
  categories: categoriesProp,
  imagesByCategory: imagesByCategoryProp,
  initialCategoryId,
  className,
}: GalleryProps) {
  const categories = categoriesProp?.length
    ? categoriesProp
    : DEFAULT_CATEGORIES;
  const imagesByCategory = imagesByCategoryProp ?? DEFAULT_IMAGES_BY_CATEGORY;

  const initialCat =
    initialCategoryId && categories.some((c) => c.id === initialCategoryId)
      ? initialCategoryId
      : (categories[0]?.id ?? Object.keys(imagesByCategory)[0] ?? "");

  const [activeCategory, setActiveCategory] = useState<string>(initialCat);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // keep active category valid if props change
  useEffect(() => {
    if (!categories.some((c) => c.id === activeCategory)) {
      setActiveCategory(categories[0]?.id ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.map((c) => c.id).join("|")]);

  const images = useMemo(() => {
    return imagesByCategory[activeCategory] ?? [];
  }, [activeCategory, imagesByCategory]);

  const [visibleCount, setVisibleCount] = useState(1);

  const totalPages = useMemo(() => {
    const pages = Math.ceil((images?.length ?? 0) / Math.max(1, visibleCount));
    return Math.max(1, pages);
  }, [images?.length, visibleCount]);

  useEffect(() => {
    const calculateVisible = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const firstItem = container.querySelector(
        ":scope > *",
      ) as HTMLElement | null;
      if (!firstItem) return;

      const itemWidth = firstItem.offsetWidth;
      const gap = 30;
      const containerWidth = container.offsetWidth;

      const count = Math.floor(containerWidth / (itemWidth + gap));
      setVisibleCount(count || 1);
    };

    calculateVisible();
    window.addEventListener("resize", calculateVisible);
    return () => window.removeEventListener("resize", calculateVisible);
  }, [activeCategory]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const clampIndexFromScroll = () => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const scLeft = containerRef.current.scrollLeft;

    const newIndex = Math.round(scLeft / containerWidth);
    setCurrentIndex(Math.max(0, Math.min(newIndex, totalPages - 1)));
  };

  const handleMouseUp = () => {
    if (isDragging) clampIndexFromScroll();
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) clampIndexFromScroll();
    setIsDragging(false);
  };

  useEffect(() => {
    if (containerRef.current && !isDragging) {
      const containerWidth = containerRef.current.offsetWidth;
      containerRef.current.scrollTo({
        left: currentIndex * containerWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex, isDragging]);

  return (
    <div
      className={cn(
        "flex flex-col items-center w-screen md:px-22.75 mobile-padding pb-5 md:pb-25 gap-7.5 md:gap-10",
        className,
      )}
    >
      <div className="flex flex-col md:flex-row lg:items-center md:items-start justify-center lg:justify-between gap-7.5 md:gap-10 w-full">
        <div className={styles.buttonList}>
          {categories.map((category) => (
            <PrimaryButton
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              bg={activeCategory === category.id ? "blue" : "white"}
            >
              {category.label}
            </PrimaryButton>
          ))}
        </div>

        <div className="flex flex-center items-center align-center justify-center gap-[10px]">
          <button
            onClick={handlePrevious}
            className={`${styles.buttonArrow} ${styles.unactive}`}
            aria-label="Previous slide"
            type="button"
          >
            <img src="/icons/L-arrow.svg" className="w-full" alt="" />
          </button>

          <button
            onClick={handleNext}
            className={`${styles.buttonArrow} ${styles.unactive}`}
            aria-label="Next slide"
            type="button"
          >
            <img src="/icons/R-arrow.svg" className="w-full h-[15px]" alt="" />
          </button>
        </div>
      </div>

      <div className="relative w-full">
        <div
          ref={containerRef}
          className="flex overflow-hidden snap-x snap-mandatory touch-pan-x select-none gap-[30px]"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <PhotoViewer
            items={images.map((image, index) => ({
              image: (
                <div
                  key={index}
                  className="shrink-0 lg:w-[37%] w-[90%] h-[412px]"
                >
                  <div className="relative w-full h-full overflow-hidden rounded-lg">
                    <img
                      src={image.src}
                      alt={image.alt ?? ""}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 select-none"
                      draggable="false"
                    />
                  </div>
                </div>
              ),
              src: image.src,
            }))}
          />
        </div>
      </div>

      {/* bullets */}
      <div className="flex items-center gap-[10px] mt-[20px]">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-[3px] rounded-[1.5px] transition-all duration-500 ease-out hover:opacity-100 cursor-pointer ${
              index === currentIndex
                ? "w-[47px] bg-i-primary"
                : "w-3.5 bg-i-primary opacity-50"
            }`}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Slide ${index + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
