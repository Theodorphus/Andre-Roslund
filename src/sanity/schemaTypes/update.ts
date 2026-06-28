import { defineField, defineType } from "sanity";

export const update = defineType({
  name: "update",
  title: "Aktuellt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Rubrik",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Datum",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
    }),
    defineField({
      name: "body",
      title: "Text",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "image",
      title: "Bild (valfri)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "link",
      title: "Länk (valfri)",
      type: "url",
    }),
  ],
  orderings: [
    {
      title: "Senaste först",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "date", media: "image" },
  },
});
