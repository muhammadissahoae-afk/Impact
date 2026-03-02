import React from "react";

interface ColoredTextProps {
  text: string;
  splitAt: number;
  firstColor: "blue" | "amber";
  secondColor: "blue" | "amber";
  className?: string;
  breakLine: boolean;
}

const ColoredText: React.FC<ColoredTextProps> = ({
  text,
  splitAt,
  firstColor,
  secondColor,
  breakLine,
  className = "",
}) => {
  const firstPart = text.substring(0, splitAt);
  const secondPart = text.substring(splitAt);

  const getStyle = (color: "blue" | "amber") => {
    if (color === "blue") return "text-blue";
    if (color === "amber") return "text-amber";
    return "";
  };

  return (
    <div
      className={`flex ${className} ` + (breakLine ? "flex-col" : "flex-row")}
    >
      {firstPart && (
        <p
          className={`${getStyle(firstColor)} pr-[8px] `}
          style={
            {
              "--custom-font-size": `${38}px`,
            } as React.CSSProperties
          }
        >
          {firstPart}
        </p>
      )}
      {secondPart && (
        <p
          className={`${getStyle(secondColor)} pr-[8px]`}
          style={
            {
              "--custom-font-size": `${38}px`,
            } as React.CSSProperties
          }
        >
          {secondPart}
        </p>
      )}
    </div>
  );
};

export default ColoredText;
