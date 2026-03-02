import CirclesDemo from "./circlesDemo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Schools in Sharjah | American Curriculum",
  description:
    "Discover top schools in Sharjah offering accredited curricula, modern facilities, and holistic education for students of all ages.",
  keywords: [
    "Best Schools",
    "American Curriculum",
    "Schools in Sharjah",
    "Impact American School",
  ],
};
const Page = () => {
  return <CirclesDemo />;
};

export default Page;
