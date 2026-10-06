/* lien-he.js – kiểm tra biểu mẫu liên hệ */
document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);
  const sub = new URLSearchParams(location.search).get('subject'); if (sub) $('cSubject').value = sub;
  $('contactForm').onsubmit = e => {
    e.preventDefault();
    const v = id => $(id).value.trim();
    const rules = { cName: v('cName').length >= 2, cPhone: /^0\d{9}$/.test(v('cPhone')), cEmail: !v('cEmail') || /^\S+@\S+\.\S+$/.test(v('cEmail')), cMsg: v('cMsg').length >= 10 };
    let first = null; Object.entries(rules).forEach(([k, ok]) => { $(k).closest('.field').classList.toggle('error', !ok); if (!ok && !first) first = k; });
    if (first) { $(first).focus(); return; }
    $('contactForm').outerHTML = `<div class="panel sent"><div class="tick">✓</div><h2>Đã gửi liên hệ</h2><p class="muted">Cảm ơn ${v('cName')}. Chúng tôi sẽ gọi lại số ${v('cPhone')} trong vòng 1 giờ làm việc.</p><a class="btn btn-green" href="index.html">Về trang chủ</a></div>`;
  };
});
