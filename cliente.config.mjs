// TUTTI i dati del cliente stanno qui. I valori [DA COMPLETARE: ...] vanno sostituiti con dati veri.
export default {
  tipo: "V1",                       // V1 pagina lunga, V2 biglietto da visita, V3 listino a schede
  name: "[DA COMPLETARE: nome attività]",
  tagline: "[DA COMPLETARE: una frase che dice cosa fa e per chi]",
  description: "[DA COMPLETARE: descrizione per Google, 120-155 caratteri, con città e mestiere]",
  city: "Roncadelle",
  address: "[DA COMPLETARE: via e numero, CAP, Roncadelle (BS)]",
  phone: "+39 030 000 0000",        // numero visibile e per tel:
  whatsapp: "390300000000",         // solo cifre con prefisso, vuoto se non c'è WhatsApp
  waMessage: "Buongiorno, vi scrivo dal sito. Vorrei informazioni.",
  email: "",                        // facoltativo, link secondario
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Roncadelle",
  instagram: "",
  url: "",                          // dominio finale, con https://, solo alla pubblicazione
  about: "[DA COMPLETARE: chi siamo, 2-4 frasi con parole del cliente]",
  servicesTitle: "Listino",         // oppure Servizi, Menu
  services: [
    { n: "[DA COMPLETARE: voce]", p: "[DA COMPLETARE: prezzo]", d: "" },
  ],
  note: "",                         // nota sotto il listino, per esempio allergeni o «prezzi indicativi»
  zone: [],                         // zone servite, facoltativo
  hours: [["Lunedì-venerdì", "[DA COMPLETARE]"], ["Sabato", "[DA COMPLETARE]"], ["Domenica", "Chiuso"]],
  photos: [],                       // { src: "photos/nome.webp", alt: "descrizione", w: 1200, h: 800 }
  legal: { ragione: "[DA COMPLETARE: ragione sociale]", piva: "[DA COMPLETARE: P.IVA]", rea: "", contatto: "[DA COMPLETARE: email o PEC]" },
};
