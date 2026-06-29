import { defineField, defineType } from "sanity";

export const meaningOfLife = defineType({
  name: "meaningOfLife",
  title: "Meningen med livet",
  type: "document",
  // Singleton – endast ett dokument
  fields: [
    defineField({
      name: "title",
      title: "Rubrik",
      type: "string",
      initialValue: "Meningen med livet",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Text",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Meningen med livet" }),
  },
});
