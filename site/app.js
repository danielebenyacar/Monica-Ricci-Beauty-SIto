// Schede, stato aperto/chiuso dagli orari, piccoli movimenti, finestre Privacy e Cookie.
// Nessun cookie, nessuna richiesta esterna.
const D = document, root = D.documentElement;
root.classList.add("js");
const quiet = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Schede con indicatore che scorre
const tabs = [...D.querySelectorAll("[role=tab]")], ind = D.querySelector(".ind");
const place = (t) => { if (ind) { ind.style.setProperty("--ix", t.offsetLeft + "px"); ind.style.setProperty("--iw", t.offsetWidth + "px"); } };
const show = (t, focus) => {
  tabs.forEach((b) => {
    const on = b === t, p = D.getElementById(b.getAttribute("aria-controls"));
    b.setAttribute("aria-selected", on); b.tabIndex = on ? 0 : -1; p.hidden = !on; p.classList.toggle("on", on);
  });
  place(t); if (focus) t.focus();
};
if (tabs.length) { show(tabs[0]); D.fonts?.ready.then(() => place(D.querySelector("[aria-selected=true]"))); addEventListener("resize", () => place(D.querySelector("[aria-selected=true]"))); }
D.querySelector("[role=tablist]")?.addEventListener("keydown", (e) => {
  const i = tabs.indexOf(D.activeElement), k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
  if (i < 0 || !k) return;
  e.preventDefault(); show(tabs[(i + k + tabs.length) % tabs.length], true);
});

// Orari: giorno di oggi e stato «aperto ora»
const now = new Date(), day = now.getDay(), min = now.getHours() * 60 + now.getMinutes();
const span = (d) => { const m = D.querySelector(`tr[data-day="${d}"] td`)?.textContent.match(/(\d+):(\d+)\D+(\d+):(\d+)/); return m && [m[1] * 60 + +m[2], m[3] * 60 + +m[4], m[1] + ":" + m[2], m[3] + ":" + m[4]]; };
D.querySelector(`tr[data-day="${day}"]`)?.classList.add("oggi");
const st = D.querySelector("[data-stato]");
if (st && D.querySelector("tr[data-day]")) {
  const t = span(day), names = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
  if (t && min >= t[0] && min < t[1]) { st.textContent = "Aperto ora · fino alle " + t[3]; st.classList.add("aperto"); }
  else {
    let d = day, k = 0, n;
    if (t && min < t[0]) n = [day, t]; else while (k++ < 7) { d = (d + 1) % 7; const s = span(d); if (s) { n = [d, s]; break; } }
    st.textContent = n ? `Chiuso · riapre ${n[0] === day ? "oggi" : n[0] === (day + 1) % 7 ? "domani" : names[n[0]]} alle ${n[1][2]}` : "Chiuso";
  }
  st.hidden = false;
}

// Intestazione che si fa vetro allo scorrimento, comparsa delle schede
const head = D.querySelector(".top");
addEventListener("scroll", () => head.classList.toggle("su", scrollY > 30), { passive: true });
const box = D.querySelector(".box");
if (box && "IntersectionObserver" in window && !quiet) {
  box.classList.add("sv");
  new IntersectionObserver((es, o) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); o.disconnect(); } }), { threshold: .12 }).observe(box);
}

// Luce lilla che segue il puntatore e leggero movimento dell'emblema
const hero = D.querySelector(".hero"), emb = D.querySelector(".hero-e");
if (hero && !quiet && matchMedia("(pointer:fine)").matches) {
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    hero.style.setProperty("--mx", x * 100 + "%"); hero.style.setProperty("--my", y * 100 + "%");
    emb?.style.setProperty("--px", (x - .5) * 18 + "px"); emb?.style.setProperty("--py", (y - .5) * 14 + "px");
  });
}

// Finestre Privacy e Cookie
D.addEventListener("click", (e) => {
  const t = e.target.closest("[role=tab]");
  if (t) { show(t); return; }
  const o = e.target.closest("[data-d]");
  if (o) { e.preventDefault(); D.querySelectorAll("dialog[open]").forEach((d) => d.close()); D.getElementById(o.dataset.d).showModal(); return; }
  if (e.target.closest("[data-x]")) { e.target.closest("dialog").close(); return; }
  if (e.target.tagName === "DIALOG") e.target.close();
});
