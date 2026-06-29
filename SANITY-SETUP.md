# Sanity-uppkoppling – checklista

Allt i koden är klart (scheman, Studio på `/studio`, seed-script). Det som
återstår kräver inloggning och görs av dig. Tar ~10 minuter.

## 1. Skapa Sanity-projektet (engångs)

```bash
npx sanity@latest login      # öppnar webbläsare, logga in med Google/GitHub
npx sanity@latest init        # i projektmappen
```

Vid `init`:
- Välj **Create new project**, namn t.ex. `andre-roslund`
- Dataset: **production** (default, publik läsning)
- Om den frågar om att lägga till config/skriva filer: svara **nej** – vi har
  redan all kod. Du behöver bara **Project ID:t** som skrivs ut.

## 2. Fyll i .env.local

Skapa/öppna `.env.local` (utgå från `.env.local.example`):

```
NEXT_PUBLIC_SANITY_PROJECT_ID="<project-id från steg 1>"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-10-01"
SANITY_API_WRITE_TOKEN="<token från steg 3>"
```

## 3. Skapa ett write-token

- Gå till https://sanity.io/manage → ditt projekt → **API** → **Tokens**
- **Add API token**, namn `seed`, behörighet **Editor**
- Kopiera värdet till `SANITY_API_WRITE_TOKEN` i `.env.local`
  (detta token ska INTE in i Vercel – det används bara lokalt för seed)

## 4. Fyll Sanity med allt innehåll (engångs)

```bash
npm run seed
```

Detta laddar upp alla 7 bokomslag, hero/tiles/porträtt och skapar böcker,
Aktuellt-inlägg, Om mig-texten och Meningen med livet automatiskt.
(Idempotent – tryggt att köra om.)

## 5. CORS – tillåt sajten att läsa

I https://sanity.io/manage → **API** → **CORS origins**, lägg till:
- `http://localhost:3000`
- `https://andre-roslund.vercel.app`
- `https://andre-roslund.se` (när domänen är ompekad)

## 6. Lägg env-vars i Vercel

I Vercel → projektet **andre-roslund** → **Settings → Environment Variables**,
lägg till (Production + Preview):
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` = `production`
- `NEXT_PUBLIC_SANITY_API_VERSION` = `2024-10-01`

Lägg INTE in write-token i Vercel. Redeploya sedan (Deployments → … → Redeploy).

## 7. Bjud in André

I https://sanity.io/manage → **Members** → bjud in André (hans e-post) som
**Editor**. Då kan han logga in på `https://andre-roslund.se/studio` och själv
redigera böcker, texter och bilder.

---

**Bra att veta:** Sidorna läser från Sanity och faller tillbaka på det inbyggda
innehållet om Sanity saknas/strular – sidan kan aldrig "gå sönder" pga CMS.
Ändringar i Studion slår igenom på live-sajten inom ~60 sekunder (ISR).
