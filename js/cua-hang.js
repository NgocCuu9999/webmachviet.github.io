/* cua-hang.js – lọc cửa hàng theo thành phố, mở Google Maps */
document.addEventListener('DOMContentLoaded', () => {
  const cities = ['Tất cả', ...new Set(STORES.map(s => s.city))]; let city = 'Tất cả';
  const chips = document.getElementById('cityChips');
  chips.innerHTML = cities.map(c => `<button class="chip ${c === city ? 'active' : ''}" data-c="${c}">${c}</button>`).join('');
  function render() {
    document.getElementById('storeGrid').innerHTML = STORES.filter(s => city === 'Tất cả' || s.city === city).map(s => `<article class="store"><img src="${productImg(getProduct(s.pid))}" alt=""><div class="in"><h3>${s.name}</h3><p>${s.addr}</p><p>Điện thoại: <b>${s.phone}</b></p><p>Giờ mở cửa: ${s.hours}</p>
      <div class="acts"><a class="btn btn-green btn-sm" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.addr)}">Chỉ đường</a><a class="btn btn-line btn-sm" href="tel:${s.phone.replace(/\s/g, '')}">Gọi cửa hàng</a></div></div></article>`).join('');
  }
  chips.onclick = e => { const b = e.target.closest('button'); if (!b) return; city = b.dataset.c; chips.querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b)); render(); };
  render();
});
