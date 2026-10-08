// Apre e chiude le finestre Privacy e Cookie. Nessun cookie, nessuna richiesta esterna.
document.addEventListener("click", (e) => {
  const o = e.target.closest("[data-d]");
  if (o) { e.preventDefault(); document.querySelectorAll("dialog[open]").forEach((d) => d.close()); document.getElementById(o.dataset.d).showModal(); return; }
  if (e.target.closest("[data-x]")) { e.target.closest("dialog").close(); return; }
  if (e.target.tagName === "DIALOG") e.target.close();
});
