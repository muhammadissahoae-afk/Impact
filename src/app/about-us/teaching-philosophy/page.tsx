import Main from "@/components/Main";
import HalfCircle from "./HalfCircle";
import Circles from "./cirecles";
import AroundDemo from "./Around";
import Footer from "@/components/layout/footer/Footer";
import { Metadata } from "next";
import RootePageMobileCarousel from "@/components/MobileCarousel/RootePageMobileCarousel";
import culturalValues from "@/svgs/culturalValues.svg";
import HalfButtomMobile from "@/components/OrbitingFeatureSection/HalfButtomMobile";

export const metadata: Metadata = {
  title: "Teaching Philosophy | Active Learning | Schools in Sharjah",
  description:
    "Among the leading schools in Sharjah, our teaching philosophy is driven by active learning, STEM, and innovation.",
  keywords: [
    "Teaching Philosophy",
    "Active Learning",
    "Schools in Sharjah",
    "Impact American School",
  ],
};
const TeachingPhilosophy = () => {
  return (
    <div className="flex flex-col items-center w-screen ">
      <HalfCircle />
      <RootePageMobileCarousel
        richTitleDirection="right"
        richTitleProps={{
          text: "Components of High Quality ",
          excent: "Learning",
        }}
        sectionTitleProps={{ variant: "white" }}
        items={[
          { title: "Holistic Development & wellbeing" },
          { title: "Cultural Values", icon: culturalValues },
          { title: "Academic Excellence" },
        ]}
      >
        Components
      </RootePageMobileCarousel>
      <Circles />
      <AroundDemo />
      <HalfButtomMobile />
      <Footer />
    </div>
  );
};

const TeachingPhilosophyPage = () => {
  return (
    <Main
      borderType="circle"
      button1="Our Approach"
      button2="Register Now"
      title="Teaching Philosophy and Methodologies"
      body={<TeachingPhilosophy />}
    />
  );
};

export default TeachingPhilosophyPage;
