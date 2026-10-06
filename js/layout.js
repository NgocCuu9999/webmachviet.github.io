/* ==========================================================
   layout.js – Header, footer, giỏ hàng, thông báo (dùng ở mọi trang)
   ========================================================== */
const ICON = {
  logo: `<svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><rect x="2" y="2" width="36" height="36" rx="8" fill="#F0B92B"/><path d="M9 14h9v6h6v8h7" stroke="#07392C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="14" r="3" fill="#07392C"/><circle cx="31" cy="28" r="3" fill="#07392C"/><path d="M18 20v-6h13" stroke="#07392C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>`,
  cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.4a1 1 0 0 0 1 .8h9.3a1 1 0 0 0 1-.8L21 7H6"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 6h13v11H1zM14 10h4l4 3v4h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>`,
  swap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4-4 4M21 7H8a4 4 0 0 0-4 4M7 21l-4-4 4-4M3 17h13a4 4 0 0 0 4-4"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.4A8 8 0 1 1 21 12z"/></svg>`,
  box: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v8"/></svg>`
};

/* ---------- Giỏ hàng (lưu trong localStorage của trình duyệt) ---------- */
const Store = {
  key: 'machviet_cart',
  get() { try { return JSON.parse(localStorage.getItem(this.key)) || []; } catch (e) { return []; } },
  save(items) { try { localStorage.setItem(this.key, JSON.stringify(items)); } catch (e) {} this.badge(); },
  add(id, qty = 1) {
    const items = this.get(), it = items.find(i => i.id === id), p = getProduct(id);
    if (it) it.qty = Math.min(it.qty + qty, p.stock); else items.push({ id, qty: Math.min(qty, p.stock) });
    this.save(items);
  },
  setQty(id, qty) {
    const p = getProduct(id), items = this.get().map(i => i.id === id ? { ...i, qty: Math.max(1, Math.min(qty, p.stock)) } : i);
    this.save(items);
  },
  remove(id) { this.save(this.get().filter(i => i.id !== id)); },
  clear() { this.save([]); },
  count() { return this.get().reduce((s, i) => s + i.qty, 0); },
  subtotal() { return this.get().reduce((s, i) => s + getProduct(i.id).price * i.qty, 0); },
  badge() { document.querySelectorAll('.cart-count').forEach(e => { const c = this.count(); e.textContent = c; e.style.display = c ? 'grid' : 'none'; }); }
};

/* ---------- Mã giảm giá & tổng tiền (dùng ở Giỏ hàng và Thanh toán) ---------- */
const COUPONS = { LINHKIEN10: { type: 'pct', v: 10, label: 'Giảm 10%' }, MACHVIET50: { type: 'amt', v: 50000, label: 'Giảm 50.000đ' }, FREESHIP: { type: 'ship', v: 0, label: 'Miễn phí vận chuyển' } };
const FREE_SHIP_FROM = 500000, SHIP_FEE = 25000;

function cartTotals() {
  const sub = Store.subtotal();
  let code = null; try { code = localStorage.getItem('machviet_coupon'); } catch (e) {}
  const cp = COUPONS[code];
  let discount = 0; if (cp) discount = cp.type === 'pct' ? Math.round(sub * cp.v / 100) : cp.type === 'amt' ? Math.min(cp.v, sub) : 0;
  const ship = (sub === 0 || sub >= FREE_SHIP_FROM || (cp && cp.type === 'ship')) ? 0 : SHIP_FEE;
  return { sub, discount, ship, total: sub - discount + ship, code: cp ? code : null, cp };
}

/* ---------- Yêu thích & so sánh ---------- */
const List = {
  get(k) { try { return JSON.parse(localStorage.getItem('machviet_' + k)) || []; } catch (e) { return []; } },
  has(k, id) { return this.get(k).includes(Number(id)); },
  toggle(k, id, max) {
    id = Number(id); let l = this.get(k);
    if (l.includes(id)) l = l.filter(x => x !== id); else { if (max && l.length >= max) return false; l.push(id); }
    try { localStorage.setItem('machviet_' + k, JSON.stringify(l)); } catch (e) {}
    List.badges(); return true;
  },
  badges() { document.querySelectorAll('[data-count]').forEach(e => { const c = this.get(e.dataset.count).length; e.textContent = c; e.style.display = c ? 'inline-block' : 'none'; }); }
};

function toast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 2400);
}

/* ---------- Dựng header / footer ---------- */
function renderHeader() {
  const page = document.body.dataset.page || '';
  const links = [['index.html', 'Trang chủ', 'home'], ['san-pham.html', 'Sản phẩm', 'products'], ['khuyen-mai.html', 'Khuyến mãi', 'sale'], ['thuong-hieu.html', 'Thương hiệu', 'brands'], ['tin-tuc.html', 'Tin tức', 'news'], ['bao-gia.html', 'Báo giá doanh nghiệp', 'quote'], ['cua-hang.html', 'Cửa hàng', 'stores']];
  const support = [['bao-hanh.html', 'Bảo hành & chính sách'], ['tra-cuu-don.html', 'Tra cứu đơn hàng'], ['hoi-dap.html', 'Hỏi đáp thường gặp'], ['gioi-thieu.html', 'Giới thiệu'], ['lien-he.html', 'Liên hệ']];
  const supKeys = ['warranty', 'order', 'faq', 'about', 'contact'];
  const mega = CATEGORIES.map(c => `<div class="col"><h4><a href="san-pham.html?cat=${c.slug}">${c.name}</a></h4>${c.sub.map(s => `<a href="san-pham.html?cat=${c.slug}&q=${encodeURIComponent(s.split(' ')[0])}">${s}</a>`).join('')}</div>`).join('');
  document.getElementById('site-header').innerHTML = `
  <div class="topbar"><div class="container"><span>Miễn phí giao hàng đơn từ 500.000đ · Xuất hoá đơn VAT</span>
    <div class="topbar-right"><a href="so-sanh.html">So sánh <b class="nav-count" data-count="cmp" style="display:none">0</b></a><a href="tra-cuu-don.html">Tra cứu đơn hàng</a><a href="bao-hanh.html#tra-cuu">Tra cứu bảo hành</a><a href="tel:${BRAND.hotline.replace(/\s/g, '')}">Hotline ${BRAND.hotline}</a></div></div></div>
  <div class="sticky-head" id="stickyHead">
  <header class="header"><div class="container">
    <button class="menu-toggle" aria-label="Mở menu" id="menuToggle">${ICON.menu}</button>
    <a class="logo" href="index.html">${ICON.logo}<span>${BRAND.name}<small>${BRAND.tagline}</small></span></a>
    <div class="search" role="search"><form id="searchForm" action="san-pham.html"><label class="sr-only" for="q">Tìm theo tên hoặc mã linh kiện</label>
      <input id="q" name="q" type="search" autocomplete="off" placeholder="Tìm theo tên hoặc mã: ESP32, LM358, HC-SR04..."><button type="submit">Tìm</button></form>
      <div class="suggest" id="suggest"></div></div>
    <div class="head-actions">
      <a class="head-link" href="yeu-thich.html" aria-label="Yêu thích"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.800-8 11-8 11z"/></svg><span>Yêu thích</span><b class="cart-count" data-count="wish" style="display:none">0</b></a>
      <a class="head-link" href="dang-nhap.html">${ICON.user}<span>Tài khoản</span></a>
      <a class="head-link" href="gio-hang.html" aria-label="Giỏ hàng">${ICON.cart}<span>Giỏ hàng</span><b class="cart-count" style="display:none">0</b></a>
    </div></div></header>
  <nav class="nav" id="mainNav"><div class="container">
    <div class="nav-cats"><button type="button" aria-haspopup="true">${ICON.menu.replace('<svg', '<svg width="18" height="18"')} Danh mục sản phẩm</button><div class="mega">${mega}</div></div>
    <div class="nav-links">${links.map(l => `<a href="${l[0]}" class="${l[2] === page ? 'active' : ''}">${l[1]}</a>`).join('')}
      <div class="dd"><a href="bao-hanh.html" class="${supKeys.includes(page) ? 'active' : ''}">Hỗ trợ ▾</a><div class="dd-menu">${support.map(l => `<a href="${l[0]}">${l[1]}</a>`).join('')}</div></div></div></div></nav></div>`;

  /* Thanh menu luôn hiển thị khi cuộn; thu gọn lại một chút để đỡ chiếm màn hình */
  const sh = document.getElementById('stickyHead');
  const onScroll = () => sh.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  document.getElementById('menuToggle').onclick = () => document.getElementById('mainNav').classList.toggle('open');
  document.querySelector('.nav-cats>button').onclick = e => e.currentTarget.parentElement.classList.toggle('open');

  /* Gợi ý tìm kiếm */
  const input = document.getElementById('q'), box = document.getElementById('suggest');
  const urlQ = new URLSearchParams(location.search).get('q'); if (urlQ) input.value = urlQ;
  input.addEventListener('input', () => {
    const v = input.value.trim().toLowerCase();
    if (v.length < 2) { box.classList.remove('open'); return; }
    const res = PRODUCTS.filter(p => (p.name + ' ' + p.sku + ' ' + p.brand + ' ' + p.tags.join(' ')).toLowerCase().includes(v)).slice(0, 6);
    box.innerHTML = res.length ? res.map(p => `<a href="chi-tiet.html?id=${p.id}"><img src="${productImg(p)}" alt=""><div><b>${p.name}</b><span>${p.sku} · ${vnd(p.price)}</span></div></a>`).join('') : '<div class="none">Không tìm thấy linh kiện phù hợp. Thử tìm theo mã part number.</div>';
    box.classList.add('open');
  });
  document.addEventListener('click', e => { if (!e.target.closest('.search')) box.classList.remove('open'); });
}

function renderFooter() {
  const cats = CATEGORIES.slice(0, 5).map(c => `<li><a href="san-pham.html?cat=${c.slug}">${c.name}</a></li>`).join('');
  document.getElementById('site-footer').innerHTML = `
  <section class="trust"><div class="container">
    <div>${ICON.shield}<p><b>Hàng chính hãng</b><span>Có CO/CQ, datasheet đầy đủ</span></p></div>
    <div>${ICON.truck}<p><b>Giao nhanh 2 giờ</b><span>Nội thành TP.HCM và Hà Nội</span></p></div>
    <div>${ICON.swap}<p><b>Đổi trả 7 ngày</b><span>Lỗi nhà sản xuất đổi mới ngay</span></p></div>
    <div>${ICON.chat}<p><b>Hỗ trợ kỹ thuật</b><span>Kỹ sư tư vấn 8:00 - 20:00</span></p></div></div></section>
  <footer class="footer"><div class="container">
    <div><a class="logo" href="index.html">${ICON.logo}<span>${BRAND.name}</span></a>
      <p>Cung cấp linh kiện điện tử, board mạch, cảm biến và dụng cụ cho sinh viên, kỹ sư và doanh nghiệp.</p>
      <p>123 Đường Điện Tử, Quận 1, TP.HCM<br>Hotline: ${BRAND.hotline}<br>${BRAND.email}</p></div>
    <div><h4>Danh mục</h4><ul>${cats}</ul></div>
    <div><h4>Hỗ trợ khách hàng</h4><ul>
      <li><a href="bao-hanh.html#tra-cuu">Tra cứu bảo hành</a></li><li><a href="tra-cuu-don.html">Tra cứu đơn hàng</a></li><li><a href="bao-hanh.html#doi-tra">Chính sách đổi trả</a></li>
      <li><a href="bao-hanh.html#van-chuyen">Vận chuyển</a></li><li><a href="bao-hanh.html#thanh-toan">Thanh toán</a></li><li><a href="hoi-dap.html">Hỏi đáp thường gặp</a></li>
      <li><a href="bao-gia.html">Báo giá doanh nghiệp</a></li><li><a href="cua-hang.html">Hệ thống cửa hàng</a></li><li><a href="gioi-thieu.html">Về ${BRAND.name}</a></li><li><a href="lien-he.html">Liên hệ</a></li></ul></div>
    <div><h4>Nhận bảng giá và khuyến mãi</h4><p>Mỗi tuần một email, không spam.</p>
      <form class="subscribe" id="subForm"><label class="sr-only" for="subMail">Email</label><input id="subMail" type="email" placeholder="Email của bạn" required><button type="submit">Đăng ký</button></form></div>
  </div><div class="copyright">© 2026 ${BRAND.name}. Website mẫu để thiết kế giao diện, không có giao dịch thật.</div></footer>
  <button class="to-top" id="toTop" aria-label="Lên đầu trang">↑</button>`;
  document.getElementById('subForm').onsubmit = e => { e.preventDefault(); e.target.reset(); toast('Đã đăng ký nhận tin. Cảm ơn bạn!'); };
  const top = document.getElementById('toTop');
  top.onclick = () => window.scrollTo({ top: 0 });
  window.addEventListener('scroll', () => top.classList.toggle('show', window.scrollY > 500), { passive: true });
}

/* Nút "Thêm vào giỏ" ở mọi thẻ sản phẩm (event delegation) */
document.addEventListener('click', e => {
  const b = e.target.closest('[data-add]');
  if (!b) return;
  Store.add(Number(b.dataset.add), 1);
  toast('Đã thêm "' + getProduct(b.dataset.add).name.slice(0, 40) + '..." vào giỏ hàng');
});

/* Yêu thích & so sánh (nút trên thẻ sản phẩm và trang chi tiết) */
document.addEventListener('click', e => {
  const w = e.target.closest('[data-wish]'), c = e.target.closest('[data-cmp]');
  if (w) {
    List.toggle('wish', w.dataset.wish); const on = List.has('wish', w.dataset.wish);
    document.querySelectorAll(`[data-wish="${w.dataset.wish}"]`).forEach(b => b.classList.toggle('on', on));
    toast(on ? 'Đã thêm vào yêu thích' : 'Đã bỏ khỏi yêu thích');
    if (document.body.dataset.page === 'wish') location.reload();
  }
  if (c) {
    if (!List.toggle('cmp', c.dataset.cmp, 4)) { toast('Chỉ so sánh được tối đa 4 sản phẩm'); return; }
    const on = List.has('cmp', c.dataset.cmp);
    document.querySelectorAll(`[data-cmp="${c.dataset.cmp}"]`).forEach(b => b.classList.toggle('on', on));
    toast(on ? 'Đã thêm vào so sánh. Mở trang So sánh để xem.' : 'Đã bỏ khỏi so sánh');
  }
});

document.addEventListener('DOMContentLoaded', () => { renderHeader(); renderFooter(); Store.badge(); List.badges(); });
