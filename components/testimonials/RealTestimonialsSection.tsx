"use client";
import { REAL_TESTIMONIALS } from "@/lib/portfolio-data";

export default function RealTestimonialsSection() {
  return (
    <section id="testimonials" style={{ padding: "80px 20px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 44 }}>
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
          <span>⭐ Verified Client Feedback</span>
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
          Real Businesses. Real Impact.
        </h2>
        <p style={{ color: "var(--text-muted)", maxWidth: 580, margin: "0 auto", fontSize: "0.95rem", lineHeight: 1.6 }}>
          We don&apos;t just build pretty pages. We engineer websites that solve repeated questions, reduce lost leads, and drive actual bank transfers.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {REAL_TESTIMONIALS.map(t => (
          <div
            key={t.id}
            className="glass"
            style={{
              borderRadius: 20,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid var(--border)",
            }}
          >
            <div>
              {/* Stars & Verified */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ color: "#fbbf24", fontSize: "0.95rem" }}>
                  {"★".repeat(t.stars)}
                </div>
                {t.verified && (
                  <span
                    className="badge"
                    style={{
                      background: "rgba(34,197,94,0.12)",
                      color: "#4ade80",
                      borderColor: "rgba(34,197,94,0.25)",
                      fontSize: "0.68rem",
                    }}
                  >
                    ✓ Verified Client
                  </span>
                )}
              </div>

              {/* Review Text */}
              <p style={{ fontSize: "0.85rem", color: "#e2e8f0", lineHeight: 1.65, marginBottom: 20, fontStyle: "italic" }}>
                &ldquo;{t.review}&rdquo;
              </p>
            </div>

            <div>
              {/* Result Callout */}
              <div
                style={{
                  background: "rgba(99,102,241,0.08)",
                  borderRadius: 10,
                  padding: "8px 12px",
                  fontSize: "0.75rem",
                  color: "#818cf8",
                  fontWeight: 600,
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>🚀 Outcome:</span>
                <span style={{ color: "#fff" }}>{t.result}</span>
              </div>

              {/* Author Info */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  {t.avatarText}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#fff" }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                    {t.role}, {t.business} · {t.location}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
