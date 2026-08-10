import Image from "next/image";
import Link from "next/link";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { slugify } from "@/lib/extract-headings";
import { locationToSlug } from "@/lib/utils";
import type { RichBodyLinks, RichAsset, RichEntryRef } from "@/types/rich-body";

function buildMaps(links?: RichBodyLinks) {
  const assetMap = new Map<string, RichAsset>();
  const entryMap = new Map<string, RichEntryRef>();

  for (const asset of links?.assets?.block ?? []) {
    assetMap.set(asset.sys.id, asset);
  }
  for (const entry of links?.entries?.block ?? []) {
    entryMap.set(entry.sys.id, entry);
  }
  for (const entry of links?.entries?.inline ?? []) {
    entryMap.set(entry.sys.id, entry);
  }

  return { assetMap, entryMap };
}

function entryHref(entry: RichEntryRef): string | null {
  switch (entry.__typename) {
    case "BlogPost":       return entry.slug ? `/blog/${entry.slug}` : null;
    case "CommunityStory": return entry.slug ? `/community/${entry.slug}` : null;
    case "Trip":           return entry.location ? `/trips/${locationToSlug(entry.location)}` : null;
    default:               return null;
  }
}

function entryDisplayName(entry: RichEntryRef): string {
  switch (entry.__typename) {
    case "Trip": return entry.location ?? "Trip";
    default:     return entry.title ?? entry.__typename;
  }
}

export function createRichTextRenderOptions(links?: RichBodyLinks) {
  const { assetMap, entryMap } = buildMaps(links);

  return {
    renderNode: {
      [BLOCKS.HEADING_2]: (node: any, children: any) => {
        const text = (node.content as any[])
          .filter((n: any) => n.nodeType === "text")
          .map((n: any) => n.value as string)
          .join("");
        return <h2 id={slugify(text)}>{children}</h2>;
      },
      [BLOCKS.HEADING_3]: (node: any, children: any) => {
        const text = (node.content as any[])
          .filter((n: any) => n.nodeType === "text")
          .map((n: any) => n.value as string)
          .join("");
        return <h3 id={slugify(text)}>{children}</h3>;
      },

      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const asset = assetMap.get(node.data.target.sys.id);
        if (!asset?.url) return null;
        const url = asset.url.startsWith("//") ? `https:${asset.url}` : asset.url;
        const isImage =
          asset.contentType?.startsWith("image/") ||
          /\.(jpe?g|png|gif|webp|avif|svg)(\?.*)?$/i.test(url) ||
          url.includes("images.ctfassets.net") ||
          url.includes("assets.ctfassets.net");
        if (!isImage) {
          return (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#09af0d] underline underline-offset-2 font-plus-jakarta-sans text-[16px] my-2"
            >
              {asset.title ?? "Download file"}
            </a>
          );
        }
        return (
          <figure className="my-6">
            {asset.width && asset.height ? (
              <Image
                src={url}
                alt={asset.description ?? asset.title ?? ""}
                width={asset.width}
                height={asset.height}
                className="w-full h-auto rounded-[10px]"
              />
            ) : (
              <div className="rounded-[10px] overflow-hidden relative w-full" style={{ aspectRatio: "16 / 9" }}>
                <Image
                  src={url}
                  alt={asset.description ?? asset.title ?? ""}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {asset.description && (
              <figcaption className="text-[13px] text-center text-[color:var(--text-secondary)] mt-2 font-plus-jakarta-sans">
                {asset.description}
              </figcaption>
            )}
          </figure>
        );
      },

      [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
        const entry = entryMap.get(node.data.target.sys.id);
        if (!entry) return null;

        if (entry.__typename === "OurWallOfLove") {
          return (
            <div className="my-6 border border-[color:var(--bg-tertiary)] rounded-[10px] p-4 bg-[color:var(--bg-secondary)]">
              <p className="text-[16px] font-semibold text-[color:var(--text-primary)] font-plus-jakarta-sans">
                {entry.reviewerName ?? "Guest"}
              </p>
              {entry.location && (
                <p className="text-[14px] text-[color:var(--text-secondary)] font-plus-jakarta-sans mt-0.5">
                  {entry.location}
                </p>
              )}
            </div>
          );
        }

        const href = entryHref(entry);
        return (
          <div className="my-6 border border-[color:var(--bg-tertiary)] rounded-[10px] p-4 flex items-center justify-between gap-4">
            <span className="text-[16px] font-medium text-[color:var(--text-primary)] font-plus-jakarta-sans">
              {entryDisplayName(entry)}
            </span>
            {href && (
              <Link
                href={href}
                className="shrink-0 text-[14px] font-medium text-[#09af0d] hover:underline font-plus-jakarta-sans"
              >
                View →
              </Link>
            )}
          </div>
        );
      },

      [INLINES.EMBEDDED_ENTRY]: (node: any, children: any) => {
        const entry = entryMap.get(node.data.target.sys.id);
        if (!entry) return <>{children}</>;
        if (entry.__typename === "OurWallOfLove") {
          return (
            <span className="font-medium text-[color:var(--text-primary)]">
              {entry.reviewerName ?? "Guest"}
            </span>
          );
        }
        const href = entryHref(entry);
        const name = entryDisplayName(entry);
        if (!href) return <span className="font-medium text-[color:var(--text-primary)]">{name}</span>;
        return (
          <Link href={href} className="text-[#09af0d] underline underline-offset-2 hover:opacity-80">
            {name}
          </Link>
        );
      },
    },
  };
}
