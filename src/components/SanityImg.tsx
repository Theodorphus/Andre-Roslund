import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/queries";

interface Props {
  image?: SanityImage;
  /** Lokal fallback-bild (t.ex. /images/Hero.png) som används om Sanity saknar bild. */
  fallbackSrc?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /**
   * Hindrar serverside-beskärning i Sanity: bilden skalas inom width/height
   * med bevarade proportioner. Används när vi visar hela omslaget (object-contain).
   */
  fit?: "crop" | "contain";
}

/**
 * Renderar en Sanity-bild om den finns, annars en lokal fallback-bild,
 * annars en diskret platshållare. Gör att sidan ser bra ut både med
 * tillfälligt material och innan André laddat upp egna bilder i Sanity.
 */
export default function SanityImg({
  image,
  fallbackSrc,
  alt,
  width,
  height,
  className,
  sizes,
  priority,
  fit = "crop",
}: Props) {
  const src = image?.asset
    ? fit === "contain"
      ? urlForImage(image).width(width).height(height).fit("max").url()
      : urlForImage(image).width(width).height(height).url()
    : fallbackSrc;

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-[#141a28] text-accent/50 ${className ?? ""}`}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <span className="font-display text-sm tracking-widest uppercase">
          Bild
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}
