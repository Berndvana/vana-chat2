// api/chat.js — Flow-based backend for Vercel
import fs from "fs";
import path from "path";

const baseDir = process.cwd();
const flows = JSON.parse(fs.readFileSync(path.join(baseDir, "flows/main.flow.json"), "utf8"));
const intents = JSON.parse(fs.readFileSync(path.join(baseDir, "nlu/intents.json"), "utf8"));

const nodes = new Map(flows.nodes.map(n => [n.id, n]));

function detectIntent(text="") {
  const t = (text || "").toLowerCase();
  for (const [name, list] of Object.entries(intents)) {
    if (list.some(p => new RegExp(p, "i").test(t))) return name;
  }
  return null;
}

function nextNodeFor(text="", currentId) {
  const node = nodes.get(currentId) || nodes.get(flows.start) || nodes.get("start") || [...nodes.values()][0];
  const intent = detectIntent(text);

  // Global transitions first
  const global = [
    { if: { intent: "demo" }, to: "faq.demo" },
    { if: { intent: "faq" }, to: "faq.menu" },
    { if: { match: "menu|terug" }, to: "faq.menu" }
  ];
  for (const tr of global) {
    if (tr.if?.intent && tr.if.intent === intent) return tr.to;
    if (tr.if?.match && new RegExp(tr.if.match, "i").test(text)) return tr.to;
  }

  // Node-specific transitions
  for (const tr of (node.transitions || [])) {
    if (tr.if?.intent && tr.if.intent === intent) return tr.to;
    if (tr.if?.match && new RegExp(tr.if.match, "i").test(text)) return tr.to;
  }

  // Fallback
  return node.fallback || flows.fallback || "fallback";
}

export default function handler(req, res) {
  try {
    const method = (req.method || "GET").toUpperCase();
    const body = method === "POST" ? (req.body || {}) : (req.query || {});
    const text = body.text || body.message || "";
    const nodeId = body.nodeId || flows.start || "start";

    const toId = nextNodeFor(text, nodeId);
    const to = nodes.get(toId) || nodes.get("fallback");

    res.status(200).json({
      nodeId: to.id,
      say: to.say || "…",
      buttons: to.buttons || []
    });
  } catch (e) {
    console.error("API error", e);
    res.status(200).json({
      nodeId: "fallback",
      say: "⚠️ Er ging iets mis. Typ 'FAQ' of kies een optie.",
      buttons: ["FAQ","Start"]
    });
  }
}
