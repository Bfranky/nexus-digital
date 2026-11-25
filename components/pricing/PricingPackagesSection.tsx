"use client";
import { PRICING_PACKAGES } from "@/lib/portfolio-data";

export default function PricingPackagesSection() {
  return (
    <section id="pricing" style={{ padding: "80px 20px", maxWidth: 1240, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 14px",
            borderRadius: 99,
            marginBottom: 16,
            background: "rgba(245,158,11,0.1)",
            border: "1px solid rgba(245,158,11,0.25)",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#fbbf24",
          }}
        >
          <span>🎄 Festive Rush Special Offers</span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            color: "#fff",
            letterSpacing: "-0.03em",
            marginBottom: 12,
          }}
        >
          Transparent Packages &amp; Investment
        </h2>
        <p style={{ color: "var(--text-muted)", maxWidth: 640, margin: "0 auto", fontSize: "0.95rem", lineHeight: 1.6 }}>
          December is when event centres, lounges, restaurants, caterers, and salons get flooded with enquiries. A fast website with packages and a WhatsApp button answers questions instantly and closes clients while competitors are busy on the phone.
        </p>
      </div>

      {/* Grid of 4 Packages */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
          gap: 20,
          alignItems: "stretch",
        }}
      >
        {PRICING_PACKAGES.map(pkg => {
          const isRec = pkg.recommended;
          const waMessage = encodeURIComponent(
            `Hello Blessed! I would like to book the "${pkg.name}" (${pkg.price}) for my business. How do we get started?`
          );

          return (
            <div
              key={pkg.id}
              className="glass"
              style={{
                borderRadius: 20,
                padding: 26,
                display: "flex",
                flexDirection: "column",
                position: "relative",
                border: isRec ? "2px solid #6366f1" : "1px solid var(--border)",
                background: isRec
                  ? "linear-gradient(180deg, rgba(99,102,241,0.12) 0%, rgba(15,15,28,0.95) 100%)"
                  : "var(--bg-card)",
                transform: isRec ? "scale(1.02)" : "none",
                boxShadow: isRec ? "0 0 32px rgba(99,102,241,0.25)" : "none",
              }}
            >
              {/* Badge */}
              {pkg.badge && (
                <div style={{ marginBottom: 12 }}>
                  <span
                    className="badge"
                    style={{
                      background: isRec ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.06)",
                      color: isRec ? "#818cf8" : "var(--text)",
                      borderColor: isRec ? "rgba(99,102,241,0.4)" : "var(--border)",
                      fontSize: "0.7rem",
                    }}
                  >
                    {pkg.badge}
                  </span>
                </div>
              )}

              {/* Title & Audience */}
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", color: "#fff", marginBottom: 6 }}>
                {pkg.name}
              </h3>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 16 }}>
                Best for: <strong style={{ color: "#e2e8f0" }}>{pkg.targetAudience}</strong>
              </div>

              {/* Price & Timeline */}
              <div style={{ marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.8rem", color: "#4ade80", lineHeight: 1.1 }}>
                  {pkg.price}
                </div>
                <div style={{ fontSize: "0.78rem", color: "#818cf8", marginTop: 4, fontWeight: 600 }}>
                  ⚡ {pkg.timeline}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                  {pkg.depositTerm}
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: 20 }}>
                {pkg.description}
              </p>

              {/* Features List */}
              <div style={{ flex: 1, marginBottom: 24 }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>
                  What You Get:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.78rem", color: "var(--text)" }}>
                      <span style={{ color: "#4ade80", flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <a
                href={`https://wa.me/2349069321502?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className={isRec ? "btn-primary glow" : "btn-ghost"}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 12,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  justifyContent: "center",
                  textDecoration: "none",
                  display: "flex",
                }}
              >
                {pkg.ctaText} →
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
