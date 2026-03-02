"use client";
import Story, { StoryType } from "@/components/Story/Story";
import FoundationsSection from "@/components/FoundationsSection";
import QuickLinks from "@/components/QuickLinks";
import HalfCircleHighSchool from "./HalfCircleHighSchool";
import { FAQ } from "@/components/FQA";
import Footer from "@/components/layout/footer/Footer";
import RootePageMobileCarousel from "@/components/MobileCarousel/RootePageMobileCarousel";
import culturalValues from "@/svgs/culturalValues.svg";
import Circles from "@/app/(academic-programs)/middle-school/Circles";

const StoryData: StoryType[] = [
  {
    image: "/images/gallery/Leadership & Responsibility.jpg",
    dir: "imageRight",
    TitleButton1: "Skills Developed",
    TitleButton2: "Register Now",
    description:
      "Through various leadership opportunities, students develop essential leadership skills, including decision-making, teamwork, and responsibility.",
    HandlerButton1: () => {
      console.log("Clicked 1");
    },
    HandlerButton2: () => {
      console.log("Clicked 2");
    },
    text: "& Responsibility",
    accent: "Leadership",
  },
  {
    image: "/images/gallery/Literacy Appreciation.jpg",
    dir: "imageLeft",
    TitleButton1: "Skills Developed",
    TitleButton2: "Register Now",
    description:
      "Interactions with guest speakers and authors foster a love for literature.",
    HandlerButton1: () => {
      console.log("Clicked 1");
    },
    HandlerButton2: () => {
      console.log("Clicked 2");
    },
    text: "Literacy",
    accent: " Appreciation",
  },
  {
    image: "/images/gallery/Public Speaking & Communication.jpg",
    dir: "imageRight",
    TitleButton1: "Skills Developed",
    TitleButton2: "Register Now",
    description:
      "Participation in events like MUN and educational presentations helps students improve their public speaking and communication skills.",
    HandlerButton1: () => {
      console.log("Clicked 1");
    },
    HandlerButton2: () => {
      console.log("Clicked 2");
    },
    text: "& Communication",
    accent: "Public Speaking",
  },
  {
    image: "/images/gallery/image4.png",
    dir: "imageLeft",
    TitleButton1: "Skills Developed",
    TitleButton2: "Register Now",
    description:
      "Celebrating events and traditions enhances students' cultural awareness and pride in their heritage.",
    HandlerButton1: () => {
      console.log("Clicked 1");
    },
    HandlerButton2: () => {
      console.log("Clicked 2");
    },
    text: "Cultural Awareness & ",
    accent: "Pride",
  },
];
const HighSchool = () => {
  return (
    <div className="flex flex-col items-center w-screen mobile-gap-xl md:gap-0  ">
      <FoundationsSection
        label="Components"
        text="Foundations for Lifelong"
        specialText="Learning"
        cardClassName="w-72.5 h-full "
        cards={[
          {
            title: "CCTC Standards",
            detail: "For career technical education.",
          },
          {
            title: "AP Pathway",
            detail: "Globally recognized diploma for exceptional achievement.",
          },
          { title: "ISTE Standards", detail: "For technology integration." },
          {
            title: "Aero Standards",
            detail: "For core subjects and electives.",
          },
        ]}
      />
      <RootePageMobileCarousel
        richTitleDirection="right"
        richTitleProps={{
          text: "Our Rich Elective Program",
          excent: "Embeds ...",
        }}
        sectionTitleProps={{ variant: "white" }}
        items={[
          { title: "Holistic Development & wellbeing" },
          { title: "Cultural Values", icon: culturalValues },
          { title: "Academic Excellence" },
        ]}
      >
        Rich Elective Program
      </RootePageMobileCarousel>

      <HalfCircleHighSchool />
      <Circles />
      <div className="flex flex-col mobile-gap-xl mobile-padding w-full">
        <div className="flex flex-col  items-center justify-center mobile-gap md:pt-25 md:gap-25 gap-20">
          {StoryData.map((item, index) => (
            <Story
              key={index}
              image={item.image}
              dir={item.dir}
              TitleButton1={item.TitleButton1}
              TitleButton2={item.TitleButton2}
              description={item.description}
              HandlerButton1={item.HandlerButton1}
              HandlerButton2={item.HandlerButton2}
              text={item.text}
              accent={item.accent}
            />
          ))}
        </div>
      </div>
      <FAQ color="white" />

      <QuickLinks activeTab="High School" />
      <Footer />
    </div>
  );
};
export default HighSchool;
