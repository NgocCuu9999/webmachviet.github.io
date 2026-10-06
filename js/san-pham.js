/* san-pham.js – lọc, sắp xếp, phân trang (không cần server) */
const PER_PAGE = 12;
const PRICE_RANGES = [['all', 'Tất cả', 0, Infinity], ['p1', 'Dưới 50.000đ', 0, 50000], ['p2', '50.000đ - 200.000đ', 50000, 200000], ['p3', '200.000đ - 500.000đ', 200000, 500000], ['p4', '500.000đ - 1.000.000đ', 500000, 1000000], ['p5', 'Trên 1.000.000đ', 1000000, Infinity]];
const params = new URLSearchParams(location.search);
const state = { q: params.get('q') || '', cat: params.get('cat') || '', brands: new Set(), price: 'all', stock: false, sort: params.get('sort') || 'popular', view: 'grid', page: 1 };

document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);
  const brands = [...new Set(PRODUCTS.map(p => p.brand))].sort();

  function buildFilters() {
    $('fCats').innerHTML = `<label class="check"><input type="radio" name="cat" value="" ${!state.cat ? 'checked' : ''}> Tất cả <small>${PRODUCTS.length}</small></label>` +
      CATEGORIES.map(c => `<label class="check"><input type="radio" name="cat" value="${c.slug}" ${state.cat === c.slug ? 'checked' : ''}> ${c.name} <small>${PRODUCTS.filter(p => p.cat === c.slug).length}</small></label>`).join('');
    $('fBrands').innerHTML = brands.map(b => `<label class="check"><input type="checkbox" name="brand" value="${b}" ${state.brands.has(b) ? 'checked' : ''}> ${b}</label>`).join('');
    $('fPrice').innerHTML = PRICE_RANGES.map(r => `<label class="check"><input type="radio" name="price" value="${r[0]}" ${state.price === r[0] ? 'checked' : ''}> ${r[1]}</label>`).join('');
  }

  function matches(p) {
    const q = state.q.trim().toLowerCase();
    if (q && !(p.name + ' ' + p.sku + ' ' + p.brand + ' ' + p.tags.join(' ') + ' ' + catName(p.cat)).toLowerCase().includes(q)) return false;
    if (state.cat && p.cat !== state.cat) return false;
    if (state.brands.size && !state.brands.has(p.brand)) return false;
    const r = PRICE_RANGES.find(x => x[0] === state.price);
    if (p.price < r[2] || p.price >= r[3]) return false;
    if (state.stock && p.stock === 0) return false;
    return true;
  }

  function render() {
    let list = PRODUCTS.filter(matches);
    const s = state.sort;
    list.sort((a, b) => s === 'price-asc' ? a.price - b.price : s === 'price-desc' ? b.price - a.price : s === 'rating' ? b.rating - a.rating || b.reviews - a.reviews : s === 'new' ? b.id - a.id : b.reviews - a.reviews);
    const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    state.page = Math.min(state.page, pages);
    const slice = list.slice((state.page - 1) * PER_PAGE, state.page * PER_PAGE);

    $('listTitle').textContent = state.q ? `Kết quả cho "${state.q}"` : state.cat ? catName(state.cat) : 'Tất cả sản phẩm';
    $('crumbCat').textContent = state.cat ? catName(state.cat) : 'Sản phẩm';
    document.title = $('listTitle').textContent + ' – Mạch Việt';
    $('resultCount').textContent = `${list.length} sản phẩm`;
    $('productGrid').className = 'grid grid-3' + (state.view === 'list' ? ' list' : '');
    $('productGrid').innerHTML = slice.length ? slice.map(productCard).join('') :
      `<div class="empty" style="grid-column:1/-1"><p><b>Không tìm thấy sản phẩm phù hợp.</b></p><p class="muted">Thử bỏ bớt bộ lọc hoặc tìm theo mã part number khác.</p><button class="btn btn-green" id="emptyReset">Xoá bộ lọc</button></div>`;
    const er = $('emptyReset'); if (er) er.onclick = reset;

    let pg = '';
    if (pages > 1) {
      pg = `<button ${state.page === 1 ? 'disabled' : ''} data-p="${state.page - 1}" aria-label="Trang trước">‹</button>`;
      for (let i = 1; i <= pages; i++) pg += `<button class="${i === state.page ? 'active' : ''}" data-p="${i}">${i}</button>`;
      pg += `<button ${state.page === pages ? 'disabled' : ''} data-p="${state.page + 1}" aria-label="Trang sau">›</button>`;
    }
    $('pager').innerHTML = pg;
    $('pager').querySelectorAll('[data-p]').forEach(b => b.onclick = () => { state.page = +b.dataset.p; render(); window.scrollTo({ top: 120 }); });
    $('sortSel').value = state.sort;
  }

  function reset() { state.q = ''; state.cat = ''; state.brands.clear(); state.price = 'all'; state.stock = false; state.page = 1; $('fStock').checked = false; buildFilters(); render(); }

  buildFilters(); render();
  $('filters').addEventListener('change', e => {
    const t = e.target;
    if (t.name === 'cat') state.cat = t.value;
    if (t.name === 'brand') t.checked ? state.brands.add(t.value) : state.brands.delete(t.value);
    if (t.name === 'price') state.price = t.value;
    if (t.id === 'fStock') state.stock = t.checked;
    state.page = 1; render();
  });
  $('sortSel').onchange = e => { state.sort = e.target.value; state.page = 1; render(); };
  $('fReset').onclick = reset;
  $('fToggle').onclick = () => $('filters').classList.toggle('open');
  document.querySelectorAll('[data-view]').forEach(b => b.onclick = () => {
    state.view = b.dataset.view;
    document.querySelectorAll('[data-view]').forEach(x => x.classList.toggle('on', x === b)); render();
  });
});
