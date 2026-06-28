import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Sidinställningar",
  type: "document",
  // Singleton – endast ett dokument av denna typ
  fields: [
    defineField({
      name: "name",
      title: "Namn (visas stort på startsidan)",
      type: "string",
      initialValue: "André Roslund",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Undertitel / yrkesroll",
      type: "string",
      initialValue: "Författare",
    }),
    defineField({
      name: "heroImage",
      title: "Hero-bakgrund (startsidan, mörk bild)",
      description:
        "Valfri bakgrundsbild bakom namnet. Lämnas tom används en mörk målerisk bakgrund.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tileBooks",
      title: "Tile-bild: Böcker",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tileAbout",
      title: "Tile-bild: Om mig",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tileUpdates",
      title: "Tile-bild: Aktuellt",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "aboutHeading",
      title: "Rubrik – Om mig",
      type: "string",
      initialValue: "Om mig",
    }),
    defineField({
      name: "aboutText",
      title: "Text – Om mig",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "portrait",
      title: "Porträtt / bild på dig",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "email",
      title: "Kontakt – e-post",
      type: "string",
      initialValue: "andreroslund@outlook.com",
    }),
    defineField({
      name: "phone",
      title: "Kontakt – telefon",
      type: "string",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube-länk",
      type: "url",
      initialValue: "https://www.youtube.com/@andreroslund1366",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram-länk",
      type: "url",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook-länk",
      type: "url",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Sidinställningar" }),
  },
});
