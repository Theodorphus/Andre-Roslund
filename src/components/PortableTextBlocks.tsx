import type { PortableTextBlock } from "@/sanity/lib/queries";

/**
 * Enkel renderare för Sanity Portable Text: rubriker (h2/h3) blir guldrubriker,
 * listposter samlas i punktlistor och övrigt blir stycken. Räcker för de texter
 * André skriver i Studio (Om mig, Meningen med livet m.m.).
 */
export default function PortableTextBlocks({
  blocks,
}: {
  blocks: PortableTextBlock[];
}) {
  const out: React.ReactNode[] = [];
  let listBuffer: { key: string; text: string }[] = [];

  const flushList = () => {
    if (listBuffer.length === 0) return;
    out.push(
      <ul key={`ul-${listBuffer[0].key}`} className="ml-5 list-disc space-y-1">
        {listBuffer.map((li) => (
          <li key={li.key}>{li.text}</li>
        ))}
      </ul>,
    );
    listBuffer = [];
  };

  for (const block of blocks) {
    const text = block.children?.map((c) => c.text).join("") ?? "";

    // Portable Text markerar listposter med listItem på blocket.
    if ((block as { listItem?: string }).listItem) {
      listBuffer.push({ key: block._key, text });
      continue;
    }

    flushList();

    if (block.style === "h2" || block.style === "h3") {
      out.push(
        <h3
          key={block._key}
          className="pt-4 font-display text-xl text-accent"
        >
          {text}
        </h3>,
      );
    } else if (text.trim() !== "") {
      out.push(<p key={block._key}>{text}</p>);
    }
  }

  flushList();

  return <>{out}</>;
}
