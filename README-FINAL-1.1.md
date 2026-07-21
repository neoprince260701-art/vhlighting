# VH Lighting ERP Final 1.1

Bản này được cập nhật trực tiếp từ Final 1.0 / Compact Invoice.

## Điểm mới

- Nhập sản phẩm hàng loạt từ Excel, có xem trước và cập nhật theo Mã + Tên.
- Thuộc tính sản phẩm tùy chọn: Trắng, Vàng, Trung tính và các lựa chọn khác.
- Mã sản phẩm dùng nội bộ để gom nhóm và tìm kiếm.
- Danh sách đơn hàng sinh mã nội bộ dạng `VH-YYYYMMDD-001`.
- Mã đơn nội bộ không hiển thị trên hóa đơn A4; mã vẫn được nhúng trong QR để đối soát.
- Hóa đơn bỏ cột mã hàng và phần tiền bằng chữ.
- Bảng in: STT, Tên sản phẩm, Thuộc tính, ĐVT, SL, Đơn giá, Thành tiền.
- Chữ ký chỉ còn Người lập phiếu và Khách hàng.
- Người lập phiếu mặc định là `Vũ Lighting`, có thể sửa trong Cài đặt hóa đơn.
- QR VietQR được tăng kích thước để quét ổn định.
- Giữ Chiết khấu và Phí vận chuyển trên màn hình bán hàng và hóa đơn.

## Cài đặt

1. Đưa toàn bộ nội dung thư mục này lên root repository GitHub.
2. Chạy các migration chưa chạy trong `supabase/`, đặc biệt:
   - `migration_product_light_color.sql`
   - `migration_final_1_1.sql`
3. Giữ nguyên biến môi trường Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Chờ Vercel deploy lại.

## Excel mẫu

Tải trong hệ thống tại Sản phẩm → Nhập Excel → Tải file mẫu, hoặc dùng file:

`public/VH-Lighting-Mau-Nhap-San-Pham.xlsx`
