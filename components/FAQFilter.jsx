import React, { useState } from "react";
import FAQCategories from "./FAQCategories";

// Voorbeeld FAQ-data, je kunt dit vervangen door jouw eigen data of importeren uit JSON
const faqData = [
  {
    id: 1,
    category: "product",
    question: "Hoe werkt VANA Chat?",
    answer: "VANA Chat werkt door slimme flows te combineren met AI..."
  },
  {
    id: 2,
    category: "pricing",
    question: "Wat kost het?",
    answer: "De prijzen zijn afhankelijk van het gekozen pakket."
  },
  {
    id: 3,
    category: "integration",
    question: "Kan ik VANA integreren met Zapier?",
    answer: "Ja, integratie met Zapier is mogelijk via onze API."
  },
  {
    id: 4,
    category: "human",
    question: "Kan VANA grapjes maken?",
    answer: "Zeker, VANA kan ook lol maken met de gebruiker."
  }
  // Voeg hier meer FAQ's toe!
];

export default function FAQFilter() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFaqs = activeCategory === "all"
    ? faqData
    : faqData.filter(faq => faq.category === activeCategory);

  return (
    <div>
      <FAQCategories active={activeCategory} onChange={setActiveCategory} />
      <div>
        {filteredFaqs.length === 0 && (
          <p>Geen vragen in deze categorie.</p>
        )}
        {filteredFaqs.map(faq => (
          <div key={faq.id} style={{
            margin: "20px 0",
            padding: "18px",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            background: "#f9fbfc",
            boxShadow: "0 1px 6px rgba(70,110,170,0.09)"
          }}>
            <strong>{faq.question}</strong>
            <div style={{marginTop: "8px"}}>{faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}