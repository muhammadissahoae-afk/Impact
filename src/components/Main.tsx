import Border from "@/svgs/border";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  borderType: "circle" | "radios";
  backgroundUp?: string;
  backgroundDown?: string;
  button1?: string;
  button2?: string;
  title?: string;
  body: React.ReactNode;
  navVariant?: "dark" | "light";
  additionalComponent?: React.ReactNode;
  className?: string;
  titleCLassName?: string;
}

type TProps = {
  backgroundUp: string;
  navVariant?: "dark" | "light";
  children: React.ReactNode;
};
const ImageLayout = ({ backgroundUp, children, navVariant }: TProps) => {
  return (
    <div
      className="h-screen w-screen flex flex-col items-center gap-[45px] pt-[20vh]  mobile-padding md:px-0 "
      style={{
        backgroundImage: backgroundUp,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      data-nav-theme={navVariant}
    >
      {children}
    </div>
  );
};
type TPropsNormal = {
  navVariant?: "dark" | "light";
  children: React.ReactNode;
};
const NormalLayout = ({ children, navVariant }: TPropsNormal) => {
  const sidePadding = {
    paddingLeft: "clamp(16px, 3vw, 48px)",
    paddingRight: "clamp(16px, 3vw, 48px)",
  } as const;

  return (
    <div
      className="h-screen relative w-screen pt-[167px]"
      data-nav-theme={navVariant}
    >
      {/* Effects layer: anchored to a centered 1513px frame */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="relative mx-auto w-full h-full"
          style={{ maxWidth: 1513, ...sidePadding }}
        >
          {/* Keep your right offsets (they were perfect at 1513px),
              but change TOP to clamp(...) so it behaves for short/tall screens */}
          <div className="absolute right-[15%] md:right-[35%] top-[clamp(110px,18vh,170px)] h-[50.5%] w-[70.8%] md:w-[30.8%] rounded-[470px] blur-[74px] bg-i-light-blue" />
          <div className="absolute right-[15%] md:right-[35%] top-[clamp(170px,26vh,260px)] h-[50.5%] w-[70.8%] md:w-[30.8%] rounded-[470px] blur-[74px] bg-[radial-gradient(44.53%_75.64%_at_50%_37.23%,#0857A0_0%,rgba(0,154,220,0)_100%)]" />
          <div className="absolute right-[15%] md:right-[35%] top-[clamp(135px,22vh,210px)] h-[50.5%] w-[70.8%] md:w-[30.8%] rounded-[460px] blur-[22px] bg-[radial-gradient(59.34%_101.52%_at_50%_14.46%,#18D6D9_0%,rgba(24,214,217,0)_71.05%)]" />
        </div>
      </div>

      {/* Content layer: also anchored to the same centered 1513px frame */}
      <div
        className="relative z-10 mx-auto w-full flex flex-col items-center gap-[45px]"
        style={{ maxWidth: 1513, ...sidePadding }}
      >
        {children}
      </div>
    </div>
  );
};
type TPropsController = {
  children: React.ReactNode;
  hasImage: boolean;
} & {
  ImageLayoutProps: Omit<React.ComponentProps<typeof ImageLayout>, "children">;
} & {
  normalLayoutProps: Omit<
    React.ComponentProps<typeof NormalLayout>,
    "children"
  >;
};
const LayoutController = ({
  children,
  hasImage,
  ImageLayoutProps,
  normalLayoutProps,
}: TPropsController) => {
  if (hasImage)
    return <ImageLayout {...ImageLayoutProps}> {children}</ImageLayout>;

  return <NormalLayout {...normalLayoutProps}> {children}</NormalLayout>;
};
const Main = ({
  borderType,
  backgroundUp,
  backgroundDown,
  button1,
  button2,
  title,
  body,
  navVariant = "light",
  additionalComponent,
  className,
  titleCLassName,
}: Props) => {
  return (
    <div
      id="hi"
      // className="flex  flex-col relative w-full items-center overflow-hidden  "
      className="flex flex-col w-full items-center relative overflow-hidden overflow-y-scroll bg-linear-to-b from-i-primary to-i-light-blue "
    >
      <LayoutController
        hasImage={!!backgroundUp}
        ImageLayoutProps={{ backgroundUp: backgroundUp!, navVariant }}
        normalLayoutProps={{ navVariant }}
      >
        <div className="relative z-10 flex flex-col items-center h-full gap-[45px]">
          {button1 && (
            <Badge
              className={cn(
                "h-13.25 px-6.25 py-2.75  rounded-[26.5px] border border-[#18D6D9]/30 bg-[#18D6D9]/30"
              )}
            >
              <span className="font-normal text-i-bg-2 text-[20px] leading-[150%] tracking-[-1px]  ">
                {button1}
              </span>
            </Badge>
          )}
          {title && (
            <Label
              className={cn(
                "text-[40px] md:text-[60px] font-normal leading-14 md:leading-16.25 tracking-[-3px] text-i-bg-2 text-center  md:w-188 ",
                titleCLassName
              )}
            >
              {title}
            </Label>
          )}
          {button2 && (
            <button className="text-i-primary text-[18px] font-normal leading-[150%] tracking-[-0.9px] py-3.25 bg-i-bg-2 rounded-[26.5px] border border-i-bg-2 px-5.75">
              {button2}
            </button>
          )}
          {additionalComponent}
        </div>
        {/* <div className="absolute bottom-0 bg-[rgba(8,87,160,0.5)] [filter:blur(74px)] w-full h-120"></div> */}
      </LayoutController>
      <div className="absolute top-[79%] left-1/2 -translate-x-1/2 w-full flex justify-center">
        <div className="relative flex justify-center">
          <div
            className={cn(
              "absolute z-0 pointer-events-none bg-[rgba(8,87,160,0.5)] blur-[74px]",
              // Position it slightly higher (-top-5) if you want that offset look
              "-top-70 inset-x-0 bottom-0",
              borderType === "circle"
                ? "rounded-t-[300vw] w-[300vw]"
                : "rounded-[30px] w-full"
            )}
          />
          {/* 1. The Glow (id="hello") */}
          {/* inset-0 makes it match the height of the parent (which is defined by "this one") */}
          <div
            className={cn(
              "absolute z-0 pointer-events-none bg-[rgba(24,214,217,0.20)] blur-[22px]",
              // Position it slightly higher (-top-5) if you want that offset look
              "-top-14 inset-x-0 bottom-0",
              borderType === "circle"
                ? "rounded-t-[300vw] w-[300vw]"
                : "rounded-[30px] w-full"
            )}
          />

          {/* 2. The Content (id="this one") */}
          {/* Changing this to 'relative' is the key: it now dictates the height of the wrapper */}
          <div
            id="this one"
            className={cn(
              "relative z-30 flex justify-center overflow-hidden pt-[45px] md:pt-[150px]",
              borderType === "circle"
                ? "rounded-t-[300vw] w-[300vw]"
                : "rounded-[30px]",
              backgroundDown ? backgroundDown : "bg-i-bg-alt",
              className
            )}
            data-nav-theme="dark"
          >
            {body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

// xxl:top-  //  of viewport height on xxl screens (≥1536px)
// xl:top-   //  of viewport height on xl screens (≥1280px)
// lg:top-    //  of viewport height on lg screens (≥1024px)
// md:top-   //  of viewport height on md screens (≥768px)
// top-      //  of viewport height on all smaller screens
