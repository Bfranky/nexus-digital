import Link from "next/link";

export default function Home() {
  return (
    <div style={{background:"var(--bg)",color:"var(--text)",minHeight:"100vh"}}>
      {/* Nav */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:50,borderBottom:"1px solid var(--border)",background:"rgba(9,9,15,0.85)",backdropFilter:"blur(14px)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 20px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"1.1rem",letterSpacing:"-0.02em"}}>
            nexus<span style={{color:"#818cf8"}}>.</span>digitals
          </span>
          <div style={{display:"flex",gap:8}}>
            <Link href="/login" style={{padding:"7px 14px",borderRadius:10,fontSize:"0.85rem",color:"var(--text-muted)",textDecoration:"none"}}>Log in</Link>
            <Link href="/dashboard" className="btn-primary" style={{textDecoration:"none",padding:"7px 16px",borderRadius:10,fontSize:"0.85rem"}}>Open App</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{padding:"120px 20px 80px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,zIndex:0,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(99,102,241,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.06) 1px,transparent 1px)",backgroundSize:"44px 44px"}}/>
        <div style={{position:"absolute",top:-80,left:"50%",transform:"translateX(-50%)",width:"min(700px,100vw)",height:400,background:"radial-gradient(ellipse,rgba(99,102,241,0.18) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>
        <div style={{position:"relative",zIndex:1,maxWidth:720,margin:"0 auto",textAlign:"center"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"5px 14px",borderRadius:99,marginBottom:24,background:"rgba(99,102,241,0.1)",border:"1px solid rgba(99,102,241,0.25)",fontSize:"0.75rem",fontWeight:600,color:"#818cf8"}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#818cf8"}}/>
            Built for Nigerian digital agencies
          </div>
          <h1 style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"clamp(2rem,8vw,4.5rem)",lineHeight:1.07,letterSpacing:"-0.04em",color:"#fff",marginBottom:20}}>
            Track Businesses.<br/><span style={{color:"#818cf8"}}>Close More Deals.</span>
          </h1>
          <p style={{fontSize:"clamp(0.95rem,2.5vw,1.1rem)",color:"var(--text-muted)",maxWidth:480,margin:"0 auto 36px",lineHeight:1.65}}>
            Paste businesses from Google Maps, manage your pipeline, track payments and projects — all in one dashboard.
          </p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/dashboard" className="btn-primary glow" style={{textDecoration:"none",fontSize:"1rem",padding:"12px 28px",borderRadius:14}}>Open Dashboard →</Link>
            <Link href="/dashboard/import" className="btn-ghost" style={{textDecoration:"none",fontSize:"1rem",padding:"12px 24px",borderRadius:14}}>Import Businesses</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{padding:"60px 20px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:44}}>
          <h2 style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"clamp(1.6rem,4vw,2.5rem)",color:"#fff",letterSpacing:"-0.03em"}}>Everything in one dashboard</h2>
          <p style={{color:"var(--text-muted)",marginTop:10,fontSize:"0.95rem"}}>Built specifically for digital agencies working with local businesses.</p>
        </div>
        <div className="grid-3">
          {[
            {emoji:"📋",title:"Smart Import",     desc:"Paste text from Google Maps in any format — name, phone, rating, address all extracted automatically."},
            {emoji:"🎯",title:"Pipeline Tracking", desc:"Move leads from Not Contacted → Paid → Completed with an 8-stage visual pipeline."},
            {emoji:"💬",title:"WhatsApp Logging",  desc:"Track replies, log conversations, and open WhatsApp directly from the dashboard."},
            {emoji:"💰",title:"Payment Tracking",  desc:"See total revenue, pending invoices, and overdue payments at a glance."},
            {emoji:"📁",title:"Project Manager",   desc:"Track project progress with a slider, attach demo links, and mark stages complete."},
            {emoji:"✨",title:"AI Assistant",      desc:"Your full pipeline as context — get follow-up messages, upsell ideas, and deal strategy."},
          ].map(f=>(
            <div key={f.title} className="glass" style={{borderRadius:16,padding:22}}>
              <div style={{fontSize:"1.7rem",marginBottom:12}}>{f.emoji}</div>
              <h3 style={{fontFamily:"var(--font-display)",fontWeight:700,fontSize:"0.95rem",color:"#fff",marginBottom:8}}>{f.title}</h3>
              <p style={{fontSize:"0.85rem",color:"var(--text-muted)",lineHeight:1.6}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:"60px 20px",textAlign:"center"}}>
        <div style={{maxWidth:440,margin:"0 auto"}}>
          <h2 style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"1.8rem",color:"#fff",marginBottom:14}}>Ready to start tracking?</h2>
          <p style={{color:"var(--text-muted)",marginBottom:28,fontSize:"0.9rem"}}>No signup needed to explore. Just open the dashboard.</p>
          <Link href="/dashboard" className="btn-primary glow" style={{textDecoration:"none",fontSize:"1rem",padding:"13px 32px",borderRadius:14}}>Launch Dashboard →</Link>
        </div>
      </section>

      <footer style={{borderTop:"1px solid var(--border)",padding:"20px",textAlign:"center",fontSize:"0.78rem",color:"var(--text-muted)"}}>
        © {new Date().getFullYear()} Nexus Digitals · Built for growth
      </footer>
    </div>
  );
}
