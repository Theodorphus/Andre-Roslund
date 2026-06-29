import type { MetadataRoute } from "next";

const baseUrl = "https://andre-roslund.se";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Studion (CMS) ska inte indexeras
      disallow: "/studio",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
