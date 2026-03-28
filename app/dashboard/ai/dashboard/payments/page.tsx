"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { formatMoney, formatDate } from "@/lib/utils";
import type { Business } from "@/types";

export default function PaymentsPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    (async()=>{
      const{data}=await createClient().from("businesses").select("*").order("updated_at",{ascending:false});
      setBusinesses((data as Business[])??[]);setLoading(false);
    })();
  },[]);

  const paid    = businesses.filter(b=>b.payment_status==="paid");
  const pending = businesses.filter(b=>b.payment_status==="pending"&&b.amount_quoted);
  const overdue = businesses.filter(b=>b.payment_status==="overdue");
  const totalRevenue = paid.reduce((s,b)=>s+(b.amount_paid??0),0);
  const totalPending = pending.reduce((s,b)=>s+(b.amount_quoted??0),0);

  const Section = ({title,items,accent}:{title:string;items:Business[];accent:string})=>(
    <div style={{marginBottom:28}}>
      <h2 style={{fontFamily:"var(--font-display)",fontWeight:700,fontSize:"0.95rem",color:"#fff",marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
        <span style={{width:8,height:8,borderRadius:"50%",background:accent,display:"inline-block"}}/>
        {title}
      </h2>
      <div className="glass" style={{borderRadius:16,overflow:"hidden"}}>
        {items.length===0
          ? <div style={{padding:"28px 18px",textAlign:"center",color:"var(--text-muted)",fontSize:"0.875rem"}}>None yet.</div>
          : <div className="table-scroll">
              <table className="tbl">
                <thead><tr><th>Business</th><th className="hide-mobile">Category</th><th>Quoted</th><th>Paid</th><th className="hide-mobile">Date</th></tr></thead>
                <tbody>
                  {items.map(b=>(
                    <tr key={b.id}>
                      <td><Link href={`/dashboard/businesses/${b.id}`} style={{color:"#fff",textDecoration:"none",fontWeight:600,fontSize:"0.875rem"}}>{b.name}</Link></td>
                      <td className="hide-mobile" style={{color:"var(--text-muted)",fontSize:"0.8rem"}}>{b.category||"—"}</td>
                      <td style={{fontWeight:600,color:"var(--text)"}}>{formatMoney(b.amount_quoted)}</td>
                      <td style={{fontWeight:600,color:accent}}>{formatMoney(b.amount_paid)}</td>
                      <td className="hide-mobile" style={{color:"var(--text-muted)",fontSize:"0.8rem"}}>{formatDate(b.payment_date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>}
      </div>
    </div>
  );

  return (
    <div>
      <div style={{marginBottom:22}}>
        <h1 className="page-title">Payments</h1>
      </div>
      {loading ? <div style={{textAlign:"center",padding:"60px 0",color:"var(--text-muted)"}}>Loading…</div> : (
        <>
          <div className="grid-stats" style={{marginBottom:28,gridTemplateColumns:"repeat(2,1fr)"}}>
            {[
              {label:"Total Revenue",   value:formatMoney(totalRevenue), accent:"#4ade80"},
              {label:"Pending",         value:formatMoney(totalPending), accent:"#fbbf24"},
              {label:"Paid Clients",    value:String(paid.length),       accent:"#4ade80"},
              {label:"Overdue",         value:String(overdue.length),    accent:"#f87171"},
            ].map(s=>(
              <div key={s.label} className="stat-card">
                <div style={{fontFamily:"var(--font-display)",fontWeight:700,fontSize:"1.4rem",color:s.accent}}>{s.value}</div>
                <div style={{fontSize:"0.7rem",color:"var(--text-muted)",marginTop:4,textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:600}}>{s.label}</div>
              </div>
            ))}
          </div>
          <Section title="Paid" items={paid} accent="#4ade80"/>
          <Section title="Pending Invoices" items={pending} accent="#fbbf24"/>
          {overdue.length>0 && <Section title="Overdue" items={overdue} accent="#f87171"/>}
        </>
      )}
    </div>
  );
}
