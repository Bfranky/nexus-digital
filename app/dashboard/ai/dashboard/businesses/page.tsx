"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { useStore } from "@/store";
import { STATUS_ORDER, STATUS_META, formatMoney, timeAgo } from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Business, BusinessStatus } from "@/types";

export default function BusinessesPage() {
  const { set, filtered, setSearch, setStatusFilter, search, statusFilter } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await createClient().from("businesses").select("*").order("updated_at",{ascending:false});
      if (data) set(data as Business[]);
      setLoading(false);
    })();
  }, [set]);

  const businesses = filtered();

  return (
    <div>
      {/* Header */}
      <div className="row-wrap" style={{ justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h1 className="page-title">Businesses</h1>
          <p style={{ color:"var(--text-muted)", fontSize:"0.82rem", marginTop:4 }}>{businesses.length} results</p>
        </div>
        <Link href="/dashboard/import" className="btn-primary" style={{ textDecoration:"none" }}>
          📋 Import
        </Link>
      </div>

      {/* Filters — stack on mobile */}
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:18 }}>
        <input className="field" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or category…" />
        <div className="row-wrap">
          <select className="field" value={statusFilter} onChange={e=>setStatusFilter(e.target.value as BusinessStatus|"all")} style={{ flex:1 }}>
            <option value="all">All Statuses</option>
            {STATUS_ORDER.map(s=><option key={s} value={s}>{STATUS_META[s].label}</option>)}
          </select>
          {(search||statusFilter!=="all") && (
            <button className="btn-ghost" onClick={()=>{setSearch("");setStatusFilter("all");}}>✕ Clear</button>
          )}
        </div>
      </div>

      {/* Table — scrolls horizontally on mobile */}
      <div className="glass" style={{ borderRadius:16, overflow:"hidden" }}>
        {loading ? (
          <div style={{ padding:"60px 0", textAlign:"center", color:"var(--text-muted)" }}>Loading…</div>
        ) : businesses.length === 0 ? (
          <div style={{ padding:"60px 20px", textAlign:"center" }}>
            <p style={{ fontSize:"2rem", marginBottom:10 }}>🏢</p>
            <p style={{ color:"var(--text-muted)", fontSize:"0.9rem" }}>No businesses found.</p>
            <Link href="/dashboard/import" style={{ color:"#818cf8", fontSize:"0.875rem" }}>Import from Google Maps →</Link>
          </div>
        ) : (
          <div className="table-scroll">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Business</th>
                  <th>Status</th>
                  <th className="hide-mobile">Phone</th>
                  <th>Payment</th>
                  <th className="hide-mobile">Quoted</th>
                  <th className="hide-mobile">Updated</th>
                </tr>
              </thead>
              <tbody>
                {businesses.map(b => (
                  <tr key={b.id}>
                    <td>
                      <Link href={`/dashboard/businesses/${b.id}`} style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ width:32, height:32, borderRadius:8, flexShrink:0, background:"linear-gradient(135deg,rgba(99,102,241,0.25),rgba(139,92,246,0.25))", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:"0.8rem", color:"#fff" }}>
                          {b.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight:600, color:"#fff", fontSize:"0.875rem", whiteSpace:"nowrap" }}>{b.name}</div>
                          <div style={{ fontSize:"0.7rem", color:"var(--text-muted)" }}>{b.category||"—"}</div>
                        </div>
                      </Link>
                    </td>
                    <td><StatusBadge status={b.status} /></td>
                    <td className="hide-mobile" style={{ color:"var(--text-muted)", fontSize:"0.8rem" }}>{b.phone||"—"}</td>
                    <td>
                      <span className="badge" style={
                        b.payment_status==="paid"    ? {background:"rgba(34,197,94,0.1)",color:"#4ade80",borderColor:"rgba(34,197,94,0.25)"} :
                        b.payment_status==="overdue" ? {background:"rgba(239,68,68,0.1)",color:"#f87171",borderColor:"rgba(239,68,68,0.25)"} :
                        {background:"rgba(245,158,11,0.1)",color:"#fbbf24",borderColor:"rgba(245,158,11,0.25)"}
                      }>
                        {b.payment_status==="paid"?"Paid":b.payment_status==="overdue"?"Overdue":"Pending"}
                      </span>
                    </td>
                    <td className="hide-mobile" style={{ color:"var(--text-muted)", fontSize:"0.85rem" }}>{formatMoney(b.amount_quoted)}</td>
                    <td className="hide-mobile" style={{ color:"var(--text-muted)", fontSize:"0.78rem" }}>{timeAgo(b.updated_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
