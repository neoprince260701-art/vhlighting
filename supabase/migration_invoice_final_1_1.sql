-- VH Lighting Final 1.1: thuộc tính sản phẩm và bố cục hóa đơn
alter table public.products add column if not exists light_color text;
alter table public.order_items add column if not exists light_color text;
alter table public.company_settings add column if not exists invoice_creator_name text default 'Vũ Lighting';
update public.company_settings set invoice_creator_name = coalesce(nullif(invoice_creator_name,''),'Vũ Lighting') where id=1;
create index if not exists idx_products_light_color on public.products(light_color);
