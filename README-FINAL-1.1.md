# VH Lighting Final 1.1

Bản này được nâng cấp trực tiếp từ Final v3 Compact Invoice đang hoạt động ổn định.

## Đã thay đổi
- Thêm thuộc tính sản phẩm tùy chọn: Trắng, Vàng, Trung tính.
- Hiển thị thuộc tính ở form sản phẩm, màn hình tạo đơn, chi tiết đơn và hóa đơn.
- Hóa đơn bỏ cột Mã hàng và không hiển thị mã đơn nội bộ.
- QR VietQR tăng lên khoảng 38 mm để dễ quét.
- Bỏ phần số tiền bằng chữ và chính sách bảo hành trên hóa đơn.
- Ghi chú đơn hàng giữ một khung riêng.
- Chữ ký chỉ còn Người lập phiếu và Khách hàng.
- Người lập phiếu mặc định là Vũ Lighting và chỉnh được tại Cài đặt.
- Không có chức năng nhập Excel.

## SQL cần chạy một lần
Chạy `supabase/migration_invoice_attribute_final_1_1.sql` trong Supabase SQL Editor.

## Triển khai
Giữ nguyên các biến môi trường Supabase. Upload nội dung project lên root GitHub và để Vercel deploy như bản cũ.
