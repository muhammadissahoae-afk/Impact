"use client";

import * as React from "react";
import Image, { StaticImageData } from "next/image";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { PLACES, Place, PlaceCategory } from "./places";

// shadcn UI
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

type Props = {
  imageSrc: string | StaticImageData;
  imageAlt?: string;
  className?: string;
  autoScrollOnMobile?: boolean;
  mobileBreakpointPx?: number;
};

function useIsMobile(breakpointPx = 1024) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpointPx}px)`);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [breakpointPx]);

  return isMobile;
}

function firstPlaceInCategory(category: PlaceCategory): Place | undefined {
  return PLACES.find((p) => p.category === category);
}

export default function InteractiveCampusMap({
  imageSrc,
  imageAlt = "Campus Map",
  className,
  autoScrollOnMobile = true,
  mobileBreakpointPx = 1024,
}: Props) {
  const isMobile = useIsMobile(mobileBreakpointPx);

  const [category, setCategory] = React.useState<PlaceCategory>("academic");
  const [activeId, setActiveId] = React.useState<string>(
    () => firstPlaceInCategory("academic")?.id ?? ""
  );
  const [open, setOpen] = React.useState(false);

  const placesInCategory = React.useMemo(
    () => PLACES.filter((p) => p.category === category),
    [category]
  );

  const activePlace = React.useMemo(
    () => PLACES.find((p) => p.id === activeId) ?? null,
    [activeId]
  );

  React.useEffect(() => {
    const first = firstPlaceInCategory(category);
    if (!first) {
      setActiveId("");
      return;
    }
    setActiveId(first.id);
  }, [category]);

  const mapWrapRef = React.useRef<HTMLDivElement>(null);
  const hotspotRefs = React.useRef<Record<string, HTMLButtonElement | null>>(
    {}
  );

  const scrollToHotspotIfMobile = React.useCallback(
    (id: string) => {
      if (!autoScrollOnMobile || !isMobile) return;
      const btn = hotspotRefs.current[id];
      if (!btn) return;

      btn.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    },
    [autoScrollOnMobile, isMobile]
  );

  const selectPlace = React.useCallback(
    (id: string) => {
      setActiveId(id);
      setOpen(false);
      scrollToHotspotIfMobile(id);
    },
    [scrollToHotspotIfMobile]
  );

  const spotlightStyle = React.useMemo(() => {
    if (!activePlace) return {};
    return {
      ["--spot-x" as any]: `${activePlace.xPct}%`,
      ["--spot-y" as any]: `${activePlace.yPct}%`,
    } as React.CSSProperties;
  }, [activePlace]);

  return (
    <section
      className={cn(
        // "w-screen bg-amber-500 rounded-[28px] p-4 sm:p-6",
        "w-[96vw] bg-[linear-gradient(180deg,var(--Primary,#022B52)_0%,var(--LightBlue,#0460B8)_100%)] rounded-[28px] p-4 sm:p-6",
        className
      )}
    >
      {/* LAYOUT CHANGE: From Grid to Flex 
          Stacks on mobile (flex-col), side-by-side on lg (flex-row)
      */}
      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-start">
        {/* Left panel: Details & Controls */}
        <div className="flex flex-col gap-4 w-full lg:w-[25%] lg:shrink-0 min-w-0">
          <Tabs
            value={category}
            onValueChange={(v) => setCategory(v as PlaceCategory)}
            className="w-full"
          >
            <TabsList className="flex h-auto w-full justify-start gap-2 bg-transparent p-0">
              <TabsTrigger
                value="academic"
                className="rounded-full lg:px-4 px-1 py-2 data-[state=active]:bg-white data-[state=active]:text-i-primary data-[state=active]:shadow data-[state=inactive]:bg-white/30 data-[state=inactive]:text-white"
              >
                Academic Spaces
              </TabsTrigger>
              <TabsTrigger
                value="sport"
                className="rounded-full lg:px-4 px-1 py-2 data-[state=active]:bg-white data-[state=active]:text-i-primary data-[state=active]:shadow data-[state=inactive]:bg-white/30 data-[state=inactive]:text-white"
              >
                Sport Spaces
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between rounded-2xl bg-white shadow min-h-12"
              >
                <span className="truncate">
                  {activePlace?.label ?? "Select a place"}
                </span>
                <ChevronsUpDown className="ml-2 size-4 opacity-60 shrink-0" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[var(--radix-popover-trigger-width)] p-0"
              align="start"
            >
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandEmpty>No results.</CommandEmpty>
                <CommandGroup className="max-h-60 overflow-y-auto">
                  {placesInCategory.map((p) => (
                    <CommandItem
                      key={p.id}
                      value={p.label}
                      onSelect={() => selectPlace(p.id)}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "mr-2 size-4",
                          p.id === activeId ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <span className="truncate text-s">{p.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <div className="rounded-2xl bg-white/10 p-4 border border-white/10">
            <h2 className="text-xl sm:text-2xl leading-relaxed tracking-tight  text-white break-words">
              {activePlace?.label ?? "—"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80 break-words whitespace-normal">
              {activePlace?.description ?? "Select an item to see details."}
            </p>
          </div>
        </div>

        {/* Right panel: Map container */}
        <div
          ref={mapWrapRef}
          className={cn(
            "relative overflow-hidden rounded-[28px] bg-slate-800/20",
            "aspect-video  h-[600px] w-full flex-1",
            "min-w-0" // Critical for flex text wrapping inside h2/p
          )}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover sm:object-contain"
            priority
          />

          {activePlace && (
            <div
              aria-hidden
              style={spotlightStyle}
              className="pointer-events-none absolute inset-0 [background:radial-gradient(220px_220px_at_var(--spot-x)_var(--spot-y),rgba(255,255,255,0.4),rgba(255,255,255,0)_70%)] transition-opacity duration-300"
            />
          )}

          {/* Hotspots */}
          {PLACES.map((p) => {
            const isActive = p.id === activeId;
            const isDimmed = category !== p.category;
            return (
              <button
                key={p.id}
                ref={(el) => {
                  hotspotRefs.current[p.id] = el;
                }}
                type="button"
                onClick={() => selectPlace(p.id)}
                className={cn(
                  "absolute grid place-items-center rounded-full transition-all duration-200 size-8",
                  isDimmed ? "opacity-0 pointer-events-none" : "opacity-100",
                  "focus:outline-none focus:ring-2 focus:ring-white/70"
                )}
                style={{
                  left: `${p.xPct}%`,
                  top: `${p.yPct}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <span
                  className={cn(
                    "absolute inset-0 rounded-full bg-white/40",
                    isActive ? "animate-ping opacity-70" : "opacity-0"
                  )}
                />
                <span
                  className={cn(
                    "relative block size-5 sm:size-6 rounded-full bg-white",
                    isActive
                      ? "shadow-[0_0_0_6px_rgba(255,255,255,0.22)] scale-110"
                      : "shadow-lg"
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
