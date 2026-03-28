import Link from "next/link";

export default function LoginPage() {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--bg)", padding: "0 24px", position: "relative", overflow: "hidden",
    }}>
      {/* bg glow */}
      <div style={{
        position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)",
        width: 600, height: 400,
        background: "radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="glass" style={{ width: "100%", maxWidth: 380, borderRadius: 22, padding: 36, position: "relative" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 16, margin: "0 auto 14px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.5rem", boxShadow: "0 0 24px rgba(99,102,241,0.3)",
          }}>⚡</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.4rem", color: "#fff", letterSpacing: "-0.02em" }}>
            nexus<span style={{ color: "#818cf8" }}>.</span>digitals
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: 6 }}>Sign in to your dashboard</p>
        </div>

        {/* Form — wired to Supabase auth (add server action later) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 7 }}>Email</label>
            <input className="field" type="email" placeholder="you@example.com" defaultValue="admin@nexus.digitals" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 7 }}>Password</label>
            <input className="field" type="password" placeholder="••••••••" defaultValue="password" />
          </div>
          {/* For now, just redirect to dashboard */}
          <Link href="/dashboard" className="btn-primary"
            style={{ textDecoration: "none", textAlign: "center", justifyContent: "center", marginTop: 4, padding: "12px", fontSize: "0.95rem" }}>
            Sign In →
          </Link>
        </div>

        <p style={{ textAlign: "center", fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 20 }}>
          No account?{" "}
          <a href="#" style={{ color: "#818cf8", textDecoration: "none" }}>Contact admin</a>
        </p>
      </div>
    </div>
  );
}
