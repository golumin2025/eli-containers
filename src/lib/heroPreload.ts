import type { Block } from "./types";
import { resolveAssetUrl } from "./cms";

export async function heroPreloadFromBlocks(blocks: Block[]): Promise<string | null> {
  const hero = blocks.find((b) => b.type === "hero");
  if (!hero) return null;

  const imageId = hero.data.image_id as number | string | undefined;
  if (!imageId) return null;

  return resolveAssetUrl(imageId);
}
