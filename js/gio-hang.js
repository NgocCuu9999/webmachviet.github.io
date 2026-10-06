/* gio-hang.js – giỏ hàng, mã giảm giá, miễn phí vận chuyển */
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('cartRoot');
  function render() {
    const items = Store.get();
    if (!items.length) {
      root.innerHTML = `<div class="empty"><p><b>Giỏ hàng của bạn đang trống.</b></p><p class="muted">Thêm vài linh kiện để bắt đầu đơn hàng.</p><a class="btn btn-green" href="san-pham.html">Tiếp tục mua sắm</a></div>`; return;
    }
    const t = cartTotals(), pct = Math.min(100, Math.round(t.sub / FREE_SHIP_FROM * 100));
    root.innerHTML = `<div class="two-col">
      <div class="panel">${items.map(i => { const p = getProduct(i.id); return `<div class="cart-item">
        <a href="chi-tiet.html?id=${p.id}"><img src="${productImg(p)}" alt=""></a>
        <div class="ci-info"><h3><a href="chi-tiet.html?id=${p.id}">${p.name}</a></h3><span class="mono muted">${p.sku}</span><br><span class="muted">${vnd(p.price)} / sản phẩm</span></div>
        <div class="qty"><button data-m="${p.id}" aria-label="Giảm">−</button><input value="${i.qty}" data-q="${p.id}" aria-label="Số lượng" inputmode="numeric"><button data-p="${p.id}" aria-label="Tăng">+</button></div>
        <div class="ci-price">${vnd(p.price * i.qty)}</div>
        <button class="ci-del" data-d="${p.id}" aria-label="Xoá ${p.name}">×</button></div>`; }).join('')}
        <div style="padding-top:14px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px"><a class="btn btn-line btn-sm" href="san-pham.html">← Tiếp tục mua sắm</a><button class="btn btn-line btn-sm" id="clearAll">Xoá toàn bộ giỏ</button></div></div>
      <aside class="panel side-col"><h3>Tóm tắt đơn hàng</h3>
        <p style="font-size:.88rem;margin:0">${t.sub >= FREE_SHIP_FROM ? 'Bạn được miễn phí vận chuyển.' : `Mua thêm <b>${vnd(FREE_SHIP_FROM - t.sub)}</b> để miễn phí vận chuyển.`}</p><div class="ship-bar"><i style="width:${pct}%"></i></div>
        <div class="coupon"><label class="sr-only" for="cp">Mã giảm giá</label><input class="input" id="cp" placeholder="Mã giảm giá" value="${t.code || ''}"><button class="btn btn-green btn-sm" id="cpBtn">Áp dụng</button></div>
        <p class="coupon-msg" id="cpMsg">${t.cp ? '✓ ' + t.cp.label : 'Thử mã: LINHKIEN10, MACHVIET50, FREESHIP'}</p>
        <div class="sum-row"><span>Tạm tính</span><span>${vnd(t.sub)}</span></div>
        ${t.discount ? `<div class="sum-row"><span>Giảm giá</span><span>−${vnd(t.discount)}</span></div>` : ''}
        <div class="sum-row"><span>Vận chuyển</span><span>${t.ship ? vnd(t.ship) : 'Miễn phí'}</span></div>
        <div class="sum-row total"><span>Tổng cộng</span><span>${vnd(t.total)}</span></div>
        <a class="btn btn-gold btn-block" href="thanh-toan.html" style="margin-top:14px">Tiến hành thanh toán</a></aside></div>`;

    root.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { Store.setQty(+b.dataset.m, Store.get().find(i => i.id === +b.dataset.m).qty - 1); render(); });
    root.querySelectorAll('[data-p]').forEach(b => b.onclick = () => { Store.setQty(+b.dataset.p, Store.get().find(i => i.id === +b.dataset.p).qty + 1); render(); });
    root.querySelectorAll('[data-q]').forEach(b => b.onchange = () => { Store.setQty(+b.dataset.q, parseInt(b.value) || 1); render(); });
    root.querySelectorAll('[data-d]').forEach(b => b.onclick = () => { Store.remove(+b.dataset.d); render(); });
    document.getElementById('clearAll').onclick = () => { Store.clear(); render(); };
    document.getElementById('cpBtn').onclick = () => {
      const v = document.getElementById('cp').value.trim().toUpperCase();
      if (COUPONS[v]) { try { localStorage.setItem('machviet_coupon', v); } catch (e) {} render(); toast('Đã áp dụng mã ' + v); }
      else { document.getElementById('cpMsg').textContent = 'Mã không hợp lệ hoặc đã hết hạn.'; document.getElementById('cpMsg').style.color = 'var(--red)'; }
    };
  }
  render();
});
