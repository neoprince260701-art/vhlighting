# VH Lighting ERP Final 1.1

Bản này được nâng cấp trực tiếp từ `VH-Lighting-Final-v3-Compact-Invoice` và chỉ tập trung vào bố cục đơn hàng/hóa đơn, không có chức năng nhập Excel.

## Đã cập nhật

- Danh sách đơn hàng theo bố cục quản trị mới.
- Mã đơn nội bộ vẫn hiển thị trong danh sách/chi tiết đơn.
- Hóa đơn A4 không hiển thị mã đơn và không hiển thị mã sản phẩm.
- Bảng hóa đơn: STT, Tên sản phẩm, Thuộc tính, ĐVT, SL, Đơn giá, Thành tiền.
- Thuộc tính tùy chọn: Trắng, Vàng, Trung tính.
- QR VietQR lớn hơn, dễ quét.
- Giữ chiết khấu, phí vận chuyển, tổng thanh toán.
- Bỏ phần số tiền bằng chữ.
- Chỉ còn chữ ký Người lập phiếu và Khách hàng.
- Người lập phiếu mặc định `Vũ Lighting`, chỉnh được trong Cài đặt.
- Không thêm/import Excel.

## SQL cần chạy một lần

Mở Supabase > SQL Editor và chạy:

`supabase/migration_invoice_final_1_1.sql`

Migration chỉ thêm các cột `attribute` và `invoice_creator_name`, không xóa dữ liệu cũ.

## Deploy

1. Upload toàn bộ nội dung thư mục này lên root repository GitHub.
2. Giữ nguyên biến môi trường Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Vercel tự deploy lại.
