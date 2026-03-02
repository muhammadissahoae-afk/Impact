import ColoredText from "@/components/ColoredText";
import Link from "next/link";
import styles from "./footer.module.css";

const data = [
  {
    title: "Academic Programs",
    description: [
      "Curriculum Overview",
      "Kindergarten",
      "Elementary School",
      "Middle School",
      "High School pathways",
      "Special Programs",
    ],
  },
  {
    title: "Student Life",
    description: [
      "Extracurricular Activities",
      "Sports Teams",
      "Clubs and Societies",
      "Student Support Services",
    ],
  },
  {
    title: "Admissions",
    description: [
      "Admission Policies",
      "Application Process",
      "Events & Campus Tours",
      "Our Campus",
      "Virtual Tours",
      "Tuition & Fees",
      "FAQS",
      "New Family Portal",
      "New Middle Schoolers",
      "Campus Life - Extracurriculars",
    ],
  },
  {
    title: "About Us",
    description: [
      "Principal's message",
      "Teaching Philosophy and Methodologies",
      "Leadership Team",
    ],
  },
];

// Map labels to verified routes from your SITE_MAP.md
const routeMap: Record<string, string> = {
  Kindergarten: "/academic-programs/kinder-garden",
  "Elementary School": "/academic-programs/elemntary-school",
  "Middle School": "/academic-programs/middle-school",
  "High School pathways": "/academic-programs/high-school",
  "Special Programs": "/student-life/special-program",
  "Extracurricular Activities": "/student-life/extracurricular-activities",
  "Application Process": "/admissions",
  "Principal's message": "/about-us/ceo",
  "Teaching Philosophy and Methodologies": "/about-us/teaching-philosophy",
  "Leadership Team": "/about-us/our-team",
};

export default function Footer() {
  return (
    <div className={`${styles["footer"]}`} data-nav-theme="dark">
      <div className="flex flex-row justify-between w-full gap-0 ">
        <div className="flex lg:flex-row flex-col lg:justify-between justify-around items-start w-full  gap-5">
          <div className="flex flex-row">
            <Link href="/">
              <img src={"/images/logo/LogoFooter.svg"} alt="Logo" />
            </Link>
          </div>
          <div className="flex flex-row  justify-between gap-1 lg:w-auto lg:gap-6 w-full">
            <img
              className={styles.social}
              src={"/icons/facebook.svg"}
              alt="Facebook"
            />
            <img
              className={styles.social}
              src={"/icons/insta.svg"}
              alt="Instagram"
            />
            <img
              className={styles.social}
              src={"/icons/youtube.svg"}
              alt="YouTube"
            />
            <img className={styles.social} src={"/icons/x.svg"} alt="X" />
          </div>
        </div>

        {/* <div className="flex md:hidden flex-row gap-6">
          <div className="flex flex-col gap-2">
            <img
              className={styles.social}
              src={"/icons/facebook.svg"}
              alt="Facebook"
            />
            <img
              className={styles.social}
              src={"/icons/insta.svg"}
              alt="Instagram"
            />
          </div>
          <div className="flex flex-col gap-2">
            <img
              className={styles.social}
              src={"/icons/youtube.svg"}
              alt="YouTube"
            />
            <img className={styles.social} src={"/icons/x.svg"} alt="X" />
          </div>
        </div> */}
      </div>

      <div className="flex flex-col flex-wrap lg:flex-row justify-between w-full gap-4 md:gap-0 mt-8">
        {data.map((item, index) => (
          <div
            className="flex flex-col justify-start items-start gap-[10px] min-w-[150px]"
            key={index}
          >
            <p className={styles.title}>{item.title}</p>
            {item.description.map((desc, descIndex) => {
              const href = routeMap[desc];

              // If we have a route, use Link. Otherwise, keep original <p>
              return href ? (
                <Link
                  href={href}
                  key={descIndex}
                  className={`${styles.description} hover:text-white hover:underline transition-all`}
                >
                  {desc}
                </Link>
              ) : (
                <p className={styles.description} key={descIndex}>
                  {desc}
                </p>
              );
            })}
          </div>
        ))}
        <img
          src={"/images/extra/map.svg"}
          className="mt-4 md:mt-0 w-full md:w-auto"
          alt="Map"
        />
      </div>

      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          © 2024 Your School Name. All rights reserved.
        </p>
        <p className={styles.version}>Version 1.0.0</p>
      </div>
    </div>
  );
}
