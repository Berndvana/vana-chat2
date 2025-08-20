const messages = document.getElementById('messages');
const input = document.getElementById('input');
const send = document.getElementById('send');
const quick = document.getElementById('quick');

let buttons = [];
let page = 0;
const PAGE_SIZE = 6;

function add(text, who='bot'){
  const row = document.createElement('div'); row.className = 'row ' + who;
  const bubble = document.createElement('div'); bubble.className = 'bubble'; bubble.textContent = text;
  row.appendChild(bubble);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
}

function renderButtons(){
  quick.innerHTML = '';
  if (!buttons || buttons.length === 0) return;
  const start = page * PAGE_SIZE;
  const slice = buttons.slice(start, start + PAGE_SIZE);
  slice.forEach(b => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.textContent = b.label;
    btn.onclick = () => {
      // Show the human-friendly label in chat
      add(b.label.replace(/^\d+\.\s*/, ''), 'user');
      // Send the technical value to backend
      askRaw(b.value || b.label);
    };
    quick.appendChild(btn);
  });
  if (page > 0) {
    const prev = document.createElement('button');
    prev.className = 'chip';
    prev.textContent = '← Vorige';
    prev.onclick = () => { page--; renderButtons(); };
    quick.appendChild(prev);
  }
  if (start + PAGE_SIZE < buttons.length) {
    const next = document.createElement('button');
    next.className = 'chip';
    next.textContent = 'Meer →';
    next.onclick = () => { page++; renderButtons(); };
    quick.appendChild(next);
  }
}

async function askRaw(value){
  try{
    const r = await fetch('/api/chat', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ value, text: value })
    });
    const data = await r.json();
    if (data.questionLabel) {
      // If backend sends original question, ensure it's present once
      // (We already showed label above on click, skip here)
    }
    add(data.say || '…', 'bot');
    buttons = data.buttons || [];
    page = 0;
    renderButtons();
    if (data.openDemo) setTimeout(()=>window.open('https://calendly.com/d/cv46-k7m-n2f','_blank'), 80);
  }catch(e){
    add('⚠️ Er ging iets mis met de verbinding.', 'bot');
  }
}

function sendInput(){
  const t = input.value.trim();
  if (!t) return;
  add(t, 'user');
  input.value = '';
  askRaw(t);
}

send.onclick = sendInput;
input.addEventListener('keydown', e => { if (e.key === 'Enter') sendInput(); });

// Seed: start prompt
(async () => {
  const r = await fetch('/api/chat'); // GET → backend geeft start
  const d = await r.json();
  add(d.say || 'Welkom bij VANA Chat!', 'bot');
  buttons = d.buttons || [];
  renderButtons();
})();
