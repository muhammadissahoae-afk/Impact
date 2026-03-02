import FoundationsSection from "@/components/FoundationsSection";
import Main from "@/components/Main";
import HalfCircleKinderGarden from "../kinder-garden/HalfCircleKinderGarden";
import Circles from "../kinder-garden/Circles";
import { FAQ } from "@/components/FQA";
import QuickLinks from "@/components/QuickLinks";
import Footer from "@/components/layout/footer/Footer";
import HalfCircleElemntary from "./HalfCircleElemntary";
import { Metadata } from "next";
import culturalValues from "@/svgs/culturalValues.svg";
import RootePageMobileCarousel from "@/components/MobileCarousel/RootePageMobileCarousel";

export const metadata: Metadata = {
  title: "Elementary School | Active Learning | Schools in Sharjah",
  description:
    "Positioned among the best private schools in Sharjah, our elementary school is committed to active learning, STEM, and excellence.",
  keywords: [
    "Elementary School",
    "Active Learning",
    "Schools in Sharjah",
    "Impact American School",
  ],
};

const ElemntarySchool = () => {
  return (
    <div className="flex flex-col items-center w-screen mobile-gap-xl md:gap-0  ">
      <FoundationsSection
        label="Curriculum Components"
        text="Foundations for Lifelong"
        specialText="Learning"
        cardClassName="w-97.5 h-full"
        cards={[
          {
            title: "SHAPE Standards",
            detail: "For Physical Education.",
          },
          {
            title: "Aero Standards",
            detail:
              "Language Arts, Math, Science, Social Studies, World Languages, Music, and Art.",
          },
          {
            title: "ISTE Standards",
            detail: "For technology integration.",
          },
        ]}
      />
      <HalfCircleElemntary />
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
      <FAQ color="white" />
      <QuickLinks activeTab="Elementary School" />

      <Footer />
    </div>
  );
};

const ElemntarySchoolRoute = () => {
  return (
    <div className="flex  justify-center h-full ">
      <Main
        borderType="circle"
        backgroundUp="url(/images/background/HighSchool.png)"
        button1="Elementary School"
        button2="Register Now"
        title="Growing Strong Minds and Kind Hearts"
        body={<ElemntarySchool />}
      />
    </div>
  );
};

export default ElemntarySchoolRoute;
