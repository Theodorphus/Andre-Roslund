import type { Metadata } from "next";
import { getSettings } from "@/sanity/lib/queries";
import SanityImg from "@/components/SanityImg";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { localImages } from "@/lib/localContent";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakta författaren André Roslund.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  const name = settings?.name ?? "André Roslund";
  const email = settings?.email ?? "andreroslund@outlook.com";

  return (
    <section className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <div className="grid gap-12 md:grid-cols-2">
        {/* Om / porträtt */}
        <Reveal>
          <h1 className="hero-name font-display text-4xl sm:text-5xl">
            {settings?.aboutHeading ?? "Om mig"}
          </h1>
          <div className="mt-6 max-w-md">
            <div className="tile !aspect-[5/6]">
              <SanityImg
                image={settings?.portrait}
                fallbackSrc={localImages.portrait}
                alt={name}
                width={480}
                height={560}
                sizes="(max-width: 768px) 100vw, 40vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          {settings?.aboutText?.length ? (
            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              {settings.aboutText.map((block) => (
                <p key={block._key}>
                  {block.children?.map((c) => c.text).join("")}
                </p>
              ))}
            </div>
          ) : (
            <p className="mt-6 leading-relaxed text-muted">
              Här berättar André kort om sig själv och sitt författarskap.
            </p>
          )}
        </Reveal>

        {/* Kontaktuppgifter + formulär */}
        <Reveal delay={120}>
          <h2 className="font-display text-3xl text-accent">Kontakt</h2>
          <p className="mt-4 text-muted">
            Hör gärna av dig – du når mig enklast via e-post.
          </p>

          <dl className="mt-6 space-y-3 text-sm">
            <div>
              <dt className="uppercase tracking-wide text-muted">E-post</dt>
              <dd>
                <a href={`mailto:${email}`} className="link-underline">
                  {email}
                </a>
              </dd>
            </div>
            {settings?.phone && (
              <div>
                <dt className="uppercase tracking-wide text-muted">Telefon</dt>
                <dd>{settings.phone}</dd>
              </div>
            )}
          </dl>

          <div className="mt-10">
            <ContactForm toEmail={email} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
