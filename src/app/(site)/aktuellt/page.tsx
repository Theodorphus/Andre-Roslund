import type { Metadata } from "next";
import { getUpdates } from "@/sanity/lib/queries";
import SanityImg from "@/components/SanityImg";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Aktuellt",
  description: "Det senaste från André Roslund – vad jag arbetar med just nu.",
};

export default async function UpdatesPage() {
  const updates = await getUpdates();

  return (
    <section className="mx-auto max-w-4xl px-6 pt-32 pb-24">
      <Reveal as="header" className="mb-14 max-w-2xl">
        <h1 className="hero-name font-display text-4xl sm:text-5xl">Aktuellt</h1>
        <div className="mt-5 h-px w-24 bg-[linear-gradient(90deg,var(--accent),transparent)]" />
        <p className="mt-5 text-muted">Vad jag håller på med just nu.</p>
      </Reveal>

      {updates.length > 0 ? (
        <div className="space-y-12">
          {updates.map((u, i) => (
            <Reveal
              key={u._id}
              delay={(i % 3) * 100}
              as="article"
              className="grid gap-6 border-b border-line pb-12 last:border-0 sm:grid-cols-[1fr_2fr]"
            >
              {u.image?.asset && (
                <SanityImg
                  image={u.image}
                  alt={u.title}
                  width={400}
                  height={300}
                  sizes="(max-width: 640px) 100vw, 240px"
                  className="h-auto w-full object-cover"
                />
              )}
              <div className={u.image?.asset ? "" : "sm:col-span-2"}>
                {u.date && <p className="text-sm text-muted">{u.date}</p>}
                <h2 className="mt-1 font-display text-2xl text-accent">{u.title}</h2>
                {u.body && (
                  <p className="mt-3 leading-relaxed text-muted whitespace-pre-line">
                    {u.body}
                  </p>
                )}
                {u.link && (
                  <a
                    href={u.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm uppercase tracking-wide link-underline"
                  >
                    Läs mer
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="text-muted">Inga inlägg ännu.</p>
      )}
    </section>
  );
}
