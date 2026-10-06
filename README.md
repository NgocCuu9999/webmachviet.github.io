MẠCH VIỆT – Website bán linh kiện điện tử (chỉ giao diện, không cần database)

CÁCH CHẠY: giải nén, mở file index.html bằng trình duyệt (Chrome/Edge/Firefox). Cần internet để tải font Google.

CẤU TRÚC
  *.html        21 trang, mỗi trang một file
  css/base.css  CSS dùng chung; css/<trang>.css là CSS riêng của từng trang
  images/       Đặt ảnh sản phẩm thật vào đây (khai báo trong PHOTOS của data.js)
  js/data.js    Danh sách 28 sản phẩm + danh mục (sửa ở đây để đổi hàng hoá)
  js/content.js Bài viết, cửa hàng, hỏi đáp, đơn hàng mẫu
  js/layout.js  Header, footer, giỏ hàng, yêu thích, so sánh (dùng chung)
  js/<trang>.js JavaScript riêng của từng trang

DỮ LIỆU THỬ NGHIỆM
  Tài khoản: demo@machviet.vn / 123456
  Đơn hàng:  MV240001 / 0901234567
  Bảo hành:  MV-BH-100234
  Mã giảm giá: LINHKIEN10, MACHVIET50, FREESHIP
Giỏ hàng, yêu thích, tài khoản được lưu bằng localStorage của trình duyệt.
Đổi tên cửa hàng: sửa BRAND ở đầu js/data.js.


**MACH VIET – Electronic Components Website (UI only, no database required)**

**HOW TO RUN:** Extract the file and open `index.html` using a web browser (Chrome/Edge/Firefox). An internet connection is required to load Google Fonts.

**STRUCTURE**

* `*.html` — 21 pages, one file per page
* `css/base.css` — Shared CSS; `css/<page>.css` is page-specific CSS
* `images/` — Place real product images here (declared in `PHOTOS` inside `data.js`)
* `js/data.js` — List of 28 products + categories (edit here to change inventory)
* `js/content.js` — Articles, store locations, FAQs, and sample orders
* `js/layout.js` — Shared header, footer, shopping cart, wishlist, and comparison
* `js/<page>.js` — Page-specific JavaScript

**TEST DATA**

* **Account:** demo@machviet.vn / 123456
* **Order:** MV240001 / 0901234567
* **Warranty:** MV-BH-100234
* **Discount codes:** LINHKIEN10, MACHVIET50, FREESHIP

Shopping cart, wishlist, and account details are saved in the browser's `localStorage`.

To change the store name, edit `BRAND` at the top of `js/data.js`.
