(() => {
  const $ = s => document.querySelector(s);
  const msg = $('#msg'), q = $('#question'), tries = $('#tries'), inp = $('#guess'), btn = $('#btn'), reset = $('#reset');
  let t = Math.floor(Math.random() * 100) + 1, a = 0, max = 8;
  const S = (s, c) => { msg.className = ''; if (c) msg.classList.add(c); msg.textContent = s };
  const h = g => { const d = Math.abs(g - t); if (d === 0) return 'Correct!'; if (d <= 2) return 'Very close (±2)'; return g < t ? 'Too low' : 'Too high' };
  const upd = () => tries.textContent = a;
  const setQ = () => {
    const l2 = Math.max(1, t - 2), h2 = Math.min(100, t + 2), l4 = Math.max(1, t - 2), h4 = Math.min(100, t + 2);
    q.textContent = `This number is less than ${h4} and more than ${l2} (Random)`;
  };
  const guess = () => {
    const g = +inp.value; if (!g || g < 1 || g > 100) { S('Enter The Number 1–100'); inp.focus(); return }
    a++; upd(); if (g === t) { S(`Win! Number ${t}`, 'win'); btn.disabled = inp.disabled = true; return }
    if (a >= max) { S(`Lose. Answer ${t}`, 'lose'); btn.disabled = inp.disabled = true; return }
    S(`${h(g)} (${a}/${max})`); inp.value = ''; inp.focus();
  };
  btn.onclick = guess; inp.addEventListener('keyup', e => { if (e.key === 'Enter') guess() });
  reset.onclick = () => { t = Math.floor(Math.random() * 100) + 1; a = 0; btn.disabled = inp.disabled = false; inp.value = ''; S(`Guess 1–100. ${max} attempts`); setQ(); upd(); inp.focus() };
  S(`Guess 1–100. ${max} attempts`); setQ(); upd(); inp.focus();
})();