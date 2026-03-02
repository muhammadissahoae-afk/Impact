"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

type NavTheme = "dark" | "light" | "transparent" | "brand";

const DEFAULT_THEME: NavTheme = "dark";

function findClosestTheme(el: Element | null): NavTheme | null {
  let cur: Element | null = el;

  while (cur && cur !== document.documentElement) {
    const theme = cur.getAttribute("data-nav-theme");
    if (theme) return theme as NavTheme;
    cur = cur.parentElement;
  }

  return null;
}

export default function NavThemeWatcherClient({
  navbarInnerId = "app-navbar-inner",
}: {
  navbarInnerId?: string;
}) {
  const pathname = usePathname();
  const rafRef = React.useRef<number | null>(null);

  const compute = React.useCallback(() => {
    const nav = document.getElementById(navbarInnerId);
    if (!nav) return;

    const rect = nav.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + Math.min(rect.height / 2, 24);

    const stack = document.elementsFromPoint(x, y);

    let nextTheme: NavTheme | null = null;
    for (const el of stack) {
      if (nav.contains(el)) continue; // skip navbar itself
      nextTheme = findClosestTheme(el);
      if (nextTheme) break;
    }
    nav.setAttribute("data-nav-theme", nextTheme ?? DEFAULT_THEME);
  }, [navbarInnerId]);

  const schedule = React.useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      compute();
    });
  }, [compute]);

  React.useEffect(() => {
    // initial compute
    compute();

    // listen to both window scroll and a possible scroll container
    const main = document.querySelector(".main-content") as HTMLElement | null;

    document.addEventListener("scroll", schedule, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", schedule);
    window.addEventListener("orientationchange", schedule);

    return () => {
      document.addEventListener("scroll", schedule, {
        passive: true,
        capture: true,
      });
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);

      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [compute, schedule]);

  // Recompute after route changes (new sections mounted)
  React.useEffect(() => {
    const t = window.setTimeout(() => compute(), 0);
    return () => window.clearTimeout(t);
  }, [pathname, compute]);

  return null;
}
