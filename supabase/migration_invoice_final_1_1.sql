alter table public.products add column if not exists attribute text;
alter table public.order_items add column if not exists attribute text;
alter table public.company_settings add column if not exists invoice_creator_name text default 'Vũ Lighting';
update public.company_settings set invoice_creator_name=coalesce(nullif(invoice_creator_name,''),'Vũ Lighting') where id=1;
