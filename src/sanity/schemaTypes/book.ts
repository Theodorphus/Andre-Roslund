import { defineField, defineType } from "sanity";

export const book = defineType({
  name: "book",
  title: "Bok",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Omslag",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Utgivningsår",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Beskrivning",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "purchaseUrl",
      title: "Köp-länk (Adlibris/Bokus/Amazon m.m.)",
      type: "url",
    }),
    defineField({
      name: "purchaseLabel",
      title: "Knapptext",
      description: 'Lämna tom för "Köp boken". Använd t.ex. "Lyssna här" för ljudböcker.',
      type: "string",
    }),
    defineField({
      name: "coverFit",
      title: "Omslagets passform",
      description:
        'Välj "Hela omslaget syns" för kvadratiska omslag (ofta ljudböcker) så att inget beskärs.',
      type: "string",
      options: {
        list: [
          { title: "Fyll rutan (beskärs)", value: "cover" },
          { title: "Hela omslaget syns", value: "contain" },
        ],
        layout: "radio",
      },
      initialValue: "cover",
    }),
    defineField({
      name: "order",
      title: "Sorteringsordning",
      description: "Lägre tal visas först.",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Sorteringsordning",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "year", media: "cover" },
  },
});
