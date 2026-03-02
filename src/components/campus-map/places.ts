export type PlaceCategory = "academic" | "sport";

export type Place = {
  id: string;
  label: string;
  category: PlaceCategory;
  description: string;

  // hotspot position over the image (percentage)
  xPct: number; // 0..100
  yPct: number; // 0..100
};

export const PLACES: Place[] = [
  {
    id: "science-labs",
    label: "Science Labs",
    category: "academic",
    description: "Modern labs equipped for hands-on experiments and research.",
    xPct: 43,
    yPct: 28,
  },
  {
    id: "art-studio",
    label: "ART Studio",
    category: "academic",
    description: "Creative studio space for visual arts and design.",
    xPct: 70,
    yPct: 30,
  },
  {
    id: "classrooms",
    label: "Class Rooms",
    category: "academic",
    description: "Classrooms are equipped with advanced facilities.",
    xPct: 53,
    yPct: 80,
  },

  {
    id: "football-field",
    label: "Football Field",
    category: "sport",
    description: "Outdoor football field and training area.",
    xPct: 37,
    yPct: 62,
  },
  {
    id: "sports-hall",
    label: "Sports Hall",
    category: "sport",
    description: "Indoor multi-purpose sports hall.",
    xPct: 82,
    yPct: 66,
  },
];
