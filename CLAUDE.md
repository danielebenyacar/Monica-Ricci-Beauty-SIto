# Istruzioni per Claude Code: sito di un cliente (piano Vetrina)
Repository di UN solo cliente. Daniele Benyacar è il committente. Parla in italiano, diretto e breve.
Le regole complete sono in `docs/ISTRUZIONI.md`. Leggi solo le sezioni che ti servono (indice a inizio file), non tutto.

## Come si lavora
1. Leggi `cliente.config.mjs`, la scheda cliente e i materiali che Daniele ti dà. Chiedi UNA volta ciò che manca, con proposte. Chiedi 3-6 foto vere.
2. Chiedi a Daniele il tipo di sito (V1 pagina lunga con menu, V2 biglietto da visita, V3 listino a schede), con un consigliato, e poi lo stile (3 proposte).
3. Compila `cliente.config.mjs`, poi adatta `src/render.mjs` e `site/style.css` al cliente. Non riscrivere `tools/` né `src/legal.mjs`: sono già provati.
4. `npm run build` e `npm run check`. Screenshot solo prima schermata a 1280 e 390, una volta per giro, massimo 2 giri.
5. Mostra l'anteprima a Daniele e fermati. Pubblicare solo dopo il suo «pubblica» scritto.

## Regole non negoziabili
- Nessuna richiesta esterna: font nel repo, niente CDN, mappe, video o social incorporati. Nessun cookie, nessuna statistica.
- Mai inventare dati d'impresa, prezzi, orari, recensioni: usa `[DA COMPLETARE: cosa]` e scrivilo in SEGNAPOSTO.md. Eccezione: modalità DEMO, solo se Daniele scrive DEMO, con contenuti dichiarati come esempio.
- Un solo pulsante di contatto (WhatsApp o telefono). Nessun modulo.
- Privacy e Cookie restano dalle finestre del piè di pagina.
- Niente push, deploy, acquisti, email o account senza il sì di Daniele. Mai segreti in chat o nel repo.
- Foto mancanti: illustrazioni SVG, mai riquadri vuoti.
- Per tutto ciò che si fa fuori dal codice scrivi e aggiorna `SETUP-CLIENTE.md` con passi [CODE] / [DANIELE] / [CLIENTE].
- Lavora con poche letture e modifiche mirate (sezione «Economia di lavoro» in docs/ISTRUZIONI.md).

## Skill
Se presenti in `.claude/skills/`, usale (design-taste-frontend, output-skill, impeccable): leggi solo l'indice. Le regole di questo file vincono sempre.
