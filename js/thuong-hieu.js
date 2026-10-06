/* thuong-hieu.js – danh sách thương hiệu tự tạo từ dữ liệu sản phẩm */
document.addEventListener('DOMContentLoaded', () => {
  const brands = [...new Set(PRODUCTS.map(p => p.brand))].filter(b => b !== 'Generic').sort();
  const grid = document.getElementById('brandGrid'), box = document.getElementById('brandSearch');
  function render() {
    const v = box.value.trim().toLowerCase();
    const list = brands.filter(b => b.toLowerCase().includes(v));
    grid.innerHTML = list.map(b => {
      const ps = PRODUCTS.filter(p => p.brand === b);
      const imgs = ps.slice(0, 2).map(p => `<img src="${productImg(p)}" alt="" loading="lazy">`).join('');
      return `<a class="brand-card" href="san-pham.html?q=${encodeURIComponent(b)}"><div class="imgs" style="grid-template-columns:repeat(${ps.length > 1 ? 2 : 1},1fr)">${imgs}</div><div class="txt"><b>${b}</b><span>${ps.length} sản phẩm</span></div></a>`;
    }).join('') || '<div class="empty" style="grid-column:1/-1">Không có thương hiệu phù hợp.</div>';
  }
  box.oninput = render; render();
});
