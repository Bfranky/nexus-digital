"use client";
import { useStore } from "@/store";
import { STATUS_META, STATUS_ORDER, formatMoney } from "@/lib/utils";

export default function AnalyticsPage() {
  const { businesses, loading } = useStore();
  const total    = businesses.length || 1;
  const revenue  = businesses.reduce((s,b)=>s+(b.amount_paid??0),0);
  const pending  = businesses.reduce((s,b)=>s+(b.payment_status!=="paid"?(b.amount_quoted??0):0),0);

  const statusCounts = STATUS_ORDER
    .map(s => ({ status:s, count:businesses.filter(b=>b.status===s).length, label:STATUS_META[s].label, dot:STATUS_META[s].dot }))
    .filter(x => x.count > 0);

  const catMap: Record<string,number> = {};
  businesses.forEach(b => { const c=b.category||"Other"; catMap[c]=(catMap[c]??0)+1; });
  const categories = Object.entries(catMap).sort((a,b)=>b[1]-a[1]).slice(0,8);
  const maxCat = Math.max(...categories.map(c=>c[1]),1);

  return (
    <div>
      <div style={{ marginBottom:22 }}>
        <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"1.6rem", color:"#fff" }}>Analytics</h1>
        <p style={{ color:"var(--text-muted)", fontSize:"0.875rem", marginTop:4 }}>Performance overview</p>
      </div>
      {loading ? <div style={{ textAlign:"center", padding:"60px 0", color:"var(--text-muted)" }}>Loading…</div> : (
        <>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:14, marginBottom:28 }}>
            {[
              { label:"Total Businesses", value:String(businesses.length), accent:"#818cf8" },
              { label:"Contacted",        value:String(businesses.filter(b=>b.status!=="not_contacted").length), accent:"#60a5fa" },
              { label:"WA Replied",       value:String(businesses.filter(b=>b.whatsapp_replied).length), accent:"#4ade80" },
              { label:"Paid",             value:String(businesses.filter(b=>b.payment_status==="paid").length), accent:"#4ade80" },
              { label:"Revenue",          value:formatMoney(revenue), accent:"#4ade80" },
              { label:"Pipeline Value",   value:formatMoney(pending), accent:"#fbbf24" },
            ].map(s => (
              <div key={s.label} className="glass" style={{ borderRadius:16, padding:"18px 20px" }}>
                <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"1.5rem", color:s.accent }}>{s.value}</div>
                <div style={{ fontSize:"0.68rem", color:"var(--text-muted)", marginTop:4, textTransform:"uppercase", letterSpacing:"0.05em", fontWeight:600 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
            <div className="glass" style={{ borderRadius:16, padding:22 }}>
              <h2 style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"0.95rem", color:"#fff", marginBottom:18 }}>Pipeline Breakdown</h2>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {statusCounts.map(({ status, count, label, dot }) => (
                  <div key={status}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                      <span style={{ fontSize:"0.8rem", color:"var(--text)", display:"flex", alignItems:"center", gap:6 }}>
                        <span style={{ width:6, height:6, borderRadius:"50%", background:dot, display:"inline-block" }}/>{label}
                      </span>
                      <span style={{ fontSize:"0.8rem", fontWeight:600, color:"#fff" }}>{count}</span>
                    </div>
                    <div style={{ height:6, background:"rgba(255,255,255,0.06)", borderRadius:99, overflow:"hidden" }}>
                      <div style={{ height:"100%", borderRadius:99, background:dot, opacity:0.7, width:`${(count/total)*100}%`, transition:"width 0.5s" }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass" style={{ borderRadius:16, padding:22 }}>
              <h2 style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"0.95rem", color:"#fff", marginBottom:18 }}>By Category</h2>
              {categories.length===0
                ? <p style={{ color:"var(--text-muted)", fontSize:"0.875rem" }}>No data yet.</p>
                : <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
                    {categories.map(([cat,count]) => (
                      <div key={cat}>
                        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                          <span style={{ fontSize:"0.8rem", color:"var(--text)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:"75%" }}>{cat}</span>
                          <span style={{ fontSize:"0.8rem", fontWeight:600, color:"#fff" }}>{count}</span>
                        </div>
                        <div style={{ height:6, background:"rgba(255,255,255,0.06)", borderRadius:99, overflow:"hidden" }}>
                          <div style={{ height:"100%", borderRadius:99, background:"#6366f1", opacity:0.65, width:`${(count/maxCat)*100}%`, transition:"width 0.5s" }}/>
                        </div>
                      </div>
                    ))}
                  </div>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}