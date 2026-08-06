import type { APIRoute } from "astro";
import { readItems } from "@directus/sdk";
import directus from "src/lib/directus";

export const GET: APIRoute = async () => {
  const site = "https://www.boxrentalnow.com";

  const staticPaths = ["/", "/blog"];

  let pageSlugs: string[] = [];
  let blogLinks: string[] = [];

  try {
    const pages: any = await directus.request(
      readItems("pages", { fields: ["slug"] }),
    );
    pageSlugs = (Array.isArray(pages) ? pages : [])
      .map((p: any) => p.slug)
      .filter((s: any) => typeof s === "string" && s.trim() !== "");
  } catch (error) {
    console.error("Error fetching pages for sitemap:", error);
  }

  try {
    const blogs: any = await directus.request(
      readItems("blogs", {
        fields: ["link"],
        filter: { status: { _eq: "published" } },
      }),
    );
    blogLinks = (Array.isArray(blogs) ? blogs : [])
      .map((b: any) => b.link)
      .filter((l: any) => typeof l === "string" && l.trim() !== "");
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
  }

  const normalize = (path: string) => {
    let p = path.startsWith("/") ? path : `/${path}`;
    if (p !== "/" && p.endsWith("/")) p = p.slice(0, -1);
    return p;
  };

  const urls = new Set<string>([
    ...staticPaths.map(normalize),
    ...pageSlugs.map(normalize),
    ...blogLinks.map((l) => `/blog${normalize(l)}`),
  ]);

  const lastmod = new Date().toISOString();

  const urlNodes = [...urls]
    .sort()
    .map(
      (path) =>
        `  <url>\n    <loc>${site}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlNodes}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
};
