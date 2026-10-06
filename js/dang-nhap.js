/* dang-nhap.js – đăng nhập / đăng ký giả lập bằng localStorage */
document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);
  const users = () => { try { return JSON.parse(localStorage.getItem('machviet_users')) || []; } catch (e) { return []; } };
  const next = new URLSearchParams(location.search).get('next') || 'tai-khoan.html';
  const mark = (id, ok) => { $(id).closest('.field').classList.toggle('error', !ok); return ok; };

  document.querySelectorAll('.tabs button').forEach(b => b.onclick = () => {
    document.querySelectorAll('.tabs button').forEach(x => x.classList.toggle('active', x === b));
    $('loginForm').hidden = b.dataset.tab !== 'login'; $('regForm').hidden = b.dataset.tab !== 'register';
  });
  document.querySelectorAll('[data-pw]').forEach(b => b.onclick = () => {
    const i = $(b.dataset.pw); i.type = i.type === 'password' ? 'text' : 'password'; b.textContent = i.type === 'password' ? 'Hiện' : 'Ẩn';
  });
  const login = u => { try { localStorage.setItem('machviet_user', JSON.stringify(u)); } catch (e) {} location.href = next; };

  $('loginForm').onsubmit = e => {
    e.preventDefault();
    const email = $('lEmail').value.trim().toLowerCase(), pass = $('lPass').value;
    const a = mark('lEmail', /^\S+@\S+\.\S+$/.test(email)), b = mark('lPass', pass.length > 0);
    if (!a || !b) return;
    const all = [{ name: 'Khách hàng thử nghiệm', email: 'demo@machviet.vn', phone: '0901234567', pass: '123456' }, ...users()];
    const u = all.find(x => x.email === email && x.pass === pass);
    if (!u) { $('lPassErr').textContent = 'Email hoặc mật khẩu chưa đúng.'; mark('lPass', false); return; }
    login({ name: u.name, email: u.email, phone: u.phone });
  };
  $('regForm').onsubmit = e => {
    e.preventDefault();
    const v = id => $(id).value.trim();
    const ok = [mark('rName', v('rName').length >= 2), mark('rEmail', /^\S+@\S+\.\S+$/.test(v('rEmail'))), mark('rPhone', /^0\d{9}$/.test(v('rPhone'))), mark('rPass', $('rPass').value.length >= 6), mark('rPass2', $('rPass2').value === $('rPass').value)];
    if (ok.includes(false)) return;
    const list = users();
    if (list.some(x => x.email === v('rEmail').toLowerCase())) { toast('Email này đã có tài khoản. Hãy đăng nhập.'); return; }
    list.push({ name: v('rName'), email: v('rEmail').toLowerCase(), phone: v('rPhone'), pass: $('rPass').value });
    try { localStorage.setItem('machviet_users', JSON.stringify(list)); } catch (err) {}
    login({ name: v('rName'), email: v('rEmail').toLowerCase(), phone: v('rPhone') });
  };
});
