import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academic Calendar | Key Dates | Schools in Sharjah",
  description:
    "Explore the academic calendar at one of the top schools in Sharjah. Find detailed term schedules, holiday breaks, examination periods, and school events.",
};

export default function AcademicCalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
