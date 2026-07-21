-- Chạy một lần trong Supabase SQL Editor.
-- Thêm thuộc tính ánh sáng không bắt buộc cho sản phẩm hiện có.
alter table public.products
add column if not exists light_color text;

create index if not exists idx_products_light_color
on public.products(light_color);
