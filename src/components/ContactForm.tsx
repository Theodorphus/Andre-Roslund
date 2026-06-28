"use client";

import { useState } from "react";

/**
 * Enkelt kontaktformulär utan backend: öppnar besökarens mejlklient
 * med ifylld text via mailto. Fungerar direkt på Vercel/Loopia utan server.
 */
export default function ContactForm({ toEmail }: { toEmail: string }) {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Meddelande från ${name || "hemsidan"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${from ? ` (${from})` : ""}`,
    );
    window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full border border-line bg-white/[0.02] px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted/70 focus:border-accent focus:bg-white/[0.04] focus:shadow-[0_0_0_3px_rgba(235,189,51,0.12)]";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className={field}
        type="text"
        placeholder="Ditt namn"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className={field}
        type="email"
        placeholder="Din e-post"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        required
      />
      <textarea
        className={field}
        placeholder="Ditt meddelande"
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button
        type="submit"
        className="btn-gold px-6 py-3 text-sm uppercase tracking-wide"
      >
        Skicka
      </button>
    </form>
  );
}
