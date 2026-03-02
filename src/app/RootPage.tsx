import InteractiveCampusMap from "@/components/campus-map/InteractiveCampusMap";
import { CommunityHighlights } from "@/components/CommunityHighlights";
import FeatureShowcase from "@/components/FeatureShowcase/FeatureShowcase";
import { demoItems } from "@/components/FeatureShowcase/FeatureShowcase.data";
import { FAQ } from "@/components/FQA";
import JoinUs from "@/components/JoinUs";
import Footer from "@/components/layout/footer/Footer";
import RootePageMobileCarousel from "@/components/MobileCarousel/RootePageMobileCarousel";
import { NewsAndEvents } from "@/components/NewsAndEvents";
import CirclesDemo from "@/components/OrbitingFeatureSection/Half";
import HalfButtomMobile from "@/components/OrbitingFeatureSection/HalfButtomMobile";
import MobileAround from "@/components/OrbitingFeatureSection/MobileAround";
import PrinciplesCarousel from "@/components/PrinciplesCarousel";
import GalleryRegistration from "@/components/Registeration/Gallery";
import { SchoolLevelGrid } from "@/components/SchoolLevelGrid";
import buidling from "@/svgs/building.png";
import culturalValues from "@/svgs/culturalValues.svg";

const RootPage = () => {
  return (
    <div className="flex flex-col items-center w-screen  ">
      <RootePageMobileCarousel
        sectionTitleProps={{ variant: "white" }}
        richTitleDirection="right"
        richTitleProps={{
          excent: "Futures",
          text: "Building Minds and Boundless",
        }}
        items={[
          { title: "Holistic Development & wellbeing" },
          { title: "Cultural Values", icon: culturalValues },
          { title: "Academic Excellence" },
        ]}
      >
        {" "}
        Four Pillars
      </RootePageMobileCarousel>
      {/* <MobileAround /> */}
      <CirclesDemo />
      <section
        id="www"
        className="flex flex-col items-center w-full  mobile-padding   bg-background rounded-[28px] mobile-gap-xl md:gap-0"
      >
        {/* <HalfButtomMobile /> */}

        <FeatureShowcase items={demoItems} />
        <section className="w-full" data-nav-theme="light">
          <PrinciplesCarousel />
        </section>
        <SchoolLevelGrid />
        <GalleryRegistration />

        <NewsAndEvents headerType="home" />
        <section className="w-full px-1 rounded-[30px]">
          {/* <CommunityHighlights /> */}
        </section>
        <section className=" flex flex-col w-full mobile-gap-xl bg-background py-6.25 rounded-t-[28px]">
          <FAQ color="gray" />
          <JoinUs />
        </section>
        <Footer />
      </section>
    </div>
  );
};

export default RootPage;
