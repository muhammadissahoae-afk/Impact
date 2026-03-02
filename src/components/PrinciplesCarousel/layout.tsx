import PrinciplesSection from "./PrinciplesSection";

type Props = { children?: React.ReactNode };
const Layout = ({ children }: Props) => {
  return (
    <div
      className="w-full flex justify-center rounded-[28px] bg-linear-to-b from-[#022B52] to-[#0460B8]"
      style={{
        paddingTop: "clamp(32px, 5vw, 64px)",
        paddingBottom: "clamp(32px, 6vw, 80px)",
      }}
    >
      <PrinciplesSection />
    </div>
  );
};

export default Layout;
