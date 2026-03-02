"use client";
import style from "./Story.module.css";
import { motion } from "framer-motion";
import { Label } from "../ui/label";
import { Variants } from "framer-motion";
import CustomLabel from "../customLabel/CustomLabel";
import SectionTitle from "../SectionTitle";
import PrimaryButton from "../PrimaryButton";
import SectionHeader from "../SectionHeader";
import { cn } from "@/lib/utils";

type TDir = "imageRight" | "imageLeft";
export interface StoryType {
  image: string;
  TitleButton1: string;
  TitleButton2: string;
  HandlerButton1: () => void;
  HandlerButton2: () => void;
  text: string;
  accent: string;
  description: string;
  dir: TDir;
  Svg?: React.ReactElement;
  btnColor?: "white" | "gray";
}

const slideVariant = (direction: "left" | "right"): Variants => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -220 : 220,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
});

export default function Story({
  image,
  TitleButton1,
  TitleButton2,
  HandlerButton1,
  HandlerButton2,
  text,
  description,
  dir,
  Svg,
  btnColor = "white",
  accent,
}: StoryType) {
  return (
    <div className="flex flex-col w-full md:w-[93vw] lg:flex-row items-center justify-center lg:gap-25 gap-5 md:px-[10%]">
      <motion.div
        variants={slideVariant(dir === "imageLeft" ? "left" : "right")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`flex flex-wrap items-center justify-left lg:w-[50%] w-full order-first rounded-[26.5px] ${
          dir === "imageLeft" ? "lg:order-first" : "lg:order-last"
        }`}
      >
        {Svg ? (
          Svg
        ) : (
          <img
            src={image}
            alt=""
            className="max-w-[full] md:h-[600px] object-cover rounded-[26.5px]"
          />
        )}
      </motion.div>
      <motion.div
        variants={slideVariant(dir === "imageLeft" ? "right" : "left")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col items-start  justify-center gap-5 lg:w-[50%] w-full order-last lg:order-0"
      >
        <SectionHeader
          richTitleDirection={dir === "imageRight" ? "left" : "right"}
          richTitleProps={{
            excent: accent,
            text,
            variant: dir === "imageRight" ? "orange-red" : "red-orange",
            className:
              "md:text-[36px] leading-[45px] tracking-[-1.8px] text-start",
          }}
          sectionTitleProps={{ variant: btnColor }}
          className={cn("w-full items-start")}
        >
          {TitleButton1}
        </SectionHeader>

        <Label className="text-light-blue max-w-[400px]">{description}</Label>
        <PrimaryButton> {TitleButton2}</PrimaryButton>
      </motion.div>
    </div>
  );
}
