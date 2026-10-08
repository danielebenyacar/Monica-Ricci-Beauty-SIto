// Schede, giorno di oggi negli orari, finestre Privacy e Cookie. Nessun cookie, nessuna richiesta esterna.
document.documentElement.classList.add("js");
const tabs = [...document.querySelectorAll("[role=tab]")];
const show = (t, focus) => {
  tabs.forEach((b) => { const on = b === t; b.setAttribute("aria-selected", on); b.tabIndex = on ? 0 : -1; document.getElementById(b.getAttribute("aria-controls")).hidden = !on; });
  if (focus) t.focus();
};
if (tabs.length) show(tabs[0]);
document.querySelector("[role=tablist]")?.addEventListener("keydown", (e) => {
  const i = tabs.indexOf(document.activeElement), k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
  if (i < 0 || !k) return;
  e.preventDefault(); show(tabs[(i + k + tabs.length) % tabs.length], true);
});
document.querySelector(`tr[data-day="${new Date().getDay()}"]`)?.classList.add("oggi");
document.addEventListener("click", (e) => {
  const t = e.target.closest("[role=tab]");
  if (t) { show(t); return; }
  const o = e.target.closest("[data-d]");
  if (o) { e.preventDefault(); document.querySelectorAll("dialog[open]").forEach((d) => d.close()); document.getElementById(o.dataset.d).showModal(); return; }
  if (e.target.closest("[data-x]")) { e.target.closest("dialog").close(); return; }
  if (e.target.tagName === "DIALOG") e.target.close();
});
