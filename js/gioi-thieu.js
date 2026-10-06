/* gioi-thieu.js – số liệu chạy lên khi cuộn tới */
document.addEventListener('DOMContentLoaded', () => {
  bannerBackground(document.querySelector('.about-hero'), 'gioithieu');
  const els = document.querySelectorAll('[data-n]');
  const run = el => {
    const end = +el.dataset.n, t0 = performance.now(), dur = 1400;
    const step = t => { const k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))).toLocaleString('vi-VN'); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) { els.forEach(e => e.textContent = (+e.dataset.n).toLocaleString('vi-VN')); return; }
  const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { run(x.target); io.unobserve(x.target); } }), { threshold: .5 });
  els.forEach(e => io.observe(e));
});
