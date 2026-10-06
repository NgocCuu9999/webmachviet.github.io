/* bai-viet.js – đọc ?id= và hiển thị bài viết */
document.addEventListener('DOMContentLoaded', () => {
  const a = ARTICLES.find(x => x.id === +new URLSearchParams(location.search).get('id'));
  const root = document.getElementById('article');
  if (!a) { root.innerHTML = '<div class="empty"><p><b>Không tìm thấy bài viết.</b></p><a class="btn btn-green" href="tin-tuc.html">Về trang tin tức</a></div>'; return; }
  document.title = a.title + ' – Mạch Việt';
  document.getElementById('artCrumbs').className = 'crumbs';
  document.getElementById('artCrumbs').innerHTML = `<a href="index.html">Trang chủ</a><i>/</i><a href="tin-tuc.html">Tin tức</a><i>/</i><span>${a.cat}</span>`;
  const p = getProduct(a.pid);
  root.innerHTML = `<div class="art-wrap"><article class="art"><span class="badge">${a.cat}</span><h1 style="margin-top:10px">${a.title}</h1>
    <div class="art-meta"><span>${a.date}</span><span>${a.read} phút đọc</span><span>Biên tập: Đội ngũ kỹ thuật ${BRAND.name}</span></div>
    <img class="cover" src="${productImg(p)}" alt="">
    <p class="lead">${a.desc}</p>${a.body.map(t => `<p>${t}</p>`).join('')}
    <div class="share"><button class="btn btn-line btn-sm" id="copyLink">Sao chép liên kết</button><a class="btn btn-line btn-sm" href="tin-tuc.html">← Tất cả bài viết</a></div></article>
    <aside class="side-col"><div class="panel" style="margin-bottom:18px"><h3>Sản phẩm trong bài</h3>${productCard(p)}</div>
    <div class="panel side-art"><h3>Bài viết khác</h3>${ARTICLES.filter(x => x.id !== a.id).slice(0, 4).map(x => `<a href="bai-viet.html?id=${x.id}"><img src="${productImg(getProduct(x.pid))}" alt=""><span>${x.title}</span></a>`).join('')}</div></aside></div>`;
  document.getElementById('copyLink').onclick = () => (navigator.clipboard ? navigator.clipboard.writeText(location.href) : Promise.reject()).then(() => toast('Đã sao chép liên kết')).catch(() => toast('Hãy sao chép địa chỉ trên thanh trình duyệt'));
});
