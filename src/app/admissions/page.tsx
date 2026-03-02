// "use client";
import Admissions from "@/Admissions/Admissions";
import Main from "@/components/Main";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Admissions | Enrollment Process | Schools in Sharjah",
  description:
    "Admissions and tuition information outlining application steps, assessments, placement, and inclusive support to guide families through enrollment at Schools in sharjah.",
  keywords: [
    "Admissions",
    "Enrollment Process",
    "Schools in Sharjah",
    "Impact American School",
  ],
};

const AdmissionsPage = () => {
  return (
    <Main
      body={<Admissions />}
      borderType="radios"
      button1="Admissions"
      button2="Register Now"
      title="Begin Your Journey with IAS"
      navVariant="light"
      additionalComponent={
        <Image
          src="/images/background/young-doctor.png"
          className="hidden md:inline 2xl:hidden absolute right-[4%] -bottom-[60%]   md:-bottom-[35%] lg:-bottom-[56%] w-[29.9%] 2xl:bottom-[1%]"
          width={452}
          height={452}
          alt="addmissions"
        />
      }
      className="w-[98vw]"
      titleCLassName="w-full md:w-[738px]!"
    />
    // <MainAdmissions
    //   borderType="radios"
    //   backgroundUpMobile="url(/images/background/AdmissionsPhone.png)"
    //   backgroundUp="url(/images/background/test/Admissions.png)"
    //   backgroundDown="bg-[#E9EEF3]"
    //   button1="Admissions"
    //   button2="Register Now"
    //   title="Begin Your Journey with IAS"
    //   body={<Admissions />}
    //   navVariant="light"
    // />
  );
};

export default AdmissionsPage;
