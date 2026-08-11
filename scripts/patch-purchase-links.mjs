/**
 * Riktad patch: uppdaterar ENDAST köp-länkarna (purchaseUrl) på befintliga
 * bok-dokument i Sanity. Rör inte omslag, titlar, beskrivningar eller ordning,
 * och skriver inte över några andra fält André ändrat i Studio.
 *
 *   node scripts/patch-purchase-links.mjs
 *
 * Kräver samma .env.local som seed-scriptet (projekt-id, dataset, write-token).
 */
import { createClient } from "@sanity/client";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { config as loadEnv } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
loadEnv({ path: join(root, ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("✗ Saknar NEXT_PUBLIC_SANITY_PROJECT_ID eller SANITY_API_WRITE_TOKEN i .env.local");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2024-10-01", token, useCdn: false });

// Endast de böcker vars länk ändras. Älsklingsgrabben + Brandbilen lämnas orörda.
const links = {
  "book-randerna": "https://www.storytel.com/se/books/r%C3%A4nderna-g%C3%A5r-aldrig-ur-718312",
  "book-adhd": "https://www.adlibris.com/se/bok/adhd-bedragaren-9789198574418",
  "book-ettliv": "https://www.adlibris.com/sv/bok/ett-liv-i-missbruk-och-brott-9789152739853",
  "book-bekannelser": "https://www.storytel.com/se/books/en-bedragares-bek%C3%A4nnelser-6565135",
  "book-lillaitalien": "https://www.storytel.com/se/books/lilla-italien-10165087",
  "book-brandbilen": "https://nextory.com/se/book/brandbilen-5682712",
};

async function run() {
  console.log(`Patchar köp-länkar i Sanity "${projectId}" (${dataset})...\n`);
  for (const [id, url] of Object.entries(links)) {
    const res = await client.patch(id).set({ purchaseUrl: url }).commit();
    console.log(`  ✓ ${res.title ?? id} → ${url}`);
  }
  console.log("\nKlart. Ändringar slår igenom på sidan inom ~60 sek (ISR-revalidering).");
}

run().catch((err) => {
  console.error("✗ Patch misslyckades:", err.message);
  process.exit(1);
});
