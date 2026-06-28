/**
 * Tillfälligt, lokalt innehåll (placeholders) som visas tills Sanity är
 * uppkopplat och André laddat upp riktigt material. Bilderna ligger i
 * /public/images. När motsvarande fält finns i Sanity används det istället.
 */

export const localImages = {
  hero: "/images/Hero.png",
  tileBooks: "/images/Tile1-Books.png",
  tileAbout: "/images/Tile2- About me.png",
  tileUpdates: "/images/Tile3 - Aktuellt.png",
  portrait: "/images/Portrait.png",
} as const;

export interface LocalBook {
  _id: string;
  title: string;
  year?: string;
  description?: string;
  coverSrc: string;
}

export const localBooks: LocalBook[] = [
  {
    _id: "local-1",
    title: "Boktitel 1",
    year: "2024",
    description: "Kort beskrivning av boken. (Tillfällig text.)",
    coverSrc: "/images/Omslag1.png",
  },
  {
    _id: "local-2",
    title: "Boktitel 2",
    year: "2023",
    description: "Kort beskrivning av boken. (Tillfällig text.)",
    coverSrc: "/images/Omslag2.png",
  },
  {
    _id: "local-3",
    title: "Boktitel 3",
    year: "2022",
    description: "Kort beskrivning av boken. (Tillfällig text.)",
    coverSrc: "/images/Omslag3.png",
  },
  {
    _id: "local-4",
    title: "Boktitel 4",
    year: "2021",
    description: "Kort beskrivning av boken. (Tillfällig text.)",
    coverSrc: "/images/Omslag4.png",
  },
  {
    _id: "local-5",
    title: "Boktitel 5",
    year: "2020",
    description: "Kort beskrivning av boken. (Tillfällig text.)",
    coverSrc: "/images/Omslag5.png",
  },
  {
    _id: "local-6",
    title: "Boktitel 6",
    year: "2019",
    description: "Kort beskrivning av boken. (Tillfällig text.)",
    coverSrc: "/images/Omslag6.png",
  },
];
