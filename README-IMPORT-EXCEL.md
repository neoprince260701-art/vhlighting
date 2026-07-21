# Nhập sản phẩm hàng loạt bằng Excel

1. Upload toàn bộ code lên GitHub; Vercel tự deploy.
2. Vào **Sản phẩm → Nhập Excel**.
3. Bấm **Tải Excel mẫu**.
4. Điền 5 cột: Mã sản phẩm, Tên sản phẩm, Đơn vị, Giá bán, Tồn kho.
5. Chọn file, kiểm tra xem trước rồi bấm **Nhập dữ liệu**.

Quy tắc:
- Mã được phép trùng.
- Hệ thống nhận diện theo **Mã + Tên**.
- Mã + Tên mới: thêm mới.
- Mã + Tên đã có: cập nhật ĐVT, giá và tồn kho.
- Trùng Mã + Tên trong cùng file: báo lỗi.

Không cần chạy SQL mới nếu database hiện tại đã cho phép trùng mã sản phẩm.

## Cột Ánh sáng
- Cột **Ánh sáng** không bắt buộc.
- Có thể nhập: Trắng, Vàng, Trung tính, Đổi 3 màu, RGB, RGBIC.
- Sản phẩm không có thuộc tính ánh sáng thì để trống.
- Trước khi sử dụng, chạy `supabase/migration_product_light_color.sql` một lần.
