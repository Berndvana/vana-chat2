  export default function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
    const text = (req.body?.text || "").toLowerCase();

    const answers = [
      { k: /faq|menu/, a: "Kies een onderwerp:
• Wat is VANA Chat?
• Voor wie is het geschikt?
• Prijzen
• Snel live
• Integraties
• Veiligheid
Typ bv. 'prijzen' of klik op een knop." },
      { k: /wat is/, a: "VANA Chat is een AI-gestuurde chatbot die 24/7 klantvragen beantwoordt via je site of WhatsApp." },
      { k: /voor wie|geschikt/, a: "Geschikt voor MKB: salons, praktijken, horeca, webshops en dienstverleners met terugkerende vragen." },
      { k: /prijs|kosten|kost/, a: "Starter: €500 set‑up + €100/maand onderhoud. Uitbreidingen mogelijk." },
      { k: /snel|live/, a: "Meestal binnen ~1 week live na intake, bouw en test." },
      { k: /integratie|whatsapp|messenger/, a: "Werkt op website, WhatsApp Business en Facebook Messenger. Koppelingen via Zapier/Make." },
      { k: /veilig|avg|gdpr/, a: "We werken AVG/GDPR-conform; data wordt niet gebruikt om externe modellen te trainen." },
      { k: /demo|afspraak/, a: "Plan direct een demo: https://calendly.com/d/cv46-k7m-n2f" }
    ];

    let reply = "Ik snap het niet helemaal. Typ 'FAQ', of vraag bv. naar 'prijzen' of 'integraties'.";
    for (const r of answers) { if (r.k.test(text)) { reply = r.a; break; } }

    return res.status(200).json({ reply });
  }
