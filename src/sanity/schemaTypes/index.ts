import { type SchemaTypeDefinition } from "sanity";

import { book } from "./book";
import { update } from "./update";
import { siteSettings } from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, book, update],
};
