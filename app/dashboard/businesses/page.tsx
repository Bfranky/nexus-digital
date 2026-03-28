"use client";
import Link from "next/link";
import { useStore } from "@/store";
import { STATUS_ORDER, STATUS_META, formatMoney, timeAgo } from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";
import type { BusinessStatus } from "@/types";

export default function BusinessesPage() {
  const { loading, filtered, setSearch, setStatusFilter, search, statusFilter } = useStore();
  const businesses = filtered();

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"1.6rem", color:"#fff" }}>Businesses</h1>
          <p style={{ color:"var(--text-muted)", fontSize:"0.875rem", marginTop:4 }}>{businesses.length} results</p>
        </div>
        <Link href="/dashboard/import" className="btn-primary" style={{ textDecoration:"none" }}>📋 Import New</Link>
      </div>

      <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap" }}>
        <input className="field" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or category…" style={{ maxWidth:280 }} />
        <select className="field" value={statusFilter} onChange={e => setStatusFilter(e.target.value as BusinessStatus | "all")} style={{ maxWidth:200 }}>
          <option value="all">All Statuses</option>
          {STATUS_ORDER.map(s => <option key={s} value={s}>{STATUS_META[s].label}</option>)}
        </select>
        {(search || statusFilter !== "all") && (
          <button className="btn-ghost" onClick={() => { setSearch(""); setStatusFilter("all"); }}>✕ Clear</button>
        )}
      </div>

      <div className="glass" style={{ borderRadius:16, overflow:"hidden" }}>
        {loading ? (
          <div style={{ padding:"60px 20px", textAlign:"center", color:"var(--text-muted)" }}>Loading…</div>
        ) : businesses.length === 0 ? (
          <div style={{ padding:"60px 20px", textAlign:"center" }}>
            <div style={{ fontSize:"2rem", marginBottom:12 }}>🏢</div>
            <p style={{ color:"var(--text-muted)", fontSize:"0.9rem" }}>No businesses found.</p>
            <Link href="/dashboard/import" style={{ color:"#818cf8", fontSize:"0.875rem" }}>Import from Google Maps →</Link>
          </div>
        ) : (
          <div style={{ overflowX:"auto", WebkitOverflowScrolling:"touch" } as React.CSSProperties}>
            <table className="tbl">
              <thead>
                <tr><th>Business</th><th>Status</th><th>Phone</th><th>Payment</th><th>Quoted</th><th>Updated</th></tr>
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
                          <div style={{ fontWeight:600, color:"#fff", fontSize:"0.875rem" }}>{b.name}</div>
                          <div style={{ fontSize:"0.72rem", color:"var(--text-muted)" }}>{b.category||"—"}</div>
                        </div>
                      </Link>
                    </td>
                    <td><StatusBadge status={b.status} /></td>
                    <td style={{ color:"var(--text-muted)", fontSize:"0.8rem" }}>{b.phone||"—"}</td>
                    <td>
                      <span className="badge" style={
                        b.payment_status==="paid"    ? {background:"rgba(34,197,94,0.1)",color:"#4ade80",borderColor:"rgba(34,197,94,0.25)"} :
                        b.payment_status==="overdue" ? {background:"rgba(239,68,68,0.1)",color:"#f87171",borderColor:"rgba(239,68,68,0.25)"} :
                        {background:"rgba(245,158,11,0.1)",color:"#fbbf24",borderColor:"rgba(245,158,11,0.25)"}
                      }>
                        {b.payment_status==="paid"?"Paid":b.payment_status==="overdue"?"Overdue":"Pending"}
                      </span>
                    </td>
                    <td style={{ color:"var(--text-muted)", fontSize:"0.85rem" }}>{formatMoney(b.amount_quoted)}</td>
                    <td style={{ color:"var(--text-muted)", fontSize:"0.78rem" }}>{timeAgo(b.updated_at)}</td>
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