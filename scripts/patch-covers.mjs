/**
 * Riktad patch: laddar upp nya (högupplösta) bokomslag till Sanity och pekar om
 * bok-dokumentens cover-fält. Rör inga andra fält. Körs vid behov:
 *
 *   node scripts/patch-covers.mjs
 *
 * Kräver samma .env.local som seed-scriptet (projekt-id, dataset, write-token).
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
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
const imagesDir = join(root, "public", "images");

// bok-dokument -> ny omslagsfil i public/images
const covers = {
  "book-lillaitalien": "Bok6.jpg",
  "book-brandbilen": "Bok7.jpg",
};

async function uploadImage(filename) {
  const path = join(imagesDir, filename);
  if (!existsSync(path)) throw new Error(`Hittade inte bild: ${filename}`);
  const asset = await client.assets.upload("image", readFileSync(path), { filename });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function run() {
  console.log(`Patchar omslag i Sanity "${projectId}" (${dataset})...\n`);
  for (const [id, file] of Object.entries(covers)) {
    const cover = await uploadImage(file);
    const res = await client.patch(id).set({ cover }).commit();
    console.log(`  ✓ ${res.title ?? id} → ${file} (nytt asset)`);
  }
  console.log("\nKlart. Ändringar slår igenom på sidan inom ~60 sek (ISR-revalidering).");
}

run().catch((err) => {
  console.error("✗ Patch misslyckades:", err.message);
  process.exit(1);
});
