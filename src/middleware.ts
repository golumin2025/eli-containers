const REDIRECTS: { from: string; to: string; code: number }[] = [
  { from: "/blog/mi-box-vs-pack-rats",      to: "/blog/box-rental-now-vs-pack-rats",      code: 301 },
  { from: "/blog/mi-box-vs-ryder-truck-rental", to: "/blog/box-rental-now-vs-ryder-truck-rental", code: 301 },
  { from: "/blog/mi-box-vs-uhaul",           to: "/blog/box-rental-now-vs-uhaul",           code: 301 },
  { from: "/blog/mi-box-vs-pods",            to: "/blog/box-rental-now-vs-pods",            code: 301 },
  { from: "/blog/mi-box-vs-go-minis",        to: "/blog/box-rental-now-vs-go-minis",        code: 301 },
  { from: "/blog/mi-box-vs-1800-pack-rat",   to: "/blog/box-rental-now-vs-1800-pack-rat",   code: 301 },
];

export function onRequest(context, next) {
  const path = context.url.pathname.replace(/\/+/g, "/").replace(/\/+$/, "");
  const match = REDIRECTS.find((r) => r.from === path);
  if (match) return context.redirect(match.to, match.code);
  return next();
}
