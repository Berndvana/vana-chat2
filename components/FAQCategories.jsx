import React from "react";
import "./faq-categories.css";

const categories = [
  { key: "all", label: "Alle", icon: "🔎" },
  { key: "product", label: "Product & werking", icon: "🛠️" },
  { key: "pricing", label: "Prijzen & abonnement", icon: "💸" },
  { key: "integration", label: "Integratie & techniek", icon: "🔗" },
  { key: "human", label: "Human touch / fun", icon: "🤹" }
];

export default function FAQCategories({ active, onChange }) {
  return (
    <div className="faq-categories">
      {categories.map(cat => (
        <button
          key={cat.key}
          className={`faq-category-button${active === cat.key ? " active" : ""}`}
          onClick={() => onChange(cat.key)}
          aria-pressed={active === cat.key}
        >
          <span aria-hidden="true">{cat.icon}</span>
          {cat.label}
        </button>
      ))}
    </div>
  );
}