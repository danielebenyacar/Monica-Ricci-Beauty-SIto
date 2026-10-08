// Costruisce site/index.html dai dati. Tipo V3: listino a schede. Stile «Insegna» (bianco, antracite, lilla, monogramma mr).
import legal from "./legal.mjs";
const esc = (s) => String(s).replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
// Emblema dalla vetrina: il cerchio lilla a pennello si dipinge, poi «mr» si scrive a mano con il ricciolo.
const emblem = `<svg class="emb" viewBox="0 0 600 310" role="img" aria-label="Monogramma mr con il cerchio lilla della vetrina">
<defs><mask id="pen"><circle class="emb-m" cx="316" cy="150" r="132" fill="none" stroke="#fff" stroke-width="34" pathLength="1" transform="rotate(150 316 150)"/></mask></defs>
<path class="emb-c" mask="url(#pen)" fill-rule="evenodd" d="M310 12a140 140 0 1 0 .1 0zM322 22a124 124 0 1 1-.1 0z"/>
<circle class="emb-r" cx="314" cy="150" r="110" fill="none" stroke-width="1.2" pathLength="1" transform="rotate(-60 314 150)"/>
<path class="emb-w" pathLength="1" fill="none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" d="M12 214C70 222 140 214 182 190C200 180 212 141 220 108C225 87 234 84 232 108C229 141 224 171 218 204C230 147 248 93 264 93C280 93 276 141 270 204C282 147 300 93 318 93C334 93 330 147 322 186C318 207 328 213 338 198C350 180 358 150 364 123C368 105 378 99 384 111C388 120 398 117 406 105C400 138 394 174 390 204C398 172 418 152 444 156C484 162 530 204 590 190"/></svg>`;
export default (c, { publish = false } = {}) => {
  const wa = c.whatsapp ? `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(c.waMessage)}` : "";
  const tel = "tel:" + c.phone.replace(/[^+\d]/g, "");
  const ld = { "@context": "https://schema.org", "@type": "BeautySalon", name: c.name, telephone: c.phone, address: c.address, ...(c.url && { url: c.url }) };
  const btn = (cls = "", t) => wa ? `<a class="btn ${cls}" href="${wa}">${t || "Scrivi su WhatsApp"}</a>` : `<a class="btn ${cls}" href="${tel}">${t || "Chiama per prenotare"}</a>`;
  const groups = [...new Set(c.services.map((s) => s.g || ""))];
  const listino = groups.map((g) => `<div class="grp">${g ? `<h3>${esc(g)}</h3>` : ""}<ul class="svc">${c.services.filter((s) => (s.g || "") === g).map((s) => `<li><span class="nm"><b>${esc(s.n)}</b>${s.d ? `<small>${esc(s.d)}</small>` : ""}</span><i aria-hidden="true"></i><span class="pr">${esc(s.p)}</span></li>`).join("")}</ul></div>`).join("");
  const about = (Array.isArray(c.about) ? c.about : [c.about]).map((p) => `<p>${esc(p)}</p>`).join("");
  const foto = c.photos.map((p) => `<img src="${esc(p.src)}" alt="${esc(p.alt)}" width="${p.w}" height="${p.h}" loading="lazy">`).join("");
  const tabs = [["tratt", c.servicesTitle], ["studio", "Lo studio"], ["orari", "Orari e dove"]];
  return `<!doctype html>
<html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.name)}, studio estetico a ${esc(c.city)}</title><meta name="description" content="${esc(c.description)}">
${publish ? "" : '<meta name="robots" content="noindex,nofollow">'}
<meta property="og:title" content="${esc(c.name)}"><meta property="og:description" content="${esc(c.description)}"><meta name="theme-color" content="#121115">
<link rel="preload" href="fonts/cormorant-garamond-latin-500-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="style.css"><script type="application/ld+json">${JSON.stringify(ld)}</script></head><body>
${c.demo ? '<p class="demo">Bozza di proposta, contenuti da completare insieme</p>' : ""}
<header class="top"><div class="w bar"><a class="logo" href="#top"><span class="mono" aria-hidden="true">mr</span><span>${esc(c.short)}<em>beauty &amp; co.</em></span></a><p class="stato" data-stato hidden></p>${btn("sm", wa ? "WhatsApp" : "Chiama")}</div></header>
<main id="top">
<section class="hero"><div class="riflesso" aria-hidden="true"></div><div class="w hero-in">
<div class="hero-t"><p class="kick rv">Studio estetico · ${esc(c.city)}</p>
<h1><span class="ln"><span>${esc(c.short)}</span></span><span class="ln sc"><span>beauty &amp; co.</span></span></h1>
<p class="lead rv">${esc(c.tagline)}</p>
<p class="row rv">${btn()}<a class="ph" href="${tel}">${esc(c.phone)}</a></p></div>
<div class="hero-e">${emblem}</div></div>
<p class="w scendi rv" aria-hidden="true"><span></span>Trattamenti, studio, orari</p></section>
<section class="w box" id="schede" aria-label="Informazioni sullo studio">
<div class="tabs" role="tablist" aria-label="Sezioni">${tabs.map(([id, t], i) => `<button type="button" role="tab" id="t-${id}" aria-controls="p-${id}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ""}>${esc(t)}</button>`).join("")}<span class="ind" aria-hidden="true"></span></div>
<div class="panel" role="tabpanel" id="p-tratt" aria-labelledby="t-tratt"><h2>${esc(c.servicesTitle)}</h2><div class="cols">${listino}</div>${c.note ? `<p class="note">${esc(c.note)}</p>` : ""}</div>
<div class="panel" role="tabpanel" id="p-studio" aria-labelledby="t-studio"><h2>Lo studio</h2><div class="about">${about}</div>${foto ? `<div class="gal">${foto}</div>` : ""}${c.zone.length ? `<p class="zone">${c.zone.map((z) => `<span>${esc(z)}</span>`).join("")}</p>` : ""}</div>
<div class="panel" role="tabpanel" id="p-orari" aria-labelledby="t-orari"><h2>Orari e dove</h2><div class="cols2"><table class="hrs">${c.hours.map((h, i) => `<tr data-day="${(i + 1) % 7}"><th scope="row">${esc(h[0])}</th><td>${esc(h[1])}</td></tr>`).join("")}</table>
<div class="dove"><p class="addr">${esc(c.address)}</p><p><a class="lnk2" href="${esc(c.mapsUrl)}">Apri su Google Maps <span aria-hidden="true">↗</span></a></p><p class="row">${btn()}</p></div></div></div>
</section></main>
<footer class="foot"><p class="firma w" aria-hidden="true">${esc(c.short)}</p><div class="w fbar"><span>${esc(c.legal.ragione)} · P.IVA ${esc(c.legal.piva)}${c.legal.rea ? " · REA " + esc(c.legal.rea) : ""}</span><span><button type="button" class="lnk" data-d="dPriv">Privacy</button> · <button type="button" class="lnk" data-d="dCook">Cookie</button></span></div></footer>
${legal(c)}<script src="app.js"></script></body></html>`;
};
