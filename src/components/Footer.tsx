import Link from "next/link";
import type { SiteSettings } from "@/sanity/lib/queries";

export default function Footer({ settings }: { settings: SiteSettings | null }) {
  const name = settings?.name ?? "André Roslund";
  const email = settings?.email ?? "andreroslund@outlook.com";
  const youtube =
    settings?.youtubeUrl ?? "https://www.youtube.com/@andreroslund1366";

  const socials = [
    { href: youtube, label: "YouTube" },
    settings?.instagramUrl && {
      href: settings.instagramUrl,
      label: "Instagram",
    },
    settings?.facebookUrl && { href: settings.facebookUrl, label: "Facebook" },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <footer className="mt-auto bg-[var(--footer-bg)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-3">
        <div>
          <p className="font-display text-3xl uppercase leading-tight text-accent">
            {name}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-accent/70">
            Författaren {name}. Upptäck mina böcker och följ vad jag arbetar med
            just nu.
          </p>
        </div>

        <div className="text-sm">
          <p className="mb-4 font-display text-lg uppercase tracking-wide text-accent">
            Snabblänkar
          </p>
          <ul className="space-y-2.5 text-muted">
            <li><Link href="/" className="hover:text-accent">Hem</Link></li>
            <li><Link href="/bocker" className="hover:text-accent">Böcker</Link></li>
            <li><Link href="/aktuellt" className="hover:text-accent">Aktuellt</Link></li>
            <li><Link href="/kontakt" className="hover:text-accent">Kontakt</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="mb-4 font-display text-lg uppercase tracking-wide text-accent">
            Sociala länkar
          </p>
          <div className="flex flex-wrap gap-4 text-muted">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                {s.label}
              </a>
            ))}
          </div>
          <p className="mt-6 text-muted">
            Mejla mig:{" "}
            <a href={`mailto:${email}`} className="text-accent hover:underline">
              {email}
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-line/40 py-5 text-center text-xs text-muted/70">
        © {new Date().getFullYear()} {name}
      </div>
    </footer>
  );
}
