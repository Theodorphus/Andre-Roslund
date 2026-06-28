import type { Book } from "@/sanity/lib/queries";
import SanityImg from "./SanityImg";

export default function BookCard({
  book,
  fallbackCoverSrc,
}: {
  book: Book;
  fallbackCoverSrc?: string;
}) {
  return (
    <article className="group flex flex-col">
      <div className="tile !aspect-[2/3]">
        <SanityImg
          image={book.cover}
          fallbackSrc={fallbackCoverSrc}
          alt={`Omslag: ${book.title}`}
          width={400}
          height={600}
          sizes="(max-width: 640px) 50vw, 300px"
          className="h-full w-full object-cover"
        />
        {/* Mörk gradient som tonas in nedtill vid hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="mt-4">
        <h3 className="font-display text-xl leading-tight text-accent transition-colors duration-300 group-hover:text-[var(--accent-soft)]">
          {book.title}
        </h3>
        {book.year && <p className="mt-0.5 text-sm text-muted">{book.year}</p>}
        {book.description && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
            {book.description}
          </p>
        )}
        {book.purchaseUrl && (
          <a
            href={book.purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold mt-3 inline-block px-4 py-2 text-xs uppercase tracking-wide"
          >
            Köp boken
          </a>
        )}
      </div>
    </article>
  );
}
