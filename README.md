# b.stage Checklist - Artist Partnership

Một công cụ quản lý dự án tương tác (Interactive Dashboard) được thiết kế đặc biệt cho team Artist Partnership khi triển khai giải pháp **b.stage** cho các nghệ sĩ và đối tác.

## 📋 Giới thiệu

Checklist này hỗ trợ team trong toàn bộ quy trình triển khai b.stage, bao gồm ba giai đoạn chính:

- **Pre-onboard**: Chuẩn bị kỹ thuật và nội dung ban đầu
- **Onboard**: Thiết lập và cấu hình b.stage chính thức
- **Post-onboard**: Phát triển nội dung và tối ưu hóa doanh thu

## ✨ Tính năng chính

- **✓ Tương tác trực tiếp**: Tích vào các ô checkbox để đánh dấu công việc đã hoàn thành
- **✓ Theo dõi tiến độ thời gian thực**: Tự động tính toán % hoàn thành cho từng giai đoạn
- **✓ Dashboard thống kê**: Hiển thị tổng công việc, số công việc đã hoàn thành, và tiến độ tổng thể
- **✓ Giao diện Silver/Metallic**: Thiết kế sang trọng, chuyên nghiệp với tông màu Đen - Xám - Trắng
- **✓ Lưu trữ thông minh**: Dữ liệu được lưu cục bộ trên trình duyệt, không lo mất dữ liệu
- **✓ Tra cứu nhanh**: Tích hợp sẵn các link hướng dẫn từ b.stage Support vào từng đầu việc

## 🚀 Cách sử dụng

### Cách 1: Sử dụng trực tiếp từ GitHub Pages
Truy cập vào link GitHub Pages của repository này để sử dụng checklist ngay trên trình duyệt.

### Cách 2: Tải về máy cục bộ
1. Clone repository:
   ```bash
   git clone https://github.com/your-username/bstage-checklist.git
   cd bstage-checklist
   ```

2. Mở file `index.html` bằng trình duyệt:
   ```bash
   # Trên macOS
   open index.html
   
   # Trên Linux
   xdg-open index.html
   
   # Trên Windows
   start index.html
   ```

### Cách 3: Sử dụng Local Server (tùy chọn)
Nếu bạn muốn chạy qua một local server:

```bash
# Sử dụng Python 3
python3 -m http.server 8000

# Sử dụng Node.js (nếu đã cài http-server)
npx http-server
```

Sau đó truy cập `http://localhost:8000` trên trình duyệt.

## 📊 Timeline Triển khai

Dưới đây là timeline tổng quát cho quá trình triển khai b.stage:

### Pre-onboard (Tuần 1-2)
- Yêu cầu mở b.stage mới: **2 tuần trước ngày ra mắt**
- Demo web b.stage: **1 tuần trước buổi gặp khách hàng**
- Layout demo: **1 tuần làm việc trước khi ra mắt**
- Xác định lịch release: **Trong buổi gặp khách hàng**

### Onboard (Tuần 3-4)
- Setup account admin: **1-2 ngày sau khi mở domain**
- Setup trang home-content-shop: **3-5 ngày trước ngày ra mắt**
- Content welcome: **Ngày ra mắt b.stage**

### Post-onboard (Liên tục)
- Content plan: **Hàng tháng/Quý**
- Optimize shop (Membership, Merchandise): **Hàng tháng/Quý**
- Revise & Analyze: **Hàng tháng/Quý**

## 📁 Cấu trúc thư mục

```
bstage-checklist/
├── index.html              # File chính (Dashboard tương tác)
├── README.md               # File hướng dẫn này
├── .gitignore              # Cấu hình Git
└── assets/                 # (Tùy chọn) Thư mục cho hình ảnh, CSS, JS nếu cần
```

## 🔧 Công nghệ sử dụng

- **HTML5**: Cấu trúc trang web
- **CSS3**: Thiết kế giao diện (Gradient, Flexbox, Animation)
- **JavaScript (Vanilla)**: Tính toán tiến độ, lưu trữ dữ liệu cục bộ (LocalStorage)

## 💾 Lưu trữ dữ liệu

Tất cả dữ liệu về tiến độ công việc được lưu trữ trong **LocalStorage** của trình duyệt. Điều này có nghĩa:

- ✓ Dữ liệu được lưu cục bộ trên máy của bạn
- ✓ Không cần kết nối internet để sử dụng
- ✓ Dữ liệu sẽ được giữ lại khi bạn đóng và mở lại trình duyệt
- ⚠️ Nếu bạn xóa dữ liệu trình duyệt, tiến độ sẽ bị xóa

## 🌐 Publish lên GitHub Pages

### Bước 1: Tạo Repository trên GitHub
1. Đăng nhập vào GitHub
2. Tạo repository mới với tên `bstage-checklist` (hoặc tên khác)
3. Chọn "Public" để công khai

### Bước 2: Upload Files
1. Clone repository về máy:
   ```bash
   git clone https://github.com/your-username/bstage-checklist.git
   cd bstage-checklist
   ```

2. Copy các file sau vào thư mục:
   - `index.html`
   - `README.md`
   - `.gitignore` (tùy chọn)

3. Commit và push lên GitHub:
   ```bash
   git add .
   git commit -m "Initial commit: Add b.stage checklist dashboard"
   git push origin main
   ```

### Bước 3: Kích hoạt GitHub Pages
1. Vào **Settings** của repository
2. Tìm mục **Pages** (hoặc **GitHub Pages**)
3. Chọn **Branch**: `main`
4. Chọn **Folder**: `/ (root)`
5. Nhấn **Save**

### Bước 4: Truy cập Dashboard
Sau 1-2 phút, GitHub sẽ cấp cho bạn một URL công khai:
```
https://your-username.github.io/bstage-checklist/
```

Truy cập URL này để sử dụng checklist!

## 📝 Hướng dẫn sử dụng Dashboard

1. **Xem tổng quan**: Phía trên cùng hiển thị 3 thẻ thống kê:
   - Tổng Công Việc
   - Đã Hoàn Thành
   - Tiến Độ Chung (%)

2. **Tích vào công việc**: Nhấn vào ô checkbox bên cạnh tên công việc để đánh dấu đã hoàn thành

3. **Theo dõi tiến độ**: 
   - Thanh tiến độ sẽ tự động cập nhật cho từng giai đoạn
   - Các con số thống kê sẽ cập nhật ngay lập tức

4. **Truy cập tài liệu**: Nhấn vào các link "Tài liệu" để mở hướng dẫn chi tiết

## 🎨 Tùy chỉnh

Nếu bạn muốn tùy chỉnh checklist (thêm/xóa công việc, thay đổi màu sắc, v.v.), bạn có thể:

1. Mở file `index.html` bằng trình soạn thảo văn bản
2. Tìm phần công việc (task) bạn muốn chỉnh sửa
3. Lưu file và làm mới trình duyệt

## 📞 Hỗ trợ

Nếu gặp bất kỳ vấn đề nào:

1. Kiểm tra xem trình duyệt của bạn có hỗ trợ JavaScript không
2. Thử xóa dữ liệu trình duyệt và tải lại trang
3. Sử dụng trình duyệt hiện đại (Chrome, Firefox, Safari, Edge)

## 📄 Giấy phép

Dự án này được phát hành dưới giấy phép MIT. Bạn có thể tự do sử dụng, sửa đổi và phân phối.

## 🙏 Cảm ơn

Checklist này được thiết kế đặc biệt cho team Artist Partnership của b.stage. Cảm ơn bạn đã sử dụng công cụ này!

---

**Phiên bản**: 1.0  
**Cập nhật lần cuối**: April 2026  
**Tác giả**: Manus AI
