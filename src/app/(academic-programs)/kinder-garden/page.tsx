import FoundationsSection from "@/components/FoundationsSection";
import Main from "@/components/Main";
import HalfCircleKinderGarden from "./HalfCircleKinderGarden";
import { FAQ } from "@/components/FQA";
import Footer from "@/components/layout/footer/Footer";
import QuickLinks from "@/components/QuickLinks";
import Circles from "./Circles";
import { Metadata } from "next";
import culturalValues from "@/svgs/culturalValues.svg";
import RootePageMobileCarousel from "@/components/MobileCarousel/RootePageMobileCarousel";
import MobileAround from "@/components/OrbitingFeatureSection/MobileAround";

export const metadata: Metadata = {
  title: "Best Kindergarten Schools in Sharjah",
  description:
    "Our international school delivers Montessori and active learning across early years programs, placing us among top rated schools in Sharjah.",
  keywords: [
    "Kindergarten",
    "Early Years",
    "Schools in Sharjah",
    "Impact American School",
  ],
};

const KinderGarden = () => {
  return (
    <div className="flex flex-col items-center w-screen mobile-gap-xl">
      <div className="flex flex-col w-full mobile-gap md:gap-0">
        <FoundationsSection
          label="Curriculum Components"
          text="Foundations for Lifelong"
          specialText="Learning"
          cardClassName="w-[90%] lg:w-133.5 h-full "
          cards={[
            {
              title: "Creative Curriculum ",
              detail:
                "Designed by early years experts, focusing on individual developmental milestones..",
            },
            {
              title: "Aero Standards",
              detail:
                "Aligns with the Common Core standards for Science and Math.",
            },
          ]}
        />
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

        <HalfCircleKinderGarden />
      </div>
      <div className="flex w-full flex-col mobile-gap-xl md:gap-0 mobile-padding  md:pb-0">
        <Circles />

        <FAQ color="white" />
        <QuickLinks activeTab="Kinder Garden" />
      </div>
      <Footer />
    </div>
  );
};

const kinderGardenPage = () => {
  return (
    <div className="flex  justify-center h-full ">
      <Main
        borderType="circle"
        backgroundUp="url(/images/background/HighSchool.png)"
        button1="Kinder Garden"
        button2="Register Now"
        title="Curious to Explore, Excited to Learn"
        body={<KinderGarden />}
      />
    </div>
  );
};

export default kinderGardenPage;
