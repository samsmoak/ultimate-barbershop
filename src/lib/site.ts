export const SITE = {
  name: "The Ultimate Barber",
  shortName: "Ultimate Barber",
  tagline: "Where Precision Meets Prestige.",
  phone: "(571) 483-0032",
  phoneHref: "tel:+15714830032",
  email: "hello@theultimatebarber.com",
  address: {
    line1: "2712 Richmond Hwy",
    line2: "Alexandria, VA 22301",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=2712+Richmond+Hwy+Alexandria+VA+22301",
    embed:
      "https://www.google.com/maps?q=2712+Richmond+Hwy,+Alexandria,+VA+22301&output=embed",
  },
  rating: {
    stars: 4.4,
    count: 492,
  },
  hours: [
    { day: "Monday", open: "8:00 AM", close: "7:00 PM" },
    { day: "Tuesday", open: "8:00 AM", close: "7:00 PM" },
    { day: "Wednesday", open: "8:00 AM", close: "7:00 PM" },
    { day: "Thursday", open: "8:00 AM", close: "7:00 PM" },
    { day: "Friday", open: "8:00 AM", close: "7:00 PM" },
    { day: "Saturday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Sunday", open: null, close: null },
  ],
  hoursSummary: "Mon–Fri 8a–7p · Sat 8a–6p · Sun Closed",
  socials: {
    instagram: "https://instagram.com/theultimatebarber",
    facebook: "https://facebook.com/theultimatebarber",
    google: "https://www.google.com/search?q=the+ultimate+barber+alexandria+va",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/cuts", label: "The Cuts" },
    { href: "/book", label: "Book" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ] as const,
} as const;

export type NavHref = (typeof SITE.nav)[number]["href"];
