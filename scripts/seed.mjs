/**
 * Seed-script: fyller Sanity med allt nuvarande innehåll (böcker, omslag,
 * texter, bilder) så André slipper knappa in det manuellt.
 *
 * Körs EN gång efter att Sanity-projektet skapats:
 *   1. Skapa ett write-token i sanity.io/manage (API → Tokens, behörighet "Editor")
 *   2. Lägg i .env.local:
 *        NEXT_PUBLIC_SANITY_PROJECT_ID="..."
 *        NEXT_PUBLIC_SANITY_DATASET="production"
 *        SANITY_API_WRITE_TOKEN="..."
 *   3. node scripts/seed.mjs
 *
 * Idempotent: använder createOrReplace + deterministiska _id, så att köra om
 * scriptet skriver bara över samma dokument (skapar inga dubbletter).
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { config as loadEnv } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Ladda .env.local
loadEnv({ path: join(root, ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || projectId === "placeholder") {
  console.error("✗ Saknar NEXT_PUBLIC_SANITY_PROJECT_ID i .env.local");
  process.exit(1);
}
if (!token) {
  console.error("✗ Saknar SANITY_API_WRITE_TOKEN i .env.local (skapa i sanity.io/manage)");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

const imagesDir = join(root, "public", "images");

/** Laddar upp en bild från /public/images och returnerar en image-referens. */
async function uploadImage(filename) {
  const path = join(imagesDir, filename);
  if (!existsSync(path)) {
    console.warn(`  ⚠ Hittade inte bild: ${filename} (hoppar över)`);
    return undefined;
  }
  const asset = await client.assets.upload("image", readFileSync(path), {
    filename,
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

// --- Innehåll (speglar src/lib/localContent.ts) ---

const books = [
  { id: "book-alsklingsgrabben", title: "Älsklingsgrabben", year: "1999", description: "Andrés debutroman, utgiven på Fischer & Co.", purchaseUrl: "https://nextory.com/se/book/alsklingsgrabben-2719001", cover: "Bok2.webp", order: 1 },
  { id: "book-randerna", title: "Ränderna går aldrig ur", year: "2016", description: "True crime, utgiven på Lind & Co.", purchaseUrl: "https://lindco.se/", cover: "Bok3.jpg", order: 2 },
  { id: "book-adhd", title: "ADHD-bedragaren", year: "2020", description: "Självbiografisk true crime utgiven på Bymarken Förlag.", purchaseUrl: "https://www.boktugg.se/forfattare/315963/", cover: "Bok1.jpg", order: 3 },
  { id: "book-ettliv", title: "Ett liv i missbruk & brott", year: "2022", description: "Självbiografisk berättelse.", purchaseUrl: "https://www.boktugg.se/forfattare/315963/", cover: "Bok4.jpg", order: 4 },
  { id: "book-bekannelser", title: "En bedragares bekännelser", year: "2024", description: "Självbiografisk true crime.", purchaseUrl: "https://www.storytel.com/se/authors/andré-roslund-217565", cover: "Bok5.webp", order: 5 },
  { id: "book-lillaitalien", title: "Lilla Italien", year: "2024", description: "True crime.", purchaseUrl: "https://www.storytel.com/se/authors/andré-roslund-217565", cover: "Bok6.jpg", order: 6 },
  { id: "book-brandbilen", title: "Brandbilen", year: "2024", description: "Novell.", purchaseUrl: "https://www.storytel.com/se/authors/andré-roslund-217565", cover: "Bok7.jpg", order: 7 },
];

const updates = [
  { id: "update-intro", title: "Mina pågående bokprojekt", body: "Att skriva är roligt men också ensamt och kräver tålamod. Jag har en förkärlek för redigeringsarbetet – att slipa texten tills den blir tät och träffsäker. Just nu arbetar jag parallellt med två manus.", date: "2026-06-01" },
  { id: "update-seriemordaren", title: "Den ödmjuke seriemördaren (arbetstitel)", body: "En realistisk spänningsroman som utspelar sig i Stockholm, om en seriemördare och polisens jakt på gärningsmannen.", date: "2026-06-01" },
  { id: "update-rikets-sakerhet", title: "Rikets säkerhet (arbetstitel)", body: "En politisk thriller i militär miljö kring MUST, om hur strategiska och sårbara platser skyddas i händelse av krig.", date: "2026-06-01" },
];

// Hjälpare: gör textstycken till Portable Text-block
const block = (text, style = "normal") => ({
  _type: "block",
  _key: Math.random().toString(36).slice(2, 10),
  style,
  markDefs: [],
  children: [{ _type: "span", _key: Math.random().toString(36).slice(2, 10), text, marks: [] }],
});

const aboutText = [
  block("Jag är en livsnjutare som drivs av konst, kreativitet och det skrivna ordet."),
  block("Mitt liv rör sig mellan kontraster. Ena dagen suger jag in Stockholms pulserande tempo, för att nästa dag finna det totala lugnet i Kungsör. Det är där, på kajkanten med dinglande ben eller framför ett staffli, som jag sorterar alla intryck och idéer som snurrar i skallen."),
  block("Jag älskar att observera min omgivning. Att sitta på ett tåg med en bra bok, dricka en kopp kaffe och titta på människor som stressar förbi är en stor inspirationskälla. Likaså att ta en båtresa ut i Stockholms skärgård – det är som att kliva rakt tillbaka i tiden."),
  block("🎨 Konst och samlande", "h3"),
  block("Mitt eget konstintresse blommar extra mycket under sommarmånaderna då jag gärna besöker sommarutställningar. Jag inspireras enormt av att se alla fantastiska verk av landets många duktiga amatörmålare."),
  block("I min privata samling hittar man främst verk av Bengt Lindström och Bengt Åberg. Jag har även en stor förkärlek för Lennart Jirlows konst. Utöver det köper jag gärna prisvärd djurkonst via auktioner, vilket jag anser är det absolut bekvämaste sättet att handla konst på."),
  block("Sedan 30 år tillbaka är jag också djupt fascinerad av det samiska hantverket. Jag är helt frälst i samisk slöjd och hyser en enorm beundran för Tore Sunna och släkten Fankkis fantastiska slöjdande."),
  block("📚 Min passion för böcker", "h3"),
  block("Både mitt läsande och skrivande går i perioder. Ibland blir jag så helt uppslukad av en bok att vardagens bekymmer helt glöms bort. Jag är ständigt på jakt efter den perfekta boken, även om det finns alldeles för många fantastiska verk för att bara välja ut ett enda."),
];

const meaningBody = [
  block("Det finns ingen universell regel för vad som är meningen med livet. Kanske finns det inte ens någon agenda, med tanke på att människan kom till efter istiden för tiotusen år sedan. För somliga är det att finna Jesus, för andra att reproducera sig. Länder emellan tycks ibland vilja eliminera befolkningar med kärnvapen och avancerad krigsmateriel."),
  block("Tänk om villkorslös kärlek rådde. En värld där du blir bedömd för dina handlingar och inte för hur många Rolex-klockor du äger. Ett mänskligt samhälle där rasism, hat och missunnsamhet inte ens finns i ordboken – en utopi, liksom att pedofili inte skulle existera."),
  block("Den sanna rikedomen", "h3"),
  block("Själv älskar jag att njuta, känna mig tillfreds, trygg och fri. Att se mina barn växa upp, där karriär och ekonomiska vinstintressen inte står i fokus. Jag älskar Moder jord och dess natur: eld och vatten, mat och musik, klippor och vind, mänskliga interaktioner och humor."),
  block("Att skjuta ut ekan i skymningen, ankra och hälla upp en kopp kaffe. Se på när sonen slänger ut metreven och håller ett öga på flötet som guppar. Upplevelsen när pojken drar upp abborrar. Att få äta en ostsmörgås till naturens egna ljud – kluckandet mot ekan, en uggla som hoar och fiskar som hoppar och leker i sjön."),
  block("Det tror jag är meningen med livet."),
  block("Att lämna vidare", "h3"),
  block("Efter att ha fått uppleva denna rikedom kan jag en dag dra upp årorna, se grillröken lägga sig och bege mig ovan molnen. Inga skulder att reglera, ingen sorg att bära på. Jag kan hälsa mina polare att jag inte var en dålig människa, fastän jag ibland navigerade på smala vägar."),
  block("Min högsta önskan är att min pojk väljer andra, bredare vägar – och att han får uppleva den rikedom jag trots allt har haft."),
];

// "Möten som berikar" – rubriker (h3) + stycken, speglar localContent.
const meetingsBody = [
  block("Möten som berikar – och lugnet efteråt", "h3"),
  block("Att berika sig kulturellt, träffa färgstarka människor och ha intressanta utbyten behöver varken vara krystat eller kostsamt. Det är när de här stunderna ges som jag mår som bäst. De dyker upp helt oplanerat och går aldrig att förutspå. Dessa oväntade möten är verkligen livets små guldkorn."),
  block("Cirklar som sluts", "h3"),
  block("Ett sådant möte skedde för över tio år sedan. Jag hamnade av en slump i ett samtal med en äldre farbror. Det visade sig att han var konstkritiker och målare, och han hade känt konstnären Bengt Lindström och till och med skrivit en bok om honom. Vi pratade länge om hur Bengt var som person och delade anekdoter från deras liv."),
  block("Långt senare fick jag en bok av en medintagen på fängelset. Han sträckte över den och sa: “Här, läs den. Jag har gjort en del affärer med honom.” Boken hette Ursäkta, mitt namn är Broman och är en riktigt bra skildring av hur en vanlig företagare drar igång en amfetaminverkstad – berättelsen som sedan blev filmen Himlen är oskyldigt blå."),
  block("Det otroliga är att jag för bara en vecka sedan började småprata med en herre om litteratur. Det visade sig att han kände just Fleming Broman. Cirkeln var sluten."),
  block("Färgstarka möten och oväntade bekantskaper", "h3"),
  block("En annan person som betytt mycket för mig är författaren och debattören Lasse Strömstedt. Honom har jag haft äran att träffa, likaså redaktören som Lasse anlitade."),
  block("Dagen efter det mötet sprang jag av en ren slump på en person som visade sig vara bästa kompis med “Tjock-Steffe” (Stefan Eriksson), och jag fick Steffes bok av honom. Jag känner inte Tjock-Steffe personligen, men jag träffade honom för första gången 1991 i Stockholm. Sedan hade jag med honom att göra igen runt 2016. Han kom fram till mig på ett hotell i Stockholm och hävdade att jag var skyldig pengar som han nu tagit över. Just då trodde jag att han skulle slå ihjäl mig, men det reddes ut på ett bra sätt."),
  block("Jag dras inte medvetet till kriminella kretsar, men ibland korsas våra vägar ändå. Som när jag helt oplanerat sprang på en polismördare. Det var ett märkligt men intressant möte – det hade gått 27 år sedan vi senast sågs inne på Tidaholmsfängelset."),
  block("Från statsministrar till flygplansdrama", "h3"),
  block("Genom åren har jag även sprungit på politiska profiler som Stefan Löfven och Håkan Juholt. Juholt visade sig vara en riktigt trevlig och skön lirare. Löfven däremot har jag svårare för. Jag kan ärligt talat inte förstå hur han kunde bli statsminister, då han i mitt tycke varken kunde räkna eller diskutera ordentligt. Men när jag besökte Riksdagen sprang jag i alla fall inte på någon politiker som provocerade mig tillräckligt för att jag skulle vilja ge dem på truten. De politiska debatterna, som Eskil Erlandssons märkliga utläggningar om vad som räknas som sexuellt nyttjande av djur, visar ju bara hur bisarr den världen kan vara."),
  block("Mitt roligaste flygplansminne var när jag fick en sittplats bredvid den tidigare länspolismästaren Carin Götblad."),
  block("– Jag sitter inte på den platsen, sa jag till flygvärdinnan."),
  block("– Varför då? frågade hon förvånat."),
  block("– Hon är kriminell, jag vägrar sitta bredvid henne, svarade jag – med tanke på det så kallade Gotlandsärendet 2020."),
  block("De jag helst undviker", "h3"),
  block("Det finns två personer som jag i och för sig skulle vilja träffa, men samtidigt är jag glad att det inte blivit så. Jag vet nämligen inte om jag skulle kunna behärska mig från att bli fysisk."),
  block("Den ena är den förre Justitiekanslern Göran Lambertz. Den andra är Christer van der Kwast. Den senare borde enligt min mening avtjäna ett långt fängelsestraff för hur han drev processen och lyckades fälla Thomas Quick. Både van der Kwast och Lambertz hävdar ju än idag att Sture Bergwall troligen är skyldig. Jag vet inte vem av dem som agerat dummast, men troligen van der Kwast. Lambertz har i alla fall humor, även om den sitter på fel ställe. Och så gillar han ju att dricka årgångswhisky."),
  block("Min sanna livsstil", "h3"),
  block("Men trots alla dessa färgstarka möten ute i världen är min sanna livsstil ganska lugn. Jag behöver inte ständigt vara i fokus eller ha folk omkring mig, även om det ofta berikar."),
  block("Jag trivs allra bäst med att ligga i en skön soffa med datorn, TV:n och ett gäng böcker som jag lånat på biblioteket. Många nya böcker idag är så förutsägbara; alla har en liknande stil och vi försöker bli så amerikaniserade som möjligt, både inom film och litteratur."),
  block("När tempot blir för högt drar jag mig hellre undan. Nybryggt kaffe, ett gott bakverk, ett glas iskall mjölk och så en snus förstås – det räcker för mig. Det är nästan en religiös upplevelse."),
];

async function run() {
  console.log(`Seedar Sanity-projekt "${projectId}" (dataset: ${dataset})...\n`);

  // 1) Böcker med omslag
  console.log("Laddar upp bokomslag och skapar böcker...");
  for (const b of books) {
    const cover = await uploadImage(b.cover);
    await client.createOrReplace({
      _id: b.id,
      _type: "book",
      title: b.title,
      year: b.year,
      description: b.description,
      purchaseUrl: b.purchaseUrl,
      order: b.order,
      ...(cover ? { cover } : {}),
    });
    console.log(`  ✓ ${b.title}`);
  }

  // 2) Aktuellt
  console.log("\nSkapar Aktuellt-inlägg...");
  for (const u of updates) {
    await client.createOrReplace({
      _id: u.id,
      _type: "update",
      title: u.title,
      body: u.body,
      date: u.date,
    });
    console.log(`  ✓ ${u.title}`);
  }

  // 3) Sidinställningar (singleton) med bilder
  console.log("\nLaddar upp sidbilder och skapar sidinställningar...");
  const [heroImage, tileBooks, tileAbout, tileUpdates, portrait] = await Promise.all([
    uploadImage("Hero.png"),
    uploadImage("Tile1-Books.png"),
    uploadImage("Tile2- About me.png"),
    uploadImage("Tile3 - Aktuellt.png"),
    uploadImage("Portrait-andre.jpg"),
  ]);
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    name: "André Roslund",
    tagline: "Författare",
    aboutHeading: "Om mig",
    aboutText,
    email: "andreroslund@outlook.com",
    phone: "076-286 81 43",
    youtubeUrl: "https://www.youtube.com/@andreroslund1366",
    facebookUrl: "https://www.facebook.com/profile.php?id=100074433578866",
    ...(heroImage ? { heroImage } : {}),
    ...(tileBooks ? { tileBooks } : {}),
    ...(tileAbout ? { tileAbout } : {}),
    ...(tileUpdates ? { tileUpdates } : {}),
    ...(portrait ? { portrait } : {}),
  });
  console.log("  ✓ Sidinställningar");

  // 4) Meningen med livet (singleton)
  console.log("\nSkapar Meningen med livet...");
  await client.createOrReplace({
    _id: "meaningOfLife",
    _type: "meaningOfLife",
    title: "Meningen med livet",
    body: meaningBody,
  });
  console.log("  ✓ Meningen med livet");

  // 5) Möten som berikar (singleton)
  console.log("\nSkapar Möten som berikar...");
  await client.createOrReplace({
    _id: "meetings",
    _type: "meetings",
    title: "Möten som berikar",
    body: meetingsBody,
  });
  console.log("  ✓ Möten som berikar");

  console.log("\n✓ Klart! Allt innehåll finns nu i Sanity. André kan logga in på /studio och redigera.");
}

run().catch((err) => {
  console.error("\n✗ Seed misslyckades:", err.message || err);
  process.exit(1);
});
