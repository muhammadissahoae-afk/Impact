"use client";
import Link from "next/link";
import styles from "./navBar.module.css";
import { NavItem } from "./types";
import MobileNavClient from "./MobileNav.client";
import DesktopNavLinksClient from "./DesktopNavLinks.client";
import NavThemeWatcherClient from "./NavThemeWatcher.client";
import { FaBars } from "react-icons/fa";
import { CgCloseO } from "react-icons/cg";

import { useEffect, useState } from "react";
import AuthButtons from "./AuthButtons";

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    prefixMatch: true,
    children: [
      { label: "Priciple’s Message", href: "/about-us/principals-message" },
      { label: "Leadership Team", href: "/about-us/leadership-team" },
      { label: "Teaching Philosophy", href: "/about-us/teaching-philosophy" },
    ],
  },
  {
    label: "Academic Program",
    href: "/academic-programs",
    prefixMatch: true,
    children: [
      { label: "Kinder Garden", href: "/kinder-garden" },
      {
        label: "Elementary School",
        href: "/elemntary-school",
      },
      {
        label: "Middle School",
        href: "/middle-school",
      },
      {
        label: "High School Pathways",
        href: "/high-school-pathways",
      },
      {
        label: "Student Support Services",
        href: "/student-support-services",
      },
    ],
  },
  { label: "Admissions", href: "/admissions", prefixMatch: true },
  {
    label: "Student Life",
    href: "/student-life",
    prefixMatch: true,
    children: [
      {
        label: "Extracurricular Activities",
        href: "/student-life/extracurricular-activities",
      },

      { label: "Canteen", href: "/student-life/canteen" },
    ],
  },
  {
    label: "Calendar",
    href: "/calendar",
    prefixMatch: true,
    children: [
      // { label: "Media Center", href: "/calendar/media-center" },
      { label: "Academic Calendar", href: "/calendar/academic-calendar" },
    ],
  },
  { label: "Careers", href: "/careers", prefixMatch: true },
  // { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => setMobileOpen(false), 30000);
  }, [mobileOpen]);

  return (
    <div className={styles["navbar-container"]}>
      <div
        id="app-navbar-inner"
        className={styles["navbar-inner"]}
        data-nav-theme="dark"
      >
        <div className=" flex flex-col lg:flex items-center justify-between w-full lg-py-0 py-2">
          <div className="flex flex-row items-center justify-between w-full">
            <NavThemeWatcherClient navbarInnerId="app-navbar-inner" />
            <Link href="/" aria-label="Go to homepage">
              <img
                src="/images/logo/logo.svg"
                alt="logo"
                // className={styles.logo}
              />
            </Link>
            <nav
              id="primary-navigation"
              className={styles["nav-links"]}
              aria-label="Primary"
            >
              <DesktopNavLinksClient items={NAV_ITEMS} />
            </nav>
            <button
              type="button"
              className={`${styles["menu-icon"]}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <CgCloseO /> : <FaBars />}
            </button>
            <AuthButtons variant="desktop" />
          </div>
          <div className="flex w-full flex-col lg:flex-row items-center justify-end">
            {mobileOpen && (
              <MobileNavClient
                closeMenu={() => setMobileOpen(false)}
                items={NAV_ITEMS}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
