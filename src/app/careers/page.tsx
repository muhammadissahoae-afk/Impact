import MainAdmissions from "@/components/MainAdmissions";

import CareerPage from "@/Career/Career";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Careers | Teaching Jobs in Sharjah UAE | Schools in Sharjah",
  description:
    "Explore recruitment opportunities for top teachers at our innovative school, among leading schools in sharjah uae.",
  keywords: [
    "Careers",
    "Teaching Jobs",
    "Schools in Sharjah",
    "Impact American School",
  ],
};

const Career = () => {
  return (
    <MainAdmissions
      borderType="radios"
      backgroundUp=""
      backgroundUpMobile=""
      button1="Career"
      button2="Register Now"
      title="Mark Your Moments: School Events & Key Dates"
      backgroundDown="bg-[#ffff]"
      body={<CareerPage />}
      navVariant="light"
    />
  );
};

export default Career;
