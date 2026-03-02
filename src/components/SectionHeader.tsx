import { cn } from "@/lib/utils";
import RichTitleLeft from "./RichTitleLeft";
import RichTitleRight from "./RichTitleRight";
import SectionTitle from "./SectionTitle";

type TRichTitleDirection = "left" | "right";
type TProps = {
  children: React.ReactNode;
  richTitleDirection: TRichTitleDirection;
  className?: string;
  sectionTitleProps: Omit<
    React.ComponentProps<typeof SectionTitle>,
    "children"
  >;
  richTitleProps: React.ComponentProps<typeof RichTitleRight>;
};

const SectionHeader = ({
  richTitleDirection,
  richTitleProps,
  sectionTitleProps,
  children,
  className,
}: TProps) => {
  console.log("className", className);
  const titleDirectionConfig: Record<TRichTitleDirection, React.ReactElement> =
    {
      left: <RichTitleLeft {...richTitleProps} />,
      right: <RichTitleRight {...richTitleProps} />,
    };
  return (
    <header
      className={cn(
        "flex flex-col items-center gap-5   text-center",
        className
      )}
    >
      <SectionTitle {...sectionTitleProps}>{children} </SectionTitle>
      {titleDirectionConfig[richTitleDirection]}
    </header>
  );
};

export default SectionHeader;
