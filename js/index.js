/* index.js – dựng nội dung Trang chủ */
document.addEventListener('DOMContentLoaded', () => {
  const heroForm = document.getElementById('heroSearch');
  heroForm.addEventListener('submit', e => { if (!heroForm.q.value.trim()) { e.preventDefault(); heroForm.q.focus(); } });

  /* Banner: thay hình minh hoạ bên phải hero và nền khối mua sỉ khi có ảnh thật */
  loadBanner('hero', src => { const a = document.querySelector('.hero-art'); a.innerHTML = `<img class="hero-photo" src="${src}" alt="Linh kiện điện tử chính hãng">`; a.removeAttribute('aria-hidden'); });
  bannerBackground(document.querySelector('.bulk'), 'bulk', 'rgba(15,28,46,.86)');

  /* Danh mục: dùng ảnh của một sản phẩm đại diện */
  const rep = { 'vi-dieu-khien': 1, 'cam-bien': 7, 'ic': 14, 'thu-dong': 18, 'module': 22, 'dung-cu': 26 };
  document.getElementById('catGrid').innerHTML = CATEGORIES.map(c => {
    const n = PRODUCTS.filter(p => p.cat === c.slug).length;
    return `<a class="cat-card" href="san-pham.html?cat=${c.slug}"><img src="${productImg(getProduct(rep[c.slug]))}" alt="" loading="lazy"><div><b>${c.name}</b><span>${n} sản phẩm</span></div></a>`;
  }).join('');

  /* Bán chạy: nhiều đánh giá nhất còn hàng */
  const best = [...PRODUCTS].filter(p => p.stock > 0).sort((a, b) => b.reviews - a.reviews).slice(0, 8);
  document.getElementById('bestGrid').innerHTML = best.map(productCard).join('');

  /* Hàng mới: sản phẩm có nhãn "Mới", bổ sung các sản phẩm id cao nhất */
  const fresh = PRODUCTS.filter(p => p.badge === 'Mới');
  const more = [...PRODUCTS].reverse().filter(p => p.badge !== 'Mới' && p.stock > 0).slice(0, 4 - fresh.length);
  document.getElementById('newGrid').innerHTML = [...fresh, ...more].slice(0, 4).map(productCard).join('');

  /* Thương hiệu */
  const brands = [...new Set(PRODUCTS.map(p => p.brand))].filter(b => b !== 'Generic').slice(0, 12);
  document.getElementById('brands').innerHTML = brands.map(b => `<a href="san-pham.html?q=${encodeURIComponent(b)}">${b}</a>`).join('');

  /* Tin tức: lấy 3 bài mới nhất từ content.js */
  document.getElementById('homeNews').innerHTML = ARTICLES.slice(0, 3).map(x => `<a class="news-card" href="bai-viet.html?id=${x.id}"><img src="${productImg(getProduct(x.pid))}" alt="" loading="lazy"><div><small>${x.date}</small><h3>${x.title}</h3><p>${x.desc}</p></div></a>`).join('');

  /* ===== Banner mới ===== */
  /* Ảnh minh hoạ trong banner lấy từ ảnh sản phẩm (tự đổi khi bạn thay ảnh thật) */
  document.querySelectorAll('img[data-pid]').forEach(i => { i.src = productImg(getProduct(i.dataset.pid)); });

  /* Có file banner trong images/banners/ thì dùng làm ảnh nền, nếu chưa có giữ thiết kế mặc định */
  document.querySelectorAll('[data-banner]').forEach(el => {
    loadBanner(el.dataset.banner, src => {
      el.style.backgroundImage = 'linear-gradient(90deg, rgba(7,57,44,.78), rgba(7,57,44,.25)), url("' + src + '")';
      el.style.backgroundRepeat = 'no-repeat'; el.style.backgroundSize = 'cover'; el.style.backgroundPosition = 'center'; el.classList.add('has-photo');
    });
  });

  /* Slider tự chuyển, có nút, chấm điều hướng; dừng khi rê chuột hoặc khi tắt hiệu ứng */
  const slider = document.getElementById('homeSlider'), track = document.getElementById('slides');
  const n = track.children.length, dots = document.getElementById('sDots');
  let cur = 0, timer = null;
  dots.innerHTML = [...track.children].map((_, i) => `<button type="button" role="tab" aria-label="Banner ${i + 1}" aria-selected="${i === 0}"></button>`).join('');
  function go(i) {
    cur = (i + n) % n; track.style.transform = `translateX(-${cur * 100}%)`;
    [...dots.children].forEach((d, k) => d.setAttribute('aria-selected', k === cur));
  }
  const play = () => { if (matchMedia('(prefers-reduced-motion: reduce)').matches) return; stop(); timer = setInterval(() => go(cur + 1), 6000); };
  const stop = () => { clearInterval(timer); timer = null; };
  slider.querySelector('.s-prev').onclick = () => { go(cur - 1); play(); };
  slider.querySelector('.s-next').onclick = () => { go(cur + 1); play(); };
  dots.onclick = e => { const k = [...dots.children].indexOf(e.target.closest('button')); if (k > -1) { go(k); play(); } };
  slider.addEventListener('mouseenter', stop); slider.addEventListener('mouseleave', play);
  slider.addEventListener('focusin', stop); slider.addEventListener('focusout', play);
  let x0 = null;
  slider.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; stop(); }, { passive: true });
  slider.addEventListener('touchend', e => { if (x0 !== null) { const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1)); x0 = null; } play(); });
  play();

  /* Đồng hồ đếm ngược ở banner flash sale (đến 23:59 hôm nay) */
  const ft = document.getElementById('flashTime'), pad = v => String(v).padStart(2, '0');
  function tick() {
    const end = new Date(); end.setHours(23, 59, 59, 999);
    const s = Math.max(0, Math.floor((end - new Date()) / 1000));
    ft.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s % 3600 / 60))}:${pad(s % 60)}`;
  }
  tick(); setInterval(tick, 1000);
});
