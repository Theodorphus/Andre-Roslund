import type { StructureResolver } from "sanity/structure";

// Sidinställningar som singleton, böcker och aktuellt som listor
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Innehåll")
    .items([
      S.listItem()
        .title("Sidinställningar")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.divider(),
      S.documentTypeListItem("book").title("Böcker"),
      S.documentTypeListItem("update").title("Aktuellt"),
    ]);
