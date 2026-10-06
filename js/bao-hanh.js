/* bao-hanh.js – tra cứu bảo hành theo mã (dữ liệu mẫu) */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('whForm').onsubmit = e => {
    e.preventDefault();
    const code = document.getElementById('whCode').value.trim().toUpperCase(), r = WARRANTIES[code], out = document.getElementById('whResult');
    out.innerHTML = !code ? '' : r
      ? `<div class="wh-res ${r.ok ? 'ok' : 'no'}"><b>${r.product}</b><br>Ngày mua: ${r.buy} · Hết hạn: ${r.end}<br><span class="badge ${r.ok ? '' : 'red'}" style="margin-top:6px">${r.status}</span></div>`
      : `<div class="wh-res no">Không tìm thấy mã <b>${code.replace(/</g, '&lt;')}</b>. Vui lòng kiểm tra lại hoặc gọi ${BRAND.hotline}.</div>`;
  };
});
