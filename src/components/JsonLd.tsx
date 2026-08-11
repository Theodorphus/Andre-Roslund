/**
 * Renderar strukturerad data (JSON-LD) som Google läser för att förstå vem
 * André är och vilka böcker han skrivit. Ger bättre chans till rik träff
 * och kunskapspanel vid sökning på hans namn.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Innehållet är vår egen data, inte användarinmatning.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
