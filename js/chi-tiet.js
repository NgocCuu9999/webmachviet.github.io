/* chi-tiet.js – đọc ?id= trên URL và dựng trang chi tiết */
document.addEventListener('DOMContentLoaded', () => {
  const p = getProduct(new URLSearchParams(location.search).get('id'));
  const root = document.getElementById('detail');
  if (!p) {
    root.innerHTML = `<div class="empty"><p><b>Không tìm thấy sản phẩm này.</b></p><a class="btn btn-green" href="san-pham.html">Xem tất cả sản phẩm</a></div>`;
    return;
  }
  document.title = p.name + ' – Mạch Việt';
  document.getElementById('detailCrumbs').innerHTML = `<a href="index.html">Trang chủ</a><i>/</i><a href="san-pham.html?cat=${p.cat}">${catName(p.cat)}</a><i>/</i><span>${p.name}</span>`;

  const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  const st = p.stock === 0 ? '<span class="stock out">Hết hàng</span>' : p.stock < 20 ? `<span class="stock low">Chỉ còn ${p.stock} sản phẩm</span>` : `<span class="stock in">Còn hàng (${p.stock})</span>`;
  const gallery = productPhotos(p) || [0, 12, -10, 90].map(r => productImg(p, r));
  const reviews = [
    ['Minh Khoa', 5, 'Hàng đúng mô tả, đóng gói cẩn thận, test chạy ngay không lỗi.'],
    ['Thu Hà', 4, 'Giao nhanh, giá tốt hơn nhiều chỗ khác. Trừ một sao vì tài liệu tiếng Việt còn ít.'],
    ['Quốc Bảo', 5, 'Mua số lượng cho lớp thực hành, shop báo giá nhanh và xuất hoá đơn đầy đủ.']
  ];

  root.innerHTML = `
  <div class="pd">
    <div><div class="gallery-main"><img id="mainImg" src="${productImg(p)}" alt="${p.name}" width="600" height="600"></div>
      <div class="thumbs">${gallery.map((src, i) => `<button class="${i === 0 ? 'on' : ''}" data-src="${src}" aria-label="Xem ảnh ${i + 1}"><img src="${src}" alt=""></button>`).join('')}</div></div>
    <div class="pd-info">
      <a class="muted" href="san-pham.html?q=${encodeURIComponent(p.brand)}">${p.brand}</a>
      <h1>${p.name}</h1>
      <div class="meta"><span>Mã: <b class="mono">${p.sku}</b></span><span class="rating"><span class="stars">${stars(p.rating)}</span>${p.rating} (${p.reviews} đánh giá)</span>${st}</div>
      <div class="pd-price"><span class="price">${vnd(p.price)}</span>${p.old ? `<span class="old">${vnd(p.old)}</span><span class="off">Giảm ${off}%</span>` : ''}</div>
      <p class="pd-short">${p.desc}</p>
      <div class="buy-row">
        <div class="qty"><button type="button" id="qMinus" aria-label="Giảm">−</button><input id="qty" type="number" min="1" max="${p.stock}" value="1" aria-label="Số lượng"><button type="button" id="qPlus" aria-label="Tăng">+</button></div>
        <button class="btn btn-gold" id="addBtn" ${p.stock === 0 ? 'disabled' : ''}>Thêm vào giỏ</button>
        <button class="btn btn-green" id="buyBtn" ${p.stock === 0 ? 'disabled' : ''}>Mua ngay</button>
      </div>
      <div class="mini-actions"><button class="btn btn-line btn-sm" data-wish="${p.id}">♥ Yêu thích</button><button class="btn btn-line btn-sm" data-cmp="${p.id}">⇄ So sánh</button><a class="btn btn-line btn-sm" href="bao-gia.html?sp=${p.id}">Báo giá số lượng lớn</a></div>
      <div class="tier"><h3>Giá theo số lượng</h3><table class="table"><thead><tr><th>Số lượng</th><th>Đơn giá</th></tr></thead><tbody>${priceTiers(p).map(t => `<tr><td>${t.qty}</td><td><b>${vnd(t.price)}</b></td></tr>`).join('')}</tbody></table></div>
      <div class="perks"><div>Hàng chính hãng, có CO/CQ khi cần</div><div>Giao nhanh 2 giờ nội thành</div><div>Đổi trả 7 ngày nếu lỗi</div><div>Hỗ trợ kỹ thuật miễn phí</div></div>
    </div>
  </div>

  <div class="tabs" role="tablist" id="tabs">
    <button class="active" data-tab="desc">Mô tả</button><button data-tab="spec">Thông số kỹ thuật</button><button data-tab="docs">Tài liệu</button><button data-tab="rev">Đánh giá (${p.reviews})</button><button data-tab="qa">Hỏi đáp</button>
  </div>
  <div class="tab-panel" id="tab-desc"><h2>${p.name}</h2><p>${p.desc}</p><p>Sản phẩm phù hợp cho sinh viên, người làm dự án DIY và kỹ sư thử nghiệm mẫu. Mọi sản phẩm được kiểm tra trước khi giao và bảo hành theo chính sách của ${BRAND.name}.</p></div>
  <div class="tab-panel" id="tab-spec" hidden><div class="scroll-x"><table class="table spec"><tbody>${Object.entries(p.specs).map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join('')}<tr><th>Thương hiệu</th><td>${p.brand}</td></tr><tr><th>Mã sản phẩm</th><td class="mono">${p.sku}</td></tr></tbody></table></div></div>
  <div class="tab-panel" id="tab-docs" hidden>
    ${['Datasheet (PDF)', 'Sơ đồ chân (Pinout)', 'Thư viện và code mẫu'].map(d => `<div class="doc"><div><b>${d}</b><br><span class="muted">${p.sku}</span></div><button class="btn btn-line btn-sm" data-doc>Tải về</button></div>`).join('')}
  </div>
  <div class="tab-panel" id="tab-rev" hidden>
    <div id="revList">${reviews.map(r => `<div class="review"><b>${r[0]}</b><span class="stars">${stars(r[1])}</span><p>${r[2]}</p></div>`).join('')}</div>
    <form class="review-form" id="revForm" novalidate><h3>Viết đánh giá</h3>
      <div class="row2"><div class="field"><label for="rvName">Tên của bạn</label><input class="input" id="rvName"></div>
      <div class="field"><label for="rvStar">Số sao</label><select class="select" id="rvStar"><option value="5">5 sao</option><option value="4">4 sao</option><option value="3">3 sao</option><option value="2">2 sao</option><option value="1">1 sao</option></select></div></div>
      <div class="field"><label for="rvText">Nhận xét</label><textarea class="textarea" id="rvText" style="min-height:90px"></textarea><span class="err">Vui lòng nhập nhận xét.</span></div>
      <button class="btn btn-green" type="submit">Gửi đánh giá</button></form>
  </div>
  <div class="tab-panel accordion" id="tab-qa" hidden>
    <details open><summary>Sản phẩm có tương thích Arduino IDE không?</summary><p>Phần lớn board và module trong danh mục hỗ trợ Arduino IDE. Thông tin cụ thể xem tại tab Tài liệu.</p></details>
    <details><summary>Mua số lượng lớn có được giảm giá không?</summary><p>Có. Bảng giá theo số lượng nằm ngay phía trên, hoặc dùng nút "Báo giá số lượng lớn" để nhận bảng giá riêng.</p></details>
    <details><summary>Nếu hàng lỗi tôi được hỗ trợ thế nào?</summary><p>Đổi mới trong 7 ngày hoặc bảo hành theo chính sách. Xem chi tiết tại trang Bảo hành và chính sách.</p></details>
  </div>

  <section class="section" style="padding-top:8px"><div class="section-head"><h2>Sản phẩm liên quan</h2><a href="san-pham.html?cat=${p.cat}">Xem cả danh mục</a></div>
    <div class="grid grid-4">${PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4).map(productCard).join('')}</div></section>

  <div class="mobile-buy"><span class="price">${vnd(p.price)}</span><button class="btn btn-gold" id="addBtn2" ${p.stock === 0 ? 'disabled' : ''}>Thêm vào giỏ</button></div>`;

  /* Tương tác */
  const qty = document.getElementById('qty');
  const clamp = () => { qty.value = Math.max(1, Math.min(p.stock || 1, parseInt(qty.value) || 1)); return +qty.value; };
  document.getElementById('qMinus').onclick = () => { qty.value = clamp() - 1; clamp(); };
  document.getElementById('qPlus').onclick = () => { qty.value = clamp() + 1; clamp(); };
  qty.onchange = clamp;
  const add = () => { Store.add(p.id, clamp()); toast(`Đã thêm ${qty.value} sản phẩm vào giỏ hàng`); };
  document.getElementById('addBtn').onclick = add;
  document.getElementById('addBtn2').onclick = add;
  document.getElementById('buyBtn').onclick = () => { Store.add(p.id, clamp()); location.href = 'gio-hang.html'; };
  document.querySelectorAll('.thumbs button').forEach(b => b.onclick = () => {
    document.getElementById('mainImg').src = b.dataset.src;
    document.querySelectorAll('.thumbs button').forEach(x => x.classList.toggle('on', x === b));
  });
  document.querySelectorAll('#tabs button').forEach(b => b.onclick = () => {
    document.querySelectorAll('#tabs button').forEach(x => x.classList.toggle('active', x === b));
    document.querySelectorAll('.tab-panel').forEach(t => t.hidden = t.id !== 'tab-' + b.dataset.tab);
  });
  document.querySelectorAll('[data-doc]').forEach(b => b.onclick = () => toast('Bản demo: file tài liệu sẽ được gắn tại đây.'));
  document.getElementById('revForm').onsubmit = e => {
    e.preventDefault();
    const t = document.getElementById('rvText'), f = t.closest('.field');
    f.classList.toggle('error', !t.value.trim());
    if (!t.value.trim()) return;
    const n = document.getElementById('rvName').value.trim() || 'Khách hàng';
    document.getElementById('revList').insertAdjacentHTML('afterbegin', `<div class="review"><b>${n}</b><span class="stars">${stars(+document.getElementById('rvStar').value)}</span><p>${t.value.replace(/</g, '&lt;')}</p></div>`);
    e.target.reset(); toast('Cảm ơn bạn đã đánh giá!');
  };
  /* đồng bộ trạng thái nút yêu thích / so sánh */
  document.querySelectorAll(`[data-wish="${p.id}"]`).forEach(b => b.classList.toggle('on', List.has('wish', p.id)));
});
