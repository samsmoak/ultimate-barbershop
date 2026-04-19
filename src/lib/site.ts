export const SITE = {
  name: "Ultimate Styles Barbershop",
  shortName: "Ultimate Styles",
  tagline: "Where Precision Meets Prestige.",
  phone: "(703) 549-8820",
  phoneHref: "tel:+17035498820",
  email: "hello@ultimatestylesbarbershop.com",
  address: {
    line1: "1308 Mt Vernon Ave",
    line2: "Alexandria, VA 22301",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Ultimate+Styles+Barbershop+1308+Mt+Vernon+Ave+Alexandria+VA+22301",
    embed:
      "https://www.google.com/maps?q=1308+Mt+Vernon+Ave,+Alexandria,+VA+22301&output=embed",
  },
  rating: {
    stars: 4.4,
    count: 136,
  },
  hours: [
    { day: "Monday", open: "10:00 AM", close: "7:00 PM" },
    { day: "Tuesday", open: "10:00 AM", close: "7:00 PM" },
    { day: "Wednesday", open: "10:00 AM", close: "7:00 PM" },
    { day: "Thursday", open: "10:00 AM", close: "7:00 PM" },
    { day: "Friday", open: "10:00 AM", close: "7:00 PM" },
    { day: "Saturday", open: "8:00 AM", close: "7:00 PM" },
    { day: "Sunday", open: null, close: null },
  ],
  hoursSummary: "Mon–Fri 10a–7p · Sat 8a–7p · Sun Closed",
  socials: {
    instagram: "https://instagram.com/ultimatestylesbarbershop",
    facebook: "https://facebook.com/ultimatestylesbarbershop",
    google:
      "https://www.google.com/search?q=Ultimate+Styles+Barbershop+Alexandria+VA",
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
