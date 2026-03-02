import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Center | School Highlights | Schools in Sharjah",
  description:
    "Discover the latest stories, events, and achievements from one of the top schools in Sharjah. Visit our Media Center for updates, announcements, and school highlights.",
};

export default function MediaCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
