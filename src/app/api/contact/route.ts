import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSettings } from "@/sanity/lib/queries";
import { localProfile } from "@/lib/localContent";

export const runtime = "nodejs";

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.CONTACT_FROM_EMAIL;

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  if (!resendApiKey || !fromEmail) {
    console.error("Saknar RESEND_API_KEY eller CONTACT_FROM_EMAIL");
    return NextResponse.json(
      { error: "E-posttjänsten är inte konfigurerad." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  }

  const { name, from, message, subject } = (body ?? {}) as {
    name?: string;
    from?: string;
    message?: string;
    subject?: string;
  };

  const cleanName = name?.trim();
  const cleanFrom = from?.trim();
  const cleanMessage = message?.trim();
  const cleanSubject = typeof subject === "string" ? subject.trim() : "";

  if (!cleanName || !cleanFrom || !cleanMessage) {
    return NextResponse.json(
      { error: "Fyll i namn, e-post och meddelande." },
      { status: 400 },
    );
  }

  if (!isEmail(cleanFrom)) {
    return NextResponse.json(
      { error: "Ange en giltig e-postadress." },
      { status: 400 },
    );
  }

  const settings = await getSettings();
  const toEmail = settings?.email ?? localProfile.email;

  const resend = new Resend(resendApiKey);

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: cleanFrom,
      subject: cleanSubject
        ? `${cleanSubject} – från ${cleanName}`
        : `Meddelande från ${cleanName} via hemsidan`,
      text: `${cleanSubject ? `Gäller: ${cleanSubject}\n\n` : ""}${cleanMessage}\n\n— ${cleanName} (${cleanFrom})`,
    });

    if (error) {
      console.error("Resend-fel:", error);
      return NextResponse.json(
        { error: "Kunde inte skicka meddelandet. Försök igen." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Oväntat fel vid utskick:", err);
    return NextResponse.json(
      { error: "Kunde inte skicka meddelandet. Försök igen." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
