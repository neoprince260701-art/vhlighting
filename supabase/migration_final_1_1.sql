-- VH Lighting Final 1.1
-- Chạy một lần trong Supabase SQL Editor. Không xóa dữ liệu cũ.

alter table public.order_items
add column if not exists attribute text;

alter table public.company_settings
add column if not exists invoice_creator_name text not null default 'Vũ Lighting';

update public.company_settings
set invoice_creator_name = 'Vũ Lighting'
where id = 1 and (invoice_creator_name is null or trim(invoice_creator_name) = '');
