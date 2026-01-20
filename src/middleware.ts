import { getRedirects } from "src/lib/getPageData";

let redirects = [];

export async function onRequest(context, next) {
  if (redirects.length === 0) {
    const data = await getRedirects();
    console.log("Loaded redirects:", data);

    redirects = data.map((r) => ({
      from: r.old_url.startsWith("/") ? r.old_url : `/${r.old_url}`,
      to: r.new_url.startsWith("/") ? r.new_url : `/${r.new_url}`,
      code: r.status ? parseInt(r.status) : 301,
    }));
  }

  let path = context.url.pathname;

  path = path.replace(/\/+/g, "/");
  path = path.replace(/\/+$/, "");

  const match = redirects.find((r) => r.from.replace(/\/+$/, "") === path);

  if (match) {
    return context.redirect(match.to, match.code);
  }

  return next();
}
