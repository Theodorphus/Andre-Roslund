import type { Metadata } from "next";
import { getBooks } from "@/sanity/lib/queries";
import BookCard from "@/components/BookCard";
import Reveal from "@/components/Reveal";
import { localBooks } from "@/lib/localContent";

export const metadata: Metadata = {
  title: "Böcker",
  description: "Böcker av författaren André Roslund.",
};

export default async function BooksPage() {
  const books = await getBooks();
  const useLocalBooks = books.length === 0;
  const displayBooks = useLocalBooks
    ? localBooks.map((b) => ({
        book: { _id: b._id, title: b.title, year: b.year, description: b.description },
        fallback: b.coverSrc,
      }))
    : books.map((b) => ({ book: b, fallback: undefined }));

  return (
    <section className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <Reveal as="header" className="mb-14 max-w-2xl">
        <h1 className="hero-name font-display text-4xl sm:text-5xl">Böcker</h1>
        <div className="mt-5 h-px w-24 bg-[linear-gradient(90deg,var(--accent),transparent)]" />
        <p className="mt-5 text-muted">
          Ett urval av mina böcker. Klicka för att läsa mer eller köpa.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-4">
        {displayBooks.map((d, i) => (
          <Reveal key={d.book._id} delay={(i % 4) * 100}>
            <BookCard book={d.book} fallbackCoverSrc={d.fallback} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
