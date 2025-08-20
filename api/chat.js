// api/chat.js — same as previous polished version
export default function handler(req, res) {
  const method = (req.method || 'GET').toUpperCase();
  const payload = method === 'POST' ? (req.body || {}) : (req.query || {});
  const textRaw = (payload.value || payload.text || '').toString();
  const text = textRaw.trim().toLowerCase();

  const faqs = {
    1: "VANA Chat is een AI-gestuurde chatbot die 24/7 klantvragen beantwoordt via je website of WhatsApp. Getraind op jouw FAQ’s en info.",
    2: "Geschikt voor mkb: restaurants, praktijken, salons, webshops, advies en andere dienstverleners met veel herhaalvragen.",
    3: "Starter: €500 set‑up + €100/maand onderhoud. Inclusief training, integratie en maandelijkse monitoring. Uitbreidingen mogelijk.",
    4: "Doorgaans binnen ~1 week live na intake → bouw & branding → integratie → test → livegang.",
    5: "Set‑up: we verzamelen FAQ’s, openingstijden, diensten en prijzen; bouwen de bot; stemmen tone‑of‑voice af; en integreren technisch.",
    6: "Onderhoud: prestatiecheck, updates (tijden/prijzen), en kleine uitbreidingen.",
    7: "Ja, via doorverwijzing naar je boekingssysteem of automatisch via Zapier/Make in je agenda.",
    8: "Ja, naast je website koppelen we met WhatsApp Business en Facebook Messenger.",
    9: "Standaard NL; Engels/meertalig is mogelijk voor internationale klanten.",
    10:"We werken AVG/GDPR‑conform. Data wordt niet gebruikt om externe AI‑modellen te trainen.",
    11:"Als de bot het niet weet, e‑mail/CRM melding voor opvolging of doorverwijzing naar formulier/telefoon.",
    12:"Schaalt van 10 tot 10.000+ gesprekken per maand; verwerking parallel.",
    13:"Zeker. Voeg later flows, integraties of kanalen toe (WhatsApp, Messenger, SMS).",
    14:"Samenwerking: Intake → Bouw & branding → Integratie → Test & live (±1 week). Daarna maandelijkse updates & monitoring."
  };

  const labels = {
      1:"1. Wat is VANA Chat?",
      2:"2. Voor wie geschikt?",
      3:"3. Prijzen",
      4:"4. Hoe snel live?",
      5:"5. Set‑up",
      6:"6. Onderhoud",
      7:"7. Reserveringen/afspraken?",
      8:"8. WhatsApp/Messenger?",
      9:"9. Meertalig?",
      10:"10. Veiligheid (AVG)",
      11:"11. Niet begrepen?",
      12:"12. Capaciteit",
      13:"13. Uitbreiden",
      14:"14. Samenwerking"
  };

  const faqButtons = Array.from({length:14}, (_,i)=>{
    const n = i+1;
    return { label: labels[n], value: "faq."+n };
  });

  const mainButtons = [
    { label: "FAQ", value: "faq" },
    { label: "Plan een demo", value: "demo" },
    { label: "Contact", value: "contact" }
  ];

  const reply = (say, buttons=[], extra={}) => res.status(200).json({ say, buttons, ...extra });

  if (text === "demo" || /plan.*demo/.test(text)) {
    return reply("Top! De demo‑planner opent in een nieuw tabblad. Heb je voorkeur voor datum/tijd?", mainButtons, { openDemo: true });
  }

  if (text === "faq" || text === "menu" || text === "terug") {
    return reply("Kies een vraag:", [...faqButtons, {label:"Plan demo", value:"demo"}]);
  }

  const m = text.match(/^faq\.(\d{1,2})$/) || text.match(/^(\d{1,2})$/);
  if (m) {
    const id = parseInt(m[1], 10);
    if (faqs[id]) {
      return reply(faqs[id], [
        { label: "← Terug naar FAQ", value: "faq" },
        { label: "Plan een demo", value: "demo" }
      ], { questionLabel: labels[id] });
    }
  }

  if (/prijs|kosten/.test(text)) return reply(faqs[3], [{label:"← FAQ", value:"faq"}, {label:"Plan demo", value:"demo"}], { questionLabel: labels[3] });
  if (/integratie|whatsapp|messenger/.test(text)) return reply(faqs[8], [{label:"← FAQ", value:"faq"}], { questionLabel: labels[8] });
  if (/veilig|avg|gdpr/.test(text)) return reply(faqs[10], [{label:"← FAQ", value:"faq"}], { questionLabel: labels[10] });

  if (text === "" || text === "start") {
    return reply("Welkom bij VANA Chat! Kies een optie of typ ‘FAQ’.", mainButtons);
  }

  return reply("Ik snap je vraag niet helemaal. Typ ‘FAQ’ of kies een optie.", mainButtons);
}
