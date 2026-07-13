import type { Page, Entry, Asset, Global, Form, LinkField, BlockType } from "./types";
import { normalizeBlocks } from "./normalizeBlock";

const CMS_URL = import.meta.env.CMS_URL;
const CMS_TOKEN = import.meta.env.CMS_TOKEN;
const INCLUDE_DRAFTS = import.meta.env.CMS_INCLUDE_DRAFTS === "true";

async function cmsFetch<T>(path: string, envelopeKey?: string): Promise<T> {
  const res = await fetch(`${CMS_URL}${path}`, {
    headers: { Authorization: `Bearer ${CMS_TOKEN}` },
  });
  if (!res.ok) throw new Error(`CMS ${res.status} for ${path}`);
  const json = await res.json();
  if (envelopeKey && json[envelopeKey] !== undefined) {
    return json[envelopeKey] as T;
  }
  return json as T;
}

// Cache block type schemas once per build (skipped in dev so new block types are picked up without restart)
let blockTypeRefMap: Map<string, Map<string, string>> | null = null;

async function getRecordRefsMap(): Promise<Map<string, Map<string, string>>> {
  if (blockTypeRefMap && !import.meta.env.DEV) return blockTypeRefMap;
  try {
    const data = await cmsFetch<{ block_types: BlockType[] }>("/api/block_types");
    const map = new Map<string, Map<string, string>>();
    for (const bt of data.block_types ?? []) {
      const fieldMap = new Map<string, string>();
      for (const f of bt.fields ?? []) {
        if (f.type === "record_refs" && f.of_collection) {
          fieldMap.set(f.name, f.of_collection);
        }
      }
      if (fieldMap.size > 0) map.set(bt.slug, fieldMap);
    }
    blockTypeRefMap = map;
    return map;
  } catch (err) {
    console.error("[cms] getRecordRefsMap failed:", err);
    return new Map();
  }
}

async function resolveRecordRefs(blocks: Page["blocks"]): Promise<Page["blocks"]> {
  const refMap = await getRecordRefsMap();
  return Promise.all(
    blocks.map(async (block) => {
      const fieldMap = refMap.get(block.type);
      if (!fieldMap || !block.data) return block;
      const newData = { ...block.data };
      for (const [fieldName, collection] of fieldMap) {
        const slugs: unknown = newData[fieldName];
        if (!Array.isArray(slugs) || slugs.length === 0 || typeof slugs[0] !== "string") continue;
        const entries = await Promise.all(
          (slugs as string[]).map((s) => getEntry(collection, s)),
        );
        newData[fieldName] = entries
          .filter((e): e is Entry => e !== null)
          .map((e) => ({ ...e.frontmatter, title: e.title, slug: e.slug }));
      }
      return { ...block, data: newData };
    }),
  );
}

export async function getPage(slug: string, opts: { normalize?: boolean } = {}): Promise<Page | null> {
  try {
    const page = await cmsFetch<Page>(`/api/pages/${encodeURIComponent(slug)}`, "page");
    page.blocks = await resolveRecordRefs(page.blocks ?? []);
    if (opts.normalize) page.blocks = normalizeBlocks(page.blocks);
    return page;
  } catch {
    return null;
  }
}

export async function listPageSlugs(): Promise<{ slug: string; status: string; updated_at: string }[]> {
  const pages = await cmsFetch<{ slug: string; status: string; updated_at: string }[]>("/api/pages?per=100", "pages");
  return INCLUDE_DRAFTS ? pages : pages.filter((p) => p.status === "published");
}

export async function getEntry(collection: string, slug: string): Promise<Entry | null> {
  try {
    return await cmsFetch<Entry>(
      `/api/collections/${encodeURIComponent(collection)}/entries/${encodeURIComponent(slug)}`,
      "entry",
    );
  } catch {
    return null;
  }
}

export async function listEntries(collection: string): Promise<Entry[]> {
  const all: Entry[] = [];
  let page = 1;
  while (true) {
    const batch = await cmsFetch<Entry[]>(
      `/api/collections/${encodeURIComponent(collection)}/entries?per=100&page=${page}`,
      "entries",
    );
    if (!batch || batch.length === 0) break;
    all.push(...batch);
    if (batch.length < 100) break;
    page++;
  }
  return INCLUDE_DRAFTS ? all : all.filter((e) => e.status === "published");
}

// The list endpoint returns summary entries without frontmatter or body. Use
// this when routing needs the frontmatter (e.g. category for nested URLs).
// Resolves N+1 fetches in parallel.
export async function listEntriesFull(collection: string): Promise<Entry[]> {
  const summaries = await listEntries(collection);
  const full = await Promise.all(summaries.map((s) => getEntry(collection, s.slug)));
  return full.filter((e): e is Entry => e !== null);
}

const assetCache = new Map<string, Asset>();

async function fetchAssetById(id: string | number): Promise<Asset | null> {
  try {
    const asset = await cmsFetch<Asset>(`/api/assets/${encodeURIComponent(String(id))}`);
    assetCache.set(String(asset.id), asset);
    return asset;
  } catch {
    return null;
  }
}

async function fetchAssetsByIds(ids: (string | number)[]): Promise<Asset[]> {
  if (ids.length === 0) return [];
  const results = await Promise.all(ids.map((id) => fetchAssetById(id)));
  return results.filter((a): a is Asset => a !== null);
}

export async function getAsset(idOrUuid: string | number): Promise<Asset | null> {
  const key = String(idOrUuid);
  if (assetCache.has(key)) return assetCache.get(key)!;
  return fetchAssetById(idOrUuid);
}

export async function getAssets(ids: (string | number)[]): Promise<Asset[]> {
  const uncached: (string | number)[] = [];
  const out: Asset[] = [];
  for (const id of ids) {
    const cached = assetCache.get(String(id));
    if (cached) out.push(cached);
    else uncached.push(id);
  }
  if (uncached.length > 0) {
    const fetched = await fetchAssetsByIds(uncached);
    out.push(...fetched);
  }
  return out;
}

export async function resolveAssetUrl(idOrUrl: string | number | null | undefined): Promise<string | null> {
  if (idOrUrl == null) return null;
  if (typeof idOrUrl === "string") {
    if (idOrUrl.startsWith("http://") || idOrUrl.startsWith("https://")) return idOrUrl;
    if (idOrUrl.startsWith("/")) return `${CMS_URL}${idOrUrl}`;
  }
  const asset = await getAsset(idOrUrl);
  if (!asset) return null;
  return asset.url.startsWith("http") ? asset.url : `${CMS_URL}${asset.url}`;
}

// Synchronous variant — only succeeds if the asset is already in the in-process
// cache (populated by an earlier resolveAssetUrl()/getAssets() or by preloadAssetsFromBlocks).
// Returns null when the cache is cold for that id; callers should pre-warm.
export function resolveAssetUrlSync(idOrUrl: string | number | null | undefined): string | null {
  if (idOrUrl == null) return null;
  if (typeof idOrUrl === "string") {
    if (idOrUrl.startsWith("http://") || idOrUrl.startsWith("https://")) return idOrUrl;
    if (idOrUrl.startsWith("/")) return `${CMS_URL}${idOrUrl}`;
  }
  const asset = assetCache.get(String(idOrUrl));
  if (!asset) return null;
  return asset.url.startsWith("http") ? asset.url : `${CMS_URL}${asset.url}`;
}

const ASSET_FIELD_NAMES = new Set([
  "image", "bgImage", "bg_image", "featured_image", "og_image", "favicon",
  "logo", "logo_dark", "author_image", "primary_image", "secondary_image",
  "image_id", "asset_id",
]);

function collectAssetIds(node: any, out: Set<string | number>, parentKey: string | null = null): void {
  if (node == null) return;
  if (Array.isArray(node)) {
    for (const v of node) collectAssetIds(v, out, parentKey);
    return;
  }
  if (typeof node === "object") {
    for (const [k, v] of Object.entries(node)) collectAssetIds(v, out, k);
    return;
  }
  if ((typeof node === "string" || typeof node === "number") && parentKey && ASSET_FIELD_NAMES.has(parentKey)) {
    if (node === "" || node == null) return;
    out.add(node as string | number);
  }
}

// Walks page blocks (or any JSON), finds every asset id referenced in known
// asset-field names, and batch-fetches them so resolveAssetUrlSync() works
// for the rest of the page's render.
export async function preloadAssetsFromBlocks(blocks: any): Promise<void> {
  const ids = new Set<string | number>();
  collectAssetIds(blocks, ids);
  if (ids.size === 0) return;
  await getAssets([...ids]);
}

export async function getGlobal(slug: string): Promise<Global | null> {
  try {
    return await cmsFetch<Global>(`/api/globals/${encodeURIComponent(slug)}`, "global");
  } catch {
    return null;
  }
}

export async function getForm(slug: string): Promise<Form | null> {
  try {
    return await cmsFetch<Form>(`/api/forms/${encodeURIComponent(slug)}`, "form");
  } catch {
    return null;
  }
}

export function resolveLink(link: LinkField | null | undefined): string {
  if (!link) return "#";
  switch (link.kind) {
    case "url":
      return link.value;
    case "page":
      return link.value === "home" ? "/" : `/${link.value}`;
    case "entry":
      return `/${link.collection}/${link.value}`;
    default:
      return "#";
  }
}

export function getFormSubmissionUrl(formSlug: string): string {
  return `${CMS_URL}/api/forms/${encodeURIComponent(formSlug)}/submissions`;
}
