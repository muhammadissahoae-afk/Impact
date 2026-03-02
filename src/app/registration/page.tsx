import PrimaryButton from "@/components/PrimaryButton";
import { Label } from "@/components/ui/label";
import CirclesDemo from "../home/circlesDemo";
import Image, { StaticImageData } from "next/image";

import kinder from "@/svgs/kinder.png";
import elementary from "@/svgs/elementray.png";
import middle from "@/svgs/middle.png";
import high from "@/svgs/high.png";
import SectionHeader from "@/components/SectionHeader";
import GalleryRegistration from "@/components/Registeration/Gallery";
const Hero = () => {
  return (
    <div
      className="flex items-center justify-center"
      data-nav-theme="light"
      style={{
        backgroundImage: "url(/images/background/bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        height: "100vh",
      }}
    >
      <div className="flex w-fit md:w-[676px] backdrop-blur-[10px] px-[111px] py-[54.4px] rounded-[30px] bg-[rgba(255,255,255,0.50)] ">
        <div className="flex flex-col items-center justify-center gap-[23px]">
          <Label className="text-[50px] text-center text-i-primary font-medium -tracking-[2.5px] leading-[120%]">
            20% Off For Early Enrollment!
          </Label>
          <Label className="text-[28px] text-i-primary font-light -tracking-[1.4px] leading-[150%]">
            Admissions From Pre-KJ to Grade 6
          </Label>
          <PrimaryButton bg="blue">Enroll Now</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

const Card = (props: {
  src: StaticImageData;
  label: string;
  years: string;
}) => {
  return (
    <div className="px-[9px] pt-[9px] pb-[18px] w-full md:w-80.75 rounded-[30px]  bg-i-bg-alt flex flex-col gap-4.75">
      <Image
        src={props.src}
        alt={props.label}
        className="w-[305px] h-[332px] rounded-[20px]  object-cover"
      />
      <div className="flex flex-col  gap-1.25">
        <Label className=" text-i-primary font-normal text-[20px] leading-[150%] -tracking-[1px]">
          {props.label}
        </Label>
        <Label className=" text-i-primary text-[14px] font-light">
          {props.years}
        </Label>
      </div>
    </div>
  );
};
const data = [
  { src: kinder, label: "Kinder Garden", years: "1 - 3 years" },
  { src: elementary, label: "Elementary School", years: "1 - 3 years" },
  { src: middle, label: "Middle School", years: "1 - 3 years" },
  { src: high, label: "High School", years: "1 - 3 years" },
];

const CardsLayout = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-7.5 justify-items-center">
      {data.map((item) => (
        <Card key={item.label} {...item} />
      ))}
    </div>
  );
};

const SchoolLevelGrid = () => {
  return (
    <div className="w-full mobile-padding py-10 md:py-25 md:px-14.25  bg-i-bg-2   flex flex-col items-center gap-14 sm:gap-19.25 sm:py-25 sm:px-14.25">
      <SectionHeader
        richTitleDirection="right"
        richTitleProps={{
          excent: "Thrive",
          text: "Prepared to Lead, Ready to",
          variant: "red-orange",
        }}
        sectionTitleProps={{ variant: "gray" }}
      >
        Schools
      </SectionHeader>
      <CardsLayout />
    </div>
  );
};

const RegistrationPage = () => {
  return (
    <div>
      <Hero />
      <CirclesDemo />
      <SchoolLevelGrid />
      <GalleryRegistration />
    </div>
  );
};

export default RegistrationPage;
