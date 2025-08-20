const messages = document.getElementById('messages');
const input = document.getElementById('input');
const send = document.getElementById('send');
const quick = document.getElementById('quick');

function add(text, who='bot'){
  const row = document.createElement('div'); row.className = 'row ' + who;
  const bubble = document.createElement('div'); bubble.className = 'bubble'; bubble.textContent = text;
  row.appendChild(bubble);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
}

async function ask(text){
  add(text, 'user');
  try{
    const r = await fetch('/api/chat', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ text })
    });
    const data = await r.json();
    add(data.reply || '…', 'bot');
  }catch(e){
    add('⚠️ Er ging iets mis met de verbinding.', 'bot');
  }
}

send.onclick = () => { const t = input.value.trim(); if(t){ ask(t); input.value=''; } };
input.addEventListener('keydown', e => { if(e.key==='Enter'){ send.click(); } });

quick.addEventListener('click', (e)=>{
  if(e.target.classList.contains('chip')){
    ask(e.target.textContent);
  }
});

// greeting
add('👋 Welkom bij VANA Chat! Vraag gerust naar prijzen, integraties of plan direct een demo.');
