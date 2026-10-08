// Uso: node tools/build.mjs [--publish]   Scrive site/index.html (e _headers, robots.txt, sitemap.xml alla pubblicazione).
import fs from "node:fs";
import cfg from "../cliente.config.mjs";
import render from "../src/render.mjs";
const publish = process.argv.includes("--publish");
fs.writeFileSync("site/index.html", render(cfg, { publish }));
const sec = "/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: no-referrer\n  Strict-Transport-Security: max-age=31536000\n  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()\n  Cross-Origin-Opener-Policy: same-origin\n  X-Frame-Options: DENY\n  Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'none'\n";
fs.writeFileSync("site/_headers", sec + (publish ? "" : "  X-Robots-Tag: noindex, nofollow\n"));
if (publish) {
  if (!cfg.url) throw new Error("cfg.url mancante: serve il dominio finale per sitemap e robots");
  fs.writeFileSync("site/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${cfg.url}/sitemap.xml\n`);
  fs.writeFileSync("site/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${cfg.url}/</loc></url></urlset>\n`);
} else fs.writeFileSync("site/robots.txt", "User-agent: *\nDisallow: /\n");
console.log("Costruito site/index.html" + (publish ? " (PUBBLICAZIONE)" : " (anteprima, noindex)"));
