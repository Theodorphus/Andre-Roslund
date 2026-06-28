import Link from "next/link";
import { getSettings, getBooks, getUpdates } from "@/sanity/lib/queries";
import SanityImg from "@/components/SanityImg";
import BookCard from "@/components/BookCard";
import Reveal from "@/components/Reveal";
import { localImages, localBooks } from "@/lib/localContent";

export default async function HomePage() {
  const [settings, books, updates] = await Promise.all([
    getSettings(),
    getBooks(),
    getUpdates(),
  ]);

  const name = settings?.name ?? "André Roslund";
  // Faller tillbaka på tillfälliga lokala böcker tills Sanity har innehåll
  const useLocalBooks = books.length === 0;
  const featured = books.slice(0, 8);
  const displayBooks = useLocalBooks
    ? localBooks.map((b) => ({
        book: { _id: b._id, title: b.title, year: b.year, description: b.description },
        fallback: b.coverSrc,
      }))
    : featured.map((b) => ({ book: b, fallback: undefined }));
  const latestUpdate = updates[0];

  const tiles = [
    {
      href: "/bocker",
      label: "Böcker",
      image: settings?.tileBooks,
      fallback: localImages.tileBooks,
    },
    {
      href: "/kontakt",
      label: "Om mig",
      image: settings?.tileAbout,
      fallback: localImages.tileAbout,
    },
    {
      href: "/aktuellt",
      label: "Aktuellt",
      image: settings?.tileUpdates,
      fallback: localImages.tileUpdates,
    },
  ];

  return (
    <>
      {/* Hero – mörk målerisk bakgrund, stort guldnamn, tre tiles */}
      <section className="hero-paint relative flex min-h-[100svh] flex-col justify-center overflow-hidden">
        {/* Bakgrundsbild med ken-burns + djup vignett för läsbarhet */}
        <div className="pointer-events-none absolute inset-0">
          <div className="ken-burns h-full w-full">
            <SanityImg
              image={settings?.heroImage}
              fallbackSrc={localImages.hero}
              alt=""
              width={1920}
              height={1080}
              priority
              sizes="100vw"
              className="h-full w-full object-cover opacity-55"
            />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_30%,transparent_30%,rgba(8,10,18,0.75)_100%)]" />
          <div className="absolute inset-0 bg-[var(--background)]/45" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-6 py-24">
          <h1 className="hero-name font-display text-center text-6xl leading-none sm:text-7xl md:text-[7.5rem] fade-up">
            {name}
          </h1>
          <div className="mt-6 gold-rule" />
          <p
            className="mt-5 text-center text-sm uppercase tracking-[0.4em] text-accent/85 fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {settings?.tagline ?? "Författare"}
          </p>

          <div
            className="mt-16 grid gap-6 sm:grid-cols-3"
          >
            {tiles.map((t, i) => (
              <Reveal key={t.href} delay={i * 120}>
                <Link href={t.href} className="group block">
                  <p className="tile-label mb-3 text-center font-display text-lg uppercase tracking-wide text-accent sm:text-xl">
                    {t.label}
                  </p>
                  <div className="tile">
                    <SanityImg
                      image={t.image}
                      fallbackSrc={t.fallback}
                      alt={t.label}
                      width={600}
                      height={600}
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Scroll-indikator */}
        <div className="scroll-cue absolute bottom-6 left-1/2 -translate-x-1/2 text-accent/70">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* Böcker */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal className="mb-12 flex items-end justify-between">
            <h2 className="font-display text-3xl text-accent sm:text-4xl">Böcker</h2>
            <Link
              href="/bocker"
              className="text-sm uppercase tracking-wide link-underline text-muted"
            >
              Se alla
            </Link>
          </Reveal>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {displayBooks.map((d, i) => (
              <Reveal key={d.book._id} delay={(i % 4) * 100}>
                <BookCard book={d.book} fallbackCoverSrc={d.fallback} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Aktuellt (teaser) */}
      {latestUpdate && (
        <section>
          <div className="section-divider mx-auto max-w-6xl" />
          <div className="mx-auto max-w-6xl px-6 py-24">
            <Reveal>
              <h2 className="mb-8 font-display text-3xl text-accent sm:text-4xl">
                Aktuellt
              </h2>
              <div className="border-l-2 border-accent pl-6">
                {latestUpdate.date && (
                  <p className="text-sm text-muted">{latestUpdate.date}</p>
                )}
                <h3 className="mt-1 font-display text-2xl">{latestUpdate.title}</h3>
                {latestUpdate.body && (
                  <p className="mt-2 max-w-2xl leading-relaxed text-muted">
                    {latestUpdate.body}
                  </p>
                )}
                <Link
                  href="/aktuellt"
                  className="mt-4 inline-block text-sm uppercase tracking-wide link-underline"
                >
                  Se allt
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
