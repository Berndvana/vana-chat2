// api/chat.js — v16: compatibility mode (multiple keys: text/message, options/choices/chips)
// Returns redundant keys so different UIs can read it without code changes.
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

function makePayload(text, options = [], meta = {}) {
  return {
    // primary
    text,
    options,
    meta,
    // redundant keys for compatibility
    message: text,
    choices: options,
    chips: options,
    data: meta
  };
}

const catNames = () => DATA.map(c => c.name);
const getCat = (name) => DATA.find(c => c.name === name) || DATA[0];
const catOpts = () => catNames().map(n => ({ label: n, value: `cat:${n}` }));
const qOpts = (cat) => [{ label: "← Terug naar FAQ", value: "faq" }, ...cat.items.map((it,i)=>({ label: it.q, value: `q:${cat.name}:${i}` }))];

module.exports = function handler(req, res) {
  try {
    const method = req.method || "GET";
    const body = method === "POST" ? (typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {})) : (req.query || {});
    const text = (body.text || "").toString().trim().toLowerCase();
    const value = (body.value || "").toString();
    const categories = catNames();

    // Root → show category chips immediately
    if (!value) {
      return res.status(200).json(makePayload("Kies een categorie of typ ‘FAQ’.", catOpts(), { categories, category: "Alle (bevat alle vragen)" }));
    }

    if (value === "faq" || /^(faq|menu|help)$/.test(text)) {
      return res.status(200).json(makePayload("Kies een categorie:", catOpts(), { categories, category: "Alle (bevat alle vragen)" }));
    }

    if (value.startsWith("cat:")) {
      const cat = getCat(value.slice(4));
      return res.status(200).json(makePayload("Kies een vraag:", qOpts(cat), { categories, category: cat.name }));
    }

    if (value.startsWith("q:")) {
      const [, catName, idxStr] = value.split(":");
      const idx = parseInt(idxStr, 10) || 0;
      const cat = getCat(catName);
      const item = cat.items[idx] || cat.items[0];
      return res.status(200).json(makePayload(item.a, [{ label: "← Terug naar FAQ", value: "faq" }], { categories, category: cat.name, questionLabel: item.q }));
    }

    // Fallback → categories
    return res.status(200).json(makePayload("Kies een categorie of typ ‘FAQ’.", catOpts(), { categories, category: "Alle (bevat alle vragen)" }));
  } catch (err) {
    console.error(err);
    return res.status(200).json(makePayload("Er ging iets mis. Typ ‘FAQ’ om opnieuw te beginnen.", [{ label: "FAQ", value: "faq" }]));
  }
};
