# 🔄 Migration Guide - Từ localStorage sang Supabase

Nếu bạn đang dùng phiên bản HTML cũ (`index.html` với `localStorage`), hướng dẫn này sẽ giúp bạn chuyển đổi sang phiên bản Next.js + Supabase mới.

---

## 📊 Tình huống

Bạn có:
- ✅ Dữ liệu checklist lưu trong `localStorage` của trình duyệt
- ❌ Dữ liệu KHÔNG được lưu trên cloud
- ❌ KHÔNG thể sync với team members

Mục tiêu:
- ✅ Dữ liệu lưu trên Supabase cloud
- ✅ ĐƯỢC sync real-time với team members
- ✅ Có thể backup & restore dễ dàng

---

## 🔍 Bước 1: Xuất dữ liệu từ localStorage

### 1.1 Mở Browser Console

1. Mở file `index.html` cũ trong trình duyệt
2. Nhấn **F12** hoặc **Ctrl+Shift+I** (Windows/Linux) / **Cmd+Option+I** (Mac)
3. Vào tab **"Console"**

### 1.2 Copy dữ liệu

Dán câu lệnh này vào console và nhấn Enter:

```javascript
localStorage.getItem('bstage_manager_v3')
```

Bạn sẽ thấy một chuỗi JSON dài. Ví dụ:
```json
{"bstages":[{"id":"bs_1234567_abc123","name":"Jessica","checks":[true,false,true,...]}]}
```

### 1.3 Lưu JSON vào file

1. Copy toàn bộ chuỗi JSON vừa xuất
2. Ghép nó vào format sau:

```json
{
  "export_date": "2024-04-15",
  "version": "v1",
  "data": [
    {khoá dữ liệu từ localStorage tại đây}
  ]
}
```

3. Lưu vào file `export_data.json` trên máy bạn

**Ví dụ hoàn chỉnh**:
```json
{
  "export_date": "2024-04-15",
  "version": "v1",
  "data": [
    {
      "id": "bs_1713163050000_abc123",
      "name": "Jessica",
      "checks": [true, false, true, false, true, false, false, true, false, false, false],
      "createdAt": 1713163050000
    },
    {
      "id": "bs_1713163100000_def456",
      "name": "ONEISLAND",
      "checks": [true, true, true, true, true, false, false, false, false, false, false],
      "createdAt": 1713163100000
    }
  ]
}
```

---

## ☁️ Bước 2: Setup Supabase & Import dữ liệu

### 2.1 Tạo Project Supabase

Nếu chưa có, làm theo **Bước 1** trong file `SETUP.md`.

### 2.2 Tạo bảng `notes`

1. Vào Supabase SQL Editor
2. Chạy SQL từ file `supabase_migrations.sql`
3. ✅ Bảng `notes` đã được tạo

### 2.3 Import dữ liệu cũ

Có 2 cách:

#### Cách 1: Dùng Supabase Data Editor (Dễ nhất)

1. Vào **Database → Tables → notes**
2. Nhấn **+ Insert row** (hoặc **Import data**)
3. Nhập từng dòng:
   - **name**: Jessica
   - **checks**: Dạng array JSON, ví dụ `[true, false, true, ...]`
   - **created_at**: Để trống (tự động set thành now())
4. Repeat cho tất cả các b.stage cũ

#### Cách 2: Dùng SQL (Nhanh hơn)

Dán SQL sau vào SQL Editor:

```sql
INSERT INTO notes (name, checks, created_at) VALUES
('Jessica', ARRAY[true, false, true, false, true, false, false, true, false, false, false], '2024-04-15 10:00:00+00'),
('ONEISLAND', ARRAY[true, true, true, true, true, false, false, false, false, false, false], '2024-04-15 11:00:00+00');

-- Thêm các b.stage khác theo mẫu trên
```

**Lưu ý**: Thay đổi:
- `'Jessica'` → tên b.stage của bạn
- `ARRAY[...]` → giá trị checks (true/false) của bạn
- Thời gian trong `'2024-04-15...'`

---

## 🚀 Bước 3: Cấu hình & Deploy Phiên bản Mới

Làm theo file `SETUP.md`, cụ thể:

1. ✅ Bước 1: Setup Supabase (đã làm)
2. ✅ Bước 2: Lấy API Keys
3. ✅ Bước 3: Clone repository
4. ✅ Bước 4: Cấu hình `.env.local`
5. ✅ Bước 5: Chạy dev server
6. ✅ Bước 6: Deploy lên Vercel

---

## ✅ Bước 4: Kiểm tra dữ liệu

### 4.1 Cục bộ (Local)

```bash
npm run dev
# Vào http://localhost:3000/notes
```

Bạn sẽ thấy:
- ✅ Các b.stage cũ đã xuất hiện
- ✅ Các checkbox đã được set đúng value
- ✅ Tiến độ % đã tính toán lại

### 4.2 Real-time Sync Test

1. Mở 2 tab trình duyệt
2. Tab 1: Tích một checkbox
3. Tab 2: Checkbox đó tự động được tích (real-time sync!)

### 4.3 Trên Production (Vercel)

```
Vào: https://your-vercel-domain.vercel.app/notes
```

Bạn sẽ thấy dữ liệu cũ đã được import!

---

## ⚠️ Lưu ý quan trọng

### Dữ liệu cũ không tự động migrate

- ❌ Phiên bản mới **KHÔNG** tự động lấy dữ liệu từ `localStorage` cũ
- ✅ Bạn phải **export → import thủ công** như hướng dẫn trên

### Xóa `localStorage` cũ (tuỳ chọn)

Nếu bạn không muốn giữ phiên bản cũ nữa:

```javascript
// Mở Console của index.html cũ
localStorage.removeItem('bstage_manager_v3')
```

### Backup trước khi import

Trước khi import, backup dữ liệu cũ:

1. Copy toàn bộ JSON từ Step 1.2
2. Lưu vào email hoặc file backup an toàn
3. Sau đó import vào Supabase

---

## 🆘 Gặp sự cố?

### Lỗi: "Dữ liệu không xuất hiện"

1. Kiểm tra `notes` table đã được tạo trong Supabase không
   - Vào **Database → Tables** → có `notes` không?
2. Kiểm tra `.env.local` có đúng giá trị không
3. Restart dev server (`npm run dev`)

### Lỗi: "Realtime sync không hoạt động"

1. Vào **Database → Replication**
2. Kiểm tra bảng `notes` đã bật Realtime không (icon xanh ✓)
3. ⚠️ Lưu ý: Chỉ chọn table, không chọn view

### Lỗi: "Checkbox checks không đúng"

Khi import SQL, kiểm tra format array:

❌ **Sai**:
```sql
checks: 'true, false, true'  -- Đây là string, không phải array
```

✅ **Đúng**:
```sql
ARRAY[true, false, true]  -- Đây là PostgreSQL array
```

### Dữ liệu cũ bị xóa lỡ

Nếu xóa lỡ, bạn vẫn có:
1. Backup JSON từ Step 1 (file `export_data.json`)
2. Backup từ Supabase: **Database → Backups**

---

## ✨ Chi tiết thay đổi dữ liệu

Phiên bản cũ lưu format:
```json
{
  "id": "bs_1713163050000_abc123",
  "name": "Jessica",
  "checks": [true, false, ...],
  "createdAt": 1713163050000  // Timestamp JS (milliseconds)
}
```

Phiên bản mới lưu format:
```json
{
  "id": "a1b2c3d4-...",  // UUID (Supabase auto-generate)
  "name": "Jessica",
  "checks": [true, false, ...],
  "created_at": "2024-04-15T10:00:00+00:00"  // ISO timestamp (UTC)
}
```

**Chú ý**: ID và created_at format khác nhau. Supabase sẽ tự động generate ID mới khi bạn insert.

---

## 🎉 Hoàn tất!

Bây giờ bạn có:
- ✅ Dữ liệu lưu trên Supabase cloud
- ✅ Real-time sync giữa team members
- ✅ Backup tự động
- ✅ Có thể truy cập từ bất kỳ device nào

Enjoy syncing! 🚀
