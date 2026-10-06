/* thanh-toan.js – biểu mẫu thanh toán, kiểm tra dữ liệu, tạo mã đơn */
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('checkoutRoot');
  const items = Store.get();
  if (!items.length) { root.innerHTML = `<div class="empty"><p><b>Giỏ hàng trống, chưa có gì để thanh toán.</b></p><a class="btn btn-green" href="san-pham.html">Chọn sản phẩm</a></div>`; return; }
  let ship = 'std';
  const SHIP = { std: ['Giao tiêu chuẩn (2-4 ngày)', 25000], fast: ['Giao nhanh 2 giờ (nội thành)', 45000], pickup: ['Nhận tại cửa hàng', 0] };

  function sum() {
    const t = cartTotals(); const fee = t.sub >= FREE_SHIP_FROM && ship === 'std' ? 0 : (t.cp && t.cp.type === 'ship' && ship === 'std') ? 0 : SHIP[ship][1];
    return { ...t, fee, total: t.sub - t.discount + fee };
  }
  function renderSummary() {
    const t = sum();
    document.getElementById('coSum').innerHTML = `${items.map(i => { const p = getProduct(i.id); return `<div class="co-item"><img src="${productImg(p)}" alt=""><div>${p.name}<br><small>SL: ${i.qty}</small></div><b>${vnd(p.price * i.qty)}</b></div>`; }).join('')}
      <div class="sum-row"><span>Tạm tính</span><span>${vnd(t.sub)}</span></div>${t.discount ? `<div class="sum-row"><span>Giảm giá (${t.code})</span><span>−${vnd(t.discount)}</span></div>` : ''}
      <div class="sum-row"><span>Vận chuyển</span><span>${t.fee ? vnd(t.fee) : 'Miễn phí'}</span></div><div class="sum-row total"><span>Tổng cộng</span><span>${vnd(t.total)}</span></div>`;
  }

  root.innerHTML = `<form class="two-col" id="coForm" novalidate>
    <div>
      <div class="panel" style="margin-bottom:18px"><h3>Thông tin nhận hàng</h3>
        <div class="row2"><div class="field"><label for="name">Họ và tên <i>*</i></label><input class="input" id="name" autocomplete="name"><span class="err">Vui lòng nhập họ tên.</span></div>
        <div class="field"><label for="phone">Số điện thoại <i>*</i></label><input class="input" id="phone" inputmode="tel" autocomplete="tel"><span class="err">Số điện thoại gồm 10 chữ số, bắt đầu bằng 0.</span></div></div>
        <div class="field"><label for="email">Email</label><input class="input" id="email" type="email" autocomplete="email"><span class="err">Email chưa đúng định dạng.</span></div>
        <div class="field"><label for="addr">Địa chỉ <i>*</i></label><input class="input" id="addr" autocomplete="street-address" placeholder="Số nhà, đường, phường/xã"><span class="err">Vui lòng nhập địa chỉ nhận hàng.</span></div>
        <div class="row2"><div class="field"><label for="city">Tỉnh/Thành phố <i>*</i></label><select class="select" id="city"><option value="">Chọn tỉnh/thành</option><option>TP. Hồ Chí Minh</option><option>Hà Nội</option><option>Đà Nẵng</option><option>Cần Thơ</option><option>Hải Phòng</option><option>Tỉnh khác</option></select><span class="err">Vui lòng chọn tỉnh/thành.</span></div>
        <div class="field"><label for="note">Ghi chú</label><input class="input" id="note" placeholder="Ví dụ: giao giờ hành chính"></div></div>
        <label class="check" style="display:flex;gap:10px"><input type="checkbox" id="vat" style="accent-color:var(--pcb)"> Xuất hoá đơn VAT</label>
        <div class="vat-fields" id="vatBox"><div class="row2"><div class="field"><label for="company">Tên công ty</label><input class="input" id="company"></div><div class="field"><label for="tax">Mã số thuế</label><input class="input" id="tax"></div></div></div></div>
      <div class="panel" style="margin-bottom:18px"><h3>Vận chuyển</h3>
        ${Object.entries(SHIP).map(([k, v]) => `<label class="opt"><input type="radio" name="ship" value="${k}" ${k === 'std' ? 'checked' : ''}><div><b>${v[0]}</b></div><span class="fee">${v[1] ? vnd(v[1]) : 'Miễn phí'}</span></label>`).join('')}</div>
      <div class="panel"><h3>Phương thức thanh toán</h3>
        <label class="opt"><input type="radio" name="pay" value="COD" checked><div><b>Thanh toán khi nhận hàng (COD)</b><span>Kiểm tra hàng rồi mới thanh toán</span></div></label>
        <label class="opt"><input type="radio" name="pay" value="Chuyển khoản"><div><b>Chuyển khoản ngân hàng</b><span>Thông tin tài khoản gửi qua email sau khi đặt hàng</span></div></label>
        <label class="opt"><input type="radio" name="pay" value="Ví MoMo"><div><b>Ví MoMo / ZaloPay</b><span>Quét mã QR tại bước xác nhận</span></div></label>
        <label class="opt"><input type="radio" name="pay" value="Thẻ"><div><b>Thẻ ATM / Visa / Mastercard</b><span>Thanh toán trực tuyến, được bảo mật</span></div></label></div>
    </div>
    <aside class="panel side-col"><h3>Đơn hàng của bạn</h3><div id="coSum"></div><button class="btn btn-gold btn-block" type="submit" style="margin-top:14px">Đặt hàng</button><p class="muted" style="font-size:.8rem;margin:10px 0 0">Bằng việc đặt hàng, bạn đồng ý với chính sách đổi trả và bảo mật của ${BRAND.name}.</p></aside></form>`;
  renderSummary();

  document.getElementById('vat').onchange = e => document.getElementById('vatBox').classList.toggle('on', e.target.checked);
  document.querySelectorAll('[name=ship]').forEach(r => r.onchange = () => { ship = r.value; renderSummary(); });

  document.getElementById('coForm').onsubmit = e => {
    e.preventDefault();
    const v = id => document.getElementById(id).value.trim();
    const rules = { name: v('name').length >= 2, phone: /^0\d{9}$/.test(v('phone')), email: !v('email') || /^\S+@\S+\.\S+$/.test(v('email')), addr: v('addr').length >= 5, city: !!v('city') };
    let first = null;
    Object.entries(rules).forEach(([k, ok]) => { document.getElementById(k).closest('.field').classList.toggle('error', !ok); if (!ok && !first) first = k; });
    if (first) { document.getElementById(first).focus(); return; }

    const t = sum(), code = 'MV' + String(Date.now()).slice(-6), pay = document.querySelector('[name=pay]:checked').value;
    /* Lưu đơn vào localStorage để trang Tài khoản và Tra cứu đơn hàng đọc lại */
    try {
      const orders = JSON.parse(localStorage.getItem('machviet_orders') || '[]');
      orders.unshift({ code, date: new Date().toLocaleDateString('vi-VN'), total: t.total, status: 0, items: items.map(i => [i.id, i.qty]), phone: v('phone'), pay, name: v('name'), addr: v('addr') + ', ' + v('city') });
      localStorage.setItem('machviet_orders', JSON.stringify(orders));
    } catch (err) {}
    Store.clear(); try { localStorage.removeItem('machviet_coupon'); } catch (err) {}
    root.innerHTML = `<div class="panel success"><div class="tick">✓</div><h2>Đặt hàng thành công</h2>
      <p>Cảm ơn ${v('name') || 'bạn'}! Mã đơn hàng của bạn:</p><div class="code">${code}</div>
      <p class="muted">Chúng tôi sẽ gọi xác nhận qua số ${v('phone')} trong vòng 15 phút. Tổng thanh toán: <b>${vnd(t.total)}</b> (${pay}).</p>
      <div class="btns"><a class="btn btn-green" href="tra-cuu-don.html?code=${code}&phone=${v('phone')}">Theo dõi đơn hàng</a><a class="btn btn-line" href="san-pham.html">Tiếp tục mua sắm</a></div></div>`;
    window.scrollTo({ top: 0 });
  };
});
