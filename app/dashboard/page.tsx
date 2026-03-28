"use client";
import Link from "next/link";
import { useStore } from "@/store";
import { formatMoney, timeAgo } from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";

// console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
// console.log("KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 20));

function StatCard({ label, value, accent }: { label:string; value:string; accent:string }) {
  return (
    <div className="glass" style={{ borderRadius:16, padding:"18px 20px" }}>
      <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"1.7rem", color:accent }}>{value}</div>
      <div style={{ fontSize:"0.7rem", color:"var(--text-muted)", marginTop:4, textTransform:"uppercase", letterSpacing:"0.05em", fontWeight:600 }}>{label}</div>
    </div>
  );
}

export default function DashboardPage() {
  // Data already fetched by layout — just read from store, no loading needed here
  const { businesses, loading, stats } = useStore();
  const s         = stats();
  const recent    = businesses.slice(0, 6);
  const followUps = businesses.filter(b => b.status === "contacted" && !b.whatsapp_replied).slice(0, 4);

  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"1.6rem", color:"#fff" }}>Dashboard</h1>
        <p style={{ color:"var(--text-muted)", fontSize:"0.875rem", marginTop:4 }}>
          {new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}
        </p>
      </div>

      {loading && <div style={{ textAlign:"center", padding:"60px 0", color:"var(--text-muted)" }}>Loading…</div>}

      {!loading && (
        <>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))", gap:14, marginBottom:28 }}>
            <StatCard label="Total Businesses" value={String(s.total)}          accent="#818cf8" />
            <StatCard label="Paid Clients"      value={String(s.paid)}           accent="#4ade80" />
            <StatCard label="Completed"         value={String(s.completed)}      accent="#4ade80" />
            <StatCard label="Revenue"           value={formatMoney(s.revenue)}   accent="#4ade80" />
            <StatCard label="Pending"           value={formatMoney(s.pending)}   accent="#fbbf24" />
            <StatCard label="Follow-ups"        value={String(followUps.length)} accent="#f87171" />
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:20 }}>
            <div className="glass" style={{ borderRadius:16, overflow:"hidden" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 20px", borderBottom:"1px solid var(--border)" }}>
                <span style={{ fontFamily:"var(--font-display)", fontWeight:700, color:"#fff", fontSize:"0.95rem" }}>Recent Businesses</span>
                <Link href="/dashboard/businesses" style={{ fontSize:"0.75rem", color:"#818cf8", textDecoration:"none" }}>View all →</Link>
              </div>
              {recent.length === 0 ? (
                <div style={{ padding:"40px 20px", textAlign:"center", color:"var(--text-muted)", fontSize:"0.875rem" }}>
                  No businesses yet.{" "}
                  <Link href="/dashboard/import" style={{ color:"#818cf8" }}>Import some →</Link>
                </div>
              ) : recent.map(b => (
                <Link key={b.id} href={`/dashboard/businesses/${b.id}`}
                  style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 20px", borderBottom:"1px solid var(--border)", textDecoration:"none", transition:"background 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(99,102,241,0.04)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,rgba(99,102,241,0.25),rgba(139,92,246,0.25))", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:"0.875rem", color:"#fff", flexShrink:0 }}>
                    {b.name.charAt(0)}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:600, fontSize:"0.875rem", color:"#fff", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.name}</div>
                    <div style={{ fontSize:"0.72rem", color:"var(--text-muted)", marginTop:2 }}>{b.category||"—"} · {timeAgo(b.updated_at)}</div>
                  </div>
                  <StatusBadge status={b.status} />
                </Link>
              ))}
            </div>

            <div className="glass" style={{ borderRadius:16, overflow:"hidden" }}>
              <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)" }}>
                <span style={{ fontFamily:"var(--font-display)", fontWeight:700, color:"#fff", fontSize:"0.95rem" }}>🔔 Follow-ups Needed</span>
              </div>
              {followUps.length === 0 ? (
                <div style={{ padding:"32px 20px", textAlign:"center", color:"var(--text-muted)", fontSize:"0.82rem" }}>All caught up!</div>
              ) : followUps.map(b => (
                <Link key={b.id} href={`/dashboard/businesses/${b.id}`}
                  style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 20px", borderBottom:"1px solid var(--border)", textDecoration:"none" }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:"#f87171", flexShrink:0 }} />
                  <div style={{ minWidth:0 }}>
                    <div style={{ fontSize:"0.82rem", fontWeight:600, color:"#fff", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.name}</div>
                    <div style={{ fontSize:"0.7rem", color:"var(--text-muted)" }}>{timeAgo(b.updated_at)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}