"use client";
import Link from "next/link";
import { useStore } from "@/store";

export default function ProjectsPage() {
  const { businesses, loading } = useStore();
  const active    = businesses.filter(b => b.status === "project_in_progress");
  const completed = businesses.filter(b => b.status === "completed");

  const Card = ({ b }: { b: typeof businesses[0] }) => (
    <Link href={`/dashboard/businesses/${b.id}`} style={{ textDecoration:"none" }}>
      <div className="glass" style={{ borderRadius:16, padding:20, cursor:"pointer" }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
          <div>
            <div style={{ fontFamily:"var(--font-display)", fontWeight:700, color:"#fff", fontSize:"0.95rem", marginBottom:3 }}>{b.name}</div>
            <div style={{ fontSize:"0.75rem", color:"var(--text-muted)" }}>{b.category}</div>
          </div>
          {b.status==="completed" && (
            <span className="badge" style={{ background:"rgba(34,197,94,0.1)",color:"#4ade80",borderColor:"rgba(34,197,94,0.25)",alignSelf:"flex-start" }}>✓ Done</span>
          )}
        </div>
        <div style={{ marginBottom:12 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
            <span style={{ fontSize:"0.75rem", color:"var(--text-muted)" }}>Progress</span>
            <span style={{ fontSize:"0.75rem", fontWeight:600, color:"#fff" }}>{b.project_progress}%</span>
          </div>
          <div style={{ height:6, background:"rgba(255,255,255,0.08)", borderRadius:99, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${b.project_progress}%`, borderRadius:99, background:b.project_progress===100?"#22c55e":"#6366f1", transition:"width 0.4s" }} />
          </div>
        </div>
        {b.services_requested.length > 0 && (
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {b.services_requested.map(s => (
              <span key={s} className="badge" style={{ background:"rgba(99,102,241,0.1)",color:"#818cf8",borderColor:"rgba(99,102,241,0.2)",fontSize:"0.65rem" }}>
                {s.replace(/_/g," ")}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );

  return (
    <div>
      <div style={{ marginBottom:22 }}>
        <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"1.6rem", color:"#fff" }}>Projects</h1>
        <p style={{ color:"var(--text-muted)", fontSize:"0.875rem", marginTop:4 }}>{active.length} active · {completed.length} completed</p>
      </div>
      {loading ? <div style={{ textAlign:"center", padding:"60px 0", color:"var(--text-muted)" }}>Loading…</div> : (
        <>
          <h2 style={{ fontFamily:"var(--font-display)", fontWeight:700, color:"#fff", fontSize:"1rem", marginBottom:14 }}>Active</h2>
          {active.length===0
            ? <p style={{ color:"var(--text-muted)", fontSize:"0.875rem", marginBottom:28 }}>No active projects yet.</p>
            : <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:14, marginBottom:28 }}>
                {active.map(b => <Card key={b.id} b={b} />)}
              </div>}
          {completed.length > 0 && (
            <>
              <h2 style={{ fontFamily:"var(--font-display)", fontWeight:700, color:"#fff", fontSize:"1rem", marginBottom:14 }}>✓ Completed</h2>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:14, opacity:0.8 }}>
                {completed.map(b => <Card key={b.id} b={b} />)}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}