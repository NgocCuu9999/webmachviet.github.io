/* tin-tuc.js – danh sách bài viết, lọc theo chủ đề, tìm kiếm */
document.addEventListener('DOMContentLoaded', () => {
  const cats = ['Tất cả', ...new Set(ARTICLES.map(a => a.cat))];
  let cat = 'Tất cả';
  const f = ARTICLES[0];
  document.getElementById('featured').innerHTML = `<a class="feat" href="bai-viet.html?id=${f.id}"><img src="${productImg(getProduct(f.pid))}" alt=""><div><span class="badge">${f.cat}</span><h2 style="margin-top:10px">${f.title}</h2><p class="muted">${f.desc}</p><span class="btn btn-green btn-sm">Đọc bài (${f.read} phút)</span></div></a>`;
  const chips = document.getElementById('newsChips'), box = document.getElementById('newsSearch');
  chips.innerHTML = cats.map(c => `<button class="chip ${c === cat ? 'active' : ''}" data-c="${c}">${c}</button>`).join('');
  function render() {
    const v = box.value.trim().toLowerCase();
    const list = ARTICLES.filter(a => (cat === 'Tất cả' || a.cat === cat) && (a.title + a.desc).toLowerCase().includes(v));
    document.getElementById('newsGrid').innerHTML = list.map(a => `<a class="news-card" href="bai-viet.html?id=${a.id}"><img src="${productImg(getProduct(a.pid))}" alt="" loading="lazy"><div><small>${a.cat} · ${a.date}</small><h3>${a.title}</h3><p>${a.desc}</p></div></a>`).join('') || '<div class="empty" style="grid-column:1/-1">Không có bài viết phù hợp.</div>';
  }
  chips.onclick = e => { const b = e.target.closest('button'); if (!b) return; cat = b.dataset.c; chips.querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b)); render(); };
  box.oninput = render; render();
});
