/**
 * Tillfälligt, lokalt innehåll som visas tills Sanity är uppkopplat och André
 * fyller på själv. Bilderna ligger i /public/images. När motsvarande fält finns
 * i Sanity används det istället.
 *
 * Innehållet bygger på materialet André skickade (böcker, länkar, kontakt).
 */

export const localImages = {
  hero: "/images/Hero.png",
  tileBooks: "/images/Tile1-Books.png",
  tileAbout: "/images/Tile2- About me.png",
  tileUpdates: "/images/Tile3 - Aktuellt.png",
  portrait: "/images/Portrait-andre.jpg",
} as const;

/** Kontakt- och profiluppgifter (platshållare tills Sanity fylls). */
/** En sektion i Om mig: valfri rubrik, brödtext och/eller punktlista. */
export interface AboutSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export const localProfile = {
  name: "André Roslund",
  tagline: "Författare",
  aboutHeading: "Om mig",
  // Andrés egen text. Lede + strukturerade sektioner.
  aboutIntro: [
    "Jag är en livsnjutare som drivs av konst, kreativitet och det skrivna ordet.",
    "Mitt liv rör sig mellan kontraster. Ena dagen suger jag in Stockholms pulserande tempo, för att nästa dag finna det totala lugnet i Kungsör. Det är där, på kajkanten med dinglande ben eller framför ett staffli, som jag sorterar alla intryck och idéer som snurrar i skallen.",
    "Jag älskar att observera min omgivning. Att sitta på ett tåg med en bra bok, dricka en kopp kaffe och titta på människor som stressar förbi är en stor inspirationskälla. Likaså att ta en båtresa ut i Stockholms skärgård – det är som att kliva rakt tillbaka i tiden.",
  ],
  aboutSections: [
    {
      heading: "🎨 Konst och samlande",
      paragraphs: [
        "Mitt eget konstintresse blommar extra mycket under sommarmånaderna då jag gärna besöker sommarutställningar. Jag inspireras enormt av att se alla fantastiska verk av landets många duktiga amatörmålare.",
        "I min privata samling hittar man främst verk av Bengt Lindström och Bengt Åberg. Jag har även en stor förkärlek för Lennart Jirlows konst. Utöver det köper jag gärna prisvärd djurkonst via auktioner, vilket jag anser är det absolut bekvämaste sättet att handla konst på.",
        "Sedan 30 år tillbaka är jag också djupt fascinerad av det samiska hantverket. Jag är helt frälst i samisk slöjd och hyser en enorm beundran för Tore Sunna och släkten Fankkis fantastiska slöjdande.",
      ],
    },
    {
      heading: "📚 Min passion för böcker",
      paragraphs: [
        "Både mitt läsande och skrivande går i perioder. Ibland blir jag så helt uppslukad av en bok att vardagens bekymmer helt glöms bort. Jag är ständigt på jakt efter den perfekta boken, även om det finns alldeles för många fantastiska verk för att bara välja ut ett enda.",
        "Några böcker som har präglat mig extra djupt och satt outplånliga spår är:",
      ],
      list: [
        "Pojken som kallades Det – Dave Pelzer",
        "Inte utan min dotter – Betty Mahmoody",
        "Ursäkta, mitt namn är Broman – Hannes Holm (filmatiserad som Himlen är oskyldigt blå)",
      ],
    },
  ] as AboutSection[],
  email: "andreroslund@outlook.com",
  phone: "076-286 81 43",
  facebookUrl: "https://www.facebook.com/profile.php?id=100074433578866",
  youtubeUrl: "https://www.youtube.com/@andreroslund1366",
} as const;

/**
 * Andrés text "Meningen med livet" – egen sida som länkas från Om mig.
 * Strukturerad i sektioner med valfri rubrik.
 */
export const meaningOfLife = {
  title: "Meningen med livet",
  sections: [
    {
      paragraphs: [
        "Det finns ingen universell regel för vad som är meningen med livet. Kanske finns det inte ens någon agenda, med tanke på att människan kom till efter istiden för tiotusen år sedan. För somliga är det att finna Jesus, för andra att reproducera sig. Länder emellan tycks ibland vilja eliminera befolkningar med kärnvapen och avancerad krigsmateriel.",
        "Tänk om villkorslös kärlek rådde. En värld där du blir bedömd för dina handlingar och inte för hur många Rolex-klockor du äger. Ett mänskligt samhälle där rasism, hat och missunnsamhet inte ens finns i ordboken – en utopi, liksom att pedofili inte skulle existera.",
      ],
    },
    {
      heading: "Den sanna rikedomen",
      paragraphs: [
        "Själv älskar jag att njuta, känna mig tillfreds, trygg och fri. Att se mina barn växa upp, där karriär och ekonomiska vinstintressen inte står i fokus. Jag älskar Moder jord och dess natur: eld och vatten, mat och musik, klippor och vind, mänskliga interaktioner och humor.",
        "Att skjuta ut ekan i skymningen, ankra och hälla upp en kopp kaffe. Se på när sonen slänger ut metreven och håller ett öga på flötet som guppar. Upplevelsen när pojken drar upp abborrar. Att få äta en ostsmörgås till naturens egna ljud – kluckandet mot ekan, en uggla som hoar och fiskar som hoppar och leker i sjön.",
        "Det tror jag är meningen med livet.",
      ],
    },
    {
      heading: "Att lämna vidare",
      paragraphs: [
        "Efter att ha fått uppleva denna rikedom kan jag en dag dra upp årorna, se grillröken lägga sig och bege mig ovan molnen. Inga skulder att reglera, ingen sorg att bära på. Jag kan hälsa mina polare att jag inte var en dålig människa, fastän jag ibland navigerade på smala vägar.",
        "Min högsta önskan är att min pojk väljer andra, bredare vägar – och att han får uppleva den rikedom jag trots allt har haft.",
      ],
    },
  ] as AboutSection[],
} as const;

/** Tillfälliga "Aktuellt"-inlägg (Andrés pågående bokprojekt). */
export interface LocalUpdate {
  _id: string;
  title: string;
  date?: string;
  body: string;
}

export const localUpdates: LocalUpdate[] = [
  {
    _id: "update-intro",
    title: "Mina pågående bokprojekt",
    body: "Att skriva är fantastiskt roligt och inspirerande, men det kan också vara ensamt och kräva stort tålamod. Jag har en stor förkärlek för själva redigeringsarbetet – att slipa på texten tills den blir slagfärdig, tät och träffsäker. Söker man snabba kickar är författaryrket inget att rekommendera. Just nu arbetar jag parallellt med två olika manus.",
  },
  {
    _id: "update-seriemordaren",
    title: "Den ödmjuke seriemördaren (arbetstitel)",
    body: "En spänningsroman med hög realistisk förankring som utspelar sig i Stockholm. Berättelsen följer en seriemördare som härjar i huvudstaden och polisens intensiva jakt på att stoppa gärningsmannen.",
  },
  {
    _id: "update-rikets-sakerhet",
    title: "Rikets säkerhet (arbetstitel)",
    body: "En politisk thriller i militär miljö. Handlingen kretsar kring MUST (Militära underrättelse- och säkerhetstjänsten) och handlar om hur strategiska och sårbara platser skyddas i händelse av krig.",
  },
];

export interface LocalBook {
  _id: string;
  title: string;
  year?: string;
  description?: string;
  coverSrc: string;
  purchaseUrl?: string;
}

export const localBooks: LocalBook[] = [
  {
    _id: "local-adhd",
    title: "ADHD-bedragaren",
    year: "2020",
    description:
      "Självbiografisk true crime utgiven på Bymarken Förlag.",
    coverSrc: "/images/Bok1.jpg",
    purchaseUrl: "https://www.boktugg.se/forfattare/315963/",
  },
  {
    _id: "local-alsklingsgrabben",
    title: "Älsklingsgrabben",
    year: "1999",
    description:
      "Andrés debutroman, utgiven på Fischer & Co.",
    coverSrc: "/images/Bok2.webp",
    purchaseUrl:
      "https://nextory.com/se/book/alsklingsgrabben-2719001",
  },
  {
    _id: "local-randerna",
    title: "Ränderna går aldrig ur",
    year: "2016",
    description: "True crime, utgiven på Lind & Co.",
    coverSrc: "/images/Bok3.jpg",
    purchaseUrl: "https://lindco.se/",
  },
  {
    _id: "local-ettliv",
    title: "Ett liv i missbruk & brott",
    year: "2022",
    description: "Självbiografisk berättelse.",
    coverSrc: "/images/Bok4.jpg",
    purchaseUrl: "https://www.boktugg.se/forfattare/315963/",
  },
  {
    _id: "local-bekannelser",
    title: "En bedragares bekännelser",
    year: "2024",
    description: "Självbiografisk true crime.",
    coverSrc: "/images/Bok5.webp",
    purchaseUrl: "https://www.storytel.com/se/authors/andré-roslund-217565",
  },
  {
    _id: "local-lillaitalien",
    title: "Lilla Italien",
    year: "2024",
    description: "True crime.",
    coverSrc: "/images/Bok6.jpg",
    purchaseUrl: "https://www.storytel.com/se/authors/andré-roslund-217565",
  },
  {
    _id: "local-brandbilen",
    title: "Brandbilen",
    year: "2024",
    description: "Novell.",
    coverSrc: "/images/Bok7.jpg",
    purchaseUrl: "https://www.storytel.com/se/authors/andré-roslund-217565",
  },
];
