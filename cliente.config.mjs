// TUTTI i dati del cliente stanno qui. I valori [DA COMPLETARE: ...] vanno sostituiti con dati veri.
// [DEMO] Bozza di proposta: listino, testi e dati legali sono di esempio. Dati reali (pubblici, forniti da Daniele): nome, telefono, indirizzo, orari.
export default {
  tipo: "V3",                       // V1 pagina lunga, V2 biglietto da visita, V3 listino a schede
  demo: true,                       // [DEMO] mostra la striscia «Bozza di proposta». Mettere false quando i dati sono veri.
  name: "Monica Ricci beauty & co.",
  short: "Monica Ricci",
  tagline: "Viso, mani, piedi ed epilazione in via Marconi a Roncadelle. Si lavora su appuntamento, con calma.", // [DEMO] da confermare con Monica
  description: "Monica Ricci beauty & co., studio estetico a Roncadelle (BS), via Marconi 7: trattamenti viso, manicure, pedicure, epilazione. Su appuntamento.",
  city: "Roncadelle",
  address: "Via Guglielmo Marconi 7, 25030 Roncadelle (BS)",
  phone: "+39 338 495 7499",        // numero visibile e per tel:
  whatsapp: "",                     // da confermare: se il numero ha WhatsApp si può passare al pulsante WhatsApp
  waMessage: "Buongiorno, vi scrivo dal sito. Vorrei prenotare un appuntamento.",
  email: "",                        // facoltativo, link secondario
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Monica+Ricci+beauty+%26+co.+Via+Guglielmo+Marconi+7+Roncadelle",
  instagram: "",
  url: "",                          // dominio finale, con https://, solo alla pubblicazione
  about: [                          // [DEMO] testo di esempio, da riscrivere con le parole di Monica
    "Lo studio è in via Marconi, a Roncadelle: lo riconosci dalla vetrina con il monogramma «mr» e il cerchio lilla.",
    "Ogni trattamento è su appuntamento, così il tempo è tutto tuo: niente attese, niente fretta tra una cliente e l'altra.",
  ],
  servicesTitle: "Trattamenti",
  services: [                       // [DEMO] voci e prezzi di esempio, da sostituire con il listino vero. g = gruppo
    { g: "Viso", n: "Pulizia del viso", p: "50 €", d: "Detersione, vapore, estrazione e maschera" },
    { g: "Viso", n: "Trattamento idratante", p: "60 €", d: "" },
    { g: "Viso", n: "Laminazione ciglia", p: "55 €", d: "Con tinta inclusa" },
    { g: "Viso", n: "Sopracciglia", p: "10 €", d: "Definizione con pinzetta o cera" },
    { g: "Mani e piedi", n: "Manicure", p: "20 €", d: "" },
    { g: "Mani e piedi", n: "Semipermanente mani", p: "30 €", d: "" },
    { g: "Mani e piedi", n: "Ricostruzione in gel", p: "55 €", d: "Refill 45 €" },
    { g: "Mani e piedi", n: "Pedicure estetico", p: "30 €", d: "" },
    { g: "Mani e piedi", n: "Semipermanente piedi", p: "30 €", d: "" },
    { g: "Epilazione", n: "Gamba intera", p: "30 €", d: "" },
    { g: "Epilazione", n: "Mezza gamba", p: "20 €", d: "" },
    { g: "Epilazione", n: "Inguine", p: "12 €", d: "" },
    { g: "Epilazione", n: "Ascelle", p: "10 €", d: "" },
    { g: "Corpo", n: "Massaggio rilassante", p: "50 €", d: "50 minuti" },
    { g: "Corpo", n: "Massaggio linfodrenante", p: "60 €", d: "60 minuti" },
  ],
  note: "Listino di esempio per la bozza: voci e prezzi si confermano con lo studio.", // [DEMO]
  zone: [],                         // zone servite, facoltativo
  hours: [["Lunedì", "9:00-16:00"], ["Martedì", "9:00-21:00"], ["Mercoledì", "9:00-20:00"], ["Giovedì", "9:00-20:00"], ["Venerdì", "9:00-21:00"], ["Sabato", "9:00-17:00"], ["Domenica", "Chiuso"]],
  photos: [],                       // { src: "photos/nome.webp", alt: "descrizione", w: 1200, h: 800 }
  legal: { ragione: "Ragione sociale di esempio", piva: "00000000000 (esempio)", rea: "", contatto: "info@esempio.it (esempio)" }, // [DEMO] dati legali finti, da sostituire
};
