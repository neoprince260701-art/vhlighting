# Sửa lỗi cài đặt trên Vercel

Bản này dùng Node.js 22 vì các gói Supabase hiện tại yêu cầu Node >= 22.

## Cấu hình Vercel

- Framework Preset: Next.js
- Root Directory: thư mục chứa trực tiếp `package.json` và `app/`
- Node.js Version: 22.x
- Install Command: để Vercel đọc từ `vercel.json`, hoặc dùng:
  `npm install --no-audit --no-fund --prefer-online --registry=https://registry.npmjs.org`
- Build Command: `npm run build`

Khi triển khai lại, bỏ chọn Build Cache để không dùng cache npm cũ.
