/* tra-cuu-don.js – tra cứu theo mã đơn + số điện thoại */
document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);
  const find = (code, phone) => {
    let mine = []; try { mine = JSON.parse(localStorage.getItem('machviet_orders')) || []; } catch (e) {}
    const o = mine.find(x => x.code === code) || (ORDERS[code] && { code, ...ORDERS[code] });
    return o && o.phone === phone ? o : null;
  };
  function search(code, phone) {
    const o = find(code.trim().toUpperCase(), phone.trim());
    if (!o) { $('orderResult').innerHTML = `<div class="empty"><p><b>Không tìm thấy đơn hàng.</b></p><p class="muted">Hãy kiểm tra lại mã đơn và số điện thoại, hoặc gọi ${BRAND.hotline}.</p></div>`; return; }
    $('orderResult').innerHTML = `<div class="panel result"><div class="result-head"><h3 style="margin:0">Đơn hàng <span class="mono">${o.code}</span></h3><span class="muted">Ngày đặt: ${o.date} · ${o.pay}</span></div>
      <div class="steps">${ORDER_STEPS.map((s, i) => `<div class="step ${i <= o.status ? 'done' : ''}">${s}${i === o.status ? '<small>Hiện tại</small>' : ''}</div>`).join('')}</div>
      <table class="table"><thead><tr><th>Sản phẩm</th><th>SL</th><th>Thành tiền</th></tr></thead><tbody>${o.items.map(([id, q]) => { const p = getProduct(id); return `<tr><td><a href="chi-tiet.html?id=${p.id}">${p.name}</a></td><td>${q}</td><td>${vnd(p.price * q)}</td></tr>`; }).join('')}
      <tr><td colspan="2"><b>Tổng thanh toán</b></td><td><b>${vnd(o.total)}</b></td></tr></tbody></table></div>`;
  }
  $('orderForm').onsubmit = e => { e.preventDefault(); search($('oCode').value, $('oPhone').value); };
  const q = new URLSearchParams(location.search);
  if (q.get('code')) { $('oCode').value = q.get('code'); $('oPhone').value = q.get('phone') || ''; search($('oCode').value, $('oPhone').value); }
});
