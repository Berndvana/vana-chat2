// api/chat.js — pro version: loads data/faqs.json, CTAs, fallback logging

import fs from "fs";
import path from "path";

function flattenAll(faqData){
  const map = new Map();
  for (const cat of faqData.categories){
    if (!cat.faqs) continue;
    for (const item of cat.faqs){
      if (item.q && item.a) map.set(item.id, item);
    }
  }
  // Resolve "all" refs too
  const all = faqData.categories.find(c => c.id === "all");
  if (all && Array.isArray(all.faqs)){
    for (const ref of all.faqs){
      if (ref.ref && !map.has(ref.ref)){
        // ignore missing; already covered from original cats
      }
    }
  }
  return Array.from(map.values());
}

function normalize(s=""){
  return s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
}

function bestMatch(message, faqs){
  const m = normalize(message);
  // exact contains on question text words (first 3 words heuristic)
  let scored = faqs.map(f => {
    const q = normalize(f.q);
    let score = 0;
    if (m.includes(q)) score += 3;
    // token overlap
    const mtoks = m.split(/[^a-z0-9]+/).filter(Boolean);
    const qtoks = q.split(/[^a-z0-9]+/).filter(Boolean).slice(0, 6);
    const overlap = qtoks.filter(t => mtoks.includes(t)).length;
    score += overlap;
    // simple synonyms
    if (/prijs|tarief|kosten|abonnement/.test(m) && /prijs|tarief|kosten|abonnement/.test(q)) score += 2;
    if (/whatsapp|messenger|integratie|koppeling|zapier|api/.test(m) && /whatsapp|messenger|integratie|koppeling|zapier|api/.test(q)) score += 2;
    if (/veilig|avg|gdpr|privacy/.test(m) && /veilig|avg|gdpr|privacy/.test(q)) score += 2;
    return { f, score };
  });
  scored.sort((a,b)=>b.score-a.score);
  return scored[0] && scored[0].score > 0 ? scored[0].f : null;
}

export default function handler(req, res){
  if (req.method !== "POST"){
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try{
    const { message = "", category = "all" } = req.body || {};
    const dataPath = path.join(process.cwd(), "data", "faqs.json");
    const faqData = JSON.parse(fs.readFileSync(dataPath, "utf8"));

    // pick search scope (category filter)
    let scopeFaqs = [];
    const catObj = faqData.categories.find(c => c.id === category) || faqData.categories.find(c => c.id === "all");
    if (catObj.id === "all"){
      scopeFaqs = flattenAll(faqData);
    } else {
      scopeFaqs = (catObj.faqs || []).filter(x => x.q && x.a);
    }

    const found = bestMatch(message, scopeFaqs);

    if (!found){
      console.log("[VANA] Unmatched:", message);
      return res.status(200).json({
        answer: "Ik snap je vraag niet helemaal 🤔. Kies een categorie of plan direct een demo—dan helpt een collega je verder!",
        ctas: [
          { text: "Plan een demo 📅", url: "https://calendly.com/d/cv46-k7m-n2f" },
          { text: "Stuur een mail ✉️", url: "mailto:info@vanamarketing.nl" }
        ]
      });
    }

    // CTAs based on id
    const id = String(found.id || "");
    const ctas = [];
    if (id.startsWith("pricing_")) ctas.push({ text:"Vraag offerte aan 💬", url:"mailto:info@vanamarketing.nl" });
    if (id.startsWith("product_") || id.startsWith("integrations_")) ctas.push({ text:"Plan een demo 📅", url:"https://calendly.com/d/cv46-k7m-n2f" });

    return res.status(200).json({ answer: found.a, ctas });

  }catch(err){
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
