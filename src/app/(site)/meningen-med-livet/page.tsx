import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { meaningOfLife } from "@/lib/localContent";

export const metadata: Metadata = {
  title: "Meningen med livet",
  description: "André Roslunds tankar om meningen med livet.",
};

export default function MeaningPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <Reveal as="header" className="mb-14">
        <h1 className="hero-name font-display text-4xl sm:text-5xl">
          {meaningOfLife.title}
        </h1>
        <div className="mt-5 h-px w-24 bg-[linear-gradient(90deg,var(--accent),transparent)]" />
      </Reveal>

      <div className="space-y-10">
        {meaningOfLife.sections.map((sec, i) => (
          <Reveal key={`sec-${i}`} delay={(i % 3) * 100}>
            {sec.heading && (
              <h2 className="mb-4 font-display text-2xl text-accent">
                {sec.heading}
              </h2>
            )}
            <div className="space-y-4 leading-relaxed text-muted">
              {sec.paragraphs?.map((p, j) => (
                <p key={`p-${i}-${j}`}>{p}</p>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <Link
          href="/kontakt"
          className="text-sm uppercase tracking-wide link-underline text-accent"
        >
          ← Tillbaka till Om mig
        </Link>
      </Reveal>
    </section>
  );
}
