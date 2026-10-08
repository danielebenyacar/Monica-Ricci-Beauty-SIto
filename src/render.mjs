// Costruisce site/index.html dai dati. Per il design del cliente modifica QUESTO file e site/style.css.
import legal from "./legal.mjs";
const esc = (s) => String(s).replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
export default (c, { publish = false } = {}) => {
  const wa = c.whatsapp ? `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(c.waMessage)}` : "";
  const tel = "tel:" + c.phone.replace(/[^+\d]/g, "");
  const ld = { "@context": "https://schema.org", "@type": "LocalBusiness", name: c.name, telephone: c.phone, address: c.address, ...(c.url && { url: c.url }) };
  const contatto = `<p class="row">${wa ? `<a class="btn" href="${wa}">Scrivici su WhatsApp</a>` : ""}<a class="btn ${wa ? "alt" : ""}" href="${tel}">Chiama ${esc(c.phone)}</a>${c.email ? `<a class="lnk2" href="mailto:${esc(c.email)}">${esc(c.email)}</a>` : ""}</p>`;
  const foto = c.photos.map((p) => `<img src="${esc(p.src)}" alt="${esc(p.alt)}" width="${p.w}" height="${p.h}" loading="lazy">`).join("");
  return `<!doctype html>
<html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.name)}, ${esc(c.city)}</title><meta name="description" content="${esc(c.description)}">
${publish ? "" : '<meta name="robots" content="noindex,nofollow">'}
<meta property="og:title" content="${esc(c.name)}"><meta property="og:description" content="${esc(c.description)}">
<link rel="stylesheet" href="style.css"><script type="application/ld+json">${JSON.stringify(ld)}</script></head><body>
<header class="w"><a class="logo" href="#top">${esc(c.name)}</a><nav><a href="#chi">Chi siamo</a><a href="#listino">${esc(c.servicesTitle)}</a><a href="#dove">Dove siamo</a></nav></header>
<main id="top"><section class="w hero"><h1>${esc(c.name)}</h1><p class="lead">${esc(c.tagline)}</p>${contatto}</section>
<section class="w" id="chi"><h2>Chi siamo</h2><p>${esc(c.about)}</p>${c.zone.length ? `<p class="zone">${c.zone.map((z) => `<span>${esc(z)}</span>`).join("")}</p>` : ""}</section>
${foto ? `<section class="w gal">${foto}</section>` : ""}
<section class="w" id="listino"><h2>${esc(c.servicesTitle)}</h2><ul class="svc">${c.services.map((s) => `<li><span><b>${esc(s.n)}</b>${s.d ? `<small>${esc(s.d)}</small>` : ""}</span><span>${esc(s.p)}</span></li>`).join("")}</ul>${c.note ? `<p class="note">${esc(c.note)}</p>` : ""}</section>
<section class="w" id="dove"><h2>Dove siamo</h2><p>${esc(c.address)}</p><table>${c.hours.map((h) => `<tr><td>${esc(h[0])}</td><td>${esc(h[1])}</td></tr>`).join("")}</table><p><a class="lnk2" href="${esc(c.mapsUrl)}">Apri su Google Maps</a></p>${contatto}</section></main>
<footer class="w"><span>${esc(c.legal.ragione)} · P.IVA ${esc(c.legal.piva)}${c.legal.rea ? " · REA " + esc(c.legal.rea) : ""}</span><span><button type="button" class="lnk" data-d="dPriv">Privacy</button> · <button type="button" class="lnk" data-d="dCook">Cookie</button></span></footer>
${legal(c)}<script src="app.js"></script></body></html>`;
};
