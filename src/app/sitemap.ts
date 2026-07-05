import type { MetadataRoute } from "next";

const baseUrl = "https://andre-roslund.se";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/bocker", "/aktuellt", "/forelasning", "/kontakt", "/meningen-med-livet"];
  const now = new Date();

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
