export function getAssetURL(id: string) {
  if (!id) return null;
  const url = import.meta.env.PUBLIC_DIRECTUS_URL;
  return `${url}/assets/${id}`;
}
