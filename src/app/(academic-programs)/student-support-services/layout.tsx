import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Support Services | SEN & Counseling | Schools in Sharjah",
  description:
    "Through our student support services, positive behavior support, and career counseling, we guide SEN students—an approach that sets us apart from schools in Sharjah.",
  keywords: [
    "Student Support Services",
    "SEN & Counseling",
    "Schools in Sharjah",
    "Impact American School",
  ],
};

export default function StudentSupportServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
