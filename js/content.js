/* ==========================================================
   content.js – Nội dung mẫu: bài viết, cửa hàng, hỏi đáp, đơn hàng...
   ========================================================== */
const ARTICLES = [
  { id: 1, cat: 'So sánh', title: 'Chọn ESP32 hay STM32 cho dự án đầu tiên?', date: '24/09/2026', read: 6, pid: 1,
    desc: 'So sánh hiệu năng, giá và hệ sinh thái để chọn đúng ngay từ đầu.',
    body: ['ESP32 mạnh ở kết nối không dây. Nếu dự án cần Wi-Fi hoặc Bluetooth, đây gần như là lựa chọn mặc định với mức giá dưới 200.000đ.', 'STM32 phù hợp khi bạn cần điều khiển thời gian thực chính xác, nhiều timer và ngoại vi như CAN hay ADC tốc độ cao. Hệ công cụ STM32CubeIDE miễn phí nhưng dốc học hơn.', 'Lời khuyên: người mới học IoT nên bắt đầu với ESP32 và Arduino IDE. Khi cần độ ổn định công nghiệp, chuyển sang STM32.'] },
  { id: 2, cat: 'Hướng dẫn', title: 'Cách đọc datasheet trong 10 phút', date: '18/09/2026', read: 5, pid: 14,
    desc: 'Ba trang cần đọc trước và những thông số dễ bị bỏ qua.',
    body: ['Bắt đầu từ trang đầu tiên: mô tả, sơ đồ chân (pinout) và bảng Absolute Maximum Ratings. Vượt các giá trị này là hỏng linh kiện.', 'Tiếp theo xem Electrical Characteristics để biết điện áp, dòng hoạt động thực tế, và Typical Application để lấy mạch mẫu.', 'Cuối cùng kiểm tra kiểu chân (package) và kích thước footprint trước khi đặt hàng hoặc vẽ mạch in.'] },
  { id: 3, cat: 'Hướng dẫn', title: 'Hàn mạch lần đầu: 7 lỗi thường gặp', date: '10/09/2026', read: 7, pid: 25,
    desc: 'Từ nhiệt độ mỏ hàn đến cách chọn thiếc hàn phù hợp.',
    body: ['Lỗi phổ biến nhất là đặt nhiệt độ quá thấp khiến mối hàn xỉn và nguội. Với thiếc có chì, 320-350°C là vùng an toàn.', 'Hãy làm nóng đồng thời chân linh kiện và pad, sau đó mới đưa thiếc vào. Không đặt thiếc lên đầu mỏ hàn rồi quệt sang.', 'Dùng nhựa thông (flux) và vệ sinh đầu mỏ hàn thường xuyên giúp mối hàn bóng và bền.'] },
  { id: 4, cat: 'Dự án', title: 'Trạm đo nhiệt độ độ ẩm Wi-Fi với ESP32 và DHT22', date: '02/09/2026', read: 9, pid: 7,
    desc: 'Dự án cuối tuần: đo dữ liệu và xem trên điện thoại.',
    body: ['Bạn cần: một board ESP32, cảm biến DHT22, điện trở kéo lên 10kΩ và dây jumper. Tổng chi phí khoảng 300.000đ.', 'Nối chân data của DHT22 vào GPIO4, cấp nguồn 3.3V. Cài thư viện DHT sensor library trong Arduino IDE.', 'Gửi dữ liệu lên dịch vụ MQTT miễn phí, vẽ biểu đồ trên điện thoại. Đây là nền tảng cho nhà thông minh quy mô nhỏ.'] },
  { id: 5, cat: 'Kiến thức', title: 'Điện trở kéo lên (pull-up) dùng khi nào?', date: '25/08/2026', read: 4, pid: 18,
    desc: 'Giải thích ngắn gọn, kèm giá trị điện trở nên chọn.',
    body: ['Chân vi điều khiển ở trạng thái thả nổi sẽ đọc giá trị ngẫu nhiên. Điện trở kéo lên giữ chân ở mức cao khi không có tín hiệu.', 'Giá trị thường dùng: 10kΩ cho nút bấm, 4.7kΩ cho bus I2C ở tốc độ 100kHz.', 'Nhiều vi điều khiển có sẵn điện trở kéo lên bên trong, bật bằng lệnh INPUT_PULLUP trên Arduino.'] },
  { id: 6, cat: 'So sánh', title: 'Arduino UNO R3 và Raspberry Pi Pico: nên mua board nào?', date: '12/08/2026', read: 6, pid: 3,
    desc: 'Giá, hiệu năng, ngôn ngữ lập trình và khả năng mở rộng.',
    body: ['UNO R3 có hệ sinh thái shield và tài liệu khổng lồ, phù hợp giáo dục. Điện áp 5V tương thích với nhiều module giá rẻ.', 'Pico mạnh hơn nhiều với hai nhân 133MHz, hỗ trợ MicroPython, giá chỉ bằng một phần UNO chính hãng.', 'Nếu mục tiêu là học nhanh với tài liệu tiếng Việt, chọn UNO. Nếu cần hiệu năng và Wi-Fi, chọn Pico W.'] }
];

const STORES = [
  { name: 'Mạch Việt – Quận 1', addr: '123 Đường Điện Tử, Phường Bến Nghé, Quận 1, TP.HCM', phone: '028 3822 6868', hours: '8:00 - 20:30 (cả tuần)', city: 'TP.HCM', pid: 6 },
  { name: 'Mạch Việt – Thủ Đức', addr: '45 Võ Văn Ngân, Phường Linh Chiểu, TP. Thủ Đức, TP.HCM', phone: '028 3722 1188', hours: '8:00 - 20:00 (cả tuần)', city: 'TP.HCM', pid: 3 },
  { name: 'Mạch Việt – Cầu Giấy', addr: '88 Xuân Thủy, Quận Cầu Giấy, Hà Nội', phone: '024 3766 8899', hours: '8:30 - 20:00 (T2 - CN)', city: 'Hà Nội', pid: 2 },
  { name: 'Mạch Việt – Hai Bà Trưng', addr: '17 Tạ Quang Bửu, Quận Hai Bà Trưng, Hà Nội', phone: '024 3868 5577', hours: '8:30 - 20:00 (T2 - CN)', city: 'Hà Nội', pid: 1 },
  { name: 'Mạch Việt – Hải Châu', addr: '210 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng', phone: '0236 3555 666', hours: '8:00 - 20:00 (cả tuần)', city: 'Đà Nẵng', pid: 4 }
];

const FAQS = [
  { group: 'Đặt hàng & thanh toán', items: [
    ['Tôi cần xuất hoá đơn VAT thì làm thế nào?', 'Bạn nhập thông tin công ty ở bước thanh toán hoặc gửi mã đơn hàng cho chúng tôi trong vòng 7 ngày. Hoá đơn điện tử được gửi qua email.'],
    ['Có hỗ trợ thanh toán khi nhận hàng (COD) không?', 'Có, áp dụng cho mọi đơn hàng dưới 5.000.000đ. Đơn lớn hơn vui lòng chuyển khoản hoặc thanh toán thẻ.'],
    ['Tôi có thể sửa đơn hàng sau khi đặt không?', 'Có thể sửa hoặc huỷ trong vòng 30 phút nếu đơn chưa chuyển sang trạng thái đóng gói. Liên hệ hotline để được hỗ trợ nhanh nhất.'] ] },
  { group: 'Vận chuyển', items: [
    ['Bao lâu tôi nhận được hàng?', 'Nội thành TP.HCM và Hà Nội giao trong 2-4 giờ (đơn đặt trước 16:00). Các tỉnh khác 2-4 ngày làm việc.'],
    ['Phí vận chuyển tính thế nào?', 'Miễn phí cho đơn từ 500.000đ. Đơn dưới mức này tính 25.000đ nội thành và 35.000đ liên tỉnh.'] ] },
  { group: 'Kỹ thuật & sản phẩm', items: [
    ['Linh kiện có datasheet và chứng nhận xuất xứ không?', 'Mọi sản phẩm đều có liên kết datasheet. Chứng nhận CO/CQ cấp theo yêu cầu cho đơn từ 2.000.000đ.'],
    ['Tôi không biết chọn linh kiện nào cho dự án của mình?', 'Hãy gửi mô tả dự án qua trang Liên hệ. Kỹ sư của chúng tôi sẽ đề xuất danh sách linh kiện trong vòng 1 ngày làm việc.'],
    ['Board có được nạp sẵn firmware không?', 'Các board Arduino và ESP32 xuất xưởng với firmware mặc định hoặc bootloader. Bạn có thể nạp lại bằng Arduino IDE hoặc PlatformIO.'] ] },
  { group: 'Bảo hành & đổi trả', items: [
    ['Thời gian bảo hành là bao lâu?', 'Board mạch và module được bảo hành 12 tháng. Dụng cụ đo lường bảo hành 12-24 tháng tuỳ hãng. Linh kiện rời (IC, điện trở, tụ) đổi mới trong 7 ngày nếu lỗi.'],
    ['Sản phẩm nào không được đổi trả?', 'Linh kiện đã hàn, cháy do cấp sai điện áp hoặc đã bị can thiệp phần cứng sẽ không nằm trong chính sách bảo hành.'] ] }
];

/* Mã bảo hành mẫu để thử tính năng tra cứu */
const WARRANTIES = {
  'MV-BH-100234': { product: 'Kit ESP32-S3 DevKitC-1 N8R8', buy: '12/03/2026', end: '12/03/2027', status: 'Còn bảo hành', ok: true },
  'MV-BH-100871': { product: 'Đồng hồ vạn năng số DT9205A', buy: '05/11/2025', end: '05/11/2026', status: 'Còn bảo hành', ok: true },
  'MV-BH-099120': { product: 'Mỏ hàn điều chỉnh nhiệt 60W', buy: '20/01/2025', end: '20/01/2026', status: 'Hết bảo hành', ok: false }
};

/* Đơn hàng mẫu để thử tính năng tra cứu và trang tài khoản */
const ORDERS = {
  'MV240001': { date: '28/09/2026', total: 477000, status: 2, items: [[1, 1], [7, 2], [27, 1]], phone: '0901234567', pay: 'COD' },
  'MV240002': { date: '30/09/2026', total: 2890000, status: 3, items: [[6, 1]], phone: '0912345678', pay: 'Chuyển khoản' },
  'MV240003': { date: '03/10/2026', total: 128000, status: 0, items: [[8, 2], [28, 2]], phone: '0901234567', pay: 'Ví MoMo' }
};
const ORDER_STEPS = ['Đã đặt hàng', 'Đang đóng gói', 'Đang giao', 'Đã giao thành công'];
