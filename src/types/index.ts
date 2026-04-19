export type ServiceCategory = "haircuts" | "beard" | "specialty" | "kids";

export type Service = {
  id: string;
  name: string;
  price: string;
  description: string;
  category: ServiceCategory;
};

export type Barber = {
  id: string;
  name: string;
  title: string;
  years: number;
  bio: string;
  image: string;
  instagram?: string;
  specialties: string[];
};

export type CutCategory =
  | "fades"
  | "lineups"
  | "beards"
  | "kids"
  | "color";

export type Cut = {
  id: string;
  src: string;
  alt: string;
  category: CutCategory;
  barberId: string;
  caption: string;
  size: "large" | "medium";
};

export type Review = {
  id: string;
  name: string;
  stars: 4 | 5;
  when: string;
  body: string;
  badge?: string;
  localGuide?: boolean;
};

export type BookingState = {
  step: number;
  serviceId: string | null;
  barberId: string | null;
  date: string | null;
  time: string | null;
  name: string;
  phone: string;
  email: string;
};
