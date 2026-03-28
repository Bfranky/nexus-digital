"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { STATUS_ORDER, STATUS_META, formatMoney, formatDate, timeAgo } from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Business, BusinessStatus } from "@/types";

const SERVICES = ["web_design","ai_automation","seo","content_management","social_media","other"];

export default function BusinessDetailPage({ params }: { params: Promise<{id:string}> }) {
  const { id }    = use(params);
  const router    = useRouter();
  const [biz, setBiz]         = useState<Business|null>(null);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [editNotes, setEditNotes] = useState(false);
  const [notes, setNotes]     = useState("");
  const [showPipeline, setShowPipeline] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await createClient().from("businesses").select("*").eq("id",id).single();
      if (data) { setBiz(data); setNotes(data.notes??"")}
      setLoading(false);
    })();
  }, [id]);

  const patch = async (updates: Partial<Business>) => {
    setSaving(true);
    const { data } = await createClient().from("businesses").update(updates).eq("id",id).select().single();
    if (data) setBiz(data);
    setSaving(false);
  };

  const deleteBiz = async () => {
    if (!confirm("Delete this business?")) return;
    await createClient().from("businesses").delete().eq("id",id);
    router.push("/dashboard/businesses");
  };

  if (loading) return <div style={{ padding:"60px 0", textAlign:"center", color:"var(--text-muted)" }}>Loading…</div>;
  if (!biz)   return <div style={{ padding:"60px 0", textAlign:"center", color:"var(--text-muted)" }}>Not found.</div>;

  return (
    <div>
      {/* Back */}
      <Link href="/dashboard/businesses" style={{ color:"var(--text-muted)", textDecoration:"none", fontSize:"0.85rem", display:"inline-flex", alignItems:"center", gap:4, marginBottom:16 }}>
        ← All Businesses
      </Link>

      {/* Header */}
      <div className="row-wrap" style={{ justifyContent:"space-between", marginBottom:22 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:44, height:44, borderRadius:12, background:"linear-gradient(135deg,rgba(99,102,241,0.3),rgba(139,92,246,0.3))", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:"1.2rem", color:"#fff", flexShrink:0 }}>
            {biz.name.charAt(0)}
          </div>
          <div>
            <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"1.2rem", color:"#fff" }}>{biz.name}</h1>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:4, flexWrap:"wrap" }}>
              <StatusBadge status={biz.status} />
              <span style={{ fontSize:"0.75rem", color:"var(--text-muted)" }}>{biz.category||"—"}</span>
            </div>
          </div>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          {saving && <span style={{ fontSize:"0.78rem", color:"var(--text-muted)" }}>Saving…</span>}
          <button className="btn-ghost" style={{ color:"#f87171", borderColor:"rgba(239,68,68,0.25)", padding:"8px 12px", fontSize:"0.8rem" }} onClick={deleteBiz}>🗑</button>
        </div>
      </div>

      <div className="detail-layout">
        {/* Left — main content */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

          {/* Contact */}
          <div className="glass" style={{ borderRadius:16, padding:18 }}>
            <h2 style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"0.95rem", color:"#fff", marginBottom:14 }}>Contact</h2>
            <div className="grid-2">
              {[
                { label:"Phone",    value:biz.phone,    href:`tel:${biz.phone}` },
                { label:"WhatsApp", value:biz.whatsapp, href:`https://wa.me/${biz.whatsapp?.replace(/\D/g,"")}` },
                { label:"Address",  value:biz.address,  href:undefined },
                { label:"Website",  value:biz.website,  href:biz.website??undefined },
              ].map(({ label, value, href }) => (
                <div key={label}>
                  <div style={{ fontSize:"0.68rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", color:"var(--text-muted)", marginBottom:4 }}>{label}</div>
                  {value
                    ? href
                      ? <a href={href} target="_blank" rel="noreferrer" style={{ color:"#818cf8", fontSize:"0.875rem", textDecoration:"none", wordBreak:"break-all" }}>{value}</a>
                      : <span style={{ color:"var(--text)", fontSize:"0.875rem" }}>{value}</span>
                    : <span style={{ color:"var(--text-muted)", fontSize:"0.875rem" }}>—</span>
                  }
                </div>
              ))}
            </div>
            {biz.whatsapp && (
              <a href={`https://wa.me/${biz.whatsapp.replace(/\D/g,"")}`} target="_blank" rel="noreferrer"
                className="btn-primary" style={{ textDecoration:"none", marginTop:14, background:"#25d366", fontSize:"0.82rem", padding:"8px 14px" }}>
                💬 Open WhatsApp
              </a>
            )}
          </div>

          {/* Notes */}
          <div className="glass" style={{ borderRadius:16, padding:18 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
              <h2 style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"0.95rem", color:"#fff" }}>Notes</h2>
              <button className="btn-ghost" style={{ padding:"4px 12px", fontSize:"0.75rem" }}
                onClick={() => { if (editNotes) patch({notes}); setEditNotes(!editNotes); }}>
                {editNotes?"Save":"Edit"}
              </button>
            </div>
            {editNotes
              ? <textarea className="field" value={notes} onChange={e=>setNotes(e.target.value)} rows={4} style={{ resize:"vertical" }} />
              : <p style={{ fontSize:"0.875rem", color:biz.notes?"var(--text)":"var(--text-muted)", lineHeight:1.65 }}>{biz.notes||"No notes yet."}</p>
            }
          </div>

          {/* Project */}
          <div className="glass" style={{ borderRadius:16, padding:18 }}>
            <h2 style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"0.95rem", color:"#fff", marginBottom:14 }}>Project</h2>
            <div style={{ marginBottom:14 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <span style={{ fontSize:"0.8rem", color:"var(--text-muted)" }}>Progress</span>
                <span style={{ fontSize:"0.8rem", fontWeight:600, color:"#fff" }}>{biz.project_progress}%</span>
              </div>
              <div style={{ height:8, background:"rgba(255,255,255,0.08)", borderRadius:99, overflow:"hidden" }}>
                <div style={{ height:"100%", borderRadius:99, background:biz.project_progress===100?"#22c55e":"#6366f1", width:`${biz.project_progress}%`, transition:"width 0.5s" }} />
              </div>
              <input type="range" min={0} max={100} value={biz.project_progress}
                onChange={e=>patch({project_progress:Number(e.target.value)})}
                style={{ width:"100%", marginTop:8, accentColor:"#6366f1" }} />
            </div>
            <div className="grid-2">
              <div>
                <label style={{ fontSize:"0.68rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", color:"var(--text-muted)", display:"block", marginBottom:6 }}>Demo URL</label>
                <input className="field" defaultValue={biz.project_demo_url??""} placeholder="https://…"
                  onBlur={e=>patch({project_demo_url:e.target.value||null})} style={{ fontSize:"0.82rem" }} />
              </div>
              <div>
                <label style={{ fontSize:"0.68rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", color:"var(--text-muted)", display:"block", marginBottom:6 }}>Live URL</label>
                <input className="field" defaultValue={biz.project_live_url??""} placeholder="https://…"
                  onBlur={e=>patch({project_live_url:e.target.value||null})} style={{ fontSize:"0.82rem" }} />
              </div>
            </div>
            <div style={{ marginTop:14 }}>
              <label style={{ fontSize:"0.68rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", color:"var(--text-muted)", display:"block", marginBottom:8 }}>Services</label>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {SERVICES.map(s => {
                  const active = biz.services_requested.includes(s);
                  return (
                    <button key={s} onClick={() => {
                      const next = active ? biz.services_requested.filter(x=>x!==s) : [...biz.services_requested,s];
                      patch({services_requested:next});
                    }} style={{
                      padding:"5px 12px", borderRadius:99, fontSize:"0.75rem", fontWeight:600,
                      cursor:"pointer", transition:"all 0.15s", fontFamily:"inherit",
                      background:active?"rgba(99,102,241,0.2)":"transparent",
                      color:active?"#818cf8":"var(--text-muted)",
                      border:active?"1px solid rgba(99,102,241,0.4)":"1px solid var(--border)",
                    }}>{s.replace(/_/g," ")}</button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="glass" style={{ borderRadius:16, padding:18 }}>
            <h2 style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"0.95rem", color:"#fff", marginBottom:14 }}>Payment</h2>
            <div className="grid-2">
              <div>
                <label style={{ fontSize:"0.68rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", color:"var(--text-muted)", display:"block", marginBottom:6 }}>Quoted (₦)</label>
                <input className="field" type="number" defaultValue={biz.amount_quoted??""} placeholder="0"
                  onBlur={e=>patch({amount_quoted:e.target.value?Number(e.target.value):null})} />
              </div>
              <div>
                <label style={{ fontSize:"0.68rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", color:"var(--text-muted)", display:"block", marginBottom:6 }}>Paid (₦)</label>
                <input className="field" type="number" defaultValue={biz.amount_paid??""} placeholder="0"
                  onBlur={e=>patch({amount_paid:e.target.value?Number(e.target.value):null})} />
              </div>
              <div style={{ gridColumn:"1/-1" }}>
                <label style={{ fontSize:"0.68rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", color:"var(--text-muted)", display:"block", marginBottom:6 }}>Payment Date</label>
                <input className="field" type="date" defaultValue={biz.payment_date??""} onBlur={e=>patch({payment_date:e.target.value||null})} />
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

          {/* Pipeline — collapsible on mobile */}
          <div className="glass" style={{ borderRadius:16, overflow:"hidden" }}>
            <button onClick={()=>setShowPipeline(v=>!v)}
              style={{ width:"100%", padding:"14px 16px", background:"none", border:"none", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"0.9rem", color:"#fff" }}>Pipeline Stage</span>
              <span style={{ color:"var(--text-muted)", fontSize:"0.9rem" }}>{showPipeline?"▲":"▼"}</span>
            </button>
            {showPipeline && (
              <div style={{ padding:"0 8px 12px", display:"flex", flexDirection:"column", gap:3 }}>
                {STATUS_ORDER.map((s,i) => {
                  const ci = STATUS_ORDER.indexOf(biz.status);
                  const isCurrent = s===biz.status, isPast = i<ci;
                  return (
                    <button key={s} onClick={()=>patch({status:s})} style={{
                      textAlign:"left", padding:"8px 12px", borderRadius:10, fontSize:"0.8rem",
                      fontWeight:isCurrent?600:400, cursor:"pointer", transition:"all 0.15s",
                      fontFamily:"inherit", display:"flex", alignItems:"center", gap:8, border:"1px solid",
                      background:isCurrent?"rgba(99,102,241,0.12)":"transparent",
                      color:isCurrent?"#818cf8":isPast?"#4ade80":"var(--text-muted)",
                      borderColor:isCurrent?"rgba(99,102,241,0.3)":"transparent",
                    }}>
                      <span style={{ width:6, height:6, borderRadius:"50%", flexShrink:0, background:isCurrent?"#818cf8":isPast?"#4ade80":"rgba(255,255,255,0.15)" }} />
                      {STATUS_META[s].label}
                    </button>
                  );
                })}
              </div>
            )}
            {/* Always show current status */}
            {!showPipeline && (
              <div style={{ padding:"0 16px 14px" }}>
                <StatusBadge status={biz.status} />
              </div>
            )}
          </div>

          {/* WhatsApp */}
          <div className="glass" style={{ borderRadius:16, padding:16 }}>
            <h2 style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"0.9rem", color:"#fff", marginBottom:12 }}>WhatsApp</h2>
            <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", fontSize:"0.875rem", color:"var(--text)" }}>
              <input type="checkbox" checked={biz.whatsapp_replied} onChange={e=>patch({whatsapp_replied:e.target.checked})} style={{ accentColor:"#6366f1", width:16, height:16 }} />
              Replied on WhatsApp
            </label>
          </div>

          {/* Meta */}
          <div className="glass" style={{ borderRadius:16, padding:16 }}>
            <div style={{ display:"flex", flexDirection:"column", gap:10, fontSize:"0.8rem" }}>
              <div><span style={{ color:"var(--text-muted)" }}>Added</span><br /><span style={{ color:"var(--text)" }}>{formatDate(biz.created_at)}</span></div>
              <div><span style={{ color:"var(--text-muted)" }}>Updated</span><br /><span style={{ color:"var(--text)" }}>{timeAgo(biz.updated_at)}</span></div>
              {biz.google_maps_url && <a href={biz.google_maps_url} target="_blank" rel="noreferrer" style={{ color:"#818cf8", textDecoration:"none" }}>🗺 View on Maps →</a>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
