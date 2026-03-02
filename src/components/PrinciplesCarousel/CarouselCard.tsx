// CarouselCard.tsx
import { Label } from "@radix-ui/react-label";
import { OrbitRing } from "../OrbitingFeatureSection/Orbit";
import { OrbitBoostItem } from "../OrbitingFeatureSection/OrbitBoostItem";
import QutoesIcon from "@/svgs/Quotes";
import Quotes2 from "@/svgs/Quotes2";
import Frame1 from "./Frame1.svg";
import Frame2 from "./Frame2.svg";
import Frame3 from "./Frame3.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import LampCharge from "./valuesIcons/lamp-charge.svg";
import CpuCharge from "./valuesIcons/cpu-charge.svg";
import book from "./valuesIcons/book.svg";
import Frame51 from "./missionIcons/Frame51.svg";
import Frame4 from "./missionIcons/Frame4.svg";
import ProfileUser from "./missionIcons/profile-2user.svg";
import Frame6 from "./missionIcons/Frame6.svg";
import Frame5 from "./missionIcons/Frame5.svg";
import vision from "./vision.gif";

type Props = {
  isActive: boolean;
  title: string;
  text: string;
};

const GlassCircleTailwind = ({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        `
        w-[43px] h-[43px]
        rounded-full bg-white/10
        drop-shadow-[0_4px_4px_rgba(8,87,160,0.2)]
        flex items-center justify-center
     `,
        className,
      )}
    >
      <Image alt="icon" src={icon} width={30} height={30} />
    </div>
  );
};
const CardContainer = ({
  className,
  src,
  w,
}: {
  className?: string;
  src: string;
  w?: number;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full p-2.25",
        className,
      )}
    >
      <Image alt="icon" width={w} height={w} src={src} />
    </div>
  );
};
const CarouseldCardRingsValues = () => {
  return (
    <div className="absolute left-1/2 -top-25 -translate-x-1/2 pointer-events-none">
      <OrbitRing
        size={600}
        speed={1}
        className="border border-i-teal-green/30 bg-[linear-gradient(180deg,rgba(24,214,217,0.05)_0%,rgba(24,214,217,0)_100%)] shadow-[inset_0_4px_50px_0_rgba(24,214,217,0.30)]"
      >
        <OrbitBoostItem
          radiusPx={600 / 2 - 1}
          startDeg={180}
          hiddenSpeedDps={0}
        >
          <CardContainer
            src={LampCharge}
            className="bg-i-secondary-2  w-[35px] h-[35px] md:w-[67px] md:h-[67px]"
          />
        </OrbitBoostItem>
      </OrbitRing>

      <OrbitRing
        size={450}
        speed={0}
        className="border-i-teal-green/30 bg-[#18D6D9]/10 shadow-[0_4px_50px_0_rgba(24,214,217,0.60)]"
      >
        <OrbitBoostItem
          radiusPx={450 / 2 - 1}
          startDeg={210}
          hiddenSpeedDps={0}
        >
          <CardContainer
            src={CpuCharge}
            className="bg-i-secondary w-[30px] p-1.5 h-[30px]  md:w-[45px] md:h-[45px]"
          />
        </OrbitBoostItem>
        <OrbitBoostItem
          radiusPx={450 / 2 - 1}
          startDeg={150}
          hiddenSpeedDps={0}
        >
          <CardContainer
            src={book}
            className="bg-i-lightblue   w-[30px] p-1.5 h-[30px]  md:w-[45px] md:h-[45px]"
          />
        </OrbitBoostItem>
      </OrbitRing>

      <OrbitRing
        size={380}
        speed={1}
        className="border border-i-teal-green/30 bg-[#18D6D9]/15 shadow-[0_4px_50px_0_rgba(24,214,217,0.60)]"
      />
    </div>
  );
};

const CarouseldCardRingsMission = () => {
  return (
    <div className="absolute left-1/2 -top-25 -translate-x-1/2 pointer-events-none">
      <OrbitRing
        size={600}
        speed={1}
        className="border border-i-teal-green/30 bg-[linear-gradient(180deg,rgba(24,214,217,0.05)_0%,rgba(24,214,217,0)_100%)] shadow-[inset_0_4px_50px_0_rgba(24,214,217,0.30)]"
      >
        <OrbitBoostItem
          radiusPx={600 / 2 - 1}
          startDeg={240}
          hiddenSpeedDps={0}
        >
          <GlassCircleTailwind icon={Frame51} className="w-[55px] h-[55px]" />
        </OrbitBoostItem>
        <OrbitBoostItem
          radiusPx={600 / 2 - 1}
          startDeg={180}
          hiddenSpeedDps={0}
        >
          <CardContainer
            src={Frame4}
            className="bg-i-secondary w-[35px] h-[35px] md:w-[67px] md:h-[67px]"
          />
        </OrbitBoostItem>
        <OrbitBoostItem
          radiusPx={600 / 2 - 1}
          startDeg={120}
          hiddenSpeedDps={0}
        >
          <CardContainer
            src={ProfileUser}
            className="bg-i-secondary-2    w-[30px] p-1.5 h-[30px]  md:w-[45px] md:h-[45px]"
          />
        </OrbitBoostItem>
      </OrbitRing>

      <OrbitRing
        size={450}
        speed={0}
        className="border-i-teal-green/30 bg-[#18D6D9]/10 shadow-[0_4px_50px_0_rgba(24,214,217,0.60)]"
      >
        <OrbitBoostItem
          radiusPx={450 / 2 - 1}
          startDeg={210}
          hiddenSpeedDps={0}
        >
          <CardContainer
            src={Frame5}
            className="bg-i-secondary-2    w-[30px] p-1.5 h-[30px]  md:w-[45px] md:h-[45px]"
          />
        </OrbitBoostItem>
        <OrbitBoostItem
          radiusPx={450 / 2 - 1}
          startDeg={150}
          hiddenSpeedDps={0}
        >
          <GlassCircleTailwind icon={Frame6} className="   w-[30px] p-1.5 h-[30px]  md:w-[45px] md:h-[45px]" />
        </OrbitBoostItem>
      </OrbitRing>

      <OrbitRing
        size={380}
        speed={1}
        className="border border-i-teal-green/30 bg-[#18D6D9]/15 shadow-[0_4px_50px_0_rgba(24,214,217,0.60)]"
      />
    </div>
  );
};
const CarouseldCardRingsVision = () => {
  return (
    <div className="absolute left-1/2 -top-25 -translate-x-1/2 pointer-events-none">
      <OrbitRing
        size={600}
        speed={1}
        className="border border-i-teal-green/30 bg-[linear-gradient(180deg,rgba(24,214,217,0.05)_0%,rgba(24,214,217,0)_100%)] shadow-[inset_0_4px_50px_0_rgba(24,214,217,0.30)]"
      >
        <OrbitBoostItem
          radiusPx={600 / 2 - 1}
          startDeg={240}
          hiddenSpeedDps={0}
        >
          <GlassCircleTailwind icon={Frame51} className="w-[55px] h-[55px]" />
        </OrbitBoostItem>
        <OrbitBoostItem
          radiusPx={600 / 2 - 1}
          startDeg={180}
          hiddenSpeedDps={0}
        >
          <CardContainer
            src={vision.src}
            w={96}
            className=" w-[96px] h-[96px]"
          />
        </OrbitBoostItem>
      </OrbitRing>

      <OrbitRing
        size={450}
        speed={0}
        className="border-i-teal-green/30 bg-[#18D6D9]/10 shadow-[0_4px_50px_0_rgba(24,214,217,0.60)]"
      ></OrbitRing>

      <OrbitRing
        size={380}
        speed={1}
        className="border border-i-teal-green/30 bg-[#18D6D9]/15 shadow-[0_4px_50px_0_rgba(24,214,217,0.60)]"
      />
    </div>
  );
};
const CarouselCard = ({ isActive, title, text }: Props) => {
  console.log("title", title);
  const config = {
    "Our Mission": <CarouseldCardRingsMission />,
    "Our Values": <CarouseldCardRingsValues />,
    "Our Vision": <CarouseldCardRingsVision />,
  };
  return (
    <div className="flex items-end relative w-full h-[600px] md:h-[450px] border border-i-teal-green/70 rounded-[30px] overflow-hidden backdrop-blur-lg bg-white/15 ">
      {" "}
      {isActive && config[title as keyof typeof config]}
      <div className="flex flex-col gap-2 p-6 ">
        <Label
          style={{ fontSize: "clamp(20px, 1.8vw, 28px)" }}
          className="text-background"
        >
          {title}
        </Label>
        <QutoesIcon />
        <Label
          style={{ fontSize: "clamp(13px, 1.1vw, 16px)" }}
          className="text-background opacity-[0.5]"
        >
          {text}
        </Label>
        <div className="self-end">
          <Quotes2 />
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
