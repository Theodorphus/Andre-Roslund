import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // useCdn=true ger snabbare, cachade svar för publik läsning
  useCdn: true,
});
