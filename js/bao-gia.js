/* bao-gia.js – biểu mẫu báo giá với danh sách dòng linh kiện động */
document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id), rows = $('qRows');
  const opts = `<option value="">Chọn nhanh từ danh mục...</option>` + PRODUCTS.map(p => `<option value="${p.name} (${p.sku})">${p.name}</option>`).join('');
  function addRow(text = '', qty = 10) {
    const d = document.createElement('div'); d.className = 'qrow';
    d.innerHTML = `<div><label class="sr-only">Tên hoặc mã linh kiện</label><input class="input q-item" list="qList" placeholder="Tên hoặc mã part number" value="${text.replace(/"/g, '&quot;')}"></div><div><label class="sr-only">Số lượng</label><input class="input q-qty" type="number" min="1" value="${qty}"></div><button type="button" class="del" aria-label="Xoá dòng">×</button>`;
    d.querySelector('.del').onclick = () => { if (rows.children.length > 1) d.remove(); };
    rows.appendChild(d);
  }
  const dl = document.createElement('datalist'); dl.id = 'qList'; dl.innerHTML = PRODUCTS.map(p => `<option value="${p.name} (${p.sku})">`).join(''); document.body.appendChild(dl);
  const sp = getProduct(new URLSearchParams(location.search).get('sp'));
  addRow(sp ? `${sp.name} (${sp.sku})` : '', 50); addRow('', 100);
  $('qAdd').onclick = () => addRow();

  $('quoteForm').onsubmit = e => {
    e.preventDefault();
    const v = id => $(id).value.trim();
    const rules = { qCompany: v('qCompany').length >= 2, qName: v('qName').length >= 2, qPhone: /^0\d{9}$/.test(v('qPhone')), qEmail: /^\S+@\S+\.\S+$/.test(v('qEmail')) };
    let first = null; Object.entries(rules).forEach(([k, ok]) => { $(k).closest('.field').classList.toggle('error', !ok); if (!ok && !first) first = k; });
    if (first) { $(first).focus(); return; }
    const ref = 'BG' + String(Date.now()).slice(-6);
    $('quoteRoot').outerHTML = `<div class="panel done"><div class="tick">✓</div><h2>Đã gửi yêu cầu báo giá</h2><p>Mã yêu cầu: <b class="mono">${ref}</b></p><p class="muted">Chúng tôi sẽ gửi bảng giá tới ${v('qEmail')} và gọi ${v('qPhone')} để xác nhận.</p><a class="btn btn-green" href="san-pham.html">Xem thêm sản phẩm</a></div>`;
    window.scrollTo({ top: 0 });
  };
});
