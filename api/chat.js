// api/chat.js — v9 patched: restore original UI (meta.categories + question chips)
function reply(message, options = [], meta = {}) {
  return { message, options, meta };
}

function buildData() {
  const cats = ["Alle", "Product & werking", "Prijzen & abonnement", "Integratie & techniek", "Human touch / fun"];
  const faqs = {
    1: { label: "Wat is VANA Chat?", a: "VANA Chat is een AI-gestuurde chatbot die jouw klantvragen automatisch beantwoordt via je website of WhatsApp. Getraind op jouw FAQ’s en info." },
    2: { label: "Hoe snel staat mijn chatbot live?", a: "Binnen 1 week is jouw chatbot volledig online. Jij levert de basisinfo aan, wij regelen de techniek." },
    3: { label: "Voor wie is VANA Chat geschikt?", a: "Perfect voor restaurants, tandartsen, webshops, coaches en eigenlijk elk bedrijf dat vaak dezelfde vragen krijgt." },
    4: { label: "Wat doet de chatbot precies?", a: "Hij beantwoordt FAQ’s, verzamelt leads en kan zelfs reserveringen of afspraken plannen." },
    5: { label: "Wat als de bot iets niet weet?", a: "Dan stuurt de bot de vraag automatisch door naar jouw e-mail of telefoon. Zo mis je niets." },
    6: { label: "Kan ik de chatbot zelf aanpassen?", a: "Ja, je kunt makkelijk nieuwe antwoorden toevoegen. Wij helpen je hierbij." },
    7: { label: "Werkt dit ook op mobiel?", a: "Ja, de chatbot is volledig mobielvriendelijk." },
    8: { label: "Kan de bot ook reserveringen of afspraken plannen?", a: "Ja, we kunnen hem koppelen aan jouw agenda of reserveringssysteem." },
    9: { label: "Wat kost VANA Chat?", a: "Eenmalige setup €500, maandelijkse onderhoudskosten €100." },
    10: { label: "Zit ik ergens aan vast?", a: "Nee, je kunt maandelijks opzeggen." },
    11: { label: "Kan ik tussentijds stoppen?", a: "Ja, je zit nergens aan vast." },
    12: { label: "Wat zit er in de setup-prijs inbegrepen?", a: "Ontwikkeling van de bot, training op jouw data, integratie op website of WhatsApp." },
    13: { label: "Wat zit er in het maandabonnement inbegrepen?", a: "Monitoring, updates, verbeteringen en support." },
    14: { label: "Komen er nog extra kosten bij?", a: "Alleen als je speciale integraties wilt (zoals koppeling met CRM)." },
    15: { label: "Kan de chatbot ook via WhatsApp werken?", a: "Ja, we koppelen hem eenvoudig aan WhatsApp." },
    16: { label: "Kan ik de chatbot ook in Facebook Messenger gebruiken?", a: "Ja, integratie met meerdere platformen is mogelijk." },
    17: { label: "Hoe werkt de integratie op mijn website?", a: "Via een eenvoudig script dat wij voor je plaatsen." },
    18: { label: "Heb ik technische kennis nodig?", a: "Nee, wij regelen alles voor je." },
    19: { label: "Werkt de chatbot samen met mijn CRM/e-mail?", a: "Ja, via Zapier of API’s kunnen we koppelingen maken." },
    20: { label: "Is mijn data veilig?", a: "Zeker, we gebruiken veilige AI-systemen." },
    21: { label: "Welke talen ondersteunt de chatbot?", a: "Nederlands en Engels standaard, andere talen op aanvraag." },
    22: { label: "Ben jij een robot?", a: "Haha klopt, maar wel een slimme die nooit moe wordt en altijd vriendelijk blijft." },
    23: { label: "Drink jij ook koffie?", a: "Was dat maar zo! Ik draai 24/7 op pure wifi-energie ☕⚡." },
    24: { label: "Kan ik jou ook inhuren?", a: "Dat kan, maar alleen samen met mijn baas: VANA Chat 😉." },
    25: { label: "Heb jij humor?", a: "Alleen als je van flauwe AI-grapjes houdt." },
    26: { label: "Wat doe je als je iets niet weet?", a: "Dan vraag ik hulp aan een échte mens. Slim hè?" },
    27: { label: "Heb jij collega’s?", a: "Zeker, ik heb een hele familie van bots die allemaal voor bedrijven werken." }
  };
  const sections = {
    "Product & werking": [1, 2, 3, 4, 5, 6, 7, 8],
    "Prijzen & abonnement": [9, 10, 11, 12, 13, 14],
    "Integratie & techniek": [15, 16, 17, 18, 19, 20, 21],
    "Human touch / fun": [22, 23, 24, 25, 26, 27],
    "Alle": [1, 2, 3, 4, 5, 6, 7, 8, 9]
  };
  return { cats, faqs, sections };
}

module.exports = function handler(req, res) {
  const { cats, faqs, sections } = buildData();
  const method = req.method || "GET";
  const body = method === "POST"
    ? (typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {}))
    : (req.query || {});

  const text = (body.text || "").toString().trim().toLowerCase();
  const value = (body.value || "").toString();

  function showCategory(catName) {
    const ids = sections[catName] || sections["Alle"];
    const opts = [{ label: "← Terug naar FAQ", value: "faq" }];
    ids.forEach(id => opts.push({ label: faqs[id].label, value: "q:"+id }));
    return reply("Kies een vraag:", opts, { categories: cats, category: catName });
  }

  if (!value || value === "faq" || /^(faq|menu|help|start)$/.test(text)) {
    return res.status(200).json(showCategory("Alle"));
  }

  if (value.startsWith("cat:")) {
    const catName = value.slice(4);
    return res.status(200).json(showCategory(catName));
  }

  if (value.startsWith("q:")) {
    const id = parseInt(value.slice(2), 10);
    const item = faqs[id];
    if (item) {
      return res.status(200).json(reply(item.a, [{ label: "← Terug naar FAQ", value: "faq" }], { categories: cats, category: "Alle", questionLabel: item.label }));
    }
  }

  return res.status(200).json(showCategory("Alle"));
};
