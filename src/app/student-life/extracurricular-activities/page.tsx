import Main from "@/components/Main";
import Footer from "@/components/layout/footer/Footer";
import { Metadata } from "next";
import Circles from "./cirecles";
import Gallery from "@/components/Gallery/Gallery";

export const metadata: Metadata = {
  title: "Extracurricular Activities | Sports & Community | Schools in Sharjah",
  description:
    "Our Extracurricular Activities reflect our role as one of the leading schools in Sharjah, offering leadership programs, sports, and community service.",
  keywords: [
    "Extracurricular Activities",
    "Sports & Community",
    "Schools in Sharjah",
    "Impact American School",
  ],
};

const ExtracurricularActivities = () => {
  return (
    <div className="flex flex-col items-center gap-25">
      <Circles />
      <Gallery
        categories={[{ id: "community", label: "Community" }]}
        imagesByCategory={{
          community: [
            {
              src: "/images/gallery/Extracurricular_1.jpg",
              alt: "...",
            },
            {
              src: "/images/gallery/Extracurricular_2.jpg",
              alt: "...",
            },
            {
              src: "/images/gallery/Extracurricular_4.jpg",
              alt: "...",
            },
          ],
        }}
      />
      <Footer />
    </div>
  );
};

export default function ExtracurricularActivitiesRoute() {
  return (
    <div className="flex  justify-center h-full ">
      <Main
        borderType="radios"
        button1="Extracurricular Activities"
        title="Learning Beyond Academics"
        button2="Register Now"
        body={<ExtracurricularActivities />}
        className="pt-10!"
      />
    </div>
  );
}
