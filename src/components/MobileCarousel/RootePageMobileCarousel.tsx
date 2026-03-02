import { MobileCardsSection } from "./MobileCarouselDemo";

type TProps = React.ComponentProps<typeof MobileCardsSection>;

const RootePageMobileCarousel = (props: TProps) => {
  const { children, ...otherProsp } = props;
  return (
    <MobileCardsSection
      richTitleDirection={otherProsp.richTitleDirection}
      richTitleProps={{
        text: otherProsp.richTitleProps.text,
        excent: otherProsp.richTitleProps.excent,
      }}
      sectionTitleProps={otherProsp.sectionTitleProps}
      items={otherProsp.items}
    >
      {children}
    </MobileCardsSection>
  );
};

export default RootePageMobileCarousel;
