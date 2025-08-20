export default function handler(req, res) {
  if (req.method === "POST") {
    const { text } = req.body || {};
    let reply = "Sorry, ik begreep dat niet. Typ 'FAQ' om veelgestelde vragen te zien.";

    if (/faq/i.test(text)) {
      reply = "Welkom bij VANA Chat! Kies een vraag:
1) Wat is VANA Chat?
2) Voor wie is het geschikt?
3) Hoeveel kost het?
Typ het nummer of 'demo' om een demo te plannen.";
    } else if (/1/.test(text)) {
      reply = "VANA Chat is een AI-gestuurde chatbot die 24/7 klantvragen beantwoordt via je website of WhatsApp.";
    } else if (/2/.test(text)) {
      reply = "VANA Chat is geschikt voor mkb-bedrijven zoals restaurants, salons, webshops, en meer.";
    } else if (/3/.test(text)) {
      reply = "Starter Pakket: €500 setup + €100/maand onderhoud.";
    } else if (/demo/i.test(text)) {
      reply = "Plan direct een demo: https://calendly.com/d/cv46-k7m-n2f";
    }

    res.status(200).json({ reply });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
