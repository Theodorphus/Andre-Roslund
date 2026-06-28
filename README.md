# André Roslund – författarhemsida

Next.js (App Router, TypeScript, Tailwind v4) + Sanity CMS. Designen är inspirerad
av reginalundart.se: ljus, varm bakgrund, stort serif-namn och ett rent galleri.

André kan själv redigera innehåll (böcker, texter, bilder) via Sanity Studio på
`/studio`. Du (Webbdev Studio) kan också lägga in materialet åt honom.

## Komma igång lokalt

```bash
npm install
npm run dev          # http://localhost:3000
```

Studio (CMS) ligger på http://localhost:3000/studio

## Koppla Sanity (görs en gång)

Sidan funkar med platshållare även utan Sanity, men för riktigt innehåll:

1. Skapa ett gratis Sanity-projekt:
   ```bash
   npx sanity@latest init
   ```
   Välj "production" som dataset. Notera **Project ID**.
2. Fyll i `.env.local` (utgå från `.env.local.example`):
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID="<ditt-project-id>"
   NEXT_PUBLIC_SANITY_DATASET="production"
   NEXT_PUBLIC_SANITY_API_VERSION="2024-10-01"
   ```
3. Bjud in André som medlem i Sanity-projektet (sanity.io/manage) så han kan
   logga in på `/studio` och redigera själv.
4. I Sanity-projektets API-inställningar: lägg till sidans URL under **CORS origins**
   (t.ex. `https://andre-roslund.se` och `http://localhost:3000`).

## Innehåll (i /studio)

- **Sidinställningar** – namn, undertitel, hero-bild, porträtt, om-text, kontakt,
  YouTube/Instagram/Facebook. (Ett enda dokument.)
- **Böcker** – titel, omslag, år, beskrivning, köp-länk, sorteringsordning. (6–8 st.)
- **Aktuellt** – inlägg om vad André arbetar med just nu.

Bilder som inte lagts upp ännu visas som diskreta platshållare ("BILD").

## Driftsättning

1. **Deploya till Vercel** (frontend + Studio):
   - Pusha till GitHub och importera i Vercel, eller kör `vercel`.
   - Lägg in samma miljövariabler i Vercel som i `.env.local`.
2. **Peka om domänen** `andre-roslund.se` (ligger hos **Loopia**):
   - Lägg till domänen i Vercel-projektet.
   - I Loopias DNS: peka A-record/CNAME enligt Vercels instruktioner.
   - Den gamla WordPress-sidan kan ligga kvar tills DNS är ompekad.

## Struktur

```
src/
  app/
    (site)/            # Publika sidor med header/footer
      page.tsx         # Startsida (hero, böcker, om, aktuellt)
      bocker/          # Alla böcker
      aktuellt/        # Aktuellt-inlägg
      kontakt/         # Om mig + kontakt + formulär
    studio/            # Sanity Studio (/studio)
    layout.tsx         # Typsnitt + global metadata
    globals.css        # Designsystem (färger, typsnitt)
  components/          # Header, Footer, BookCard, SanityImg, ContactForm
  sanity/              # Klient, scheman, queries, env
```
