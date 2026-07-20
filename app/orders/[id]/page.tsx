"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import AppShell from "@/components/AppShell";
import { supabase } from "@/lib/supabase";
import type { Order, OrderItem } from "@/lib/types";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  useEffect(() => { Promise.all([supabase.from("orders").select("*").eq("id", id).single(), supabase.from("order_items").select("*").eq("order_id", id).order("id")]).then(([a, b]) => { setOrder(a.data); setItems(b.data || []); }); }, [id]);

  return <AuthGuard><AppShell title="Chi tiết đơn hàng" action={<button className="primary" onClick={() => window.print()}>In đơn A4</button>}>
    {!order ? <div>Đang tải…</div> : <div className="invoice">
      <div className="invoice-head"><div><h1>VH LIGHTING</h1><p>Chuyên cung cấp thiết bị chiếu sáng</p><p>Hotline: 0877 933 362 · vulighting.com</p><p>Email: vat.vuhoanglighting@gmail.com</p></div><div><h2>PHIẾU BÁN HÀNG</h2><b>{order.order_no}</b><p>{new Date(order.created_at).toLocaleString("vi-VN")}</p></div></div>
      <div className="customer invoice-customer"><div><b>Khách hàng:</b> {order.customer_name}</div><div><b>Điện thoại:</b> {order.customer_phone || "—"}</div><div className="full"><b>Địa chỉ:</b> {order.customer_address || "—"}</div></div>
      <table className="invoice-table"><thead><tr><th>STT</th><th>Mã SP</th><th>Tên sản phẩm</th><th>ĐVT</th><th>SL</th><th>Đơn giá</th><th>Thành tiền</th></tr></thead><tbody>{items.map((x, i) => <tr key={i}><td>{i + 1}</td><td>{x.sku}</td><td>{x.product_name}</td><td>{x.unit}</td><td>{x.quantity}</td><td>{Number(x.unit_price).toLocaleString("vi-VN")}</td><td>{Number(x.line_total).toLocaleString("vi-VN")}</td></tr>)}</tbody></table>
      <div className="invoice-summary"><div className="invoice-note"><b>Ghi chú:</b><p>{order.note || "—"}</p></div><table><tbody><tr><td>Tạm tính</td><td>{Number(order.subtotal).toLocaleString("vi-VN")} ₫</td></tr><tr><td>Chiết khấu</td><td>{Number(order.discount).toLocaleString("vi-VN")} ₫</td></tr><tr className="grand-total"><td>TỔNG CỘNG</td><td>{Number(order.total).toLocaleString("vi-VN")} ₫</td></tr></tbody></table></div>
      <div className="sign"><div>Khách hàng<br/><span>(Ký và ghi rõ họ tên)</span></div><div>Người bán hàng<br/><span>(Ký và ghi rõ họ tên)</span></div></div>
    </div>}
  </AppShell></AuthGuard>;
}
