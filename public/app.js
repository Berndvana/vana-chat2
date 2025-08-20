const messages = document.getElementById('messages');
const input = document.getElementById('input');
const send = document.getElementById('send');
const quick = document.getElementById('quick');
const tabsEl = document.getElementById('tabs');

let buttons = [];
let page = 0;
const PAGE_SIZE = 6;
let categories = ["Alle","Algemeen","Integraties","Veiligheid","Pakketten & prijzen"];
let currentCategory = "Alle";

function add(text, who='bot'){
  if (!text) return;
  const row = document.createElement('div'); row.className = 'row ' + who;
  const bubble = document.createElement('div'); bubble.className = 'bubble'; bubble.textContent = text;
  row.appendChild(bubble);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
}

function renderTabs(){
  tabsEl.innerHTML = '';
  (categories || []).forEach(cat => {
    const t = document.createElement('button');
    t.className = 'tab' + (cat === currentCategory ? ' active' : '');
    t.textContent = cat;
    t.onclick = async () => {
      currentCategory = cat;
      await askRaw('tab:' + cat, false, true);
    };
    tabsEl.appendChild(t);
  });
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
      add(b.label, 'user');
      askRaw(b.value || b.label, false);
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

async function askRaw(value, showUser=false, isTab=false){
  try{
    const r = await fetch('/api/chat', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ value, text: value })
    });
    const data = await r.json();
    if (!isTab && data.say) add(data.say, 'bot');
    if (Array.isArray(data.buttons)) {
      buttons = data.buttons; page = 0; renderButtons();
    }
    if (Array.isArray(data.categories)) {
      categories = data.categories; currentCategory = data.category || currentCategory;
      renderTabs();
    }
    if (data.openDemo) setTimeout(()=>window.open('https://calendly.com/d/cv46-k7m-n2f','_blank'), 50);
  }catch(e){
    add('⚠️ Er ging iets mis met de verbinding.', 'bot');
  }
}

function sendInput(){
  const t = input.value.trim();
  if (!t) return;
  add(t, 'user');
  input.value = '';
  askRaw(t, false);
}

send.onclick = sendInput;
input.addEventListener('keydown', e => { if (e.key === 'Enter') sendInput(); });

// Seed start
(async () => {
  const r = await fetch('/api/chat');
  const d = await r.json();
  if (d.say) add(d.say, 'bot');
  if (Array.isArray(d.categories)) { categories = d.categories; currentCategory = d.category || "Alle"; renderTabs(); }
  if (Array.isArray(d.buttons)) { buttons = d.buttons; page = 0; renderButtons(); }
})();
