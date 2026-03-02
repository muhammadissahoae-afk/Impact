import { Label } from "@radix-ui/react-label";
import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import middle from "@/svgs/middle.png";
import Footer from "../layout/footer/Footer";
const ImageCard = () => {
  return (
    <div className="w-full md:w-45.75 md:h-45.75  rounded-[25px] overflow-hidden">
      {" "}
      <Image className="" src={middle} alt="child" />
    </div>
  );
};

const JoinUs = () => {
  return (
    <div className=" flex justify-center items-center mobile-padding pt-5  bg-background w-full pb-5">
      <div className="flex w-full md:w-fit flex-col  rounded-[15px] bg-i-bg-alt justify-center items-center p-6  gap-7.5">
        <div className="flex w-full  justify-between">
          <Label className="text-[20px] italic font-normal bg-linear-to-r from-i-secondary to-i-secondary-2 bg-clip-text text-transparent leading-[150%] tracking-[-1.2px]">
            Join Us On Instagram
          </Label>
          <MoveUpRight />
        </div>
        <div className=" grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mobile-gap md:gap-7.5 ">
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <ImageCard key={id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
