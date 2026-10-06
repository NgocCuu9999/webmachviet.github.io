/* yeu-thich.js – hiển thị danh sách yêu thích */
document.addEventListener('DOMContentLoaded', () => {
  const items = List.get('wish').map(getProduct).filter(Boolean);
  document.getElementById('wishCount').textContent = items.length + ' sản phẩm';
  const grid = document.getElementById('wishGrid');
  if (!items.length) {
    document.querySelector('.wish-actions').style.display = 'none';
    grid.outerHTML = `<div class="empty"><p><b>Bạn chưa lưu sản phẩm nào.</b></p><p class="muted">Bấm biểu tượng ♥ trên thẻ sản phẩm để lưu lại xem sau.</p><a class="btn btn-green" href="san-pham.html">Khám phá sản phẩm</a></div>`;
    return;
  }
  grid.innerHTML = items.map(productCard).join('');
  document.getElementById('addAll').onclick = () => { items.filter(p => p.stock > 0).forEach(p => Store.add(p.id, 1)); toast('Đã thêm các sản phẩm còn hàng vào giỏ'); };
});
