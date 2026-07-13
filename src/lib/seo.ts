import { resolveAssetUrl } from "./cms";
import type { Entry, Page } from "./types";

const SITE_URL = import.meta.env.SITE_URL || "https://www.boxrentalnow.com";

export interface SeoProps {
  title: string;
  description: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

function pickMeta(src: Page | Entry): Record<string, any> {
  return (
    (src as Page).meta ??
    (src as Entry).seo ??
    {}
  );
}

export async function buildSeoProps(
  source: Page | Entry | null | undefined,
  overrides: Partial<SeoProps> = {},
): Promise<SeoProps> {
  if (!source) return { title: "", description: "", ...overrides };
  const meta = pickMeta(source);
  const ogImage = meta.og_image != null
    ? (await resolveAssetUrl(meta.og_image)) ?? undefined
    : undefined;

  const canonicalUrl = SITE_URL
    ? `${SITE_URL.replace(/\/$/, "")}/${source.slug === "home" ? "" : source.slug}`
    : undefined;

  return {
    title: meta.seo_title || source.title || "",
    description: meta.seo_description || "",
    ogImage,
    canonicalUrl,
    noIndex: meta.no_index ?? false,
    noFollow: meta.no_follow ?? false,
    ...overrides,
  };
}
