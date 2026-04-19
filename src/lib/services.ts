import type { Service, ServiceCategory } from "@/types";

export const SERVICE_CATEGORIES: {
  id: ServiceCategory;
  label: string;
  blurb: string;
}[] = [
  {
    id: "haircuts",
    label: "Haircuts",
    blurb: "Precision shapes for every head, every texture.",
  },
  {
    id: "beard",
    label: "Beard Services",
    blurb: "Shape, sculpt, and finish with the straight razor.",
  },
  {
    id: "specialty",
    label: "Specialty",
    blurb: "Color, treatments, and locs — handled with intention.",
  },
  {
    id: "kids",
    label: "Kids",
    blurb: "Calm chairs, gentle hands, fresh cuts for 12 & under.",
  },
];

export const SERVICES: Service[] = [
  {
    id: "classic-cut",
    name: "Classic Cut",
    price: "$35",
    description: "Consultation, wash, scissor-and-clipper cut, styled to finish.",
    category: "haircuts",
  },
  {
    id: "fade",
    name: "Fade (Low / Mid / High)",
    price: "$40",
    description: "Skin to scissor gradient — our signature. Cleanest in the city.",
    category: "haircuts",
  },
  {
    id: "taper",
    name: "Taper",
    price: "$38",
    description: "Subtle blend around the ears and neck. Polished, professional.",
    category: "haircuts",
  },
  {
    id: "design",
    name: "Design / Part",
    price: "+$10",
    description: "Razor-cut line, part, or custom design added to any haircut.",
    category: "haircuts",
  },
  {
    id: "lineup",
    name: "Shape Up / Lineup",
    price: "$25",
    description: "Sharpen the hairline and edges. Straight razor finish.",
    category: "haircuts",
  },
  {
    id: "beard-trim",
    name: "Beard Trim & Shape",
    price: "$25",
    description: "Define the jawline, clean the neck, detail the mustache.",
    category: "beard",
  },
  {
    id: "beard-lineup",
    name: "Full Beard Lineup",
    price: "$30",
    description: "Razor-precise edges, symmetrical, architectural.",
    category: "beard",
  },
  {
    id: "hot-towel-shave",
    name: "Hot Towel Shave",
    price: "$45",
    description: "Pre-shave oil, steamed towels, straight razor, balm. A ritual.",
    category: "beard",
  },
  {
    id: "cut-beard-combo",
    name: "Beard + Cut Combo",
    price: "$60",
    description: "The full reset — haircut and beard service in one sitting.",
    category: "beard",
  },
  {
    id: "color",
    name: "Color / Highlights",
    price: "$60+",
    description: "Custom color consultation and application. Price by length and design.",
    category: "specialty",
  },
  {
    id: "locs",
    name: "Dreadlock Maintenance",
    price: "$50+",
    description: "Retwists, interlocks, shampoo treatment. Keep your locs tight.",
    category: "specialty",
  },
  {
    id: "treatment",
    name: "Hair Treatment",
    price: "$40",
    description: "Deep-condition, scalp treatment, steam. Restore and strengthen.",
    category: "specialty",
  },
  {
    id: "kids-cut",
    name: "Kids Cut",
    price: "$28",
    description: "Scissor or clipper cut for 12 & under. Patient, kid-friendly.",
    category: "kids",
  },
  {
    id: "kids-fade",
    name: "Kids Fade",
    price: "$32",
    description: "Clean, comfortable fade — tailored for little ones.",
    category: "kids",
  },
];

export function servicesByCategory(cat: ServiceCategory): Service[] {
  return SERVICES.filter((s) => s.category === cat);
}
