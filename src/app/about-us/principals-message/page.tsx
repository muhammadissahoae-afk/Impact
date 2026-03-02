import CEOMessage from "@/ceo_message";
import Main from "@/components/Main";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Principal’s Message | School Leadership | Schools in Sharjah",
  description:
    "The Principal's message shares a vision for an American curriculum school to be comes amongst the best schools in Sharjah.",
  keywords: [
    "Principal’s Message",
    "School Leadership",
    "Schools in Sharjah",
    "Impact American School",
  ],
};
const Ceo = () => {
  return (
    <Main
      borderType="radios"
      backgroundDown="bg-white"
      button1="Principle’s Message"
      button2="Register Now"
      title="Leading the Future: Our CEO’s Vision"
      body={<CEOMessage />}
    />
  );
};

export default Ceo;
