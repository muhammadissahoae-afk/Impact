import style from "./Canteen.module.css";
interface Props {
  borderType: "circle" | "radios";
  backgroundUp: string;
  backgroundDown?: string;
  button1: string;
  title: string;
  body: React.ReactNode;
  navVariant?: "dark" | "light";
}
const MainAdmissions = ({
  borderType,
  backgroundUp,
  backgroundDown,
  button1,
  title,
  body,
  navVariant = "light",
}: Props) => {
  return (
    <div className="flex flex-col w-screen h-full items-center  ">
      <div
        className="w-screen pt-[20vh] min-h-screen flex flex-col items-left gap-[45px] pl-[5%]"
        style={{
          backgroundImage: backgroundUp,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        data-nav-theme={navVariant}
      >
        <button className={`GlassButtonMainUp `}>{button1}</button>
        <p
          className="text-white lg:text-[64px] text-[40px] max-w-[50%]"
          style={{
            textAlign: "left",
          }}
        >
          {title}
        </p>
      </div>
      <div
        className={` ${borderType} absolute top-[75vh] w-screen flex flex-col items-center justify-center`}
        style={{
          backgroundColor: "#ffff",
          backgroundImage: backgroundDown,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {body}
      </div>
    </div>
  );
};

export default MainAdmissions;
