# VH Lighting Final 1.1

Bản này giữ nguyên nền Final v3 và chỉ cập nhật phần hóa đơn + thuộc tính sản phẩm. Không có Import/Export Excel.

## Cập nhật
- Hóa đơn không in mã đơn và không in mã hàng.
- Bảng: STT | Tên sản phẩm | Thuộc tính | ĐVT | SL | Đơn giá | Thành tiền.
- Bỏ số tiền bằng chữ và chính sách bảo hành.
- Chữ ký chỉ còn Người lập phiếu và Khách hàng.
- Người lập phiếu mặc định: Vũ Lighting, chỉnh được trong Cài đặt hóa đơn.
- QR VietQR 38mm.
- Mã đơn nội bộ vẫn giữ trong danh sách đơn hàng và dùng làm nội dung QR.
- Thêm thuộc tính Trắng/Vàng/Trung tính trong sản phẩm và đơn hàng.

## SQL
Chạy `supabase/migration_invoice_final_1_1.sql` một lần trong Supabase SQL Editor.
