# 🚀 SETUP GUIDE - Triển khai Sync Real-time

Hướng dẫn chi tiết từng bước để triển khai B.Stage Checklist với Supabase + Real-time Sync.

---

## 📋 Yêu cầu tiên quyết

- Tài khoản GitHub (để push code)
- Tài khoản Supabase (https://supabase.com - free tier có thể dùng)
- Tài khoản Vercel (https://vercel.com - free tier đủ dùng)
- Node.js 18+ & npm (cài từ https://nodejs.org)
- Git command line

---

## ✅ Bước 1: Setup Supabase Database

### 1.1 Tạo Project trên Supabase

1. Vào https://supabase.com → Đăng nhập/Đăng ký
2. Nhấn **"New Project"**
3. Điền thông tin:
   - **Name**: `bstage-checklist` (hoặc tên bạn thích)
   - **Region**: Chọn gần nhất (VN thì **Singapore**)
   - **Password**: Tạo password khỏe
4. Nhấn **"Create new project"** (chờ ~1 phút để database khởi tạo)

### 1.2 Tạo bảng `notes` bằng SQL

1. Vào trang project Supabase vừa tạo
2. Trên sidebar trái, tìm **"SQL Editor"** (hoặc **"SQL"**)
3. Nhấn **"+ New Query"**
4. Dán toàn bộ code từ file `supabase_migrations.sql` của project
5. Nhấn **"Run"** (hoặc Ctrl+Enter)
6. ✅ Nếu thấy "Success", bảng đã được tạo!

### 1.3 Bật Realtime cho bảng `notes`

1. Trên sidebar, vào **"Database"** → **"Replication"**
2. Tìm bảng **"notes"** trong danh sách bên trái
3. Nhấn nút **ON/OFF** để bật Realtime (sẽ thấy hình tròn xanh)
   - ⚠️ Lưu ý: Chỉ chọn bảng (table), không chọn view hoặc other objects
4. ✅ Thành công khi bạn thấy icon ✓ xanh ở cột "Realtime"

### 1.4 Kiểm tra Table đã có dữ liệu chưa

1. Vào **"Database"** → **"Tables"** → click **"notes"**
2. Bạn sẽ thấy độc sơ 11 cột:
   - `id` (UUID, Primary Key)
   - `name` (Text)
   - `checks` (Boolean Array)
   - `created_at` (TimestampTZ)
   - `updated_at` (TimestampTZ)
3. ✅ Bảng đã sẵn sàng!

---

## 🔑 Bước 2: Lấy API Keys

1. Trên sidebar Supabase, vào **"Settings"** → **"API"**
2. Bạn sẽ thấy:
   - **Project URL** (dòng thứ nhất, dạng `https://xxxxx.supabase.co`)
   - **anon public key** (dòng thứ hai, khóa dài)
3. 📋 Copy cả hai giá trị này (sẽ dùng ở bước 4)

---

## 🖥️ Bước 3: Clone & Setup Project

### 3.1 Clone Repository

```bash
git clone https://github.com/hanvanboi-metub/b.stage-checklist.git
cd b.stage-checklist
```

### 3.2 Cài Dependencies

```bash
npm install
```

Chờ cho đến khi thấy dòng `added XXX packages`.

---

## 🔐 Bước 4: Cấu hình Environment Variables

### 4.1 Tạo file `.env.local`

1. Mở VS Code (hoặc editor yêu thích)
2. Tại thư mục `b.stage-checklist`, tạo file mới tên **`.env.local`**
3. Dán nội dung sau (thay `YOUR_...` bằng giá trị từ Bước 2):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIs...
```

**Ví dụ**:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://abc123def.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSI...
```

4. **Lưu file** (Ctrl+S hoặc Cmd+S)

---

## 🏃 Bước 5: Chạy Local Dev Server

```bash
npm run dev
```

Chờ đến khi bạn thấy:
```
▲ Next.js
  ▲ v14.x.x

  ▲ Local:        http://localhost:3000
  ▲ Environments: .env.local
```

### 5.1 Truy cập Ứng dụng

1. Mở trình duyệt
2. Vào: **http://localhost:3000/notes** (hoặc link được hiển thị)
3. ✅ Bạn sẽ thấy giao diện B.Stage Checklist!

### 5.2 Test Real-time Sync

1. **Window 1**: Mở http://localhost:3000/notes trên trình duyệt A
2. **Window 2**: Mở http://localhost:3000/notes trên trình duyệt B (hoặc máy khác)
3. Trên **Window 1**: Nhấn "Thêm b.stage" → Tạo một b.stage mới (ví dụ: "Test")
4. 👀 **Window 2**: Bạn sẽ thấy b.stage vừa tạo **tự động xuất hiện** mà không cần F5!
5. Trên **Window 1**: Tích vào một checkbox
6. 👀 **Window 2**: Checkbox đó **tự động được tích** (real-time sync!)

---

## 🚀 Bước 6: Deploy lên Vercel

### 6.1 Push Code lên GitHub

```bash
git add .
git commit -m "feat: implement real-time sync with Supabase"
git push
```

### 6.2 Kết nối Vercel với GitHub

1. Vào https://vercel.com → Đăng nhập
2. Nhấn **"Import Project"**
3. Chọn **"GitHub"** → Chọn repository `bstage-checklist`
4. Nhấn **"Import"**

### 6.3 Cấu hình Environment Variables

1. Vercel sẽ hiển thị trang "Configure Project"
2. Tìm khu vực **"Environment Variables"**
3. Thêm 2 variables (giống như `.env.local`):
   - Key: `NEXT_PUBLIC_SUPABASE_URL` → Value: `https://xxxxx.supabase.co`
   - Key: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` → Value: `eyJhbGciOi...`
4. Nhấn **"Deploy"**

### 6.4 Chờ Deploy Hoàn Thành

1. Vercel sẽ chạy build (~2-3 phút)
2. Khi thấy ✅ "Congratulations! Your deployment is ready"
3. Nhấn vào link được cung cấp (dạng `https://xyz.vercel.app`)

---

## ✅ Bước 7: Kiểm Tra Production

1. Mở link Vercel trên 2 trình duyệt khác nhau (hoặc máy khác)
2. Thực hiện lại bước **5.2 (Test Real-time Sync)**
3. ✅ Nếu real-time sync hoạt động, bạn đã thành công!

---

## 🔄 Quy trình Update Code

Mỗi khi bạn cần update code:

```bash
# 1. Sửa code ở máy local
# 2. Commit và push
git add .
git commit -m "describe your change"
git push

# 3. Vercel tự động deploy
# 4. Chờ khoảng 2-3 phút, vào link để kiểm tra
```

---

## 📞 FAQ

**Q: Có thể xóa file `index.html` cũ không?**
A: Có, bạn có thể xóa nó vì đã migrate sang phiên bản Next.js.

**Q: Tôi là không có tài khoản Vercel, có thể deploy ở đâu?**
A: Có thể dùng:
- Render.com
- Railway
- Hoặc bất kỳ nền tảng hosting Next.js nào khác

**Q: Supabase free tier có giới hạn gì?**
A: Free tier có đủ cho nhóm nhỏ. Xem chi tiết tại: https://supabase.com/pricing

**Q: Làm sao để backup dữ liệu?**
A: Vào Supabase → Database → chọn table → "Export as CSV"

---

## 🆘 Nếu gặp lỗi

1. Kiểm tra console.log của trình duyệt (F12 → Console tab)
2. Kiểm tra lại file `.env.local` có đúng giá trị không
3. Kiểm tra bảng `notes` trong Supabase đã được tạo không
4. Xem mục **"Troubleshooting"** trong file `README.md`

---

**Happy syncing! 🎉**
