# Sito del cliente: piano Vetrina
Sito statico di una pagina. Tutti i dati stanno in `cliente.config.mjs`.

## Comandi
- `npm run build` costruisce `site/index.html` (anteprima con noindex).
- `npm run check` esegue i controlli automatici.
- `npm run publish:build` costruisce e controlla per la pubblicazione (toglie noindex, scrive sitemap e robots). Solo dopo il «pubblica» di Daniele.

## Dove si cambia cosa
- Dati del cliente: `cliente.config.mjs`.
- Impaginazione: `src/render.mjs`. Stile: `site/style.css`. Font: `site/fonts/`.
- Testi legali: `src/legal.mjs`.
- Foto: mettile in `materiali/`, ottimizzate in `site/photos/` (webp) e indicale in `photos`.

## Pubblicazione
Cloudflare Pages collegato a questo repository, cartella di output `site`, nessun comando di build (la cartella `site` è già costruita e va committata). Vedi `SETUP-CLIENTE.md`.

## Crediti e skill
Skill, licenze e versioni usate: vedi sezione sotto, da aggiornare.
