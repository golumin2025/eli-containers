import type { Block } from "./types";

function unwrap<T = any>(arr: any[] | undefined, key: string): T[] {
  if (!Array.isArray(arr)) return [];
  return arr.map((x) => (x && typeof x === "object" && key in x ? x[key] : x)).filter(Boolean);
}

function renameKey<T extends Record<string, any>>(obj: T, from: string, to: string): T {
  if (!(from in obj)) return obj;
  const { [from]: v, ...rest } = obj;
  return { ...rest, [to]: v } as T;
}

export function normalizeBlock(block: Block): Block {
  const t = block.type;
  let d: Record<string, any> = { ...(block.data ?? {}) };

  // Universal renames that show up across many block types
  d = renameKey(d, "bgImage", "bg_image");
  if ("contnet" in d) d = renameKey(d, "contnet", "content");

  // Flatten legacy Directus polymorphic wrappers
  if (Array.isArray(d.buttons)) d.buttons = unwrap(d.buttons, "button_id");
  if (Array.isArray(d.button))  d.buttons = unwrap(d.button, "button_id");
if (Array.isArray(d.vidoes)) {
    d.videos = unwrap(d.vidoes, "videos_id");
    delete d.vidoes;
  } else if (Array.isArray(d.videos)) {
    d.videos = unwrap(d.videos, "videos_id");
  }
  if (Array.isArray(d.social_icons)) d.social_icons = unwrap(d.social_icons, "social_icons_id");
  if (Array.isArray(d.cards) && d.cards.length > 0) {
    const first = d.cards[0];
    if (first && typeof first === "object") {
      if ("our_team_id" in first) d.cards = unwrap(d.cards, "our_team_id");
      else if ("practice_areas_id" in first) d.cards = unwrap(d.cards, "practice_areas_id");
    }
  }
  if (Array.isArray(d.blogs)) d.blogs = unwrap(d.blogs, "blogs_id");

  // Block-type-specific renames
  switch (t) {
    case "team_slider":
    case "team":
    case "team_grid":
      if (d.cards && !d.members) {
        d.members = d.cards;
        delete d.cards;
      }
      break;
    case "case_results":
      if (d.cards && !d.cases) {
        d.cases = d.cards;
        delete d.cards;
      }
      break;
    case "videos_grid":
      if (Array.isArray(d.videos)) {
        d.videos = d.videos.map((v: any) => {
          if (!v) return null;
          if (typeof v === "string") return { asset_id: v, youtube_link: null, title: null };
          return { asset_id: v.id ?? null, youtube_link: v.youtube_link ?? null, title: v.title ?? null };
        }).filter(Boolean);
      }
      break;
  }

  return { ...block, data: d };
}

export function normalizeBlocks(blocks: Block[] | undefined | null): Block[] {
  if (!Array.isArray(blocks)) return [];
  return blocks.map(normalizeBlock);
}
