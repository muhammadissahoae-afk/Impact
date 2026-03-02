import child from "@/svgs/child.png";
import { StaticImageData } from "next/image";
import Frame1 from "./Frame1.png";
import CulturalPride from "./CulturalPride_HomePage.jpg";
import Frame4 from "./Frame4.png";
import HolisticDevelopment from './HolisticDevelopment_LandingPage.jpg'
import Experimental from './ExperimentalLearning_LandingPage.jpg'
export type FeatureShowcaseItem = {
  id: string;
  tabLabel: string; // e.g. "Readiness"
  titleAccent?: string; // e.g. "Experimental"
  subtitle?: string; // e.g. "Learning & Real-world Readiness"
  description: string;
  ctaLabel: string;
  onCtaClick?: () => void; // optional; if not provided use href
  ctaHref?: string;

  // Media
  imageSrc: string | StaticImageData;
  imageAlt: string;

  // Optional theme dot color (small dot on the pill)
  dotColor?: "orange" | "red" | "amber";
  richTitleDirection?: "left" | "right";
};

export const demoItems: FeatureShowcaseItem[] = [
  {
    id: "experiential",
    tabLabel: "Readiness",
    titleAccent: "Experimental",
    subtitle: "Learning & Real-world Readiness",
    description:
      "Empowering learners through hands-on experiences that prepare them for real-world success.",
    ctaLabel: "Register Now",
    ctaHref: "#",
    imageSrc: Experimental,
    imageAlt: "Student in lab",
    dotColor: "amber",
    richTitleDirection: "left",
  },
  {
    id: "science",
    tabLabel: "Science",
    titleAccent: "Belonging",
    subtitle: "Cultivating Cultural Pride and ",
    description:
      "We foster cultural pride and embrace diversity, creating a community where every identity is valued and celebrated.",
    ctaLabel: "Register Now",
    ctaHref: "#",
    imageSrc: CulturalPride,
    imageAlt: "Science labs",
    dotColor: "orange",
    richTitleDirection: "right",
  },
  {
    id: "arts",
    tabLabel: "Creativity",
    titleAccent: "Holistic",
    subtitle: "Development & Well-Being",
    description:
      "We nurture the mind, body, and character to build balanced, confident, and compassionate individuals.",
    ctaLabel: "Register Now",
    ctaHref: "#",
    imageSrc: HolisticDevelopment,
    imageAlt: "Art studio",
    dotColor: "red",
    richTitleDirection: "left",
  },
  {
    id: "arts",
    tabLabel: "Creativity",
    titleAccent: " 40+",
    subtitle: "Diverse Offerings",
    description:
      "We provide a wide range of academic, creative, and co-curricular opportunities that empower every learner to explore their passions and potential. ",
    ctaLabel: "Register Now",
    ctaHref: "#",
    imageSrc: Frame4,
    imageAlt: "Art studio",
    dotColor: "red",
    richTitleDirection: "left",
  },
];
