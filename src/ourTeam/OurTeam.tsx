import Footer from "@/components/layout/footer/Footer";
import style from "./ourTeam.module.css";
interface TeamMember {
  image: string;
  name: string;
  title: string;
}
const data: TeamMember[] = [
  {
    image: "/images/person/1.png",
    name: "Mark Smith",
    title: "Head of School for Primary ",
  },
  {
    image: "/images/person/2.png",
    name: "Linda Davis",
    title: "Head of School for Primary ",
  },
  {
    image: "/images/person/3.png",
    name: "Mark Smith",
    title: "Head of School for Primary ",
  },
  {
    image: "/images/person/4.png",
    name: "Linda Davis",
    title: "Head of School for Primary ",
  },
  {
    image: "/images/person/5.png",
    name: "Mark Smith",
    title: "Head of School for Primary ",
  },
  {
    image: "/images/person/1.png",
    name: "Linda Davis",
    title: "Head of School for Primary ",
  },
  {
    image: "/images/person/2.png",
    name: "Mark Smith",
    title: "Head of School for Primary ",
  },
];
const OurTeam = () => {
  const gridConfig: Record<number, string> = {
    2: "lg:grid-cols-1 xl:grid-cols-[repeat(2,max-content)]",
    3: "md:grid-cols-[repeat(1,max-content)] xl:grid-cols-[repeat(3,max-content)]",
    4: "md:grid-cols-[repeat(2,max-content)] 2xl:grid-cols-[repeat(4,max-content)]",
  };
  return (
    <div className=" flex flex-col mobile-gap items-center  ">
      <div className=" grid grid-cols-1 lg:grid-cols-[repeat(2,max-content)] xl:grid-cols-[repeat(3,max-content)] mobile-gap    mobile-padding md:px-36.5   md:pb-18.25 md:gap-8 w-full justify-items-center justify-center">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative w-full lg:w-96.75 overflow-hidden group cursor-pointer"
            style={{
              height: "439px",
              borderRadius: "25px",
            }}
          >
            {/* 1. The Team Member Image */}
            <img
              src={item.image}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-[25px]"
            />
            {/* 2. Dark Gradient Overlay (Crucial for text visibility) */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div> */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/3
                  backdrop-blur-md
                  rounded-[25px]
                  [mask-image:linear-gradient(to_top,black_40%,transparent_100%)]"
            ></div>
            {/* 3. Text Content positioned at the bottom */}
            <div className="absolute flex flex-col justify-center items-start bottom-0 left-0 pb-3.5 pl-7  w-full text-white">
              <h3 className={`${style.name}`}>{item.name}</h3>
              <p className={`${style.title}`}>{item.title}</p>
            </div>
            {/* Blue border on hover (optional, matches Figma blue outline) */}
            <div className="absolute inset-0 border-4 border-transparent  rounded-[25px] transition-all duration-300"></div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default OurTeam;
