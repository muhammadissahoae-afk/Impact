import Main from "@/components/Main";
import OurTeam from "@/ourTeam/OurTeam";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership Team | Guiding Excellence | Schools in Sharjah",
  description:
    "Meet the leadership team driving academic excellence and innovation at one of the leading schools in Sharjah. Discover our strong commitment to student success.",
  keywords: [
    "Leadership Team",
    "Guiding Excellence",
    "Schools in Sharjah",
    "Impact American School",
  ],
};
const AboutUs = () => {
  return (
    <Main
      borderType="radios"
      button1="Our Team"
      button2="Register Now"
      title="Meet The Heart of Our School"
      body={<OurTeam />}
      className="pt-3.25"
    />
  );
};

export default AboutUs;
