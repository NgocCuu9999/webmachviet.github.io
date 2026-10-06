/* khuyen-mai.js – đếm ngược đến 23:59 hôm nay, mã giảm giá, lọc sản phẩm giảm giá */
document.addEventListener('DOMContentLoaded', () => {
  bannerBackground(document.querySelector('.sale-hero'), 'khuyenmai', 'rgba(15,28,46,.8)');
  const pad = n => String(n).padStart(2, '0');
  function tick() {
    const end = new Date(); end.setHours(23, 59, 59, 999);
    const s = Math.max(0, Math.floor((end - new Date()) / 1000));
    document.getElementById('cdH').textContent = pad(Math.floor(s / 3600));
    document.getElementById('cdM').textContent = pad(Math.floor(s % 3600 / 60));
    document.getElementById('cdS').textContent = pad(s % 60);
  }
  tick(); setInterval(tick, 1000);

  document.getElementById('coupons').innerHTML = Object.entries(COUPONS).map(([code, c]) => `<div class="coupon-card"><div><b class="code">${code}</b><p>${c.label} cho đơn hàng của bạn</p></div><button class="btn btn-green btn-sm" data-copy="${code}">Sao chép</button></div>`).join('');
  document.querySelectorAll('[data-copy]').forEach(b => b.onclick = () => {
    (navigator.clipboard ? navigator.clipboard.writeText(b.dataset.copy) : Promise.reject()).then(() => toast('Đã sao chép mã ' + b.dataset.copy)).catch(() => toast('Mã của bạn: ' + b.dataset.copy));
  });

  const sale = PRODUCTS.filter(p => p.old && p.stock > 0).sort((a, b) => (1 - b.price / b.old) - (1 - a.price / a.old));
  let cat = '';
  const tabs = document.getElementById('saleTabs');
  tabs.innerHTML = `<button class="active" data-c="">Tất cả (${sale.length})</button>` + CATEGORIES.filter(c => sale.some(p => p.cat === c.slug)).map(c => `<button data-c="${c.slug}">${c.name}</button>`).join('');
  function render() {
    document.getElementById('saleGrid').innerHTML = sale.filter(p => !cat || p.cat === cat).map(p => {
      const sold = 35 + (p.id * 17) % 55; /* số liệu mẫu */
      return productCard(p).replace(/<button class="btn btn-gold/, `<div class="sold"><div class="sold-bar"><i style="width:${sold}%"></i></div><small>Đã bán ${sold}%</small></div><button class="btn btn-gold`);
    }).join('');
  }
  tabs.onclick = e => { const b = e.target.closest('button'); if (!b) return; cat = b.dataset.c; tabs.querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b)); render(); };
  render();
});
