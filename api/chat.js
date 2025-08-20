// api/chat.js - Vercel serverless backend
export default function handler(req, res) {
  try {
    const method = (req.method || 'GET').toUpperCase();
    let text = '';
    if (method === 'POST') {
      text = (req.body && (req.body.text || req.body.message)) || '';
    } else {
      text = (req.query && (req.query.text || req.query.message)) || '';
    }
    const t = (text || '').toLowerCase();

    const replies = [
      { k: /faq|menu/, a: "Kies een onderwerp:\n• Wat is VANA Chat?\n• Voor wie is het geschikt?\n• Prijzen\n• Integraties\n• Veiligheid\nTyp bv. 'prijzen' of 'integraties'." },
      { k: /wat is|vana/, a: "VANA Chat is een AI‑gestuurde chatbot die 24/7 klantvragen beantwoordt via je site of WhatsApp." },
      { k: /prijs|kosten|kost/, a: "Starter: €500 set‑up + €100/maand onderhoud. Uitbreidingen mogelijk." },
      { k: /integratie|whatsapp|messenger/, a: "Beschikbaar voor website, WhatsApp Business en Facebook Messenger. Koppelingen via Zapier/Make." },
      { k: /veilig|avg|gdpr/, a: "We werken AVG/GDPR‑conform; data wordt niet gebruikt om externe modellen te trainen." },
      { k: /demo|afspraak|plan/, a: "Plan direct een demo: https://calendly.com/d/cv46-k7m-n2f" }
    ];

    let reply = "Ik snap je vraag niet helemaal. Typ 'FAQ' of vraag naar 'prijzen' of 'integraties'.";
    for (const r of replies) { if (r.k.test(t)) { reply = r.a; break; } }

    res.status(200).json({ ok: true, reply });
  } catch (e) {
    console.error("API error:", e);
    res.status(200).json({ ok: false, reply: "⚠️ Serverfout. Probeer later opnieuw." });
  }
}
