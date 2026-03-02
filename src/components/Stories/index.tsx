"use client";
import { cn } from "@/lib/utils";
import Story, { StoryType } from "../Story/Story";

type TColor = "gray" | "white";

type TProps = {
  data: StoryType[];
  color: TColor;
};

const Stories = ({ data, color }: TProps) => {
  const colorConig: Record<TColor, string> = {
    gray: "bg-i-bg-alt",
    white: "bg-i-bg-2",
  };
  return (
    <div
      className={cn(
        "flex flex-col   w-full items-center justify-between md:gap-25 gap-5 py-5 md:py-25 px-5 md:px-25 rounded-[25px] ",
        colorConig[color],
      )}
    >
      {data.map((item, index) => (
        <Story
          accent={item.accent}
          key={index}
          image={item.image}
          dir={item.dir}
          TitleButton1={item.TitleButton1}
          TitleButton2={item.TitleButton2}
          description={item.description}
          HandlerButton1={item.HandlerButton1}
          HandlerButton2={item.HandlerButton2}
          text={item.text}
          Svg={item.Svg}
          btnColor={item.btnColor}
        />
      ))}
    </div>
  );
};

export default Stories;
