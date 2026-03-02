import type { PrinciplesCardData } from "./principles.types";

export const PRINCIPLES_CARDS: readonly PrinciplesCardData[] = [
  {
    title: "Our Mission",
    text: "Our school is dedicated to excellence and innovation, offering a safe, inclusive environment that nurtures every student’s unique potential. We promote well-being and holistic growth—moral, intellectual, social, emotional, and physical—while shaping confident, independent, and compassionate future leaders who embody integrity, creativity, and respect for diversity.",
  },
  {
    title: "Our Vision",
    text: "Our goal is to lead in education by fostering holistic development and well-being in a dynamic, inclusive environment—driving academic excellence, innovation, and technological advancement toward a sustainable future.",
  },
  {
    title: "Our Values",
    text: "Our core values define our commitment to nurturing excellence, innovation, and integrity within an inclusive and supportive environment. We prioritize well-being and holistic growth, celebrating diversity while fostering intellectual, emotional, and moral development. We prepare learners to lead with purpose, empathy, and responsibility in an ever-changing world.",
  },
] as const;
