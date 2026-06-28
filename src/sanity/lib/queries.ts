import { groq } from "next-sanity";

import { client } from "./client";

export interface Book {
  _id: string;
  title: string;
  year?: string;
  description?: string;
  purchaseUrl?: string;
  cover?: SanityImage;
}

export interface UpdateItem {
  _id: string;
  title: string;
  date?: string;
  body?: string;
  link?: string;
  image?: SanityImage;
}

export interface SiteSettings {
  name?: string;
  tagline?: string;
  heroImage?: SanityImage;
  tileBooks?: SanityImage;
  tileAbout?: SanityImage;
  tileUpdates?: SanityImage;
  aboutHeading?: string;
  aboutText?: PortableTextBlock[];
  portrait?: SanityImage;
  email?: string;
  phone?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
}

// Minimal Sanity-bildtyp (räcker för urlForImage)
export interface SanityImage {
  asset?: { _ref: string; _type: string };
  hotspot?: unknown;
  crop?: unknown;
}

export interface PortableTextBlock {
  _key: string;
  _type: string;
  children?: { _key: string; text?: string }[];
  [key: string]: unknown;
}

const settingsQuery = groq`*[_type == "siteSettings"][0]`;
const booksQuery = groq`*[_type == "book"] | order(order asc, _createdAt asc)`;
const updatesQuery = groq`*[_type == "update"] | order(date desc)`;

// Hämtas på servern; revalideras var 60:e sekund så CMS-ändringar slår igenom
const opts = { next: { revalidate: 60 } };

// Innan Sanity-projektet är kopplat (eller vid tillfälligt fel) faller vi
// tillbaka på tomt innehåll så att sidan ändå renderar med platshållare.
async function safeFetch<T>(query: string, fallback: T): Promise<T> {
  try {
    return await client.fetch(query, {}, opts);
  } catch (err) {
    console.warn("Sanity-hämtning misslyckades (visar platshållare):", err);
    return fallback;
  }
}

export async function getSettings(): Promise<SiteSettings | null> {
  return safeFetch<SiteSettings | null>(settingsQuery, null);
}

export async function getBooks(): Promise<Book[]> {
  return safeFetch<Book[]>(booksQuery, []);
}

export async function getUpdates(): Promise<UpdateItem[]> {
  return safeFetch<UpdateItem[]>(updatesQuery, []);
}
