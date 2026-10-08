// Controlli automatici. Uso: node tools/check.mjs [--publish]. Esce con errore se c'è un NON OK.
import fs from "node:fs";
import path from "node:path";
import cfg from "../cliente.config.mjs";
const PUB = process.argv.includes("--publish"), S = "site";
let bad = 0;
const ok = (c, m) => { console.log((c ? "OK      " : "NON OK  ") + m); if (!c) bad++; };
const ALLOWED = /^(https:\/\/(www\.)?(google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps|instagram\.com|facebook\.com)|https:\/\/wa\.me\/)/;
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const files = walk(S), pages = files.filter((f) => f.endsWith(".html"));
ok(pages.length > 0, "esiste almeno una pagina in site/");
let heavy = 0, ph = 0;
for (const f of files) if (!/\.(webp|avif|jpe?g|png)$/i.test(f)) heavy += fs.statSync(f).size;
ok(heavy < 1e6, `peso pagine, stili, script e font sotto 1 MB (${Math.round(heavy / 1024)} KB)`);
for (const f of pages) {
  const h = fs.readFileSync(f, "utf8"), n = path.basename(f) + ": ";
  ok(/<html[^>]*lang="it"/.test(h), n + "lang it");
  ok(/name="viewport"/.test(h), n + "viewport");
  ok(/<title>[^<]{3,}<\/title>/.test(h), n + "title");
  ok(/name="description" content="[^"]{20,}"/.test(h), n + "description");
  ok((h.match(/<h1[\s>]/g) || []).length === 1, n + "un solo h1");
  ok(!/<(?:script|img|iframe|source)[^>]+src="https?:/i.test(h) && !/<link[^>]+href="https?:/i.test(h) && !/@import|url\(\s*["']?https?:/i.test(h), n + "nessun caricamento esterno");
  const bl = [...h.matchAll(/<a [^>]*href="(https?:[^"]+)"/g)].map((m) => m[1]).filter((u) => !ALLOWED.test(u));
  ok(bl.length === 0, n + "link in uscita solo verso Maps, Instagram, Facebook, WhatsApp" + (bl.length ? " [" + bl.join(", ") + "]" : ""));
  ok([...h.matchAll(/<img\b[^>]*>/g)].every((m) => /\salt="/.test(m[0]) && /\swidth="/.test(m[0]) && /\sheight="/.test(m[0])), n + "immagini con alt, width e height");
  const ids = new Set([...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const broken = [...h.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]).filter((u) => !/^(https?:|tel:|mailto:|data:)/.test(u)).filter((u) => {
    if (u.startsWith("#")) return u.length > 1 && !ids.has(u.slice(1));
    return !fs.existsSync(path.join(path.dirname(f), u.split("#")[0].split("?")[0]));
  });
  ok(broken.length === 0, n + "link e file interni validi" + (broken.length ? " [" + broken.join(", ") + "]" : ""));
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let j; try { j = JSON.parse(m[1]); } catch { j = null; }
    ok(j && String(j.telephone || "").replace(/\D/g, "") === cfg.phone.replace(/\D/g, ""), n + "JSON-LD valido e telefono uguale a quello del sito");
  }
  const ni = /name="robots" content="[^"]*noindex/.test(h);
  ok(PUB ? !ni : ni, n + (PUB ? "noindex assente (pubblicazione)" : "noindex presente (anteprima)"));
  ph += (h.match(/\[DA COMPLETARE/g) || []).length;
}
for (const f of files.filter((f) => /\.(css|js)$/.test(f))) {
  const t = fs.readFileSync(f, "utf8");
  ok(!/@import|url\(\s*["']?https?:|https?:\/\/(?!www\.w3\.org)[^\s"')]+\.(js|css|woff2?)/.test(t), path.basename(f) + ": nessuna risorsa esterna");
  ok(!/document\.cookie|localStorage|sessionStorage/.test(t), path.basename(f) + ": nessun cookie o archivio locale");
}
const secret = walk(".").filter((f) => !/node_modules|\.git[\\/]|docs[\\/]|tools[\\/]|\.(woff2|png|jpe?g|webp|pdf)$/i.test(f)).filter((f) => /sk_live|BEGIN (RSA |EC )?PRIVATE KEY|api[_-]?key\s*[:=]\s*["'][A-Za-z0-9]{16,}/i.test(fs.readFileSync(f, "utf8")));
ok(secret.length === 0, "nessun segreto nei file" + (secret.length ? " [" + secret.join(", ") + "]" : ""));
// Sicurezza del codice (functions/, src/, site/*.js). Segnalazioni statiche: non sostituiscono una revisione.
const code = walk(".").filter((f) => /\.(m?js|ts)$/.test(f) && !/node_modules|^tools[\\/]/.test(f));
const bad2 = (re) => code.filter((f) => re.test(fs.readFileSync(f, "utf8")));
const list = (a) => (a.length ? " [" + a.join(", ") + "]" : "");
let x;
x = bad2(/\beval\(|new Function\(|document\.write\(/); ok(x.length === 0, "sicurezza: niente eval, new Function, document.write" + list(x));
x = bad2(/\.prepare\(\s*(`[^`]*\$\{|"[^"]*"\s*\+|'[^']*'\s*\+)/); ok(x.length === 0, "sicurezza: query SQL parametrizzate, mai concatenate" + list(x));
x = bad2(/Access-Control-Allow-Origin["']?\s*[:,]\s*["']\*/i); ok(x.length === 0, "sicurezza: nessun CORS aperto" + list(x));
x = bad2(/innerHTML\s*[+]?=/); if (x.length) console.log("AVVISO  innerHTML usato in" + list(x) + ": mai con dati dell'utente, usa textContent");
x = files.filter((f) => /service_role|sb_secret|sk_(live|test)_/.test(fs.readFileSync(f, "utf8")) && !/\.(woff2|png|jpe?g|webp)$/.test(f)); ok(x.length === 0, "sicurezza: nessuna chiave privata in site/" + list(x));
const posts = code.filter((f) => /onRequestPost|request\.method\s*===?\s*["']POST/.test(fs.readFileSync(f, "utf8")));
x = posts.filter((f) => !/headers\.get\(["']origin["']\)/i.test(fs.readFileSync(f, "utf8"))); ok(x.length === 0, "sicurezza: ogni POST controlla l'intestazione Origin" + list(x));
if (code.some((f) => /supabase/i.test(fs.readFileSync(f, "utf8")))) console.log("AVVISO  Supabase in uso: verifica Row Level Security su ogni tabella e prova con la sola chiave anon");
if (fs.existsSync("struttura.json")) {
  const T = JSON.parse(fs.readFileSync("struttura.json", "utf8")), par = {};
  for (const [p, ch] of Object.entries(T)) for (const c of ch) { ok(!par[c], `struttura: ${c} ha un solo genitore`); par[c] = p; }
  const names = new Set([...Object.keys(T), ...Object.values(T).flat()]);
  for (const p of pages.map((f) => path.relative(S, f))) ok(names.has(p), `struttura: ${p} è nell'albero (nessuna pagina orfana)`);
  for (const p of names) {
    if (!fs.existsSync(path.join(S, p))) { ok(false, `struttura: ${p} manca`); continue; }
    const h = fs.readFileSync(path.join(S, p), "utf8");
    const links = new Set([...h.matchAll(/<a [^>]*href="([^"#:]+\.html)(?:#[^"]*)?"/g)].map((m) => m[1]));
    const allowed = new Set([...(T[p] || []), ...(par[p] ? [par[p]] : [])]);
    const extra = [...links].filter((l) => !allowed.has(l) && l !== p);
    ok(extra.length === 0, `struttura: ${p} collega solo a figli e genitore` + (extra.length ? " [" + extra.join(", ") + "]" : ""));
    if (par[p]) ok(links.has(par[p]), `struttura: ${p} ha il pulsante per tornare a ${par[p]}`);
  }
}
if (PUB) ok(ph === 0, "nessun segnaposto [DA COMPLETARE]"); else if (ph) console.log(`AVVISO  ${ph} segnaposto [DA COMPLETARE] da compilare prima della pubblicazione`);
console.log(bad ? `\n${bad} controlli NON OK` : "\nTutti i controlli OK");
process.exit(bad ? 1 : 0);
