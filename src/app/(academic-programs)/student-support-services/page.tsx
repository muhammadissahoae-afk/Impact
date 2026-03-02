"use client";
import Main from "@/components/Main";
import Orbiting from "./Orbiting";
import Stories from "@/components/Stories";
import Stroy1 from "./story1";
import Image from "next/image";
import Doctor from "./doctor.png";
import Mind from "./mind";
import Image1 from "./image.png";
import Footer from "@/components/layout/footer/Footer";
import ColoredText from "@/components/ColoredText";
import { StoryType } from "@/components/Story/Story";
import { Metadata } from "next";
import RootePageMobileCarousel from "@/components/MobileCarousel/RootePageMobileCarousel";
import culturalValues from "@/svgs/culturalValues.svg";

// export const metadata: Metadata = {
//   title: "Special Program",
//   description: "Impact American School",
// };

const DoctorImage = () => {
  return (
    <Image
      width={504}
      height={571}
      className="bg-i-secondary rounded-[40px]"
      src={Doctor.src}
      alt="doctor image"
    />
  );
};
const data: StoryType[] = [
  {
    description:
      "We prepare every student for a successful future through personalized career counseling and tailored pathways, supporting individual interests, strengths, and the unique needs of students with Special Educational Needs (SEN).",
    dir: "imageRight",
    HandlerButton1: () => {},
    HandlerButton2: () => {},
    text: "Counselling & Tailored Pathways",
    accent: "Career",
    image:
      "/images/gallery/StaffTraining&EarlyIntervention_SpecialPrograms.jpg",
    TitleButton1: "Mechanisms",
    TitleButton2: "Register Now",
    btnColor: "gray",
  },
  {
    description:
      "Our trained staff proactively identify and reduce learning barriers through continuous professional development and early intervention, ensuring timely, targeted support for every student’s needs.",
    dir: "imageLeft",
    HandlerButton1: () => {},
    HandlerButton2: () => {},
    text: "SEN Student",
    accent: "Support",
    image: "/images/gallery/SENStudentSupport_SpecialPrograms.jpg",
    TitleButton1: "Mechanisms",
    TitleButton2: "Register Now",
    btnColor: "gray",
  },
  {
    Svg: <DoctorImage />,
    description:
      "Our staff are trained to identify and reduce learning barriers early, using continuous professional development and prompt intervention to provide effective support.",
    dir: "imageRight",
    HandlerButton1: () => {},
    HandlerButton2: () => {},
    text: "& Early Intervention",
    accent: "Staff Training",
    image: Image1.src,
    TitleButton1: "Mechanisms",
    TitleButton2: "Register Now",
    btnColor: "gray",
  },
  {
    // Svg: <Mind />,
    description:
      "Our staff are trained to identify and reduOur staff are trained to identify and reduOur staff are trained to identify and reduOur staff are trained to identify and reduOur staff are trained to identify and reduce learning barriers early, using continuous professional development and prompt intervention to provide effective support.",
    dir: "imageLeft",
    HandlerButton1: () => {},
    HandlerButton2: () => {},
    text: "Lowering Barriers to ",
    accent: "Learning",
    image: "/images/gallery/LoweringBarrierstoLearning_SpecialPrograms.jpg",
    TitleButton1: "Mechanisms",
    TitleButton2: "Register Now",
    btnColor: "gray",
  },
];

const SpecialProgramBody = () => {
  return (
    <div className="flex flex-col mobile-gap gap-5">
      <div className="w-screen flex flex-col mobile-gap-xl  rounded-t-[inherit]">
        <Orbiting />
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
        <div className="mobile-padding lg:px-5.75 ">
          <Stories data={data} color="white" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const SpecialProgramPage = () => {
  return (
    <Main
      borderType="circle"
      button1="Special Programs"
      button2="Register Now"
      title="Student Support Services & Special Programs"
      body={<SpecialProgramBody />}
    />
  );
};

export default SpecialProgramPage;
