import type { Metadata } from "next";
import { getSettings } from "@/sanity/lib/queries";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { lecture, localProfile } from "@/lib/localContent";

export const metadata: Metadata = {
  title: "Föreläsning",
  description:
    "Föreläsning för mammor: Vad din son inte berättar för dig – en inblick inifrån om ADHD, alkohol och att nå fram till sin son.",
};

export default async function LecturePage() {
  const settings = await getSettings();
  const email = settings?.email ?? localProfile.email;

  return (
    <section className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <Reveal as="header" className="mb-14 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/80">
          Föreläsning
        </p>
        <h1 className="hero-name mt-3 font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
          {lecture.title}
        </h1>
        <div className="mt-5 h-px w-24 bg-[linear-gradient(90deg,var(--accent),transparent)]" />
        <p className="mt-6 leading-relaxed text-muted">{lecture.intro}</p>
      </Reveal>

      <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr]">
        {/* Innehåll: de tre områdena */}
        <div className="space-y-12">
          {lecture.points.map((p, i) => (
            <Reveal key={p.heading} delay={(i % 3) * 100} as="article">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-4xl text-accent/40">
                  {i + 1}
                </span>
                <h2 className="font-display text-2xl text-accent">
                  {p.heading}
                </h2>
              </div>
              <div className="mt-4 space-y-4 border-l-2 border-accent pl-6 leading-relaxed text-muted">
                <div>
                  <p className="font-display text-sm uppercase tracking-wide text-foreground/90">
                    {p.explainLabel}
                  </p>
                  <p className="mt-1">{p.explain}</p>
                </div>
                {p.watch && (
                  <div>
                    <p className="font-display text-sm uppercase tracking-wide text-foreground/90">
                      Vad du ska vara uppmärksam på:
                    </p>
                    <p className="mt-1">{p.watch}</p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Kontaktformulär vid sidan av */}
        <Reveal delay={120}>
          <div className="lg:sticky lg:top-28">
            <div className="border border-line bg-white/[0.02] p-6 sm:p-8">
              <h2 className="font-display text-2xl text-accent">
                Boka en föreläsning
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Vill du veta mer eller boka en träff för din grupp? Skicka en
                förfrågan så återkommer jag så snart jag kan.
              </p>
              <div className="mt-6">
                <ContactForm
                  toEmail={email}
                  subject={`Föreläsning: ${lecture.title}`}
                  submitLabel="Skicka förfrågan"
                  messagePlaceholder="Berätta gärna kort om er grupp och vilka datum som skulle passa"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
