import { type SchemaTypeDefinition } from "sanity";

import { book } from "./book";
import { update } from "./update";
import { siteSettings } from "./siteSettings";
import { meaningOfLife } from "./meaningOfLife";
import { meetings } from "./meetings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, book, update, meaningOfLife, meetings],
};
