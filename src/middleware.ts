import { getRedirects } from "src/lib/getPageData";

let redirects: { from: string; to: string; code: number }[] = [];

function extractPathname(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return url.startsWith("/") ? url : `/${url}`;
  }
}

export async function onRequest(context, next) {
  if (redirects.length === 0) {
    const data = await getRedirects();
    redirects = data.map((r) => ({
      from: extractPathname(r.old_url),
      to: r.new_url.startsWith("http") ? r.new_url : extractPathname(r.new_url),
      code: r.status ? parseInt(r.status) : 301,
    }));
  }

  const path = context.url.pathname.replace(/\/+/g, "/").replace(/\/+$/, "");
  const match = redirects.find((r) => r.from.replace(/\/+$/, "") === path);

  if (match) {
    return context.redirect(match.to, match.code);
  }

  return next();
}
