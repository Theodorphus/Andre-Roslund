"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Kontaktformulär som postar till /api/contact, vilket skickar mejl via Resend.
 * toEmail används som synlig fallback-länk om något går fel.
 */
export default function ContactForm({ toEmail }: { toEmail: string }) {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, from, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Något gick fel. Försök igen.");
      }

      setStatus("success");
      setName("");
      setFrom("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Något gick fel. Försök igen.",
      );
    }
  };

  const field =
    "w-full border border-line bg-white/[0.02] px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted/70 focus:border-accent focus:bg-white/[0.04] focus:shadow-[0_0_0_3px_rgba(235,189,51,0.12)]";

  if (status === "success") {
    return (
      <div className="border border-accent/40 bg-white/[0.03] px-5 py-6 text-sm">
        <p className="font-display text-lg text-accent">Tack för ditt meddelande!</p>
        <p className="mt-2 text-muted">
          Jag återkommer så snart jag kan.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 link-underline text-accent"
        >
          Skicka ett till
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className={field}
        type="text"
        placeholder="Ditt namn"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={sending}
      />
      <input
        className={field}
        type="email"
        placeholder="Din e-post"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        required
        disabled={sending}
      />
      <textarea
        className={field}
        placeholder="Ditt meddelande"
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        disabled={sending}
      />

      {status === "error" && (
        <p className="text-sm text-red-400">
          {errorMsg}{" "}
          <a href={`mailto:${toEmail}`} className="link-underline">
            Maila mig direkt istället
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="btn-gold px-6 py-3 text-sm uppercase tracking-wide disabled:opacity-60"
      >
        {sending ? "Skickar…" : "Skicka"}
      </button>
    </form>
  );
}
