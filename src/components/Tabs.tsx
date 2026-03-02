"use client";

import { cn } from "@/lib/utils";
import { useState, useCallback, useMemo } from "react";
import { Label } from "./ui/label";

// Types
interface TabItemProps {
  isActive: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  background: "gray" | "white";
}

interface TabsProps {
  items?: readonly string[];
  onTabChange?: (index: number) => void;
  defaultActiveIndex?: number;
  containerClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
  background: "gray" | "white";
}

// Constants
const TABS_DEFAULTS = {
  items: ["Events", "News"],
  defaultActiveIndex: 0,
  containerClasses: "flex flex-row  items-center w-full h-13.25 px-2 lg:px-10",
  wrapperClasses: `flex flex-row lg:rounded-[26.5px]   scrollbar-hide  lg:gap-0 gap-3   overflow-auto scroll-snap `,
  tabBaseClasses: "inline-block py-2.75 px-6.25 whitespace-nowrap ",
  tabActiveClasses: "bg-i-primary text-center text-i-bg-2 rounded-[26.5px]",
  tabInactiveClasses: "text-i-primary rounded-[26.5px]",
  labelClasses: "text-[18px] md:text[18px] font-normal hover:cursor-pointer",
  borderRadius: "26.5px",
} as const;

/**
 * TabItem - Individual tab button component
 * Displays a single tab with active/inactive styling
 */
const TabItem = ({ isActive, children, onClick, background }: TabItemProps) => {
  const tabClasses = cn(
    TABS_DEFAULTS.tabBaseClasses,
    isActive
      ? TABS_DEFAULTS.tabActiveClasses
      : TABS_DEFAULTS.tabInactiveClasses,
    isActive ? "" : background === "gray" ? "bg-i-bg-alt" : "bg-white",
  );

  return (
    <button
      className={tabClasses}
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
    >
      {children}
    </button>
  );
};

/**
 * Tabs - Flexible tab navigation component
 * Supports custom items, callbacks, and styling
 */
const Tabs = ({
  items = TABS_DEFAULTS.items,
  onTabChange,
  defaultActiveIndex = TABS_DEFAULTS.defaultActiveIndex,
  containerClassName,
  tabClassName,
  contentClassName,
  background,
}: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  // Memoize items to prevent unnecessary re-renders
  const memoizedItems = useMemo(() => items, [items]);

  // Handle tab change with optional callback
  const handleTabChange = useCallback(
    (index: number) => {
      setActiveIndex(index);
      onTabChange?.(index);
    },
    [onTabChange],
  );

  // Validate active index
  const safeActiveIndex =
    activeIndex >= 0 && activeIndex < memoizedItems.length ? activeIndex : 0;

  return (
    // <div className={cn(TABS_DEFAULTS.containerClasses)} role="tablist">
    <div role="tablist" className={cn("w-fit", containerClassName)}>
      <div
        className={cn(
          TABS_DEFAULTS.wrapperClasses,
          background === "gray" ? "lg:bg-i-bg-alt" : "lg:bg-i-bg-2",
        )}
      >
        {memoizedItems.map((item, index) => (
          <div key={`${item}-${index}`} className="w-fit">
            <TabItem
              background={background}
              isActive={index === safeActiveIndex}
              onClick={() => handleTabChange(index)}
            >
              <Label
                className={cn(TABS_DEFAULTS.labelClasses, contentClassName)}
              >
                {item}
              </Label>
            </TabItem>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
