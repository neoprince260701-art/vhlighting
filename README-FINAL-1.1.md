# VH Lighting Final 1.1

## Thay đổi chính
- Hóa đơn A4 không hiển thị mã đơn nội bộ.
- Danh sách đơn hàng vẫn hiển thị mã dạng `VH-YYYYMMDD-001`.
- Bỏ cột mã hàng khỏi hóa đơn.
- Tách cột Thuộc tính: Trắng, Vàng, Trung tính...
- Không ghép thuộc tính vào tên sản phẩm.
- Bỏ phần số tiền bằng chữ.
- Chữ ký chỉ còn Người lập phiếu và Khách hàng.
- Tên người lập phiếu mặc định là `Vũ Lighting`, chỉnh được trong Cài đặt hóa đơn.
- Tăng QR để quét ổn định.
- Giữ chiết khấu, phí vận chuyển và ghi chú đơn hàng.

## Cập nhật Supabase
Chạy file `supabase/migration_final_1_1.sql` đúng một lần.

## Cập nhật website
Upload toàn bộ mã nguồn lên GitHub. Vercel sẽ tự deploy lại.
