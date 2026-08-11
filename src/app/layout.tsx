import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

// Playfair Display: hög kontrast-serif, nära referensens Cochin-känsla
const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // www är kanonisk värd: apex 308-redirectar hit, så alla absoluta URL:er
  // (canonical, OG-bilder, sitemap) måste peka hit för att undvika omdirigeringar.
  metadataBase: new URL("https://www.andre-roslund.se"),
  alternates: {
    canonical: "/",
  },
  // Verifieringskod från Google Search Console. Sätts som miljövariabel i
  // Vercel (GOOGLE_SITE_VERIFICATION) – utan den utelämnas taggen helt.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
  title: {
    default: "André Roslund – Författare",
    template: "%s | André Roslund",
  },
  description:
    "Författaren André Roslund. Upptäck mina böcker och följ vad jag arbetar med just nu.",
  openGraph: {
    title: "André Roslund – Författare",
    description:
      "Författaren André Roslund. Upptäck mina böcker och följ vad jag arbetar med just nu.",
    locale: "sv_SE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sv"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
