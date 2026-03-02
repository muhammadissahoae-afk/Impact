"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "./types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

function normalize(path: string) {
  return path === "/" ? "/" : path.replace(/\/+$/, "");
}

function isActive(pathname: string, href: string, prefixMatch?: boolean) {
  const current = normalize(pathname || "/");
  const target = normalize(href);

  if (target === "/") return current === "/";
  return prefixMatch ? current.startsWith(target) : current === target;
}

function isAnyChildActive(pathname: string, children: { href: string }[]) {
  const current = normalize(pathname || "/");
  return children.some((c) => {
    const child = normalize(c.href);
    return current === child || current.startsWith(child + "/");
  });
}

function NavPill({
  children,
  active,
  className,
}: {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap",
        "h-11.25 rounded-[50px] px-2 2xl:px-5",
        "font-[Poppins] 3xl:text-[20px] 2xl:text-[16px] xl:text-[14px] lg:text-[12px] text-[10px] font-normal leading-none tracking-normal",
        "text-(--nav-fg) bg-transparent",
        "transition-colors over:bg-(--nav-hover-bg)",
        active && "bg-(--nav-active-bg) text-background",
        className
      )}
    >
      {children}
    </span>
  );
}

export default function DesktopNavLinksClient({ items }: { items: NavItem[] }) {
  const pathname = usePathname() || "/";
  const [openKey, setOpenKey] = React.useState<string | null>(null);
  const [isHovering, setIsHovering] = React.useState<string | null>(null);

  // Close dropdown on route change
  React.useEffect(() => {
    setOpenKey(null);
  }, [pathname]);

  // Handle hover with delay to prevent accidental closes
  const handleMouseEnter = (href: string) => {
    setIsHovering(href);
    setOpenKey(href);
  };

  const handleMouseLeave = () => {
    setIsHovering(null);
    setOpenKey(null);
  };

  // Keep dropdown open when hovering over it
  const handleDropdownMouseEnter = (href: string) => {
    setIsHovering(href);
    setOpenKey(href);
  };

  return (
    <div className="hidden lg:flex items-center gap-0 z-999999">
      {items.map((item) => {
        const hasChildren = !!item.children?.length;
        const activeTop = isActive(pathname, item.href, item.prefixMatch);
        const activeChild = hasChildren
          ? isAnyChildActive(pathname, item.children!)
          : false;
        const active = activeTop || activeChild;

        if (!hasChildren) {
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={() => setOpenKey(null)}
            >
              <NavPill active={active}>{item.label}</NavPill>
            </Link>
          );
        }

        const isOpen = openKey === item.href;

        return (
          <DropdownMenu
            key={item.href}
            open={isOpen}
            onOpenChange={(next) =>
              !isHovering && setOpenKey(next ? item.href : null)
            }
          >
            <DropdownMenuTrigger
              asChild
              onMouseEnter={() => handleMouseEnter(item.href)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                aria-current={active ? "page" : undefined}
                className="outline-none"
              >
                <NavPill active={active} className="gap-2">
                  {item.label}
                  <span
                    className={cn(
                      "text-(--nav-fg) text-[12px] leading-none translate-y-px",
                      active && "text-background"
                    )}
                  >
                    <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                  </span>
                </NavPill>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              side="bottom"
              sideOffset={10}
              className={cn(
                "relative w-[320px] rounded-[28px] border-0 p-6",
                "shadow-[0_18px_40px_rgba(0,0,0,0.25)]",
                "data-[state=open]:animate-none data-[state=closed]:animate-none",
                "z-999999"
              )}
              onMouseEnter={() => handleDropdownMouseEnter(item.href)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={cn(
                  "absolute -top-2 left-8 h-4 w-4 rotate-45 bg-white",
                  "shadow-[-6px_-6px_16px_rgba(0,0,0,0.08)]"
                )}
              />

              <div className="flex flex-col gap-3">
                {item.children!.map((child) => {
                  const childActive = isActive(pathname, child.href, true);

                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpenKey(null)}
                    >
                      <div
                        className={cn(
                          "rounded-full px-5 py-3",
                          "font-[Poppins] text-[16px] text-[#022B52]",
                          "transition-colors hover:bg-[var(--color-i-secondary)] hover:text-white",
                          childActive &&
                            "bg-[var(--color-i-secondary)] text-[#fff]"
                        )}
                      >
                        {child.label}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
    </div>
  );
}
