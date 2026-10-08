// Costruisce site/index.html dai dati. Tipo V3: listino a schede. Stile «Insegna» (bianco, antracite, lilla, monogramma mr).
import legal from "./legal.mjs";
const esc = (s) => String(s).replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
// Emblema dalla vetrina: cerchio a pennello lilla e monogramma «mr» con il ricciolo.
const emblem = `<svg class="emb" viewBox="0 0 400 400" role="img" aria-label="Monogramma mr con il cerchio lilla della vetrina">
<path class="emb-c" fill-rule="evenodd" d="M200 34a166 166 0 1 0 0.1 0zM214 52a146 146 0 1 1-0.1 0z"/>
<circle class="emb-r" cx="204" cy="198" r="126" fill="none" stroke-width="1.4" stroke-dasharray="560 232"/>
<path class="emb-s" fill="none" stroke-width="3" stroke-linecap="round" d="M28 252c40 6 78-2 104-22M268 226c30 18 70 22 104 8"/>
<text x="200" y="262" text-anchor="middle" class="emb-t">mr</text></svg>`;
export default (c, { publish = false } = {}) => {
  const wa = c.whatsapp ? `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(c.waMessage)}` : "";
  const tel = "tel:" + c.phone.replace(/[^+\d]/g, "");
  const ld = { "@context": "https://schema.org", "@type": "BeautySalon", name: c.name, telephone: c.phone, address: c.address, ...(c.url && { url: c.url }) };
  const btn = (cls = "", t) => wa ? `<a class="btn ${cls}" href="${wa}">${t || "Scrivi su WhatsApp"}</a>` : `<a class="btn ${cls}" href="${tel}">${t || "Chiama per prenotare"}</a>`;
  const groups = [...new Set(c.services.map((s) => s.g || ""))];
  const listino = groups.map((g) => `<div class="grp">${g ? `<h3>${esc(g)}</h3>` : ""}<ul class="svc">${c.services.filter((s) => (s.g || "") === g).map((s) => `<li><span><b>${esc(s.n)}</b>${s.d ? `<small>${esc(s.d)}</small>` : ""}</span><i aria-hidden="true"></i><span class="pr">${esc(s.p)}</span></li>`).join("")}</ul></div>`).join("");
  const about = (Array.isArray(c.about) ? c.about : [c.about]).map((p) => `<p>${esc(p)}</p>`).join("");
  const foto = c.photos.map((p) => `<img src="${esc(p.src)}" alt="${esc(p.alt)}" width="${p.w}" height="${p.h}" loading="lazy">`).join("");
  const tabs = [["tratt", c.servicesTitle], ["studio", "Lo studio"], ["orari", "Orari e dove"]];
  return `<!doctype html>
<html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.name)}, studio estetico a ${esc(c.city)}</title><meta name="description" content="${esc(c.description)}">
${publish ? "" : '<meta name="robots" content="noindex,nofollow">'}
<meta property="og:title" content="${esc(c.name)}"><meta property="og:description" content="${esc(c.description)}"><meta name="theme-color" content="#faf8f6">
<link rel="preload" href="fonts/cormorant-garamond-latin-500-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="style.css"><script type="application/ld+json">${JSON.stringify(ld)}</script></head><body>
${c.demo ? '<p class="demo">Bozza di proposta, contenuti da completare insieme</p>' : ""}
<header class="top"><div class="w bar"><a class="logo" href="#top"><span class="mono" aria-hidden="true">mr</span><span>${esc(c.short)}<em>beauty &amp; co.</em></span></a>${btn("sm", wa ? "WhatsApp" : "Chiama")}</div></header>
<main id="top">
<section class="w hero"><div class="hero-t"><p class="kick">Studio estetico · ${esc(c.city)}</p>
<h1>${esc(c.short)} <span>beauty &amp; co.</span></h1><p class="lead">${esc(c.tagline)}</p>
<p class="row">${btn()}<span class="ph">${esc(c.phone)}</span></p></div>${emblem}</section>
<section class="w box" aria-label="Informazioni sullo studio">
<div class="tabs" role="tablist" aria-label="Sezioni">${tabs.map(([id, t], i) => `<button type="button" role="tab" id="t-${id}" aria-controls="p-${id}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ""}>${esc(t)}</button>`).join("")}</div>
<div class="panel" role="tabpanel" id="p-tratt" aria-labelledby="t-${tabs[0][0]}"><h2>${esc(c.servicesTitle)}</h2><div class="cols">${listino}</div>${c.note ? `<p class="note">${esc(c.note)}</p>` : ""}</div>
<div class="panel" role="tabpanel" id="p-studio" aria-labelledby="t-studio"><h2>Lo studio</h2><div class="about">${about}</div>${foto ? `<div class="gal">${foto}</div>` : ""}${c.zone.length ? `<p class="zone">${c.zone.map((z) => `<span>${esc(z)}</span>`).join("")}</p>` : ""}</div>
<div class="panel" role="tabpanel" id="p-orari" aria-labelledby="t-orari"><h2>Orari e dove</h2><div class="cols2"><table class="hrs">${c.hours.map((h, i) => `<tr data-day="${(i + 1) % 7}"><th scope="row">${esc(h[0])}</th><td>${esc(h[1])}</td></tr>`).join("")}</table>
<div class="dove"><p class="addr">${esc(c.address)}</p><p><a class="lnk2" href="${esc(c.mapsUrl)}">Apri su Google Maps</a></p><p class="row">${btn()}</p></div></div></div>
</section></main>
<footer class="w foot"><span>${esc(c.legal.ragione)} · P.IVA ${esc(c.legal.piva)}${c.legal.rea ? " · REA " + esc(c.legal.rea) : ""}</span><span><button type="button" class="lnk" data-d="dPriv">Privacy</button> · <button type="button" class="lnk" data-d="dCook">Cookie</button></span></footer>
${legal(c)}<script src="app.js"></script></body></html>`;
};
