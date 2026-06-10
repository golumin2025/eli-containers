export function getAssetURL(idOrUrl: string | { id: string } | null | undefined): string | null {
  if (!idOrUrl) return null;
  if (typeof idOrUrl === "string") {
    if (idOrUrl.startsWith("http://") || idOrUrl.startsWith("https://")) return idOrUrl;
    const base = import.meta.env.PUBLIC_DIRECTUS_URL;
    return `${base}/assets/${idOrUrl}`;
  }
  if (typeof idOrUrl === "object" && idOrUrl.id) {
    const base = import.meta.env.PUBLIC_DIRECTUS_URL;
    return `${base}/assets/${idOrUrl.id}`;
  }
  return null;
}
