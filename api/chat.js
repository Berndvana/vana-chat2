// api/chat.js — v9: combine 'Pakketten' + 'Prijzen' and add extra UI chips
function buildData() {
  const COMBO = "Pakketten & prijzen";
  const faqs = {
    1:  { label: "Wat is VANA Chat?",                    cat: "Algemeen",             a: "VANA Chat is een AI-gestuurde chatbot die 24/7 klantvragen beantwoordt via je website of WhatsApp. Getraind op jouw FAQ’s en info." },
    2:  { label: "Voor wie geschikt?",                   cat: "Algemeen",             a: "Geschikt voor mkb: restaurants, praktijken, salons, webshops, advies en andere dienstverleners met veel herhaalvragen." },
    3:  { label: "Prijzen",                               cat: COMBO,                 a: "Starter: €500 set‑up + €100/maand onderhoud. Inclusief training, integratie en maandelijkse monitoring. Uitbreidingen mogelijk." },
    4:  { label: "Hoe snel live?",                        cat: "Algemeen",             a: "Doorgaans binnen ~1 week live na intake → bouw & branding → integratie → test → livegang." },
    5:  { label: "Set‑up",                                cat: "Integraties",          a: "Set‑up: we verzamelen FAQ’s, openingstijden, diensten en prijzen; bouwen de bot; stemmen tone‑of‑voice af; en integreren technisch." },
    6:  { label: "Onderhoud (maandelijks)",               cat: COMBO,                 a: "Onderhoud: prestatiecheck, updates (tijden/prijzen), en kleine uitbreidingen." },
    7:  { label: "Reserveringen/afspraken?",              cat: "Integraties",          a: "Ja, via doorverwijzing naar je boekingssysteem of automatisch via Zapier/Make in je agenda." },
    8:  { label: "WhatsApp/Messenger?",                   cat: "Integraties",          a: "Ja, naast je website koppelen we met WhatsApp Business en Facebook Messenger." },
    9:  { label: "Meertalig?",                            cat: "Algemeen",             a: "Standaard NL; Engels/meertalig is mogelijk voor internationale klanten." },
    10: { label: "Veiligheid (AVG)",                      cat: "Veiligheid",           a: "We werken AVG/GDPR‑conform. Data wordt niet gebruikt om externe AI‑modellen te trainen." },
    11: { label: "Wat als de bot het niet weet?",         cat: "Algemeen",             a: "Als de bot het niet weet, e‑mail/CRM melding voor opvolging of doorverwijzing naar formulier/telefoon." },
    12: { label: "Capaciteit",                            cat: "Algemeen",             a: "Schaalt van 10 tot 10.000+ gesprekken per maand; verwerking parallel." },
    13: { label: "Uitbreiden",                            cat: "Algemeen",             a: "Zeker. Voeg later flows, integraties of kanalen toe (WhatsApp, Messenger, SMS)." },
    14: { label: "Samenwerking",                          cat: "Algemeen",             a: "Samenwerking: Intake → Bouw & branding → Integratie → Test & live (±1 week). Daarna maandelijkse updates & monitoring." },
    // Samengevoegde pakket-vragen
    15: { label: "Starter‑pakket — wat zit erin?",        cat: COMBO,                  a: "Starter‑pakket: €500 eenmalige set‑up + €100/m onderhoud. Inclusief maatwerk training op jouw FAQ’s, integratie op website of WhatsApp, maandelijkse monitoring en updates, en een kort rapport." },
    16: { label: "Pro‑pakket — wat zit erin?",            cat: COMBO,                  a: "Pro‑pakket: €900 set‑up + €180/m. Inclusief website én WhatsApp integratie, agenda/CRM‑koppeling, prioritaire support, en uitgebreid maandelijks rapport. Ideaal als je afspraken/CRM wilt automatiseren." },
    17: { label: "Verschil Starter vs. Pro",              cat: COMBO,                  a: "Verschillen: Pro heeft extra kanalen (website + WhatsApp), koppeling met agenda/CRM en prioritaire support + uitgebreider rapport. Starter is voordeliger en dekt basis: één kanaal + updates/monitoring." },
    18: { label: "Wat zit er in rapportage/updates?",     cat: COMBO,                  a: "Maandelijkse onderhoud/rapportage: prestatie‑check (veelgestelde vragen, confusies, conversies), doorvoeren van wijzigingen (tijden/prijzen/content), kleine uitbreidingen, en een (uitgebreid bij Pro) rapport per maand." }
  };
  const cats = ["Alle", "Algemeen", "Integraties", "Veiligheid", COMBO];
  return { faqs, cats, COMBO };
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
  const { faqs, cats, COMBO } = buildData();
  const method = (req.method || 'GET').toUpperCase();
  const payload = method === 'POST' ? (req.body || {}) : (req.query || {});
  const raw = (payload.value || payload.text || "").toString().trim();
  const text = toNorm(raw.toLowerCase());

  const reply = (say, buttons=[], extra={}) => res.status(200).json({ say, buttons, ...extra });

  const catByText = (t) => {
    if (/^alle$/.test(t)) return "Alle";
    if (/^algemeen$/.test(t)) return "Algemeen";
    if (/^integratie|integraties|koppelingen?|whatsapp|messenger|zapier|make/.test(t)) return "Integraties";
    if (/^veilig|avg|gdpr|privacy/.test(t)) return "Veiligheid";
    if (/^prijs|prijzen|kosten|tarief|tarieven|abonnement|pakket|pakketten|starter|pro/.test(t)) return COMBO;
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

  // Typed category → show prompt + chips (incl. extra UI chips)
  const typedCat = catByText(text);
  if (typedCat) {
    const chips = filterButtons(faqs, { category: typedCat });
    chips.push({ label: "Plan een demo", value: "demo" });
    chips.unshift({ label: "← Terug naar FAQ", value: "faq" });
    return reply("Kies uit een van onderstaande mogelijkheden:", chips, { categories: cats, category: typedCat });
  }

  // Tabs (explicit) — no bubble; but add extra UI chips to the list
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

  // Specific FAQ by id
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

  // Keyword fallbacks to direct answers
  if (/starter/.test(text)) return reply(faqs[15].a, [{label:"← FAQ", value:"faq"}, {label:"Plan demo", value:"demo"}], {questionLabel: faqs[15].label});
  if (/\bpro\b/.test(text) || /pro\-pakket|propakket/.test(text)) return reply(faqs[16].a, [{label:"← FAQ", value:"faq"}], {questionLabel: faqs[16].label});
  if (/verschil/.test(text)) return reply(faqs[17].a, [{label:"← FAQ", value:"faq"}], {questionLabel: faqs[17].label});
  if (/rapport|rapportage|update|updates/.test(text)) return reply(faqs[18].a, [{label:"← FAQ", value:"faq"}], {questionLabel: faqs[18].label});
  if (/prijs|prijzen|kosten|tarief|tarieven|abonnement/.test(text)) return reply(faqs[3].a, [{label:"← FAQ", value:"faq"}, {label:"Plan demo", value:"demo"}], {questionLabel: faqs[3].label});

  if (/integratie|integraties|koppelingen?|whatsapp|messenger|zapier|make/.test(text))
    return reply(faqs[8].a, [{label:"← FAQ", value:"faq"}], {questionLabel: faqs[8].label});

  if (/veilig|avg|gdpr|privacy/.test(text))
    return reply(faqs[10].a, [{label:"← FAQ", value:"faq"}], {questionLabel: faqs[10].label});

  // Fallback
  return reply("Ik snap je vraag niet helemaal. Typ ‘FAQ’ of kies een optie.", [
    { label: "FAQ", value: "faq" },
    { label: "Plan een demo", value: "demo" }
  ], { categories: cats, category: "Alle" });
}
