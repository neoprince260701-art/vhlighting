# VH Lighting Sales

## Cập nhật cơ sở dữ liệu bắt buộc

Để cho phép nhiều sản phẩm dùng chung một mã, mở Supabase → SQL Editor → New query, rồi chạy toàn bộ nội dung file:

`supabase/migration_allow_duplicate_sku.sql`

Sau đó cập nhật mã nguồn lên GitHub. Vercel sẽ tự triển khai lại.

## Biến môi trường Vercel

- `NEXT_PUBLIC_SUPABASE_URL`: chỉ dạng `https://xxxxx.supabase.co`, không thêm `/rest/v1`.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: publishable/anon key.

## Chức năng mới

- Cho phép nhiều sản phẩm dùng chung mã SKU.
- Nhập mã hoặc tên sản phẩm trong trang tạo đơn để hiện danh sách sản phẩm phù hợp.
- Giao diện tìm kiếm và thao tác mượt hơn.
- Phiếu bán hàng A4 có kẻ ô đầy đủ.
