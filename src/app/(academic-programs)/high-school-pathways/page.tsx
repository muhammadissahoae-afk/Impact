import Main from "@/components/Main";
import HighSchool from "@/highSchool/HighSchool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "High School | Advanced Placement Pathways | Schools in Sharjah",
  description:
    "An elite private school delivering advanced placement pathways across STEM, humanities, arts, medicine, and business, one of the leading schools in sharjah.",
  keywords: [
    "High School",
    "Advanced Placement Pathways",
    "Schools in Sharjah",
    "Impact American School",
  ],
};

const HighSchoolPage = () => {
  return (
    <Main
      borderType="circle"
      backgroundUp="url(/images/background/HighSchool.png)"
      button1="High School"
      button2="Register Now"
      title="Prepared to Lead, Ready to Thrive"
      body={<HighSchool />}
    />
  );
};

export default HighSchoolPage;
