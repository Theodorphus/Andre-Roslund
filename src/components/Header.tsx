"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Hem" },
  { href: "/bocker", label: "Böcker" },
  { href: "/aktuellt", label: "Aktuellt" },
  { href: "/forelasning", label: "Föreläsning" },
  { href: "/moten-som-berikar", label: "Möten som berikar" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header({ name = "André Roslund" }: { name?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-line bg-[var(--background)]/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <Link
          href="/"
          className="font-display text-sm uppercase tracking-[0.2em] text-accent transition-colors hover:text-[var(--accent-soft)]"
          onClick={() => setOpen(false)}
        >
          {name}
        </Link>

        <nav className="hidden gap-8 text-sm uppercase tracking-wide md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="link-underline text-foreground/80 transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Meny"
          className="group md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-px w-7 bg-accent transition-all duration-300 ${
              open ? "translate-y-[5px] rotate-45" : ""
            }`}
          />
          <span
            className={`mt-1.5 block h-px w-7 bg-accent transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`mt-1.5 block h-px w-7 bg-accent transition-all duration-300 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobilmeny */}
      <nav
        className={`overflow-hidden bg-[var(--footer-bg)]/95 px-6 text-sm uppercase tracking-wide backdrop-blur-md transition-all duration-400 md:hidden ${
          open ? "max-h-72 py-5" : "max-h-0 py-0"
        }`}
      >
        <div className="flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-foreground/80 hover:text-accent"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
