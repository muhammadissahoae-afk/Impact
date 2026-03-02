"use client";
import React from "react";

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M9 18L15 12L9 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Props = {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
};

export function CarouselNavButton({ direction, onClick, className }: Props) {
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      aria-label={isPrev ? "Previous slide" : "Next slide"}
      onClick={onClick}
      className={
        className ??
        `
          hidden md:flex
          absolute ${isPrev ? "left-2" : "right-2"} top-1/2 -translate-y-1/2 z-10
          h-11 w-11 items-center justify-center rounded-full
          border border-white/15 bg-white/10 text-white/90
          hover:bg-white/15 hover:border-white/20
          backdrop-blur
        `
      }
    >
      {isPrev ? (
        <ChevronLeftIcon className="h-5 w-5" />
      ) : (
        <ChevronRightIcon className="h-5 w-5" />
      )}
    </button>
  );
}
