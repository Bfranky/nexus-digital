"use client";
import AgentPackagePresenter from "./AgentPackagePresenter";

export default function AgentProgramSection() {
  const agentWaMsg = encodeURIComponent(
    "AGENT - Hello Blessed, I am interested in joining Nexora Digital as a commission-based sales agent. My name is: [Your Name] and my city is: [Your City]."
  );

  return (
    <section id="agent" style={{ padding: "80px 20px", maxWidth: 1180, margin: "0 auto" }}>
      <div
        className="glass"
        style={{
          borderRadius: 24,
          padding: "44px 32px",
          background: "radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.12) 0%, rgba(15,15,28,0.95) 70%)",
          border: "1px solid rgba(99,102,241,0.25)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 800 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 14px",
              borderRadius: 99,
              marginBottom: 16,
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.25)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#4ade80",
            }}
          >
            <span>💼 Partner With Us · Remote Nigeria</span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)",
              color: "#fff",
              letterSpacing: "-0.03em",
              marginBottom: 14,
            }}
          >
            Earn ₦8,000 to ₦80,000+ Per Client
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 28 }}>
            Introduce local businesses to Nexora Digital websites and earn attractive commissions. No technical experience required, ₦0 to join, and 100% remote. We provide the scripts, portfolio, and close the technical work.
          </p>
        </div>

        {/* Commission Tiers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              background: "var(--bg-raised)",
              borderRadius: 16,
              padding: "20px",
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#818cf8", fontFamily: "var(--font-display)", marginBottom: 4 }}>
              10%
            </div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#fff", marginBottom: 6 }}>
              Warm Referral
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
              Introduce an interested business owner. We handle the presentation, proposal, and close. You earn 10% of whatever they pay.
            </div>
          </div>

          <div
            style={{
              background: "var(--bg-raised)",
              borderRadius: 16,
              padding: "20px",
              border: "1px solid rgba(99,102,241,0.4)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                fontSize: "0.65rem",
                fontWeight: 700,
                color: "#4ade80",
                background: "rgba(34,197,94,0.12)",
                padding: "2px 8px",
                borderRadius: 99,
              }}
            >
              Popular
            </div>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#4ade80", fontFamily: "var(--font-display)", marginBottom: 4 }}>
              20%
            </div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#fff", marginBottom: 6 }}>
              Direct Sale Close
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
              Use our ready-made message scripts to close the sale with the client directly. You get paid 20% within 48 hours of their deposit.
            </div>
          </div>

          <div
            style={{
              background: "var(--bg-raised)",
              borderRadius: 16,
              padding: "20px",
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fbbf24", fontFamily: "var(--font-display)", marginBottom: 4 }}>
              25%
            </div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#fff", marginBottom: 6 }}>
              Top Producer Bonus
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
              Earn 25% on every single project after your 3rd paid client in a calendar month, plus reference letters and priority lead assignments.
            </div>
          </div>
        </div>

        {/* Benefits list */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, marginBottom: 24 }}>
          {[
            "Zero registration fee or financial capital needed",
            "Easy client payments: MiniPay Scan QR, Monnify & Direct Bank Transfer",
            "Paid directly by bank transfer within 48 hours of client payment",
            "Open to students, graduates, freelancers & NYSC members",
            "Weekly leaderboard, bonuses, and team support",
            "Official certificate/reference letter after 3 months",
          ].map((item, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.82rem", color: "var(--text)" }}>
              <span style={{ color: "#4ade80" }}>✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Agent Pitch Tool Bar */}
        <div
          style={{
            background: "rgba(6,182,212,0.06)",
            border: "1px dashed rgba(6,182,212,0.3)",
            borderRadius: 16,
            padding: "16px 20px",
            marginBottom: 28,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#38bdf8" }}>
              💡 Speaking with a client right now?
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>
              Open our live package pitcher to show them our exact tiers (₦80k to ₦800k) and payment options (MiniPay &amp; Bank Transfer).
            </div>
          </div>
          <AgentPackagePresenter />
        </div>

        {/* CTA */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
          <a
            href={`https://wa.me/2349069321502?text=${agentWaMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary glow"
            style={{ padding: "12px 24px", fontSize: "0.9rem", textDecoration: "none" }}
          >
            Apply as Sales Agent on WhatsApp →
          </a>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Send &quot;AGENT&quot; with your name &amp; city to <strong>09069321502</strong>
          </span>
        </div>
      </div>
    </section>
  );
}
