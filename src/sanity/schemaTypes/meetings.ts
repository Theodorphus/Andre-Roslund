import { defineField, defineType } from "sanity";

export const meetings = defineType({
  name: "meetings",
  title: "Möten som berikar",
  type: "document",
  // Singleton – endast ett dokument
  fields: [
    defineField({
      name: "title",
      title: "Rubrik",
      type: "string",
      initialValue: "Möten som berikar",
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
    prepare: () => ({ title: "Möten som berikar" }),
  },
});
