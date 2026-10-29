import Image, { type ImageProps } from "next/image";

const OPTIMIZED_HOSTS = ["images.unsplash.com"];

/**
 * Property and door photos come from the database, so staff can paste any image URL.
 * Local files and allow-listed hosts go through Next's optimizer; other hosts are shown as-is so they never fail.
 */
export function Photo({ src, unoptimized, ...props }: ImageProps & { src: string }) {
  const remote = /^https?:\/\//.test(src);
  const allowed = !remote || OPTIMIZED_HOSTS.includes(new URL(src).hostname);
  return <Image src={src} unoptimized={unoptimized || !allowed} {...props} />;
}
