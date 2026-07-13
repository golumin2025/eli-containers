export function getAssetURL(idOrUrl: string | { id: string } | null | undefined): string | null {
  if (!idOrUrl) return null;
  if (typeof idOrUrl === "string") {
    if (idOrUrl.startsWith("http://") || idOrUrl.startsWith("https://")) return idOrUrl;
    return null;
  }
  if (typeof idOrUrl === "object" && idOrUrl.id) {
    if (typeof idOrUrl.id === "string" && (idOrUrl.id.startsWith("http://") || idOrUrl.id.startsWith("https://"))) {
      return idOrUrl.id;
    }
    return null;
  }
  return null;
}
