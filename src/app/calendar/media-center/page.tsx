"use client";

import Main from "@/components/Main";
import { NewsAndEvents } from "@/components/NewsAndEvents";
import Footer from "@/components/layout/footer/Footer";

const NewsBody = () => {
  return (
    <div className="flex flex-col items-center  gap-10 h-[full] ">
      <NewsAndEvents headerType="events" />
      <Footer />
    </div>
  );
};
const NewsRoute = () => {
  return (
    <Main
      borderType="radios"
      backgroundUp=""
      button1="Elementary School"
      button2="Register Now"
      title="Growing Strong Minds and Kind Hearts"
      backgroundDown="bg-white"
      body={<NewsBody />}
    />
  );
};

export default NewsRoute;
