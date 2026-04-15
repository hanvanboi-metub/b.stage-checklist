# b.stage Checklist - Artist Partnership (Powered by Supabase + Next.js)

Một công cụ quản lý dự án tương tác (Interactive Dashboard) được thiết kế đặc biệt cho team Artist Partnership khi triển khai giải pháp **b.stage** cho các nghệ sĩ và đối tác. Phiên bản mới có tính năng **Sync Real-time** - dữ liệu tự động đồng bộ giữa các người dùng khác nhau!

## 📋 Giới thiệu

Checklist này hỗ trợ team trong toàn bộ quy trình triển khai b.stage, bao gồm ba giai đoạn chính:

- **Pre-onboard**: Chuẩn bị kỹ thuật và nội dung ban đầu
- **Onboard**: Thiết lập và cấu hình b.stage chính thức
- **Post-onboard**: Phát triển nội dung và tối ưu hóa doanh thu

## ✨ Tính năng chính

- **✓ Tương tác trực tiếp**: Tích vào các ô checkbox để đánh dấu công việc đã hoàn thành
- **✓ Sync Real-time**: Khi người A tích vào checklist, máy của người B tự động cập nhật mà không cần F5
- **✓ Lưu trữ trên Cloud**: Dữ liệu được lưu trên Supabase (không phải local) nên có thể truy cập từ bất kỳ máy nào
- **✓ Theo dõi tiến độ thời gian thực**: Tự động tính toán % hoàn thành cho từng giai đoạn
- **✓ Dashboard thống kê**: Hiển thị tổng công việc, số công việc đã hoàn thành, và tiến độ tổng thể
- **✓ Giao diện Silver/Metallic**: Thiết kế sang trọng, chuyên nghiệp với tông màu Đen - Xám - Trắng
- **✓ Tra cứu nhanh**: Tích hợp sẵn các link hướng dẫn từ b.stage Support vào từng đầu việc

## 🚀 Cách sử dụng & Deploy

### Bước 1: Setup Supabase Database

1. Tạo một project trên [Supabase](https://supabase.com)
2. Vào **SQL Editor** và paste toàn bộ code từ file `supabase_migrations.sql`
3. Chạy SQL để tạo bảng `notes`
4. **Quan trọng**: Vào **Database → Replication** và bật Realtime cho bảng `notes` (chọn table, không phải view)

### Bước 2: Lấy API Keys từ Supabase

1. Vào **Project Settings → API**
2. Copy các giá trị sau:
   - `NEXT_PUBLIC_SUPABASE_URL` (Project URL)
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (anon public key)

### Bước 3: Cấu hình Environment Variables

Tạo file `.env.local` tại thư mục gốc của project:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
```

### Bước 4: Cài đặt Dependencies & Chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Truy cập http://localhost:3000/notes
```

### Bước 5: Deploy lên Vercel

1. Push code lên GitHub
2. Kết nối repository với [Vercel](https://vercel.com)
3. Cấu hình environment variables trên Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
4. Vercel tự động deploy khi bạn push code

**Kết quả**: Trang web chạy trên Vercel, dữ liệu lưu trên Supabase, và các user có thể nhìn thấy thay đổi real-time từ những user khác!

## � Troubleshooting

### Lỗi: `NEXT_PUBLIC_SUPABASE_URL is not defined`
**Giải pháp**: Kiểm tra file `.env.local`:
- Đảm bảo đã tạo file `.env.local` ở thư mục gốc (cùng thư mục với `package.json`)
- Kiểm tra đúng tên biến: `NEXT_PUBLIC_SUPABASE_URL` (không phải `REACT_APP_...`)
- Restart dev server sau khi thay đổi `.env.local`

### Lỗi: Real-time sync không hoạt động
**Giải pháp**: 
- Vào Supabase console → **Database → Replication**
- Kiểm tra xem bảng `notes` đã được bật Realtime chưa (có biểu tượng ✓ xanh)
- ⚠️ **Lưu ý**: Chỉ bật cho TABLE, không phải VIEW

### Lỗi: `Error loading data: PostgreSQL error`
**Giải pháp**:
- Kiểm tra **Row Level Security (RLS)** có được cấu hình đúng không
- Xem console.log của trình duyệt để biết chi tiết lỗi
- Kiểm tra policies trong bảng `notes` có được tạo đúng không

### Bảng `notes` không xuất hiện
**Giải pháp**:
- Vào Supabase SQL Editor
- Chạy code từ file `supabase_migrations.sql` để tạo bảng
- Kiểm tra xem bảng `notes` đã xuất hiện trong **Database → Tables** chưa

## 💡 Các tính năng có thể phát triển tiếp

- [ ] Authentication (đăng nhập)
- [ ] Comment/Notes trên từng task
- [ ] File upload (attachments)
- [ ] Audit log / History
- [ ] Email notifications
- [ ] Mobile app (React Native)

## 📁 Cấu trúc thư mục

```
bstage-checklist/
├── index.html                      # File HTML cũ (có thể xóa)
├── notes/
│   ├── page.tsx                   # Next.js App Router page (React component chính)
│   └── page.css                   # Styling cho trang
├── utils/supabase/
│   ├── client.ts                  # Supabase client-side
│   ├── server.ts                  # Supabase server-side
│   └── middleware.ts              # Next.js middleware
├── supabase_migrations.sql        # SQL để setup database
├── package.json                   # Dependencies
├── README.md                       # File hướng dẫn này
└── .env.local                      # Environment variables (create this locally)
```

## 🔧 Công nghệ sử dụng

- **Next.js 14+**: Framework React với App Router
- **React 18+**: UI library
- **Supabase**: Backend, Database, Real-time
- **TypeScript/JavaScript**: Ngôn ngữ lập trình
- **CSS3**: Thiết kế giao diện (Gradient, Flexbox, Animation)

## 💾 Lưu trữ dữ liệu - "The Golden Triangle"

```
┌─────────────┐        ┌──────────┐        ┌──────────────┐
│   GitHub    │───────▶│  Vercel  │       │  Supabase    │
│  (Code)     │        │(Website) │◀──────│ (Database)   │
└─────────────┘        └──────────┘        └──────────────┘
                              │
                              │
                        Người dùng thao tác
                              │
                              ▼
                        Real-time Sync
```

1. **Code** được lưu trên GitHub
2. **Website** chạy trên Vercel (từ GitHub)
3. **Database & Dữ liệu** được lưu trên Supabase
4. Khi user A thay đổi checklist → Supabase cập nhật → Supabase thông báo cho user B → User B thấy thay đổi ngay lập tức (không cần F5)

**Lợi ích so với phiên bản cũ (localStorage)**:
- ✓ Dữ liệu không bị mất khi xóa browser cache
- ✓ Có thể truy cập từ bất kỳ thiết bị/trình duyệt nào
- ✓ Tự động đồng bộ giữa các team member
- ✓ Có thể xem lịch sử thay đổi (audit log)
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
