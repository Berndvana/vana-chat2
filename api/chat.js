// api/chat.js — v10: FAQ categories and Q&A (hardcoded)
// This endpoint accepts POST { text, value } or GET and returns
// { message, options: [{label, value}], meta: { categories, category, questionLabel } }

const DATA = [
  {
    "name": "Product & werking",
    "items": [
      {
        "q": "Wat is VANA Chat?",
        "a": "VANA Chat is een AI-gestuurde chatbot die jouw klantvragen automatisch beantwoordt via je website of WhatsApp. Getraind op jouw FAQ’s en info."
      },
      {
        "q": "Hoe snel staat mijn chatbot live?",
        "a": "Binnen 1 week is jouw chatbot volledig online. Jij levert de basisinfo aan, wij regelen de techniek."
      },
      {
        "q": "Voor wie is VANA Chat geschikt?",
        "a": "Perfect voor restaurants, tandartsen, webshops, coaches en eigenlijk elk bedrijf dat vaak dezelfde vragen krijgt."
      },
      {
        "q": "Wat doet de chatbot precies?",
        "a": "Hij beantwoordt FAQ’s, verzamelt leads en kan zelfs reserveringen of afspraken plannen."
      },
      {
        "q": "Wat als de bot iets niet weet?",
        "a": "Dan stuurt de bot de vraag automatisch door naar jouw e-mail of telefoon. Zo mis je niets."
      },
      {
        "q": "Kan ik de chatbot zelf aanpassen?",
        "a": "Ja, je kunt makkelijk nieuwe antwoorden toevoegen. Wij helpen je hierbij."
      },
      {
        "q": "Werkt dit ook op mobiel?",
        "a": "Ja, de chatbot is volledig mobielvriendelijk."
      },
      {
        "q": "Kan de bot ook reserveringen of afspraken plannen?",
        "a": "Ja, we kunnen hem koppelen aan jouw agenda of reserveringssysteem."
      }
    ]
  },
  {
    "name": "Prijzen & abonnement",
    "items": [
      {
        "q": "Wat kost VANA Chat?",
        "a": "Eenmalige setup €500, maandelijkse onderhoudskosten €100."
      },
      {
        "q": "Zit ik ergens aan vast?",
        "a": "Nee, je kunt maandelijks opzeggen."
      },
      {
        "q": "Kan ik tussentijds stoppen?",
        "a": "Ja, je zit nergens aan vast."
      },
      {
        "q": "Wat zit er in de setup-prijs inbegrepen?",
        "a": "Ontwikkeling van de bot, training op jouw data, integratie op website of WhatsApp."
      },
      {
        "q": "Wat zit er in het maandabonnement inbegrepen?",
        "a": "Monitoring, updates, verbeteringen en support."
      },
      {
        "q": "Komen er nog extra kosten bij?",
        "a": "Alleen als je speciale integraties wilt (zoals koppeling met CRM)."
      }
    ]
  },
  {
    "name": "Integratie & techniek",
    "items": [
      {
        "q": "Kan de chatbot ook via WhatsApp werken?",
        "a": "Ja, we koppelen hem eenvoudig aan WhatsApp."
      },
      {
        "q": "Kan ik de chatbot ook in Facebook Messenger gebruiken?",
        "a": "Ja, integratie met meerdere platformen is mogelijk."
      },
      {
        "q": "Hoe werkt de integratie op mijn website?",
        "a": "Via een eenvoudig script dat wij voor je plaatsen."
      },
      {
        "q": "Heb ik technische kennis nodig?",
        "a": "Nee, wij regelen alles voor je."
      },
      {
        "q": "Werkt de chatbot samen met mijn CRM/e-mail?",
        "a": "Ja, via Zapier of API’s kunnen we koppelingen maken."
      },
      {
        "q": "Is mijn data veilig?",
        "a": "Zeker, we gebruiken veilige AI-systemen."
      },
      {
        "q": "Welke talen ondersteunt de chatbot?",
        "a": "Nederlands en Engels standaard, andere talen op aanvraag."
      }
    ]
  },
  {
    "name": "Human touch / fun",
    "items": [
      {
        "q": "Ben jij een robot?",
        "a": "Haha klopt, maar wel een slimme die nooit moe wordt en altijd vriendelijk blijft."
      },
      {
        "q": "Drink jij ook koffie?",
        "a": "Was dat maar zo! Ik draai 24/7 op pure wifi-energie ☕⚡."
      },
      {
        "q": "Kan ik jou ook inhuren?",
        "a": "Dat kan, maar alleen samen met mijn baas: VANA Chat 😉."
      },
      {
        "q": "Heb jij humor?",
        "a": "Alleen als je van flauwe AI-grapjes houdt."
      },
      {
        "q": "Wat doe je als je iets niet weet?",
        "a": "Dan vraag ik hulp aan een échte mens. Slim hè?"
      },
      {
        "q": "Heb jij collega’s?",
        "a": "Zeker, ik heb een hele familie van bots die allemaal voor bedrijven werken."
      }
    ]
  },
  {
    "name": "Alle (bevat alle vragen)",
    "items": [
      {
        "q": "Wat is VANA Chat?",
        "a": "VANA Chat is een AI-gestuurde chatbot die jouw klantvragen automatisch beantwoordt via je website of WhatsApp. Getraind op jouw FAQ’s en info."
      },
      {
        "q": "Hoe snel staat mijn chatbot live?",
        "a": "Binnen 1 week is jouw chatbot volledig online. Jij levert de basisinfo aan, wij regelen de techniek."
      },
      {
        "q": "Voor wie is VANA Chat geschikt?",
        "a": "Perfect voor restaurants, tandartsen, webshops, coaches en eigenlijk elk bedrijf dat vaak dezelfde vragen krijgt."
      },
      {
        "q": "Wat doet de chatbot precies?",
        "a": "Hij beantwoordt FAQ’s, verzamelt leads en kan zelfs reserveringen of afspraken plannen."
      },
      {
        "q": "Wat als de bot iets niet weet?",
        "a": "Dan stuurt de bot de vraag automatisch door naar jouw e-mail of telefoon. Zo mis je niets."
      },
      {
        "q": "Kan ik de chatbot zelf aanpassen?",
        "a": "Ja, je kunt makkelijk nieuwe antwoorden toevoegen. Wij helpen je hierbij."
      },
      {
        "q": "Werkt dit ook op mobiel?",
        "a": "Ja, de chatbot is volledig mobielvriendelijk."
      },
      {
        "q": "Kan de bot ook reserveringen of afspraken plannen?",
        "a": "Ja, we kunnen hem koppelen aan jouw agenda of reserveringssysteem."
      },
      {
        "q": "Wat kost VANA Chat?",
        "a": "Eenmalige setup €500, maandelijkse onderhoudskosten €100."
      },
      {
        "q": "Zit ik ergens aan vast?",
        "a": "Nee, je kunt maandelijks opzeggen."
      },
      {
        "q": "Kan ik tussentijds stoppen?",
        "a": "Ja, je zit nergens aan vast."
      },
      {
        "q": "Wat zit er in de setup-prijs inbegrepen?",
        "a": "Ontwikkeling van de bot, training op jouw data, integratie op website of WhatsApp."
      },
      {
        "q": "Wat zit er in het maandabonnement inbegrepen?",
        "a": "Monitoring, updates, verbeteringen en support."
      },
      {
        "q": "Komen er nog extra kosten bij?",
        "a": "Alleen als je speciale integraties wilt (zoals koppeling met CRM)."
      },
      {
        "q": "Kan de chatbot ook via WhatsApp werken?",
        "a": "Ja, we koppelen hem eenvoudig aan WhatsApp."
      },
      {
        "q": "Kan ik de chatbot ook in Facebook Messenger gebruiken?",
        "a": "Ja, integratie met meerdere platformen is mogelijk."
      },
      {
        "q": "Hoe werkt de integratie op mijn website?",
        "a": "Via een eenvoudig script dat wij voor je plaatsen."
      },
      {
        "q": "Heb ik technische kennis nodig?",
        "a": "Nee, wij regelen alles voor je."
      },
      {
        "q": "Werkt de chatbot samen met mijn CRM/e-mail?",
        "a": "Ja, via Zapier of API’s kunnen we koppelingen maken."
      },
      {
        "q": "Is mijn data veilig?",
        "a": "Zeker, we gebruiken veilige AI-systemen."
      },
      {
        "q": "Welke talen ondersteunt de chatbot?",
        "a": "Nederlands en Engels standaard, andere talen op aanvraag."
      },
      {
        "q": "Ben jij een robot?",
        "a": "Haha klopt, maar wel een slimme die nooit moe wordt en altijd vriendelijk blijft."
      },
      {
        "q": "Drink jij ook koffie?",
        "a": "Was dat maar zo! Ik draai 24/7 op pure wifi-energie ☕⚡."
      },
      {
        "q": "Kan ik jou ook inhuren?",
        "a": "Dat kan, maar alleen samen met mijn baas: VANA Chat 😉."
      },
      {
        "q": "Heb jij humor?",
        "a": "Alleen als je van flauwe AI-grapjes houdt."
      },
      {
        "q": "Wat doe je als je iets niet weet?",
        "a": "Dan vraag ik hulp aan een échte mens. Slim hè?"
      },
      {
        "q": "Heb jij collega’s?",
        "a": "Zeker, ik heb een hele familie van bots die allemaal voor bedrijven werken."
      }
    ]
  }
];

function reply(message, options = [], meta = {}) {
  return { message, options, meta };
}

function getCategories() {
  return DATA.map(c => c.name);
}

function getCategoryByName(name) {
  return DATA.find(c => c.name === name) || DATA[0];
}

function buildQuestionOptions(catName) {
  const cat = getCategoryByName(catName);
  const opts = [{ label: "← Terug naar FAQ", value: "faq" }];
  cat.items.forEach((item, idx) => opts.push({ label: item.q, value: `q:${cat.name}:${idx}` }));
  return { opts, cat };
}

module.exports = async function handler(req, res) {
  try {
    const method = req.method || "GET";
    const body = method === "POST" ? (typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {})) : (req.query || {});
    const text = (body.text || "").toString().trim().toLowerCase();
    const value = (body.value || "").toString();

    const categories = getCategories();

    // Start / FAQ root
    if (!value || value === "faq" || /^(faq|start|menu|help)$/.test(text)) {
      const catName = "Alle (bevat alle vragen)";
      const { opts } = buildQuestionOptions(catName);
      return res.status(200).json(reply("Kies een vraag:", opts, { categories, category: catName }));
    }

    // Category chosen
    if (value.startsWith("cat:")) {
      const catName = value.slice(4);
      const { opts } = buildQuestionOptions(catName);
      return res.status(200).json(reply("Kies een vraag:", opts, { categories, category: catName }));
    }

    // Question chosen
    if (value.startsWith("q:")) {
      const parts = value.split(":");
      const catName = parts[1];
      const idx = parseInt(parts[2], 10) || 0;
      const cat = getCategoryByName(catName);
      const item = cat.items[idx] || cat.items[0];
      return res.status(200).json(reply(item.a, [
        { label: "← Terug naar FAQ", value: "faq" }
      ], { categories, category: catName, questionLabel: item.q }));
    }

    // Unknown → show root
    const catName = "Alle (bevat alle vragen)";
    const { opts } = buildQuestionOptions(catName);
    return res.status(200).json(reply("Welkom bij VANA Chat! Kies een optie of typ ‘FAQ’.", opts, { categories, category: catName }));
  } catch (e) {
    console.error(e);
    return res.status(200).json(reply("Er ging iets mis. Typ ‘FAQ’ om opnieuw te beginnen.", [
      { label: "FAQ", value: "faq" }
    ]));
  }
};
