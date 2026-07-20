# VH Lighting Sales — bản hoàn chỉnh triển khai Vercel

## Chức năng
Đăng nhập Supabase, dashboard, khách hàng, sản phẩm, tạo đơn, danh sách đơn, chi tiết và in A4.

## Không cần chạy local
1. Tạo Supabase project.
2. Mở SQL Editor, dán toàn bộ `supabase/schema.sql`, bấm Run.
3. Authentication > Users > Add user, tạo tài khoản nhân viên.
4. Tạo GitHub repository riêng tư và upload **toàn bộ nội dung trong thư mục này** (không upload file zip).
5. Vercel > Add New > Project > Import repository.
6. Thêm Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Deploy.

Trang chính của Next.js là `app/page.tsx`, không cần `index.html`.
