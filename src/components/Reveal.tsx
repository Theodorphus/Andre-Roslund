"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  /** Fördröjning i ms för stagger-effekt. */
  delay?: number;
  /** Riktning på inglidning. */
  direction?: "up" | "down" | "none";
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Avslöjar innehåll med en mjuk fade + slide när det glider in i vyn.
 * Respekterar prefers-reduced-motion (visar då direkt utan animation).
 */
export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Visa direkt om användaren vill ha mindre rörelse, eller om
    // IntersectionObserver saknas (äldre webbläsare).
    if (reduce || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const reveal = () => setVisible(true);

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          obs.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" },
    );
    obs.observe(el);

    // Säkerhetsnät: om elementet av någon anledning aldrig observeras som
    // synligt (t.ex. layout som gör att observern inte triggar) – visa ändå
    // efter en kort stund så att innehåll aldrig blir permanent osynligt.
    const fallback = window.setTimeout(reveal, 1200);

    return () => {
      obs.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const offset =
    direction === "up"
      ? "translateY(28px)"
      : direction === "down"
        ? "translateY(-28px)"
        : "none";

  // Brett typad polymorf tagg så att as="header"/"article" m.m. fungerar.
  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : offset,
        transition:
          "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Component>
  );
}
