"use client";
import { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { STATUS_META } from "@/lib/utils";
import type { Business } from "@/types";

interface Message { role:"user"|"assistant"; content:string; }
const QUICK = [
  "Which businesses need follow-up?","Summarize my pipeline",
  "Write a WhatsApp intro for a salon","What services should I upsell?",
  "Draft a closing message for a negotiating lead","Which leads have gone cold?",
];

export default function AiPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [bizList,  setBizList]  = useState<Business[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    (async()=>{
      const{data}=await createClient().from("businesses").select("*").order("updated_at",{ascending:false});
      setBizList((data as Business[])??[]);
    })();
  },[]);
  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[messages]);

  const buildSystem = ()=>{
    const summary = bizList.map(b=>`- ${b.name} (${b.category??"unknown"}): status=${STATUS_META[b.status].label}, wa_replied=${b.whatsapp_replied}, payment=${b.payment_status}, progress=${b.project_progress}%`).join("\n");
    return `You are an AI growth assistant for Nexus Digitals, a Nigerian digital agency. Pipeline:\n${summary||"(No businesses yet)"}\nBe concise and actionable. Use ₦ for currency.`;
  };

  const send = async (text?:string)=>{
    const msg=(text??input).trim(); if(!msg||loading) return;
    setInput("");
    const updated:Message[]=[...messages,{role:"user",content:msg}];
    setMessages(updated); setLoading(true);
    try {
      const res = await fetch("/api/ai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({systemPrompt:buildSystem(),messages:updated.map(m=>({role:m.role,content:m.content}))})});
      const data = await res.json();
      setMessages(prev=>[...prev,{role:"assistant",content:data.reply??data.error??"Something went wrong."}]);
    } catch { setMessages(prev=>[...prev,{role:"assistant",content:"Connection error."}]); }
    finally { setLoading(false); }
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"calc(100dvh - 100px)"}}>
      <div style={{marginBottom:16,flexShrink:0}}>
        <h1 className="page-title">✨ AI Assistant</h1>
        <p style={{color:"var(--text-muted)",fontSize:"0.85rem",marginTop:4}}>{bizList.length} businesses loaded as context</p>
      </div>

      <div className="glass" style={{borderRadius:16,display:"flex",flexDirection:"column",flex:1,overflow:"hidden",minHeight:0}}>
        {/* Messages */}
        <div style={{flex:1,overflowY:"auto",padding:16}}>
          {messages.length===0 && (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:16,padding:"20px 0"}}>
              <div style={{width:54,height:54,borderRadius:16,background:"rgba(99,102,241,0.15)",border:"1px solid rgba(99,102,241,0.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.6rem"}}>✨</div>
              <div style={{textAlign:"center"}}>
                <p style={{fontFamily:"var(--font-display)",fontWeight:700,color:"#fff",fontSize:"1rem",marginBottom:6}}>Nexus AI Assistant</p>
                <p style={{color:"var(--text-muted)",fontSize:"0.82rem",maxWidth:320}}>Ask me about follow-ups, messages, strategy, or your pipeline.</p>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:7,justifyContent:"center",maxWidth:480}}>
                {QUICK.map(q=>(
                  <button key={q} onClick={()=>send(q)} style={{background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.2)",color:"var(--text-muted)",borderRadius:99,padding:"5px 12px",fontSize:"0.75rem",cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s"}}
                    onMouseEnter={e=>{e.currentTarget.style.color="#fff";e.currentTarget.style.borderColor="rgba(99,102,241,0.4)";}}
                    onMouseLeave={e=>{e.currentTarget.style.color="var(--text-muted)";e.currentTarget.style.borderColor="rgba(99,102,241,0.2)";}}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m,i)=>(
            <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",marginBottom:14}}>
              {m.role==="assistant" && <div style={{width:28,height:28,borderRadius:8,flexShrink:0,marginRight:8,marginTop:2,background:"rgba(99,102,241,0.15)",border:"1px solid rgba(99,102,241,0.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem"}}>✨</div>}
              <div style={{maxWidth:"78%",padding:"9px 13px",borderRadius:m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",background:m.role==="user"?"#6366f1":"var(--bg-raised)",border:m.role==="user"?"none":"1px solid var(--border)",fontSize:"0.85rem",lineHeight:1.65,color:"var(--text)",whiteSpace:"pre-wrap"}}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
              <div style={{width:28,height:28,borderRadius:8,background:"rgba(99,102,241,0.15)",display:"flex",alignItems:"center",justifyContent:"center"}}>✨</div>
              <div style={{display:"flex",gap:4}}>
                {[0,1,2].map(i=><span key={i} style={{width:6,height:6,borderRadius:"50%",background:"#818cf8",animation:"pulse 1.2s ease-in-out infinite",animationDelay:`${i*200}ms`}}/>)}
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>
        {/* Input */}
        <div style={{borderTop:"1px solid var(--border)",padding:"12px 14px",display:"flex",gap:8}}>
          {messages.length>0 && <button onClick={()=>setMessages([])} className="btn-icon" title="Clear" style={{flexShrink:0}}>↺</button>}
          <input className="field" value={input} onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
            placeholder="Ask about your pipeline…" style={{flex:1,padding:"9px 12px",fontSize:"0.85rem"}} />
          <button className="btn-primary" onClick={()=>send()} disabled={!input.trim()||loading} style={{padding:"9px 16px",flexShrink:0}}>Send</button>
        </div>
      </div>
    </div>
  );
}
