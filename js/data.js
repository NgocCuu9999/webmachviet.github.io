/* ==========================================================
   data.js – Dữ liệu mẫu (thay cho database) + tạo ảnh SVG
   Muốn thêm/sửa sản phẩm: chỉnh mảng PRODUCTS bên dưới.
   ========================================================== */
const BRAND = { name: 'Mạch Việt', tagline: 'Linh kiện điện tử chính hãng', hotline: '1900 6868', email: 'ban-hang@machviet.vn' };

const CATEGORIES = [
  { slug: 'vi-dieu-khien', name: 'Vi điều khiển & Board mạch', sub: ['Arduino', 'ESP32 / ESP8266', 'STM32', 'Raspberry Pi'] },
  { slug: 'cam-bien',      name: 'Cảm biến',                   sub: ['Nhiệt độ - độ ẩm', 'Khoảng cách', 'Gia tốc - con quay', 'Khí gas'] },
  { slug: 'ic',            name: 'IC & Bán dẫn',               sub: ['IC khuếch đại', 'IC định thời', 'IC nguồn', 'IC logic'] },
  { slug: 'thu-dong',      name: 'Linh kiện thụ động',         sub: ['Điện trở', 'Tụ điện', 'LED', 'Cuộn cảm'] },
  { slug: 'module',        name: 'Module & Nguồn',             sub: ['Module nguồn', 'Relay', 'Driver động cơ', 'Màn hình'] },
  { slug: 'dung-cu',       name: 'Dụng cụ & Đo lường',         sub: ['Mỏ hàn', 'Đồng hồ vạn năng', 'Breadboard', 'Dây kết nối'] }
];

/* ---------- Tạo ảnh SVG minh hoạ cho từng loại linh kiện ---------- */
function productImage(type, color, rot) {
  color = color || '#0B6B52'; rot = rot || 0;
  let g = '';
  const pins = (x, y, n, gap, horiz) => {
    let s = '';
    for (let i = 0; i < n; i++) {
      s += horiz
        ? `<rect x="${x + i * gap}" y="${y}" width="9" height="14" fill="#1a1f26"/><rect x="${x + i * gap + 2}" y="${y + 3}" width="5" height="8" fill="#F0B92B"/>`
        : `<rect x="${x}" y="${y + i * gap}" width="14" height="9" fill="#9aa5a0"/>`;
    }
    return s;
  };
  if (type === 'board') {
    g = `<rect x="60" y="105" width="280" height="190" rx="12" fill="${color}"/>
      <rect x="60" y="105" width="280" height="190" rx="12" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="3"/>
      ${pins(74, 112, 15, 18, true)}${pins(74, 274, 15, 18, true)}
      <rect x="36" y="170" width="52" height="60" rx="4" fill="#b8c2be"/><rect x="42" y="178" width="40" height="44" rx="2" fill="#7c8783"/>
      <rect x="150" y="155" width="100" height="90" rx="6" fill="#1a1f26"/>
      <circle cx="166" cy="171" r="4" fill="#555"/>
      <rect x="170" y="190" width="60" height="5" rx="2" fill="#4a5560"/><rect x="170" y="203" width="44" height="5" rx="2" fill="#4a5560"/>
      <rect x="275" y="160" width="26" height="18" fill="#c9c3a6"/><rect x="275" y="190" width="26" height="18" fill="#c9c3a6"/>
      <circle cx="90" cy="135" r="6" fill="#F0B92B"/><circle cx="310" cy="265" r="6" fill="#F0B92B"/>
      <path d="M100 250 H140 V225 M250 250 H290 V215" stroke="#F0B92B" stroke-opacity=".55" stroke-width="2" fill="none"/>`;
  } else if (type === 'chip') {
    let l = '';
    for (let i = 0; i < 8; i++) l += `<rect x="96" y="${128 + i * 20}" width="34" height="10" rx="2" fill="#aeb8b3"/><rect x="270" y="${128 + i * 20}" width="34" height="10" rx="2" fill="#aeb8b3"/>`;
    g = `${l}<rect x="126" y="112" width="148" height="176" rx="8" fill="#1a1f26"/>
      <circle cx="152" cy="138" r="7" fill="#0a0d11"/>
      <rect x="150" y="185" width="100" height="6" rx="3" fill="#59646f"/><rect x="150" y="203" width="70" height="6" rx="3" fill="#59646f"/><rect x="150" y="221" width="90" height="6" rx="3" fill="#59646f"/>`;
  } else if (type === 'sensor') {
    g = `<rect x="110" y="90" width="180" height="210" rx="10" fill="${color}"/>
      <rect x="135" y="112" width="130" height="110" rx="6" fill="#e9eef2"/>
      ${[0,1,2,3,4,5].map(i => `<line x1="${148 + i * 22}" y1="122" x2="${148 + i * 22}" y2="212" stroke="#9fb0bb" stroke-width="3"/>`).join('')}
      <circle cx="125" cy="105" r="5" fill="#F0B92B"/><circle cx="275" cy="105" r="5" fill="#F0B92B"/>
      <rect x="140" y="240" width="120" height="34" rx="3" fill="#1a1f26"/>
      ${[0,1,2,3].map(i => `<rect x="${150 + i * 28}" y="274" width="10" height="26" fill="#F0B92B"/>`).join('')}`;
  } else if (type === 'module') {
    g = `<rect x="55" y="105" width="290" height="190" rx="10" fill="${color}"/>
      <rect x="85" y="130" width="100" height="90" rx="6" fill="#2a6fd0"/><rect x="95" y="142" width="80" height="6" rx="3" fill="#8db4ee"/>
      <rect x="205" y="130" width="60" height="40" rx="4" fill="#1a1f26"/>
      <rect x="285" y="120" width="44" height="50" rx="4" fill="#3fb37f"/><circle cx="307" cy="145" r="12" fill="#1c6b49"/>
      <rect x="285" y="205" width="44" height="50" rx="4" fill="#3fb37f"/><circle cx="307" cy="230" r="12" fill="#1c6b49"/>
      <circle cx="215" cy="205" r="7" fill="#d9433b"/><circle cx="240" cy="205" r="7" fill="#7ee081"/>
      ${pins(80, 268, 8, 18, true)}`;
  } else if (type === 'passive') {
    const res = (y, bands) => `<rect x="60" y="${y + 13}" width="280" height="4" fill="#9aa5a0"/>
      <rect x="110" y="${y}" width="180" height="30" rx="15" fill="#e6d3a8"/>
      ${bands.map((c, i) => `<rect x="${140 + i * 30}" y="${y}" width="10" height="30" fill="${c}"/>`).join('')}`;
    g = res(110, ['#8b4513', '#111', '#d9433b', '#d4af37']) + res(165, ['#d9433b', '#d9433b', '#8b4513', '#d4af37']) +
        res(220, ['#f0b92b', '#7a3fb0', '#2f7d4a', '#d4af37']) +
        `<circle cx="120" cy="290" r="16" fill="#d9433b"/><circle cx="170" cy="290" r="16" fill="#f0b92b"/><circle cx="220" cy="290" r="16" fill="#3fb37f"/><circle cx="270" cy="290" r="16" fill="#2a6fd0"/>`;
  } else if (type === 'iron') {
    g = `<g transform="rotate(-35 200 200)"><rect x="70" y="180" width="130" height="40" rx="20" fill="#1a1f26"/>
      <rect x="200" y="188" width="60" height="24" fill="#aeb8b3"/><rect x="260" y="194" width="70" height="12" fill="#c9d1cd"/><path d="M330 194 L365 200 L330 206 Z" fill="#F0B92B"/>
      <rect x="100" y="186" width="70" height="28" rx="14" fill="#F0B92B"/></g>`;
  } else if (type === 'meter') {
    g = `<rect x="110" y="70" width="180" height="260" rx="18" fill="#F0B92B"/>
      <rect x="130" y="92" width="140" height="70" rx="6" fill="#cfe3d6"/><text x="255" y="146" font-size="40" font-family="monospace" text-anchor="end" fill="#1a1f26">12.47</text>
      <circle cx="200" cy="235" r="46" fill="#1a1f26"/><line x1="200" y1="235" x2="200" y2="200" stroke="#F0B92B" stroke-width="6" stroke-linecap="round"/>
      <circle cx="145" cy="305" r="9" fill="#d9433b"/><circle cx="200" cy="305" r="9" fill="#111"/><circle cx="255" cy="305" r="9" fill="#111"/>`;
  } else if (type === 'breadboard') {
    let h = '';
    for (let r = 0; r < 10; r++) for (let c = 0; c < 20; c++) h += `<rect x="${86 + c * 12}" y="${112 + r * 14 + (r > 4 ? 22 : 0)}" width="6" height="6" rx="1" fill="#333"/>`;
    g = `<rect x="60" y="90" width="280" height="220" rx="8" fill="#f2f2ee" stroke="#c9c9c0" stroke-width="3"/>
      <rect x="60" y="192" width="280" height="14" fill="#dcdcd2"/>
      <rect x="72" y="98" width="256" height="3" fill="#d9433b"/><rect x="72" y="297" width="256" height="3" fill="#2a6fd0"/>${h}`;
  } else if (type === 'wires') {
    const cols = ['#d9433b', '#f0b92b', '#3fb37f', '#2a6fd0', '#7a3fb0', '#111'];
    g = cols.map((c, i) => `<path d="M${90 + i * 14} 300 C${90 + i * 14} 160 ${300 - i * 10} 240 ${300 - i * 10} 100" stroke="${c}" stroke-width="9" fill="none" stroke-linecap="round"/><rect x="${300 - i * 10 - 5}" y="92" width="10" height="18" fill="#1a1f26"/>`).join('');
  } else if (type === 'led') {
    const cs = ['#d9433b', '#f0b92b', '#3fb37f', '#2a6fd0', '#e9eef2'];
    g = cs.map((c, i) => `<g transform="translate(${88 + i * 54} 120)"><path d="M0 60 V-8 a20 20 0 0 1 40 0 V60 Z" fill="${c}" fill-opacity=".9"/><rect x="-4" y="60" width="48" height="6" fill="${c}"/><rect x="6" y="66" width="3" height="90" fill="#aeb8b3"/><rect x="31" y="66" width="3" height="70" fill="#aeb8b3"/></g>`).join('');
  }
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#EDF2EF"/>
     <g opacity=".5" stroke="#cfd9d4" stroke-width="1">${Array.from({length: 9}, (_, i) => `<path d="M${i * 50} 0V400M0 ${i * 50}H400"/>`).join('')}</g>
     <g transform="rotate(${rot} 200 200)">${g}</g></svg>`);
}

/* ---------- Danh sách sản phẩm ---------- */
const P = (id, cat, name, sku, brand, price, old, stock, rating, reviews, badge, img, color, desc, specs, tags) =>
  ({ id, cat, name, sku, brand, price, old, stock, rating, reviews, badge, img, color, desc, specs, tags: tags || [] });

const PRODUCTS = [
  P(1,'vi-dieu-khien','Kit phát triển ESP32-S3 DevKitC-1 N8R8','ESP32-S3-DEVKITC-1','Espressif',189000,225000,120,4.8,312,'Bán chạy','board','#0B6B52','Kit ESP32-S3 hai nhân, Wi-Fi và Bluetooth 5 LE, 8MB Flash và 8MB PSRAM, hỗ trợ AI vector instruction. Phù hợp IoT, camera, giao diện màn hình cảm ứng.',{'Vi xử lý':'Xtensa LX7 dual-core 240MHz','Bộ nhớ':'8MB Flash / 8MB PSRAM','Kết nối':'Wi-Fi 802.11 b/g/n, BLE 5.0','GPIO':'45 chân','Điện áp':'3.3V (cấp qua USB-C 5V)','Kích thước':'69 x 25.5 mm'},['esp32','wifi','iot']),
  P(2,'vi-dieu-khien','Arduino UNO R3 chính hãng (ATmega328P)','A000066','Arduino',689000,null,45,4.9,205,'','board','#00878F','Board Arduino UNO R3 chính hãng sản xuất tại Ý, lựa chọn số một để học lập trình nhúng.',{'Vi điều khiển':'ATmega328P','Xung nhịp':'16MHz','Chân số':'14 (6 PWM)','Chân analog':'6','Điện áp':'5V','Nguồn vào':'7-12V'},['arduino','uno']),
  P(3,'vi-dieu-khien','Raspberry Pi Pico W (RP2040 + Wi-Fi)','RPI-PICO-W','Raspberry Pi',149000,169000,80,4.7,148,'Mới','board','#2E8B57','Board RP2040 hai nhân, tích hợp Wi-Fi, lập trình bằng MicroPython hoặc C/C++.',{'Vi xử lý':'RP2040 dual Cortex-M0+','Xung nhịp':'133MHz','RAM':'264KB','Flash':'2MB','Kết nối':'Wi-Fi 2.4GHz','GPIO':'26'},['pico','rp2040']),
  P(4,'vi-dieu-khien','STM32F103C8T6 Blue Pill','STM32F103C8T6','STMicroelectronics',85000,null,200,4.6,176,'','board','#1E4FA3','Board STM32 Cortex-M3 nhỏ gọn, giá rẻ, nhiều ngoại vi.',{'Lõi':'ARM Cortex-M3 72MHz','Flash':'64KB','SRAM':'20KB','Giao tiếp':'USB, CAN, SPI, I2C, UART','Điện áp':'2.0-3.6V'},['stm32','arm']),
  P(5,'vi-dieu-khien','NodeMCU ESP8266 V3 CH340','NODEMCU-V3','Lolin',95000,115000,150,4.5,264,'','board','#3B3B3B','Board Wi-Fi ESP8266 phổ biến, dễ lập trình bằng Arduino IDE.',{'Chip':'ESP-12E','Flash':'4MB','GPIO':'11','USB':'CH340','Điện áp':'3.3V'},['esp8266','wifi']),
  P(6,'vi-dieu-khien','Raspberry Pi 5 – 8GB RAM','RPI5-8GB','Raspberry Pi',2890000,null,18,4.9,92,'Mới','board','#B3262B','Máy tính nhúng Raspberry Pi 5, CPU Cortex-A76 2.4GHz, 8GB RAM, hai cổng camera/hiển thị.',{'CPU':'Broadcom BCM2712 4 nhân 2.4GHz','RAM':'8GB LPDDR4X','Kết nối':'Wi-Fi 5, BT 5.0, Gigabit','USB':'2x USB 3.0, 2x USB 2.0','Video':'2x micro-HDMI 4Kp60'},['raspberry','pi5']),

  P(7,'cam-bien','Cảm biến nhiệt độ độ ẩm DHT22 (AM2302)','DHT22-AM2302','Aosong',68000,80000,300,4.6,421,'Bán chạy','sensor','#1E4FA3','Đo nhiệt độ và độ ẩm số, độ chính xác cao hơn DHT11.',{'Nhiệt độ':'-40 đến 80°C (±0.5°C)','Độ ẩm':'0-100% RH (±2%)','Điện áp':'3.3-6V','Giao tiếp':'1-Wire','Chu kỳ đọc':'2 giây'},['dht22','nhiet-do']),
  P(8,'cam-bien','Cảm biến siêu âm HC-SR04','HC-SR04','Elecfreaks',22000,null,500,4.5,530,'','sensor','#1E7FA3','Đo khoảng cách 2-400cm bằng sóng siêu âm.',{'Tầm đo':'2-400 cm','Góc đo':'15°','Điện áp':'5V','Dòng':'15mA','Tần số':'40kHz'},['sieu-am']),
  P(9,'cam-bien','Cảm biến gia tốc và con quay MPU-6050 GY-521','MPU-6050-GY521','InvenSense',45000,null,180,4.7,238,'','sensor','#5B3FA3','IMU 6 trục (3 trục gia tốc và 3 trục gyro), giao tiếp I2C.',{'Trục':'6-DoF','Gia tốc':'±2/4/8/16g','Gyro':'±250-2000°/s','Giao tiếp':'I2C','Điện áp':'3-5V'},['imu','i2c']),
  P(10,'cam-bien','Cảm biến khí gas MQ-2','MQ-2','Hanwei',35000,42000,220,4.3,167,'','sensor','#B3262B','Phát hiện khí gas LPG, khói, hydro, CO. Có ngõ ra analog và digital.',{'Khí phát hiện':'LPG, khói, H2, CO','Điện áp':'5V','Ngõ ra':'Analog + Digital','Thời gian làm nóng':'20 giây'},['gas','mq2']),
  P(11,'cam-bien','Cảm biến áp suất BME280 (I2C/SPI)','BME280-3V3','Bosch',79000,95000,90,4.8,201,'Mới','sensor','#0B6B52','Đo nhiệt độ, độ ẩm và áp suất khí quyển, tiết kiệm điện.',{'Áp suất':'300-1100 hPa','Nhiệt độ':'-40 đến 85°C','Độ ẩm':'0-100%','Giao tiếp':'I2C/SPI','Điện áp':'1.8-3.6V'},['bme280']),
  P(12,'cam-bien','Cảm biến chuyển động PIR HC-SR501','HC-SR501','Generic',25000,null,260,4.4,310,'','sensor','#E0A51B','Phát hiện chuyển động hồng ngoại, điều chỉnh được độ nhạy và thời gian.',{'Tầm phát hiện':'3-7m','Góc':'120°','Điện áp':'5-20V','Ngõ ra':'3.3V TTL'},['pir']),

  P(13,'ic','IC khuếch đại thuật toán LM358P DIP-8 (gói 5 con)','LM358P-5PCS','Texas Instruments',15000,null,800,4.7,145,'','chip','','Op-amp kép, nguồn đơn 3-32V, dùng phổ biến trong mạch khuếch đại và so sánh.',{'Số kênh':'2','Điện áp':'3-32V','Băng thông':'1MHz','Kiểu chân':'DIP-8'},['op-amp']),
  P(14,'ic','IC định thời NE555P DIP-8 (gói 10 con)','NE555P-10PCS','Texas Instruments',25000,30000,650,4.8,289,'Bán chạy','chip','','IC định thời huyền thoại, tạo xung, dao động, hẹn giờ.',{'Điện áp':'4.5-16V','Dòng ra':'200mA','Kiểu chân':'DIP-8'},['555','timer']),
  P(15,'ic','Vi điều khiển ATmega328P-PU DIP-28','ATMEGA328P-PU','Microchip',75000,null,140,4.7,98,'','chip','','Vi điều khiển AVR 8-bit đã nạp bootloader Arduino.',{'Flash':'32KB','SRAM':'2KB','EEPROM':'1KB','Xung nhịp':'20MHz','Kiểu chân':'DIP-28'},['avr']),
  P(16,'ic','IC ổn áp AMS1117-3.3V SOT-223 (gói 10 con)','AMS1117-3.3-10PCS','Advanced Monolithic',18000,null,1200,4.6,120,'','chip','','Ổn áp LDO 3.3V 1A, phổ biến trong các mạch ESP32, STM32.',{'Điện áp ra':'3.3V','Dòng ra':'1A','Dropout':'1.1V','Kiểu chân':'SOT-223'},['ldo']),
  P(17,'ic','IC ghi dịch 74HC595N DIP-16 (gói 5 con)','74HC595N-5PCS','Nexperia',20000,null,0,4.5,77,'','chip','','Thanh ghi dịch 8-bit nối tiếp sang song song, mở rộng chân I/O.',{'Số bit':'8','Điện áp':'2-6V','Kiểu chân':'DIP-16'},['shift-register']),

  P(18,'thu-dong','Bộ điện trở 1/4W 1% – 600 chiếc, 30 giá trị','KIT-RES-600','Yageo',89000,105000,95,4.8,340,'Bán chạy','passive','','Bộ điện trở sai số 1% đóng gói túi phân loại, 30 giá trị phổ biến từ 10Ω đến 1MΩ.',{'Công suất':'1/4W','Sai số':'1%','Số lượng':'600 chiếc','Giá trị':'30 loại'},['dien-tro','bo-kit']),
  P(19,'thu-dong','Bộ tụ gốm và tụ hoá 500 chiếc','KIT-CAP-500','Samwha',129000,null,60,4.6,112,'','passive','','Bộ tụ gốm 10pF-100nF và tụ hoá 1-470µF, kèm hộp chia ngăn.',{'Số lượng':'500 chiếc','Tụ gốm':'10pF - 100nF','Tụ hoá':'1µF - 470µF','Điện áp':'16-50V'},['tu-dien','bo-kit']),
  P(20,'thu-dong','Bộ LED 5mm 5 màu – 500 chiếc','KIT-LED-500','Everlight',59000,72000,110,4.5,183,'','led','','LED đơn 5mm đủ đỏ, vàng, xanh lá, xanh dương và trắng, độ sáng cao.',{'Kích thước':'5mm','Điện áp':'2-3.4V','Dòng':'20mA','Số lượng':'500 chiếc'},['led']),

  P(21,'module','Module nguồn hạ áp LM2596 DC-DC 3A','LM2596-MODULE','Generic',28000,35000,400,4.6,398,'','module','#1E4FA3','Mạch giảm áp DC-DC điều chỉnh được, hiệu suất cao.',{'Điện áp vào':'4-35V','Điện áp ra':'1.25-30V','Dòng ra':'3A','Hiệu suất':'92%'},['nguon','buck']),
  P(22,'module','Module Relay 5V 4 kênh cách ly quang','RELAY-4CH-5V','Songle',55000,null,130,4.5,214,'','module','#0B6B52','Điều khiển tải AC/DC lên tới 10A, kích mức thấp, có opto cách ly.',{'Số kênh':'4','Điện áp cuộn':'5V','Tải tối đa':'10A 250VAC','Kích mức':'Thấp'},['relay']),
  P(23,'module','Driver động cơ L298N 2A (2 kênh)','L298N-MODULE','ST',42000,null,170,4.4,376,'','module','#B3262B','Điều khiển hai động cơ DC hoặc một động cơ bước.',{'Điện áp':'5-35V','Dòng':'2A/kênh','Số kênh':'2'},['driver','dong-co']),
  P(24,'module','Màn hình OLED 0.96 inch I2C 128x64','OLED-096-I2C','Generic',65000,78000,240,4.7,455,'Bán chạy','module','#1a1f26','Màn OLED SSD1306 độ tương phản cao, chỉ cần 4 dây kết nối.',{'Kích thước':'0.96 inch','Độ phân giải':'128 x 64','Driver':'SSD1306','Giao tiếp':'I2C','Điện áp':'3.3-5V'},['oled','man-hinh']),

  P(25,'dung-cu','Mỏ hàn điều chỉnh nhiệt độ 60W 200-450°C','SOLDER-60W','Hakko',259000,299000,50,4.8,167,'','iron','','Mỏ hàn có núm chỉnh nhiệt, đầu hàn gốm thay thế được, nóng nhanh 30 giây.',{'Công suất':'60W','Nhiệt độ':'200-450°C','Điện áp':'220V','Dây':'1.2m'},['mo-han']),
  P(26,'dung-cu','Đồng hồ vạn năng số DT9205A','DT9205A','Victor',320000,null,35,4.7,142,'','meter','','Đo điện áp AC/DC, dòng, điện trở, tụ, diode, thông mạch. Màn hình LCD lớn.',{'Điện áp DC':'200mV - 1000V','Dòng DC':'200µA - 10A','Điện trở':'200Ω - 200MΩ','Pin':'9V'},['dong-ho']),
  P(27,'dung-cu','Breadboard 830 lỗ MB-102','MB-102-830','Generic',42000,null,280,4.6,290,'','breadboard','','Bo cắm thử 830 lỗ, có rãnh nguồn hai bên, dính đế.',{'Số lỗ':'830','Kích thước':'165 x 55 mm','Khoảng cách':'2.54 mm'},['breadboard']),
  P(28,'dung-cu','Bộ dây jumper 120 sợi (đực-đực, đực-cái, cái-cái)','JUMPER-120','Generic',39000,45000,320,4.5,260,'','wires','','Dây cắm bo mạch 20cm, 3 kiểu đầu nối, nhiều màu dễ phân biệt.',{'Số lượng':'120 sợi','Chiều dài':'20cm','Kiểu':'M-M, M-F, F-F'},['jumper'])
];


/* ===== ẢNH BANNER =====
   Đặt file vào images/banners/ với đúng tên dưới đây. Chưa có file thì giữ nguyên nền màu mặc định.
   hero      : ảnh bên phải trang chủ (khoảng 1040 x 840px)
   bulk      : nền khối "Mua số lượng lớn" ở trang chủ (khoảng 1600 x 600px)
   khuyenmai : nền đầu trang Khuyến mãi (khoảng 1920 x 500px)
   gioithieu : nền đầu trang Giới thiệu (khoảng 1920 x 600px) */
const BANNERS = {
  hero: 'images/banners/hero.jpg',
  bulk: 'images/banners/bulk.jpg',
  khuyenmai: 'images/banners/khuyen-mai.jpg',
  gioithieu: 'images/banners/gioi-thieu.jpg',
  /* Banner mới ở trang chủ */
  slide1: 'images/banners/slide-1.jpg', slide2: 'images/banners/slide-2.jpg', slide3: 'images/banners/slide-3.jpg',
  mini1: 'images/banners/mini-1.jpg', mini2: 'images/banners/mini-2.jpg', mini3: 'images/banners/mini-3.jpg',
  flash: 'images/banners/flash-sale.jpg', duo1: 'images/banners/duo-1.jpg', duo2: 'images/banners/duo-2.jpg'
};

/* Chỉ dùng banner khi file thật sự tồn tại (nếu không giữ nguyên thiết kế mặc định) */
function loadBanner(key, onLoad) {
  const img = new Image();
  img.onload = () => onLoad(BANNERS[key]);
  img.src = BANNERS[key];
}
/* Đặt banner làm ảnh nền, phủ lớp màu để chữ trắng vẫn dễ đọc */
function bannerBackground(el, key, overlay) {
  if (!el) return;
  loadBanner(key, src => {
    el.style.backgroundImage = `linear-gradient(${overlay || 'rgba(7,57,44,.82)'}, ${overlay || 'rgba(7,57,44,.82)'}), url("${src}")`;
    el.style.backgroundSize = 'cover'; el.style.backgroundPosition = 'center';
  });
}


/* Bảng giá theo số lượng (dành cho khách mua sỉ) */
function priceTiers(p) {
  return [
    { qty: '1 - 9', price: p.price },
    { qty: '10 - 49', price: Math.round(p.price * 0.95 / 500) * 500 },
    { qty: '50 - 199', price: Math.round(p.price * 0.90 / 500) * 500 },
    { qty: '200+', price: Math.round(p.price * 0.85 / 500) * 500 }
  ];
}

/* ---------- Hàm tiện ích ---------- */
const vnd = n => n.toLocaleString('vi-VN') + 'đ';
const getProduct = id => PRODUCTS.find(p => p.id === Number(id));
const catName = slug => (CATEGORIES.find(c => c.slug === slug) || {}).name || '';
const stars = r => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));
/* ===== ẢNH THẬT CỦA SẢN PHẨM =====
   Bỏ ảnh vào thư mục images/ rồi khai báo ở đây theo id sản phẩm.
   Ảnh đầu tiên là ảnh đại diện (hiện ở danh sách), các ảnh còn lại hiện ở trang chi tiết.
   Chưa có file ảnh nào thì web tự hiển thị ảnh SVG minh hoạ, nên có thể thay dần từng ảnh. */
const PHOTOS = {
  1: ['images/products/esp32-s3-devkitc-1-1.jpg', 'images/products/esp32-s3-devkitc-1-2.jpg', 'images/products/esp32-s3-devkitc-1-3.jpg'], // Kit phát triển ESP32-S3 DevKitC-1 N8R8
  2: ['images/products/a000066-1.jpg', 'images/products/a000066-2.jpg', 'images/products/a000066-3.jpg'], // Arduino UNO R3 chính hãng (ATmega328P)
  3: ['images/products/rpi-pico-w-1.jpg', 'images/products/rpi-pico-w-2.jpg', 'images/products/rpi-pico-w-3.jpg'], // Raspberry Pi Pico W (RP2040 + Wi-Fi)
  4: ['images/products/stm32f103c8t6-1.jpg', 'images/products/stm32f103c8t6-2.jpg', 'images/products/stm32f103c8t6-3.jpg'], // STM32F103C8T6 Blue Pill
  5: ['images/products/nodemcu-v3-1.jpg', 'images/products/nodemcu-v3-2.jpg', 'images/products/nodemcu-v3-3.jpg'], // NodeMCU ESP8266 V3 CH340
  6: ['images/products/rpi5-8gb-1.jpg', 'images/products/rpi5-8gb-2.jpg', 'images/products/rpi5-8gb-3.jpg'], // Raspberry Pi 5 – 8GB RAM
  7: ['images/products/dht22-am2302-1.jpg', 'images/products/dht22-am2302-2.jpg', 'images/products/dht22-am2302-3.jpg'], // Cảm biến nhiệt độ độ ẩm DHT22 (AM2302)
  8: ['images/products/hc-sr04-1.jpg', 'images/products/hc-sr04-2.jpg', 'images/products/hc-sr04-3.jpg'], // Cảm biến siêu âm HC-SR04
  9: ['images/products/mpu-6050-gy521-1.jpg', 'images/products/mpu-6050-gy521-2.jpg', 'images/products/mpu-6050-gy521-3.jpg'], // Cảm biến gia tốc và con quay MPU-6050 GY-521
  10: ['images/products/mq-2-1.jpg', 'images/products/mq-2-2.jpg', 'images/products/mq-2-3.jpg'], // Cảm biến khí gas MQ-2
  11: ['images/products/bme280-3v3-1.jpg', 'images/products/bme280-3v3-2.jpg', 'images/products/bme280-3v3-3.jpg'], // Cảm biến áp suất BME280 (I2C/SPI)
  12: ['images/products/hc-sr501-1.jpg', 'images/products/hc-sr501-2.jpg', 'images/products/hc-sr501-3.jpg'], // Cảm biến chuyển động PIR HC-SR501
  13: ['images/products/lm358p-5pcs-1.jpg', 'images/products/lm358p-5pcs-2.jpg', 'images/products/lm358p-5pcs-3.jpg'], // IC khuếch đại thuật toán LM358P DIP-8 (gói 5 con)
  14: ['images/products/ne555p-10pcs-1.jpg', 'images/products/ne555p-10pcs-2.jpg', 'images/products/ne555p-10pcs-3.jpg'], // IC định thời NE555P DIP-8 (gói 10 con)
  15: ['images/products/atmega328p-pu-1.jpg', 'images/products/atmega328p-pu-2.jpg', 'images/products/atmega328p-pu-3.jpg'], // Vi điều khiển ATmega328P-PU DIP-28
  16: ['images/products/ams1117-3-3-10pcs-1.jpg', 'images/products/ams1117-3-3-10pcs-2.jpg', 'images/products/ams1117-3-3-10pcs-3.jpg'], // IC ổn áp AMS1117-3.3V SOT-223 (gói 10 con)
  17: ['images/products/74hc595n-5pcs-1.jpg', 'images/products/74hc595n-5pcs-2.jpg', 'images/products/74hc595n-5pcs-3.jpg'], // IC ghi dịch 74HC595N DIP-16 (gói 5 con)
  18: ['images/products/kit-res-600-1.jpg', 'images/products/kit-res-600-2.jpg', 'images/products/kit-res-600-3.jpg'], // Bộ điện trở 1/4W 1% – 600 chiếc, 30 giá trị
  19: ['images/products/kit-cap-500-1.jpg', 'images/products/kit-cap-500-2.jpg', 'images/products/kit-cap-500-3.jpg'], // Bộ tụ gốm và tụ hoá 500 chiếc
  20: ['images/products/kit-led-500-1.jpg', 'images/products/kit-led-500-2.jpg', 'images/products/kit-led-500-3.jpg'], // Bộ LED 5mm 5 màu – 500 chiếc
  21: ['images/products/lm2596-module-1.jpg', 'images/products/lm2596-module-2.jpg', 'images/products/lm2596-module-3.jpg'], // Module nguồn hạ áp LM2596 DC-DC 3A
  22: ['images/products/relay-4ch-5v-1.jpg', 'images/products/relay-4ch-5v-2.jpg', 'images/products/relay-4ch-5v-3.jpg'], // Module Relay 5V 4 kênh cách ly quang
  23: ['images/products/l298n-module-1.jpg', 'images/products/l298n-module-2.jpg', 'images/products/l298n-module-3.jpg'], // Driver động cơ L298N 2A (2 kênh)
  24: ['images/products/oled-096-i2c-1.jpg', 'images/products/oled-096-i2c-2.jpg', 'images/products/oled-096-i2c-3.jpg'], // Màn hình OLED 0.96 inch I2C 128x64
  25: ['images/products/solder-60w-1.jpg', 'images/products/solder-60w-2.jpg', 'images/products/solder-60w-3.jpg'], // Mỏ hàn điều chỉnh nhiệt độ 60W 200-450°C
  26: ['images/products/dt9205a-1.jpg', 'images/products/dt9205a-2.jpg', 'images/products/dt9205a-3.jpg'], // Đồng hồ vạn năng số DT9205A
  27: ['images/products/mb-102-830-1.jpg', 'images/products/mb-102-830-2.jpg', 'images/products/mb-102-830-3.jpg'], // Breadboard 830 lỗ MB-102
  28: ['images/products/jumper-120-1.jpg', 'images/products/jumper-120-2.jpg', 'images/products/jumper-120-3.jpg'], // Bộ dây jumper 120 sợi (đực-đực, đực-cái, cái-cái)
};
const productPhotos = p => (PHOTOS[p.id] && PHOTOS[p.id].length ? PHOTOS[p.id] : null);
const productImg = (p, rot) => { const ph = productPhotos(p); return ph ? ph[0] : productImage(p.img, p.color, rot || 0); };

/* Thẻ sản phẩm dùng chung */
function productCard(p) {
  const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  const tag = p.stock === 0 ? '' : p.badge ? `<span class="tag ${p.badge === 'Mới' ? 'new' : ''}">${p.badge}</span>` : (off >= 15 ? `<span class="tag sale">-${off}%</span>` : '');
  const st = p.stock === 0 ? '<span class="stock out">Hết hàng</span>' : p.stock < 20 ? `<span class="stock low">Chỉ còn ${p.stock}</span>` : '<span class="stock in">Còn hàng</span>';
  return `<article class="pcard">
    <div class="pcard-tools"><button data-wish="${p.id}" class="${List.has('wish', p.id) ? 'on' : ''}" aria-label="Yêu thích" title="Yêu thích">♥</button><button data-cmp="${p.id}" class="${List.has('cmp', p.id) ? 'on' : ''}" aria-label="So sánh" title="So sánh">⇄</button></div>
    <a class="pcard-img" href="chi-tiet.html?id=${p.id}" aria-label="${p.name}">${tag}<img src="${productImg(p)}" alt="${p.name}" loading="lazy" width="400" height="400"></a>
    <div class="pcard-body">
      <span class="pcard-brand">${p.brand}</span>
      <h3><a href="chi-tiet.html?id=${p.id}">${p.name}</a></h3>
      <span class="sku mono">${p.sku}</span>
      <div class="rating"><span class="stars" aria-hidden="true">${stars(p.rating)}</span><span>${p.rating} (${p.reviews})</span></div>
      <div class="price-row"><span class="price">${vnd(p.price)}</span>${p.old ? `<span class="old">${vnd(p.old)}</span>` : ''}</div>
      ${st}
      <button class="btn btn-gold btn-sm" data-add="${p.id}" ${p.stock === 0 ? 'disabled' : ''}>${p.stock === 0 ? 'Tạm hết hàng' : 'Thêm vào giỏ'}</button>
    </div></article>`;
}

/* Nếu file ảnh sản phẩm chưa có, tự thay bằng ảnh SVG minh hoạ */
const PHOTO_FALLBACK = {};
PRODUCTS.forEach(p => (PHOTOS[p.id] || []).forEach((src, i) => { PHOTO_FALLBACK[src] = productImage(p.img, p.color, [0, 12, -10, 90][i % 4]); }));
document.addEventListener('error', e => {
  const t = e.target;
  if (t && t.tagName === 'IMG') { const fb = PHOTO_FALLBACK[t.getAttribute('src')]; if (fb) t.src = fb; }
}, true);
