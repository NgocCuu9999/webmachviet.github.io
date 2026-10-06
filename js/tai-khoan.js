/* tai-khoan.js – bảng điều khiển tài khoản (yêu cầu đã đăng nhập) */
document.addEventListener('DOMContentLoaded', () => {
  let user = null; try { user = JSON.parse(localStorage.getItem('machviet_user')); } catch (e) {}
  if (!user) { location.replace('dang-nhap.html?next=tai-khoan.html'); return; }
  const $ = id => document.getElementById(id);
  const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } };
  $('hello').textContent = 'Xin chào, ' + user.name;

  const myOrders = () => {
    const demo = user.email === 'demo@machviet.vn' ? Object.entries(ORDERS).map(([code, o]) => ({ code, ...o })) : [];
    return [...read('machviet_orders', []), ...demo];
  };
  const stBadge = s => `<span class="badge ${s === 3 ? '' : s === 0 ? 'warn' : 'blue'}">${ORDER_STEPS[s]}</span>`;

  const views = {
    'tong-quan': () => { const o = myOrders(); return `<div class="stats"><div class="stat"><b>${o.length}</b><span>Đơn hàng</span></div><div class="stat"><b>${List.get('wish').length}</b><span>Sản phẩm yêu thích</span></div><div class="stat"><b>${vnd(o.reduce((s, x) => s + x.total, 0))}</b><span>Tổng đã mua</span></div></div>
      <div class="panel"><h3>Đơn hàng gần đây</h3>${o.slice(0, 2).map(orderRow).join('') || '<p class="muted">Bạn chưa có đơn hàng nào.</p>'}<a class="btn btn-line btn-sm" href="#don-hang">Xem tất cả đơn hàng</a></div>`; },
    'don-hang': () => `<div class="panel"><h3>Đơn hàng của tôi</h3>${myOrders().map(orderRow).join('') || '<div class="empty"><p>Bạn chưa có đơn hàng nào.</p><a class="btn btn-green" href="san-pham.html">Mua sắm ngay</a></div>'}</div>`,
    'dia-chi': () => { const a = read('machviet_addr', []); return `<div class="panel"><h3>Sổ địa chỉ</h3>${a.map((x, i) => `<div class="addr"><div><b>${x.name}</b> · ${x.phone}<br><span class="muted">${x.line}</span></div><button data-del="${i}">Xoá</button></div>`).join('') || '<p class="muted">Chưa có địa chỉ nào được lưu.</p>'}
      <form id="addrForm" novalidate style="margin-top:18px"><h3>Thêm địa chỉ mới</h3><div class="row2"><div class="field"><label for="aName">Người nhận</label><input class="input" id="aName"></div><div class="field"><label for="aPhone">Số điện thoại</label><input class="input" id="aPhone"></div></div><div class="field"><label for="aLine">Địa chỉ</label><input class="input" id="aLine"><span class="err">Vui lòng điền đủ thông tin.</span></div><button class="btn btn-green" type="submit">Lưu địa chỉ</button></form></div>`; },
    'ho-so': () => `<div class="panel"><h3>Thông tin cá nhân</h3><form id="profForm" novalidate><div class="field"><label for="pName">Họ và tên</label><input class="input" id="pName" value="${user.name}"></div><div class="row2"><div class="field"><label for="pMail">Email</label><input class="input" id="pMail" value="${user.email}" disabled></div><div class="field"><label for="pPhone">Số điện thoại</label><input class="input" id="pPhone" value="${user.phone || ''}"></div></div><button class="btn btn-green" type="submit">Cập nhật</button></form></div>`
  };
  function orderRow(o) { return `<div class="order"><div class="info"><b class="mono">${o.code}</b> ${stBadge(o.status)}<br><span class="muted">${o.date} · ${o.items.length} dòng sản phẩm · ${o.pay}</span></div><b>${vnd(o.total)}</b><a class="btn btn-line btn-sm" href="tra-cuu-don.html?code=${o.code}&phone=${o.phone}">Theo dõi</a></div>`; }

  function show() {
    const s = views[location.hash.slice(1)] ? location.hash.slice(1) : 'tong-quan';
    document.querySelectorAll('#accNav [data-s]').forEach(a => a.classList.toggle('active', a.dataset.s === s));
    $('accBody').innerHTML = views[s]();
    const af = $('addrForm');
    if (af) af.onsubmit = e => {
      e.preventDefault(); const n = $('aName').value.trim(), p = $('aPhone').value.trim(), l = $('aLine').value.trim();
      if (!n || !p || !l) { $('aLine').closest('.field').classList.add('error'); return; }
      const a = read('machviet_addr', []); a.push({ name: n, phone: p, line: l }); localStorage.setItem('machviet_addr', JSON.stringify(a)); toast('Đã lưu địa chỉ'); show();
    };
    document.querySelectorAll('[data-del]').forEach(b => b.onclick = () => { const a = read('machviet_addr', []); a.splice(+b.dataset.del, 1); localStorage.setItem('machviet_addr', JSON.stringify(a)); show(); });
    const pf = $('profForm');
    if (pf) pf.onsubmit = e => { e.preventDefault(); user.name = $('pName').value.trim() || user.name; user.phone = $('pPhone').value.trim(); localStorage.setItem('machviet_user', JSON.stringify(user)); $('hello').textContent = 'Xin chào, ' + user.name; toast('Đã cập nhật thông tin'); };
  }
  window.addEventListener('hashchange', show); show();
  $('logout').onclick = e => { e.preventDefault(); localStorage.removeItem('machviet_user'); location.href = 'dang-nhap.html'; };
});
