/* so-sanh.js – bảng so sánh song song */
document.addEventListener('DOMContentLoaded', () => {
  const area = document.getElementById('cmpArea'), sel = document.getElementById('addSel'), only = document.getElementById('onlyDiff');

  function render() {
    const ids = List.get('cmp'), items = ids.map(getProduct).filter(Boolean);
    sel.innerHTML = PRODUCTS.filter(p => !ids.includes(p.id)).map(p => `<option value="${p.id}">${p.name}</option>`).join('');
    document.getElementById('addCmp').disabled = ids.length >= 4;
    if (items.length === 0) {
      area.innerHTML = `<div class="empty"><p><b>Chưa có sản phẩm nào để so sánh.</b></p><p class="muted">Chọn sản phẩm từ ô phía trên hoặc bấm ⇄ trên thẻ sản phẩm.</p><a class="btn btn-green" href="san-pham.html">Chọn sản phẩm</a></div>`;
      return;
    }
    const keys = [...new Set(items.flatMap(p => Object.keys(p.specs)))];
    const row = (label, vals, cls) => {
      const same = vals.every(v => v === vals[0]);
      if (only.checked && same && items.length > 1) return '';
      return `<tr class="${!same && items.length > 1 ? 'diff' : ''}"><th>${label}</th>${vals.map(v => `<td>${v}</td>`).join('')}</tr>`;
    };
    area.innerHTML = `<div class="scroll-x"><table class="table cmp">
      <tr class="head"><th></th>${items.map(p => `<td><img src="${productImg(p)}" alt=""><a href="chi-tiet.html?id=${p.id}">${p.name}</a><div class="price">${vnd(p.price)}</div><button class="btn btn-gold btn-sm" data-add="${p.id}" ${p.stock === 0 ? 'disabled' : ''}>Thêm vào giỏ</button><br><button class="rm" data-rm="${p.id}">Bỏ khỏi so sánh</button></td>`).join('')}</tr>
      ${row('Thương hiệu', items.map(p => p.brand))}${row('Danh mục', items.map(p => catName(p.cat)))}${row('Đánh giá', items.map(p => `${p.rating} ★ (${p.reviews})`))}
      ${row('Tình trạng', items.map(p => p.stock === 0 ? 'Hết hàng' : 'Còn ' + p.stock))}
      ${keys.map(k => row(k, items.map(p => p.specs[k] || '—'))).join('')}
    </table></div>`;
    area.querySelectorAll('[data-rm]').forEach(b => b.onclick = () => { List.toggle('cmp', b.dataset.rm); render(); });
  }
  /* trang này có nút ⇄ riêng nên tránh xử lý trùng với layout.js */
  document.getElementById('addCmp').onclick = () => { if (sel.value) { List.toggle('cmp', sel.value, 4); render(); } };
  only.onchange = render;
  render();
});
