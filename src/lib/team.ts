import type { Barber } from "@/types";

// Curated Unsplash portraits — dark, editorial, barber-aesthetic.
export const TEAM: Barber[] = [
  {
    id: "john-h",
    name: "John H",
    title: "Master of the Fade",
    years: 12,
    bio: "John has been cutting hair since he was fifteen. His fades read like architecture — skin-to-scissor blends so clean clients fly in from three states over. He listens first, cuts second, and never sends a man out of the chair without checking twice.",
    image: "/images/team/john.jpg",
    instagram: "https://instagram.com/",
    specialties: ["Fades", "Tapers", "Lineups"],
  },
  {
    id: "carlos",
    name: "Carlos",
    title: "The Kids' Favorite · Family Barber",
    years: 10,
    bio: "Carlos is the reason families book weeks out. He turns first haircuts into memories, reads a nervous two-year-old in ten seconds, and cuts with the same care he gives his own kids. His chair is the warmest room in the shop.",
    image: "/images/team/carlos.jpg",
    instagram: "https://instagram.com/",
    specialties: ["Kids Cuts", "Family Sessions", "Classic Cuts"],
  },
  {
    id: "devon-m",
    name: "Devon M",
    title: "Straight Razor Specialist",
    years: 8,
    bio: "Devon came up in traditional Italian barbering. Hot towels, steel, lather — he treats the shave like a ceremony. Nobody leaves his chair without a finish so close you can see your reflection in it.",
    image: "/images/team/devon.jpg",
    instagram: "https://instagram.com/",
    specialties: ["Hot Towel Shaves", "Beard Lineups", "Straight Razor"],
  },
  {
    id: "marcus-l",
    name: "Marcus L",
    title: "Color & Creative",
    years: 7,
    bio: "Marcus took our color program from side-service to signature. Platinum, tonal, subtle grays that actually look right — he'll draw the formula on a napkin if you ask. Brings fashion energy without the attitude.",
    image: "/images/team/marcus.jpg",
    instagram: "https://instagram.com/",
    specialties: ["Color", "Highlights", "Creative Cuts"],
  },
  {
    id: "andre-w",
    name: "Andre W",
    title: "Textures & Locs",
    years: 9,
    bio: "Andre is our textured-hair specialist — curls, coils, and locs. Retwists tight enough to sleep on, cuts shaped to the way your hair actually grows. He'll tell you the truth about your routine and then fix it.",
    image: "/images/team/andre.jpg",
    instagram: "https://instagram.com/",
    specialties: ["Locs", "Textured Hair", "Treatments"],
  },
];

export function barberById(id: string): Barber | undefined {
  return TEAM.find((t) => t.id === id);
}
