# Sito del cliente: piano Vetrina
Cliente: Monica Ricci beauty & co., studio estetico, Roncadelle (BS). Stato: DEMO (bozza di proposta).

## Tipo e stile
- Tipo: V3 listino a schede (Trattamenti, Lo studio, Orari e dove).
- Stile: «Vetrina di sera» (scuro). Colori: notte #121115, vetro #1b1a20, gesso #ece7e1, fumo #9a96a3, lilla #aaa4dc. Caratteri: Cormorant Garamond (titoli), Hanken Grotesk (testo), Allura (accenti). Animazioni: cerchio lilla dipinto a pennello, «mr» scritto a mano in SVG, riflesso sul vetro, luce che segue il puntatore, stato «aperto ora» dagli orari. Rispettano «riduci movimento».
- Idea guida: il cerchio lilla e il monogramma «mr» della vetrina, ridisegnati in SVG.
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
- Font (SIL Open Font License 1.1, da @fontsource): Cormorant Garamond 500 normale e corsivo, Allura 400, Hanken Grotesk 400 e 600.
- Emblema «mr» e cerchio: SVG disegnato per il sito, ispirato all'insegna del cliente.
- Skill: nessuna in `.claude/skills/`.
