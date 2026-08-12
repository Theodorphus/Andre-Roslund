import type { Metadata } from "next";
import { getUpdates } from "@/sanity/lib/queries";
import Reveal from "@/components/Reveal";
import { localUpdates } from "@/lib/localContent";

export const metadata: Metadata = {
  title: "Aktuellt",
  description:
    "Det senaste från André Roslund – bland annat de pågående manusen Den ödmjuke seriemördaren och Rikets säkerhet.",
};

export default async function UpdatesPage() {
  const updates = await getUpdates();
  // Faller tillbaka på Andrés pågående projekt tills Sanity har inlägg.
  const items =
    updates.length > 0
      ? updates.map((u) => ({
          _id: u._id,
          title: u.title,
          date: u.date,
          body: u.body,
        }))
      : localUpdates;

  return (
    <section className="mx-auto max-w-4xl px-6 pt-32 pb-24">
      <Reveal as="header" className="mb-14 max-w-2xl">
        <h1 className="hero-name font-display text-4xl sm:text-5xl">Aktuellt</h1>
        <div className="mt-5 h-px w-24 bg-[linear-gradient(90deg,var(--accent),transparent)]" />
        <p className="mt-5 text-muted">Vad jag håller på med just nu.</p>
      </Reveal>

      <div className="space-y-12">
        {items.map((u, i) => (
          <Reveal
            key={u._id}
            delay={(i % 3) * 100}
            as="article"
            className="border-b border-line pb-12 last:border-0"
          >
            {u.date && <p className="text-sm text-muted">{u.date}</p>}
            <h2 className="mt-1 font-display text-2xl text-accent">{u.title}</h2>
            {u.body && (
              <p className="mt-3 leading-relaxed text-muted whitespace-pre-line">
                {u.body}
              </p>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
