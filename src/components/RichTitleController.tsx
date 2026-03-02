import RichTitleLeft from "./RichTitleRight";
import RichTitleRight from "./RichTitleRight";

type TRichTitleDirection = "left" | "right";
type TProps = {
  richTitleDirection: TRichTitleDirection;

  richTitleProps: React.ComponentProps<typeof RichTitleRight>;
};

const RichTitleController = ({
  richTitleDirection,
  richTitleProps,
}: TProps) => {
  const titleDirectionConfig: Record<TRichTitleDirection, React.ReactElement> =
    {
      left: <RichTitleLeft {...richTitleProps} />,
      right: <RichTitleRight {...richTitleProps} />,
    };
  return titleDirectionConfig[richTitleDirection] ?? null;
};

export default RichTitleController;
