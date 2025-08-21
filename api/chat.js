// api/chat.js — v9 (patched): nieuwe categorieën + FAQ volgens specificatie
function buildData() {
  const faqs = {
    // Product & werking (1–8)
    1:  { label: "Wat is VANA Chat?",                    cat: "Product & werking",     a: "VANA Chat is een AI-gestuurde chatbot die jouw klantvragen automatisch beantwoordt via je website of WhatsApp. Getraind op jouw FAQ’s en info." },
    2:  { label: "Hoe snel staat mijn chatbot live?",     cat: "Product & werking",     a: "Binnen 1 week is jouw chatbot volledig online. Jij levert de basisinfo aan, wij regelen de techniek." },
    3:  { label: "Voor wie is VANA Chat geschikt?",       cat: "Product & werking",     a: "Perfect voor restaurants, tandartsen, webshops, coaches en eigenlijk elk bedrijf dat vaak dezelfde vragen krijgt." },
    4:  { label: "Wat doet de chatbot precies?",          cat: "Product & werking",     a: "Hij beantwoordt FAQ’s, verzamelt leads en kan zelfs reserveringen of afspraken plannen." },
    5:  { label: "Wat als de bot iets niet weet?",        cat: "Product & werking",     a: "Dan stuurt de bot de vraag automatisch door naar jouw e-mail of telefoon. Zo mis je niets." },
    6:  { label: "Kan ik de chatbot zelf aanpassen?",     cat: "Product & werking",     a: "Ja, je kunt makkelijk nieuwe antwoorden toevoegen. Wij helpen je hierbij." },
    7:  { label: "Werkt dit ook op mobiel?",              cat: "Product & werking",     a: "Ja, de chatbot is volledig mobielvriendelijk." },
    8:  { label: "Kan de bot ook reserveringen of afspraken plannen?", cat: "Product & werking", a: "Ja, we kunnen hem koppelen aan jouw agenda of reserveringssysteem." },

    // Prijzen & abonnement (9–14)
    9:  { label: "Wat kost VANA Chat?",                   cat: "Prijzen & abonnement",  a: "Eenmalige setup €500, maandelijkse onderhoudskosten €100." },
    10: { label: "Zit ik ergens aan vast?",               cat: "Prijzen & abonnement",  a: "Nee, je kunt maandelijks opzeggen." },
    11: { label: "Kan ik tussentijds stoppen?",           cat: "Prijzen & abonnement",  a: "Ja, je zit nergens aan vast." },
    12: { label: "Wat zit er in de setup-prijs inbegrepen?", cat: "Prijzen & abonnement", a: "Ontwikkeling van de bot, training op jouw data, integratie op website of WhatsApp." },
    13: { label: "Wat zit er in het maandabonnement inbegrepen?", cat: "Prijzen & abonnement", a: "Monitoring, updates, verbeteringen en support." },
    14: { label: "Komen er nog extra kosten bij?",        cat: "Prijzen & abonnement",  a: "Alleen als je speciale integraties wilt (zoals koppeling met CRM)." },

    // Integratie & techniek (15–21)
    15: { label: "Kan de chatbot ook via WhatsApp werken?", cat: "Integratie & techniek", a: "Ja, we koppelen hem eenvoudig aan WhatsApp." },
    16: { label: "Kan ik de chatbot ook in Facebook Messenger gebruiken?", cat: "Integratie & techniek", a: "Ja, integratie met meerdere platformen is mogelijk." },
    17: { label: "Hoe werkt de integratie op mijn website?", cat: "Integratie & techniek", a: "Via een eenvoudig script dat wij voor je plaatsen." },
    18: { label: "Heb ik technische kennis nodig?",       cat: "Integratie & techniek", a: "Nee, wij regelen alles voor je." },
    19: { label: "Werkt de chatbot samen met mijn CRM/e-mail?", cat: "Integratie & techniek", a: "Ja, via Zapier of API’s kunnen we koppelingen maken." },
    20: { label: "Is mijn data veilig?",                  cat: "Integratie & techniek", a: "Zeker, we gebruiken veilige AI-systemen." },
    21: { label: "Welke talen ondersteunt de chatbot?",   cat: "Integratie & techniek", a: "Nederlands en Engels standaard, andere talen op aanvraag." },

    // Human touch / fun (22–27)
    22: { label: "Ben jij een robot?",                    cat: "Human touch / fun",     a: "Haha klopt, maar wel een slimme die nooit moe wordt en altijd vriendelijk blijft." },
    23: { label: "Drink jij ook koffie?",                 cat: "Human touch / fun",     a: "Was dat maar zo! Ik draai 24/7 op pure wifi-energie ☕⚡." },
    24: { label: "Kan ik jou ook inhuren?",               cat: "Human touch / fun",     a: "Dat kan, maar alleen samen met mijn baas: VANA Chat 😉." },
    25: { label: "Heb jij humor?",                        cat: "Human touch / fun",     a: "Alleen als je van flauwe AI-grapjes houdt." },
    26: { label: "Wat doe je als je iets niet weet?",     cat: "Human touch / fun",     a: "Dan vraag ik hulp aan een échte mens. Slim hè?" },
    27: { label: "Heb jij collega’s?",                    cat: "Human touch / fun",     a: "Zeker, ik heb een hele familie van bots die allemaal voor bedrijven werken." }
  };

  // Bovenste categorie-chips
  const cats = ["Alle", "Product & werking", "Prijzen & abonnement", "Integratie & techniek", "Human touch / fun"];
  return { faqs, cats };
}

function listByCat(faqs, category) {
  return Object.entries(faqs)
    .map(([id, o]) => ({ id: Number(id), ...o }))
    .filter(x => !category || category === "Alle" ? true : x.cat === category);
}

function filterButtons(faqs, { category="Alle" } = {}){
  const list = listByCat(faqs, category);
  return list.map(x => ({ label: x.label, value: "faq."+x.id }));
}

function toNorm(s=""){
  return s.normalize('NFKD').replace(/[\u0300-\u036f]/g, ''); // strip diacritics
}

export default function handler(req, res) {
  const { faqs, cats } = buildData();
  const method = (req.method || 'GET').toUpperCase();
  const payload = method === 'POST' ? (req.body || {}) : (req.query || {});
  const raw = (payload.value || payload.text || "").toString().trim();
  const text = toNorm(raw.toLowerCase());

  const reply = (say, buttons=[], extra={}) => res.status(200).json({ say, buttons, ...extra });

  const catByText = (t) => {
    if (/^alle$/.test(t)) return "Alle";
    if (/product|werking|wat\s+is|voor\s+wie|mobiel|reserver|afspraak|bot\s*(weet|weten)/.test(t)) return "Product & werking";
    if (/prijs|prijzen|kosten|tarief|tarieven|abonnement|setup|set[\-\s]?up/.test(t)) return "Prijzen & abonnement";
    if (/integratie|techniek|koppelingen?|whatsapp|messenger|zapier|api|crm|script|website|meertal|talen|veilig|avg|gdpr|privacy/.test(t)) return "Integratie & techniek";
    if (/human|fun|grap|humor|koffie|robot|mens|collega/.test(t)) return "Human touch / fun";
    return null;
  };

  // Start
  if (raw === "" || text === "start") {
    return reply("Welkom bij VANA Chat! Kies een optie of typ ‘FAQ’.", [
      { label: "FAQ", value: "faq" },
      { label: "Plan een demo", value: "demo" },
      { label: "Contact", value: "contact" }
    ], { categories: cats, category: "Alle" });
  }

  // Typed category → show prompt + chips
  const typedCat = catByText(text);
  if (typedCat) {
    const chips = filterButtons(faqs, { category: typedCat });
    chips.push({ label: "Plan een demo", value: "demo" });
    chips.unshift({ label: "← Terug naar FAQ", value: "faq" });
    return reply("Kies uit een van onderstaande mogelijkheden:", chips, { categories: cats, category: typedCat });
  }

  // Tabs (explicit)
  if (text.startsWith("tab:")) {
    const category = raw.split(":")[1] || "Alle";
    const chips = filterButtons(faqs, { category });
    chips.push({ label: "Plan een demo", value: "demo" });
    chips.unshift({ label: "← Terug naar FAQ", value: "faq" });
    return reply("", chips, { categories: cats, category });
  }

  // FAQ menu
  if (text === "faq" || text === "menu" || text === "terug") {
    const chips = filterButtons(faqs, { category: "Alle" });
    chips.push({ label: "Plan een demo", value: "demo" });
    return reply("Kies een vraag:", chips, { categories: cats, category: "Alle" });
  }

  // Demo
  if (text === "demo" || /plan.*demo/.test(text)) {
    return reply("Top! De demo‑planner opent in een nieuw tabblad. Heb je voorkeur voor datum/tijd?", [
      { label: "← Terug naar FAQ", value: "faq" }
    ], { openDemo: true });
  }

  // Specific FAQ by id (faq.<nr> or plain number)
  const m = text.match(/^faq\.(\d{1,2})$/) || text.match(/^(\d{1,2})$/);
  if (m) {
    const id = parseInt(m[1], 10);
    const item = faqs[id];
    if (item) {
      return reply(item.a, [
        { label: "← Terug naar FAQ", value: "faq" },
        { label: "Plan een demo", value: "demo" }
      ], { questionLabel: item.label });
    }
  }

  // Keyword fallbacks → direct answers
  if (/wat\s*is\s*vana|^vana\s*chat$/.test(text)) return reply(faqs[1].a, [{label:"← FAQ", value:"faq"}], {questionLabel: faqs[1].label});
  if (/voor\s*wie|geschikt/.test(text)) return reply(faqs[3].a, [{label:"← FAQ", value:"faq"}], {questionLabel: faqs[3].label});
  if (/hoe\s*snel|live/.test(text)) return reply(faqs[2].a, [{label:"← FAQ", value:"faq"}], {questionLabel: faqs[2].label});
  if (/prijs|prijzen|kosten|tarief|tarieven|abonnement/.test(text)) return reply(faqs[9].a, [{label:"← FAQ", value:"faq"}], {questionLabel: faqs[9].label});
  if (/whatsapp|messenger|integratie|koppeling/.test(text)) return reply(faqs[15].a, [{label:"← FAQ", value:"faq"}], {questionLabel: faqs[15].label});
  if (/veilig|avg|gdpr|privacy/.test(text)) return reply(faqs[20].a, [{label:"← FAQ", value:"faq"}], {questionLabel: faqs[20].label});
  if (/meertal|talen|engels|nederlands/.test(text)) return reply(faqs[21].a, [{label:"← FAQ", value:"faq"}], {questionLabel: faqs[21].label});
  if (/reserver|afspraak/.test(text)) return reply(faqs[8].a, [{label:"← FAQ", value:"faq"}], {questionLabel: faqs[8].label});
  if (/mobiel|mobile/.test(text)) return reply(faqs[7].a, [{label:"← FAQ", value:"faq"}], {questionLabel: faqs[7].label});

  // Fallback
  return reply("Ik snap je vraag niet helemaal. Typ ‘FAQ’ of kies een optie.", [
    { label: "FAQ", value: "faq" },
    { label: "Plan een demo", value: "demo" }
  ], { categories: cats, category: "Alle" });
}
