import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import PortableTextBlocks from "@/components/PortableTextBlocks";
import { getMeetings } from "@/sanity/lib/queries";
import { motenSomBerikar as localMeetings } from "@/lib/localContent";

export const metadata: Metadata = {
  title: "Möten som berikar",
  description:
    "André Roslund om de oväntade mötena – livets små guldkorn – och lugnet efteråt.",
};

export default async function MotenSomBerikarPage() {
  const meetings = await getMeetings();
  // Använd Sanity-innehåll om det finns, annars Andrés lokala text.
  const title = meetings?.title ?? localMeetings.title;
  const sanityBody = meetings?.body ?? [];

  return (
    <section className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <Reveal as="header" className="mb-14">
        <h1 className="hero-name font-display text-4xl sm:text-5xl">{title}</h1>
        <div className="mt-5 h-px w-24 bg-[linear-gradient(90deg,var(--accent),transparent)]" />
      </Reveal>

      {sanityBody.length > 0 ? (
        <Reveal className="space-y-4 leading-relaxed text-muted">
          <PortableTextBlocks blocks={sanityBody} />
        </Reveal>
      ) : (
        <div className="space-y-10">
          {localMeetings.sections.map((sec, i) => (
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
      )}

      <Reveal className="mt-16">
        <Link
          href="/"
          className="text-sm uppercase tracking-wide link-underline text-accent"
        >
          ← Tillbaka till startsidan
        </Link>
      </Reveal>
    </section>
  );
}
