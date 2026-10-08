// Testi legali standard (informativa privacy e cookie per sito senza cookie, solo WhatsApp e telefono).
// Da far rivedere a un professionista [verificare] prima della pubblicazione.
const dlg = (id, t, h) => `<dialog id="${id}" aria-labelledby="${id}T"><div class="dl-in"><h3 id="${id}T">${t}</h3>${h}<p><button type="button" class="dl-x" data-x>Chiudi</button></p></div></dialog>`;
export default (c) => {
  const L = c.legal, T = `${L.ragione}, ${c.address}, P.IVA ${L.piva}${L.rea ? ", REA " + L.rea : ""}.`;
  return dlg("dPriv", "Informativa sulla privacy", `
<p><b>Titolare del trattamento:</b> ${T} Contatto: ${L.contatto}.</p>
<p><b>Quali dati.</b> Questo sito non usa cookie di profilazione, non ha statistiche sui visitatori e non ha moduli che salvano dati. Il fornitore dell'hosting registra dati tecnici di navigazione, come l'indirizzo IP, necessari a far funzionare e a proteggere il sito.</p>
<p><b>WhatsApp e chiamate.</b> I pulsanti aprono l'app dell'utente (WhatsApp o telefono) con un messaggio già scritto o il numero già composto. Il sito non riceve e non salva questi dati. Se l'utente invia un messaggio, il titolare lo riceve su WhatsApp, con le regole di WhatsApp (Meta), e lo usa solo per rispondere.</p>
<p><b>Finalità e base giuridica.</b> Rispondere alle richieste (misure precontrattuali o contratto, art. 6.1.b GDPR) e garantire la sicurezza del sito (legittimo interesse, art. 6.1.f).</p>
<p><b>Conservazione.</b> I messaggi sono conservati per il tempo necessario a gestire la richiesta. I dati tecnici sono conservati dal fornitore dell'hosting nei tempi previsti dalle sue condizioni.</p>
<p><b>Destinatari.</b> Il fornitore dell'hosting (Cloudflare, Inc.) e, per i messaggi, WhatsApp (Meta). Possono trattare dati anche fuori dallo Spazio economico europeo, con le garanzie previste dalla legge.</p>
<p><b>Diritti.</b> L'interessato può chiedere accesso, rettifica, cancellazione, limitazione, opposizione e portabilità (artt. 15-22 GDPR) scrivendo al contatto sopra, e può proporre reclamo al Garante per la protezione dei dati personali (garanteprivacy.it). Non esiste alcun processo decisionale automatizzato.</p>`)
  + dlg("dCook", "Cookie policy", `
<p><b>Questo sito non usa cookie.</b> Non installa cookie di profilazione, analitici o di terze parti, e per questo non mostra il banner del consenso.</p>
<p><b>Cookie tecnici.</b> Il fornitore dell'hosting può usare strumenti strettamente necessari al funzionamento e alla sicurezza del sito, che non richiedono consenso.</p>
<p><b>Servizi di terzi.</b> Il sito contiene collegamenti a servizi esterni (Google Maps, WhatsApp). Aprendoli l'utente lascia il sito e valgono le regole di quei servizi.</p>
<p><b>Gestione.</b> L'utente può cancellare o bloccare i cookie dalle impostazioni del browser.</p>
<p>Titolare: ${T} Vedi anche l'<button type="button" class="lnk" data-d="dPriv">informativa sulla privacy</button>.</p>`);
};
