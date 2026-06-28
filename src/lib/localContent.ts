/**
 * Tillfälligt, lokalt innehåll som visas tills Sanity är uppkopplat och André
 * fyller på själv. Bilderna ligger i /public/images. När motsvarande fält finns
 * i Sanity används det istället.
 *
 * Innehållet bygger på materialet André skickade (böcker, länkar, kontakt).
 */

export const localImages = {
  hero: "/images/Hero.png",
  tileBooks: "/images/Tile1-Books.png",
  tileAbout: "/images/Tile2- About me.png",
  tileUpdates: "/images/Tile3 - Aktuellt.png",
  portrait: "/images/Portrait.png",
} as const;

/** Kontakt- och profiluppgifter (platshållare tills Sanity fylls). */
export const localProfile = {
  name: "André Roslund",
  tagline: "Författare",
  aboutHeading: "Om mig",
  // Saklig, neutral text – André finjusterar gärna själv i CMS.
  aboutText:
    "André Roslund är en svensk författare, född 1970. Han skriver true crime och självbiografiska berättelser som utgår från egna erfarenheter. Debuten Älsklingsgrabben gavs ut 1999, följd av bland annat Ränderna går aldrig ur och ADHD-bedragaren.",
  email: "andreroslund@outlook.com",
  phone: "076-286 81 43",
  facebookUrl: "https://www.facebook.com/profile.php?id=100074433578866",
  youtubeUrl: "https://www.youtube.com/@andreroslund1366",
} as const;

export interface LocalBook {
  _id: string;
  title: string;
  year?: string;
  description?: string;
  coverSrc: string;
  purchaseUrl?: string;
}

export const localBooks: LocalBook[] = [
  {
    _id: "local-adhd",
    title: "ADHD-bedragaren",
    year: "2020",
    description:
      "Självbiografisk true crime utgiven på Bymarken Förlag.",
    coverSrc: "/images/Bok1.jpg",
    purchaseUrl: "https://www.boktugg.se/forfattare/315963/",
  },
  {
    _id: "local-alsklingsgrabben",
    title: "Älsklingsgrabben",
    year: "1999",
    description:
      "Andrés debutroman, utgiven på Fischer & Co.",
    coverSrc: "/images/Bok2.webp",
    purchaseUrl:
      "https://nextory.com/se/book/alsklingsgrabben-2719001",
  },
  {
    _id: "local-randerna",
    title: "Ränderna går aldrig ur",
    year: "2016",
    description: "True crime, utgiven på Lind & Co.",
    coverSrc: "/images/Bok3.jpg",
    purchaseUrl: "https://lindco.se/",
  },
  {
    _id: "local-ettliv",
    title: "Ett liv i missbruk & brott",
    year: "2022",
    description: "Självbiografisk berättelse.",
    coverSrc: "/images/Bok4.jpg",
    purchaseUrl: "https://www.boktugg.se/forfattare/315963/",
  },
  {
    _id: "local-bekannelser",
    title: "En bedragares bekännelser",
    year: "2024",
    description: "Självbiografisk true crime.",
    coverSrc: "/images/Bok5.webp",
    purchaseUrl: "https://www.storytel.com/se/authors/andré-roslund-217565",
  },
  {
    _id: "local-lillaitalien",
    title: "Lilla Italien",
    year: "2024",
    description: "True crime.",
    coverSrc: "/images/Bok6.jpg",
    purchaseUrl: "https://www.storytel.com/se/authors/andré-roslund-217565",
  },
  {
    _id: "local-brandbilen",
    title: "Brandbilen",
    year: "2024",
    description: "Novell.",
    coverSrc: "/images/Bok7.jpg",
    purchaseUrl: "https://www.storytel.com/se/authors/andré-roslund-217565",
  },
];
