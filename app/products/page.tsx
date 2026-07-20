"use client";
import { FormEvent, useEffect, useMemo, useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import AppShell from "@/components/AppShell";
import Notice from "@/components/Notice";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/types";
import { Search, Trash2 } from "lucide-react";

const emptyForm = { sku: "", name: "", unit: "Cái", price: 0, stock: 0 };

export default function Page() {
  const [data, setData] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function load() {
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (error) {
      setError(true);
      setMsg(error.message);
      return;
    }
    setData(data || []);
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter(x => x.sku.toLowerCase().includes(q) || x.name.toLowerCase().includes(q));
  }, [data, query]);

  async function add(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const payload = { ...form, sku: form.sku.trim().toUpperCase(), name: form.name.trim() };
    const { error } = await supabase.from("products").insert(payload);
    setBusy(false);
    if (error) {
      setError(true);
      setMsg(error.code === "23505" ? "Cơ sở dữ liệu vẫn đang chặn mã trùng. Hãy chạy file supabase/migration_allow_duplicate_sku.sql trong SQL Editor." : error.message);
      return;
    }
    setError(false);
    setMsg("Đã thêm sản phẩm. Một mã có thể dùng cho nhiều tên sản phẩm.");
    setForm(emptyForm);
    load();
  }

  async function del(id: string) {
    if (!confirm("Xóa sản phẩm này?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { setError(true); setMsg(error.message); return; }
    load();
  }

  return <AuthGuard><AppShell title="Sản phẩm">
    <div className="grid2 product-layout">
      <form className="panel form sticky-panel" onSubmit={add}>
        <div className="section-title"><div><h2>Thêm sản phẩm</h2><p>Một mã có thể chứa nhiều tên hoặc phiên bản sản phẩm.</p></div></div>
        <Notice text={msg} type={error ? "error" : "ok"}/>
        <label>Mã sản phẩm *</label>
        <input required placeholder="Ví dụ: VH-AT-12W" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })}/>
        <label>Tên sản phẩm *</label>
        <input required placeholder="Ví dụ: Âm trần dẹt 12W ánh sáng vàng" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}/>
        <div className="row"><div><label>Đơn vị</label><input value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })}/></div><div><label>Tồn kho</label><input type="number" min="0" value={form.stock} onChange={e => setForm({ ...form, stock: Number(e.target.value) })}/></div></div>
        <label>Giá bán</label>
        <input type="number" min="0" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })}/>
        <button className="primary" disabled={busy}>{busy ? "Đang lưu…" : "Lưu sản phẩm"}</button>
      </form>

      <div className="panel">
        <div className="section-title list-head"><div><h2>Danh sách sản phẩm</h2><p>{data.length} sản phẩm trong hệ thống</p></div><div className="search-box"><Search size={17}/><input placeholder="Tìm theo mã hoặc tên…" value={query} onChange={e => setQuery(e.target.value)}/></div></div>
        <div className="table-wrap"><table><thead><tr><th>Mã</th><th>Tên sản phẩm</th><th>Đơn vị</th><th>Giá bán</th><th>Tồn</th><th></th></tr></thead><tbody>
          {filtered.map(x => <tr key={x.id}><td><span className="sku-pill">{x.sku}</span></td><td><b>{x.name}</b></td><td>{x.unit}</td><td className="number-cell">{Number(x.price).toLocaleString("vi-VN")} ₫</td><td>{x.stock}</td><td><button className="icon-danger" title="Xóa" onClick={() => del(x.id)}><Trash2 size={16}/></button></td></tr>)}
          {!filtered.length && <tr><td colSpan={6} className="empty-state">Không tìm thấy sản phẩm phù hợp.</td></tr>}
        </tbody></table></div>
      </div>
    </div>
  </AppShell></AuthGuard>;
}
