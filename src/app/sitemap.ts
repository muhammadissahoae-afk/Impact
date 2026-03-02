import { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yourdomain.com"; // Replace with your actual domain

  // List of routes from your SITE_MAP.md
  const routes = [
    "",
    "/home",
    "/about-us/ceo",
    "/about-us/our-team",
    "/about-us/teaching-philosophy",
    "/academic-programs/elemntary-school",
    "/academic-programs/kinder-garden",
    "/academic-programs/middle-school",
    "/academic-programs/high-school",
    "/admissions",
    "/around",
    "/building",
    "/calendar/academic-calendar",
    "/calendar/events&news",
    "/career",
    "/CommunityHighlights",
    "/featureShowcase",
    "/principles",
    "/school",
    "/student-life/canteen",
    "/student-life/extracurricular-activities",
    "/student-life/special-program",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
