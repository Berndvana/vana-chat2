// api/faq.js — auto-generated
module.exports = function handler(req, res) {
  const data = {
  "categories": [
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
      "name": "Alle",
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
  ],
  "meta": {
    "version": 1,
    "updated": "2025-08-21"
  }
};
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(200).json(data);
};
