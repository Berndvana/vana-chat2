const messages = document.getElementById('messages');
const input = document.getElementById('input');
const send = document.getElementById('send');
const quick = document.getElementById('quick');

let nodeId = "start";

function add(text, who='bot'){
  const row = document.createElement('div'); row.className = 'row ' + who;
  const bubble = document.createElement('div'); bubble.className = 'bubble'; bubble.textContent = text;
  row.appendChild(bubble);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
}

function setButtons(list=[]){
  quick.innerHTML = '';
  (list || []).slice(0,6).forEach(label => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.textContent = label;
    btn.onclick = () => ask(label);
    quick.appendChild(btn);
  });
}

async function ask(text){
  add(text, 'user');
  try{
    const r = await fetch('/api/chat', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ text, nodeId })
    });
    const data = await r.json();
    nodeId = data.nodeId || nodeId;
    add(data.say || '…', 'bot');
    setButtons(data.buttons || []);
    // Calendly open when demo node
    if (nodeId === 'faq.demo') {
      setTimeout(() => window.open('https://calendly.com/d/cv46-k7m-n2f', '_blank'), 50);
    }
  }catch(e){
    add('⚠️ Er ging iets mis met de verbinding.', 'bot');
  }
}

send.onclick = () => { const t = input.value.trim(); if(t){ ask(t); input.value=''; } };
input.addEventListener('keydown', e => { if(e.key==='Enter'){ send.click(); } });

// greet & seed with start node
(async () => {
  const r = await fetch('/api/chat?text=&nodeId=start');
  const d = await r.json();
  nodeId = d.nodeId || 'start';
  add(d.say || 'Welkom!', 'bot');
  setButtons(d.buttons || []);
})();