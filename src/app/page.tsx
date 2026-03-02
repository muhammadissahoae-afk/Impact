import Main from "@/components/Main";
import RootPage from "./RootPage";
import Footer from "@/components/layout/footer/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact american school",
  description: "Impact American School",
};
export default function Home() {
  return (
    <div className="flex  justify-center h-full ">
      <Main
        borderType="circle"
        backgroundUp="url(/images/background/childrensBG.png)"
        body={<RootPage />}
      />
      {/* <Footer /> */}
    </div>
  );
}
