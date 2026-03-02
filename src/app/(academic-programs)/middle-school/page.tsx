import FoundationsSection from "@/components/FoundationsSection";
import Main from "@/components/Main";
import { FAQ } from "@/components/FQA";
import QuickLinks from "@/components/QuickLinks";
import Footer from "@/components/layout/footer/Footer";
import HalfCircleMiddle from "./HalfCircleMiddle";
import Circles from "./Circles";
import { Metadata } from "next";
import RootePageMobileCarousel from "@/components/MobileCarousel/RootePageMobileCarousel";
import culturalValues from "@/svgs/culturalValues.svg";

export const metadata: Metadata = {
  title: "Middle School | Critical Thinking | Schools in Sharjah",
  description:
    "Impact amongst the leading schools in Sharjah offers a Middle School program centered on critical thinking, active learning, and innovation.",
  keywords: [
    "Middle School",
    "Critical Thinking",
    "Schools in Sharjah",
    "Impact American School",
  ],
};

const KinderGarden = () => {
  return (
    <div className="flex flex-col items-center w-screen mobile-gap-xl md:gap-0  ">
      <FoundationsSection
        label="Curriculum Components"
        text="Foundations for Lifelong"
        specialText="Learning"
        cardClassName="w-full lg:w-97.25"
        cards={[
          {
            title: "SHAPE Standards",
            detail: "For Physical Education.",
          },
          {
            title: "Aero Standards",
            detail: "For core subjects and electives.",
          },
          {
            title: "ISTE Standards",
            detail: "For technology integration.",
          },
        ]}
      />
      <HalfCircleMiddle />
      <RootePageMobileCarousel
        richTitleDirection="right"
        richTitleProps={{
          text: "Curious to Explore, Ready to ",
          excent: "Grow",
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

      <FAQ color="white" />

      <QuickLinks activeTab="Middle School" />

      <Footer />
    </div>
  );
};

const MiddleSchool = () => {
  return (
    <div className="flex  justify-center h-full ">
      <Main
        borderType="circle"
        backgroundUp="url(/images/background/HighSchool.png)"
        button1="Middle School"
        button2="Register Now"
        title="Discovering Potential, Defining Purpose"
        body={<KinderGarden />}
      />
    </div>
  );
};

export default MiddleSchool;
