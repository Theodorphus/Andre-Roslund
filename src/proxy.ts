import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Sidan är pausad på kundens begäran. Sätt till false för att öppna den igen.
const SITE_PAUSED = true;

const html = `<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Under uppbyggnad | André Roslund</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&family=Inter:wght@400&display=swap" rel="stylesheet">
<style>
  html, body { height: 100%; margin: 0; }
  body {
    background: #0a0e18;
    color: #f3eee2;
    font-family: Inter, system-ui, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 16px;
    -webkit-font-smoothing: antialiased;
  }
  main { max-width: 32rem; }
  .name {
    font-family: "Playfair Display", Georgia, serif;
    font-size: clamp(2rem, 6vw, 3rem);
    font-weight: 500;
    margin: 0;
  }
  .line { width: 3rem; height: 1px; background: #ebbd33; margin: 1.5rem auto; }
  p { color: #b9b3a3; line-height: 1.6; margin: 0; }
  .status { color: #ebbd33; letter-spacing: 0.2em; text-transform: uppercase; font-size: 0.8rem; margin-bottom: 0.75rem; }
</style>
</head>
<body>
<main>
  <h1 class="name">André Roslund</h1>
  <div class="line"></div>
  <p class="status">Under uppbyggnad</p>
  <p>Sidan är tillfälligt stängd medan vi arbetar med den. Välkommen tillbaka snart!</p>
</main>
</body>
</html>`;

export function proxy(_request: NextRequest) {
  if (!SITE_PAUSED) return NextResponse.next();

  // 503 + Retry-After talar om för Google att det är tillfälligt,
  // så att sidan inte avindexeras eller indexeras med denna text.
  return new NextResponse(html, {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "retry-after": "86400",
      "cache-control": "no-store",
    },
  });
}

export const config = {
  // Studio och API ska fortsätta fungera, liksom statiska filer.
  matcher: [
    "/((?!studio|api|_next/static|_next/image|icon|opengraph-image|.*\\..*).*)",
  ],
};
