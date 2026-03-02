// "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import styles from "./navBar.module.css";
import type { NavItem } from "./types";
import AuthButtons from "./AuthButtons";
import { cn } from "@/lib/utils";

const normalizePath = (path: string) =>
  path === "/" ? "/" : path.replace(/\/+$/, "");

const checkIsActive = (
  pathname: string,
  href: string,
  prefixMatch?: boolean,
) => {
  const current = normalizePath(pathname);
  const target = normalizePath(href);
  return target === "/"
    ? current === "/"
    : prefixMatch
      ? current.startsWith(target)
      : current === target;
};

export default function MobileNavClient({
  items,
  closeMenu,
}: {
  items: NavItem[];
  closeMenu: () => void;
}) {
  const pathname = usePathname() || "/";

  return (
    <nav
      id="mobile-navigation"
      className="w-[90%]  my-[25px] overflow-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      aria-label="Mobile Navigation"
    >
      <div className="w-full flex flex-col items-stretch gap-2">
        <AccordionPrimitive.Root
          type="single"
          className="w-full flex flex-col gap-2"
        >
          {items.map((item) => {
            const hasChildren = !!item.children?.length;
            const isParentActive = checkIsActive(
              pathname,
              item.href,
              item.prefixMatch,
            );
            const isChildActive =
              hasChildren &&
              item.children!.some((child) =>
                checkIsActive(pathname, child.href, true),
              );
            const active = isParentActive || isChildActive;

            if (!hasChildren) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    styles["btn-nav"],
                    active && styles.activeLink,
                    "w-full",
                  )}
                  aria-current={active ? "page" : undefined}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <AccordionPrimitive.Item
                key={item.href}
                value={item.href}
                className="w-full"
              >
                <AccordionPrimitive.Header className="w-full">
                  <AccordionPrimitive.Trigger
                    className={cn(
                      styles["btn-nav"],

                      active && styles.activeLink,
                      "w-full flex items-center justify-between bg-transparent border-0",
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>

                <AccordionPrimitive.Content className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="flex flex-col gap-1 py-2 pl-4">
                    {item.children!.map((child) => {
                      const cActive = checkIsActive(pathname, child.href, true);
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMenu}
                          className={cn(
                            styles["btn-nav"],

                            "px-4 py-2 rounded-xl text-[16px] transition-colors text-[#ffff]",
                            cActive ? "bg-i-secondary" : "",
                          )}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            );
          })}
        </AccordionPrimitive.Root>
      </div>

      <div className="mt-auto ">
        <AuthButtons variant="mobile" />
      </div>
    </nav>
  );
}
