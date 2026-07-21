"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import AppShell from "@/components/AppShell";
import { supabase } from "@/lib/supabase";
import type { CompanySettings, Order, OrderItem } from "@/lib/types";

const fallback: CompanySettings={id:1,company_name:"VH LIGHTING",tagline:"Chuyên cung cấp thiết bị chiếu sáng",address:"",hotline:"0877 933 362",website:"vulighting.com",email:"vat.vuhoanglighting@gmail.com",tax_code:"",bank_name:"TPBank",bank_id:"TPB",bank_account:"",bank_holder:"",bank_branch:"",logo_url:"",warranty_note:"",invoice_footer:"",invoice_creator_name:"Vũ Lighting"};
const money=(v:number)=>Number(v||0).toLocaleString("vi-VN");

export default function Page(){
  const{id}=useParams<{id:string}>();
  const[order,setOrder]=useState<Order|null>(null);
  const[items,setItems]=useState<OrderItem[]>([]);
  const[company,setCompany]=useState<CompanySettings>(fallback);

  useEffect(()=>{Promise.all([
    supabase.from("orders").select("*").eq("id",id).single(),
    supabase.from("order_items").select("*").eq("order_id",id).order("id"),
    supabase.from("company_settings").select("*").eq("id",1).maybeSingle()
  ]).then(([a,b,c])=>{setOrder(a.data);setItems((b.data||[]) as OrderItem[]);if(c.data)setCompany({...fallback,...c.data});});},[id]);

  const qrUrl=useMemo(()=>{
    if(!order||!company.bank_id||!company.bank_account)return"";
    const bank=encodeURIComponent(company.bank_id.trim());
    const account=encodeURIComponent(company.bank_account.replace(/\s+/g,""));
    const params=new URLSearchParams({amount:String(Math.max(0,Math.round(Number(order.total||0)))),addInfo:order.order_no.slice(0,25),accountName:(company.bank_holder||"").slice(0,50)});
    return `https://img.vietqr.io/image/${bank}-${account}-compact2.png?${params.toString()}`;
  },[company.bank_id,company.bank_account,company.bank_holder,order]);

  return <AuthGuard><AppShell title="Chi tiết đơn hàng" subtitle={order?`Mã nội bộ: ${order.order_no}`:"Đang tải đơn hàng"} action={<button className="primary" onClick={()=>window.print()}>In hóa đơn</button>}>
    {!order?<div className="panel">Đang tải…</div>:<div className="order-detail-layout">
      <section className="order-detail-panel panel no-print">
        <div className="order-detail-heading"><div><h2>Chi tiết đơn hàng</h2><span className="status success-status">{order.status}</span></div></div>
        <div className="order-detail-grid">
          <article className="order-info-card"><h3>Thông tin đơn hàng</h3><dl><dt>Mã đơn (nội bộ)</dt><dd>{order.order_no}</dd><dt>Ngày tạo</dt><dd>{new Date(order.created_at).toLocaleDateString("vi-VN")}</dd><dt>Giờ tạo</dt><dd>{new Date(order.created_at).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"})}</dd><dt>Người lập</dt><dd>{company.invoice_creator_name||"Vũ Lighting"}</dd></dl></article>
          <article className="order-products-card"><h3>Danh sách sản phẩm</h3><div className="table-wrap"><table className="detail-items-table"><thead><tr><th>STT</th><th>Tên sản phẩm</th><th>Thuộc tính</th><th>ĐVT</th><th>SL</th><th>Đơn giá</th><th>Thành tiền</th></tr></thead><tbody>{items.map((x,i)=><tr key={i}><td>{i+1}</td><td>{x.product_name}</td><td>{x.attribute||"—"}</td><td>{x.unit}</td><td>{x.quantity}</td><td>{money(x.unit_price)}</td><td>{money(x.line_total)}</td></tr>)}</tbody></table></div><div className="detail-total-box"><p><span>Tạm tính</span><b>{money(order.subtotal)} ₫</b></p><p><span>Chiết khấu</span><b>- {money(order.discount)} ₫</b></p><p><span>Phí vận chuyển</span><b>+ {money(order.shipping_fee||0)} ₫</b></p><h4><span>TỔNG THANH TOÁN</span><b>{money(order.total)} ₫</b></h4></div></article>
          <article className="order-info-card"><h3>Thông tin khách hàng</h3><dl><dt>Khách hàng</dt><dd>{order.customer_name||"Khách lẻ"}</dd><dt>Điện thoại</dt><dd>{order.customer_phone||"—"}</dd><dt>Địa chỉ / Công trình</dt><dd>{order.customer_address||"—"}</dd></dl></article>
          <article className="order-info-card"><h3>Phương thức thanh toán</h3><p>Chuyển khoản</p></article>
          <article className="order-note-card"><h3>Ghi chú đơn hàng</h3><p>{order.note||"Không có ghi chú."}</p></article>
        </div>
      </section>

      <article className="invoice">
        <header className="invoice-head">
          <div className="invoice-brand-block">{company.logo_url?<img className="invoice-logo" src={company.logo_url} alt={company.company_name}/>:<div className="invoice-logo-text">VH</div>}<div><h1>{company.company_name}</h1>{company.tagline&&<p className="invoice-tagline">{company.tagline}</p>}<p><b>Hotline:</b> {company.hotline||"—"}</p>{company.website&&<p><b>Website:</b> {company.website}</p>}{company.email&&<p><b>Email:</b> {company.email}</p>}</div></div>
          <div className="invoice-title-block"><h2>PHIẾU BÁN HÀNG</h2><div className="invoice-meta"><span>Ngày lập</span><b>{new Date(order.created_at).toLocaleDateString("vi-VN")}</b><span>Giờ lập</span><b>{new Date(order.created_at).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"})}</b></div></div>
        </header>

        <section className="invoice-customer"><div><span>Khách hàng</span><b>{order.customer_name||"Khách lẻ"}</b></div><div><span>Điện thoại</span><b>{order.customer_phone||"—"}</b></div><div className="full"><span>Địa chỉ / Công trình</span><b>{order.customer_address||"—"}</b></div></section>

        <table className="invoice-table"><thead><tr><th>STT</th><th>Tên sản phẩm</th><th>Thuộc tính</th><th>ĐVT</th><th>SL</th><th>Đơn giá</th><th>Thành tiền</th></tr></thead><tbody>{items.map((x,i)=><tr key={i}><td>{i+1}</td><td>{x.product_name}</td><td>{x.attribute||""}</td><td>{x.unit}</td><td>{x.quantity}</td><td>{money(x.unit_price)}</td><td>{money(x.line_total)}</td></tr>)}</tbody></table>

        <section className="invoice-finance">
          <div className="invoice-payment-box">{company.bank_account?<div className="invoice-payment-content"><div className="invoice-bank-details"><h3>{company.bank_name||"THÔNG TIN THANH TOÁN"}</h3><p><span>Số tài khoản</span><b className="bank-account">{company.bank_account}</b></p><p><span>Chủ tài khoản</span><b>{company.bank_holder||"—"}</b></p></div>{qrUrl&&<div className="invoice-qr"><img src={qrUrl} alt="QR chuyển khoản"/><span>VietQR</span></div>}</div>:<p className="invoice-muted">Cập nhật tài khoản ngân hàng tại mục Cài đặt.</p>}</div>
          <table className="invoice-total-table"><tbody><tr><td>Tạm tính</td><td>{money(order.subtotal)} ₫</td></tr><tr><td>Chiết khấu</td><td>- {money(order.discount)} ₫</td></tr><tr><td>Phí vận chuyển</td><td>+ {money(order.shipping_fee||0)} ₫</td></tr><tr className="grand-total"><td>TỔNG THANH TOÁN</td><td>{money(order.total)} ₫</td></tr></tbody></table>
        </section>

        <section className="invoice-note-single"><b>Ghi chú đơn hàng</b><p>{order.note||""}</p></section>
        <section className="sign sign-two"><div><b>Người lập phiếu</b><strong>{company.invoice_creator_name||"Vũ Lighting"}</strong><span>(Ký và ghi rõ họ tên)</span></div><div><b>Khách hàng</b><span>(Ký và ghi rõ họ tên)</span></div></section>
      </article>
    </div>}
  </AppShell></AuthGuard>;
}
