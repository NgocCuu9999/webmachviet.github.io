/* hoi-dap.js – danh sách hỏi đáp có tìm kiếm */
document.addEventListener('DOMContentLoaded', () => {
  const box = document.getElementById('faqQ'), out = document.getElementById('faqList');
  function render() {
    const v = box.value.trim().toLowerCase();
    const html = FAQS.map(g => {
      const items = g.items.filter(([q, a]) => (q + a).toLowerCase().includes(v));
      return items.length ? `<section class="faq-group"><h2>${g.group}</h2><div class="accordion">${items.map(([q, a]) => `<details ${v ? 'open' : ''}><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></section>` : '';
    }).join('');
    out.innerHTML = html || '<div class="empty">Không có câu hỏi phù hợp. <a href="lien-he.html" style="color:var(--pcb);font-weight:600">Gửi câu hỏi cho chúng tôi</a>.</div>';
  }
  box.oninput = render; render();
});
