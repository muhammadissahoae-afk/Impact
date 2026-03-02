/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import RichTitleLeft from "../RichTitleRight";
import SectionTitle from "../SectionTitle";

// shadcn/ui (Radix) dropdown
// NOTE: Adjust this import to match your project structure if needed.
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DropdownOption = { id: number; label: string };

interface DropdownProps {
  title: string;
  mobileTitle?: string;
  options: DropdownOption[];
  /** Tailwind width class for the dropdown menu (kept to preserve current sizing). */
  width?: string;
  onSelect?: (option: DropdownOption) => void;
}

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Initial value
    setMatches(mql.matches);

    // Subscribe
    if ("addEventListener" in mql) {
      (mql as MediaQueryList).addEventListener("change", onChange);
    } else if ((mql as any).addListener) {
      (mql as any).addListener(onChange);
    }

    return () => {
      if ("removeEventListener" in mql) {
        (mql as MediaQueryList).removeEventListener("change", onChange);
      } else if ((mql as any).removeListener) {
        (mql as any).removeListener(onChange);
      }
    };
  }, [query]);

  return { matches, mounted };
}

/**
 * Same visual design as the current dropdown, but powered by shadcn/ui (Radix).
 * - Desktop: opens on hover (with a small close delay so moving into the menu doesn't collapse it)
 * - Mobile: opens on click (Radix default)
 */
const FacilitiesDropdown = ({
  title,
  mobileTitle,
  options,
  width = "w-[218px]",
  onSelect,
}: DropdownProps) => {
  const { matches: isMobile, mounted } = useMediaQuery("(max-width: 768px)");
  const displayTitle = mounted && isMobile && mobileTitle ? mobileTitle : title;

  const [open, setOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpen(false), 120);
  }, [clearCloseTimer]);

  // Hover behavior for desktop (Radix content is portalled, so we handle enter/leave on both trigger + content)
  const onEnter = useCallback(() => {
    if (!mounted || isMobile) return;
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer, isMobile, mounted]);

  const onLeave = useCallback(() => {
    if (!mounted || isMobile) return;
    scheduleClose();
  }, [isMobile, mounted, scheduleClose]);

  useEffect(() => {
    // Cleanup timers on unmount
    return () => clearCloseTimer();
  }, [clearCloseTimer]);

  return (
    <div className="relative shrink-0">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className="bg-i-bg-2 text-i-primary focus-visible:outline-0 rounded-[26.5px] text-[16px] lg:text-[16px] px-4.25 py-2.75 relative z-10 shrink-0"
            onPointerEnter={onEnter}
            onPointerLeave={onLeave}
            aria-expanded={open}
          >
            <div className="flex flex-row justify-around lg:justify-between items-center w-full h-full gap-2">
              <span>{displayTitle}</span>
              <img
                src={"/icons/arrow.svg"}
                className={cn(
                  "w-[10px] h-[10px] transition-transform duration-300",
                  open ? "rotate-90" : "rotate-270",
                )}
                alt="Expand"
              />
            </div>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          align="start"
          sideOffset={3}
          className={cn(
            "z-[9999] rounded-[20px] bg-white shadow-lg border-0 p-0",
            width,
          )}
          onPointerEnter={onEnter}
          onPointerLeave={onLeave}
        >
          <div className="py-[14px] px-[23px] flex flex-col gap-[10px]">
            {options.map((option) => (
              <DropdownMenuItem
                key={option.id}
                className={
                  "px-4 py-3 w-full text-[16px]! -tracking-[0.8px]! rounded-[20px] cursor-pointer text-i-primary outline-none " +
                  "hover:bg-i-secondary hover:text-white " +
                  "data-[highlighted]:bg-i-secondary data-[highlighted]:text-white"
                }
                onSelect={() => {
                  onSelect?.(option);
                  setOpen(false);
                }}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default function GalleryRegistration() {
  const academicOptions = useMemo<DropdownOption[]>(
    () => [
      { id: 1, label: "Classrooms" },
      { id: 2, label: "Labs" },
      { id: 3, label: "Library" },
      { id: 4, label: "Auditorium" },
    ],
    [],
  );

  const images = useMemo(
    () => [
      { id: 1, src: "/images/gallery/gallery1.png", alt: "Gallery Image 1" },
      { id: 2, src: "/images/gallery/gallery2.png", alt: "Gallery Image 2" },
      { id: 3, src: "/images/gallery/gallery3.png", alt: "Gallery Image 3" },
      { id: 4, src: "/images/gallery/gallery4.png", alt: "Gallery Image 4" },
      { id: 5, src: "/images/gallery/gallery1.png", alt: "Gallery Image 5" },
    ],
    [],
  );

  return (
    <div className="flex flex-col w-screen bg-i-bg-alt px-3.25 lg:px-[60px] rounded-[30px] py-5 md:py-[100px] gap-7.5 md:gap-[77px]">
      <div className="flex lg:flex-row flex-col gap-[65px] w-full justify-between lg:items-end items-center">
        <div className="flex  flex-col gap-[25px] w-full justify-between items-center md:items-start relative z-50">
          <SectionTitle variant="white">Facilities</SectionTitle>
          <RichTitleLeft
            excent="Spaces"
            text="Student-Centered Learning"
            variant="orange-red"
            isItalic
            className="text-center md:text-start"
          />
        </div>

        <div className="w-full flex flex-row gap-[10px]  whitespace-wrap  overflow-x-auto scrollbar-hide">
          <FacilitiesDropdown
            title="Academic Spaces"
            mobileTitle="Academic Spaces"
            options={academicOptions}
            onSelect={(opt) => console.log("Selected:", opt.label)}
          />
          <FacilitiesDropdown
            title="Sports Facilities"
            mobileTitle="Sports Facilities"
            options={academicOptions}
            onSelect={(opt) => console.log("Selected:", opt.label)}
          />
          <FacilitiesDropdown
            title="Community Centers"
            mobileTitle="Community Centers"
            options={academicOptions}
            onSelect={(opt) => console.log("Selected:", opt.label)}
          />
        </div>
      </div>

      <PhotoProvider maskOpacity={0.8}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.25 md:gap-7.75">
          <div className="md:col-span-2 md:row-span-2 rounded-lg overflow-hidden">
            <div className="relative w-full h-full min-h-[300px]">
              <PhotoView src={images[0].src}>
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  fill
                  className="object-cover"
                  priority
                />
              </PhotoView>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.25 md:gap-7.75">
            {images.slice(1, 5).map((image) => (
              <div
                key={image.id}
                className="relative aspect-square rounded-lg overflow-hidden"
              >
                <PhotoView src={image.src}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </PhotoView>
              </div>
            ))}
          </div>

          <div className="md:col-span-3 rounded-lg overflow-hidden">
            <div className="relative w-full aspect-[16/6]">
              <PhotoView src={images[4].src}>
                <Image
                  src={images[4].src}
                  alt={images[4].alt}
                  fill
                  className="object-cover"
                />
              </PhotoView>
            </div>
          </div>
        </div>
      </PhotoProvider>
    </div>
  );
}
