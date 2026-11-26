"use client";
import Link from "next/link";
import { useState } from "react";
import { WORKS, SIMPLE_PACKAGES } from "@/lib/portfolio-data";
import { BRAND } from "@/lib/brand-config";

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [copiedOpay, setCopiedOpay] = useState(false);
  const [copiedMiniPay, setCopiedMiniPay] = useState(false);

  const copyOpay = () => {
    navigator.clipboard.writeText(BRAND.payment.opayBusiness.accountNumber);
    setCopiedOpay(true);
    setTimeout(() => setCopiedOpay(false), 2000);
  };

  const copyMiniPay = () => {
    navigator.clipboard.writeText(BRAND.payment.miniPay.number);
    setCopiedMiniPay(true);
    setTimeout(() => setCopiedMiniPay(false), 2000);
  };

  return (
    <div style={{ background: "#0c0d12", color: "#f1f5f9", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)", overflowX: "hidden" }}>
      
      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(12, 13, 18, 0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
            <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
              nexora<span style={{ color: "#6366f1" }}>.</span>digital
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: 24 }}>
            <a href="#works" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }}>Works</a>
            <a href="#pricing" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }}>Packages</a>
            <a href="#payment" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }}>Payment</a>
            <Link href="/dashboard" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.85rem", padding: "6px 12px", borderRadius: 8, background: "rgba(255,255,255,0.05)" }}>
              Dashboard ↗
            </Link>
            <a
              href="https://wa.me/2349069321502?text=Hello%20Blessed!%20I%20am%20interested%20in%20building%20a%20website%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: "#4f46e5", color: "#fff", padding: "8px 16px", borderRadius: 10, textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden"
            aria-label="Toggle menu"
            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: "1rem", cursor: "pointer" }}
          >
            {mobileMenu ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenu && (
          <div style={{ background: "#13141c", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "16px", display: "flex", flexDirection: "column", gap: 14 }}>
            <a href="#works" onClick={() => setMobileMenu(false)} style={{ color: "#fff", textDecoration: "none", fontSize: "0.95rem" }}>Works</a>
            <a href="#pricing" onClick={() => setMobileMenu(false)} style={{ color: "#fff", textDecoration: "none", fontSize: "0.95rem" }}>Packages</a>
            <a href="#payment" onClick={() => setMobileMenu(false)} style={{ color: "#fff", textDecoration: "none", fontSize: "0.95rem" }}>Payment (MiniPay &amp; OPay)</a>
            <Link href="/dashboard" onClick={() => setMobileMenu(false)} style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>Dashboard</Link>
            <a
              href="https://wa.me/2349069321502"
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: "#4f46e5", color: "#fff", padding: "10px", borderRadius: 8, textDecoration: "none", textAlign: "center", fontWeight: 600, fontSize: "0.9rem" }}
            >
              Chat on WhatsApp (09069321502)
            </a>
          </div>
        )}
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section style={{ padding: "60px 16px 40px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 99, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", color: "#818cf8", fontSize: "0.78rem", fontWeight: 600, marginBottom: 18 }}>
          <span>⚡ Web Developer · Lagos, Nigeria</span>
        </div>

        <h1 style={{ fontSize: "clamp(1.9rem, 6vw, 3.2rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: 16 }}>
          Websites &amp; Platforms Built for Your Business.
        </h1>

        <p style={{ fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)", color: "#94a3b8", maxWidth: 580, margin: "0 auto 28px", lineHeight: 1.6 }}>
          From fast 1-page booking sites to custom platforms. Built by Blessed Ogobor.
          Tailored to your needs in whatever technology suits your business best.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#works"
            style={{ background: "#4f46e5", color: "#fff", padding: "12px 24px", borderRadius: 12, textDecoration: "none", fontWeight: 700, fontSize: "0.92rem", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            See My Works ↓
          </a>
          <a
            href="https://wa.me/2349069321502?text=Hello%20Blessed!%20I%20want%20to%20build%20a%20website%20for%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: "rgba(255,255,255,0.06)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", padding: "12px 24px", borderRadius: 12, textDecoration: "none", fontWeight: 600, fontSize: "0.92rem" }}
          >
            Chat on WhatsApp →
          </a>
        </div>
      </section>

      {/* ── Works Section ──────────────────────────────────────────────── */}
      <section id="works" style={{ padding: "50px 16px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 4.5vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 8 }}>
            Works Done So Far
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem", maxWidth: 500, margin: "0 auto" }}>
            Real live projects built for clients. Click to open live or inspect the code.
          </p>
        </div>

        {/* Works Flex Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 310px), 1fr))", gap: 16 }}>
          {WORKS.map(work => {
            const waMsg = encodeURIComponent(
              `Hello Blessed! I saw your "${work.title}" project on Nexora Digital and I would like a similar website for my business.`
            );

            return (
              <div
                key={work.id}
                style={{
                  background: "#12141d",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "border-color 0.2s",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#818cf8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                    {work.type}
                  </div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                    {work.title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.5, marginBottom: 18 }}>
                    {work.desc}
                  </p>
                </div>

                <div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                    <a
                      href={work.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        background: "#4f46e5",
                        color: "#fff",
                        padding: "8px 12px",
                        borderRadius: 8,
                        textDecoration: "none",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      Open Live Site ↗
                    </a>
                    {work.githubUrl && (
                      <a
                        href={work.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          color: "#94a3b8",
                          border: "1px solid rgba(255,255,255,0.12)",
                          padding: "8px 12px",
                          borderRadius: 8,
                          textDecoration: "none",
                          fontSize: "0.8rem",
                          fontWeight: 500,
                          textAlign: "center",
                        }}
                      >
                        Code
                      </a>
                    )}
                  </div>
                  <a
                    href={`https://wa.me/2349069321502?text=${waMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "center",
                      fontSize: "0.78rem",
                      color: "#818cf8",
                      textDecoration: "none",
                      padding: "4px 0",
                    }}
                  >
                    I Want a Site Like This →
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on technologies */}
        <div style={{ marginTop: 28, textAlign: "center", padding: "16px", background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.18)", borderRadius: 12 }}>
          <p style={{ color: "#cbd5e1", fontSize: "0.85rem", margin: 0, lineHeight: 1.5 }}>
            💡 <strong>Custom-Built for You:</strong> I craft websites and full web platforms in whatever language or framework fits your project. You get clean, fast, mobile-ready results.
          </p>
        </div>
      </section>

      {/* ── Pricing Packages ────────────────────────────────────────────── */}
      <section id="pricing" style={{ padding: "50px 16px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 4.5vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 8 }}>
            Simple Pricing
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
            50% deposit to commence build · 50% only when the site is live and approved.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 16 }}>
          {SIMPLE_PACKAGES.map((pkg, idx) => (
            <div
              key={idx}
              style={{
                background: idx === 1 ? "#171826" : "#12141d",
                border: idx === 1 ? "1.5px solid #4f46e5" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                  {pkg.name}
                </h3>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#6366f1", margin: "10px 0 4px" }}>
                  {pkg.price}
                </div>
                <div style={{ fontSize: "0.78rem", color: "#94a3b8", marginBottom: 14 }}>
                  ⚡ Delivery: <strong>{pkg.time}</strong>
                </div>
                <p style={{ fontSize: "0.85rem", color: "#cbd5e1", lineHeight: 1.55, marginBottom: 20 }}>
                  {pkg.desc}
                </p>
              </div>

              <a
                href={`https://wa.me/2349069321502?text=Hello%20Blessed!%20I%20want%20to%20order%20the%20${encodeURIComponent(pkg.name)}%20(${encodeURIComponent(pkg.price)})`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: idx === 1 ? "#4f46e5" : "rgba(255,255,255,0.08)",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: 10,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  textAlign: "center",
                }}
              >
                Book Package via WhatsApp →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── Payment Options (MiniPay & OPay) ─────────────────────────────── */}
      <section id="payment" style={{ padding: "50px 16px 70px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 4.5vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 8 }}>
            How to Pay
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
            Fast, zero-decline payments in Nigerian Naira. Scan with MiniPay or transfer to OPay.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 20 }}>
          
          {/* MiniPay Card */}
          <div style={{ background: "#12141d", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase", marginBottom: 12 }}>
              Option 1: MiniPay Scan-to-Pay
            </div>
            
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/minipay-qr.png"
              alt="MiniPay QR Code"
              style={{ width: 170, height: 170, borderRadius: 14, objectFit: "contain", background: "#fff", marginBottom: 14, border: "2px solid #38bdf8" }}
            />

            <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: 4 }}>
              MiniPay Phone Number:
            </div>
            <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: 12 }}>
              {BRAND.payment.miniPay.number}
            </div>

            <button
              onClick={copyMiniPay}
              style={{
                background: "rgba(56,189,248,0.15)",
                border: "1px solid rgba(56,189,248,0.4)",
                color: "#38bdf8",
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                width: "100%",
                maxWidth: 220,
              }}
            >
              {copiedMiniPay ? "✓ Copied!" : "📋 Copy MiniPay Number"}
            </button>
            <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: 10 }}>
              Scan with Opera Mini or any smartphone camera to pay in Naira.
            </div>
          </div>

          {/* OPay Bank Transfer Card */}
          <div style={{ background: "#12141d", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#4ade80", textTransform: "uppercase", marginBottom: 12 }}>
                Option 2: Direct Bank Transfer
              </div>

              <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 12, padding: "16px", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 16 }}>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase" }}>Bank</div>
                <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: 10 }}>
                  OPay (Paycom)
                </div>

                <div style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase" }}>Account Number</div>
                <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#4ade80", letterSpacing: "0.05em", margin: "2px 0 10px" }}>
                  {BRAND.payment.opayBusiness.accountNumber}
                </div>

                <div style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase" }}>Account Name</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#fff" }}>
                  {BRAND.payment.opayBusiness.accountName}
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={copyOpay}
                style={{
                  background: "rgba(34,197,94,0.18)",
                  border: "1px solid rgba(34,197,94,0.4)",
                  color: "#4ade80",
                  padding: "10px",
                  borderRadius: 8,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  width: "100%",
                  marginBottom: 10,
                }}
              >
                {copiedOpay ? "✓ Copied Account!" : "📋 Copy OPay Account Number"}
              </button>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8", textAlign: "center" }}>
                Send payment screenshot on WhatsApp to <strong>09069321502</strong> for immediate start.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "28px 16px", textAlign: "center", fontSize: "0.82rem", color: "#64748b" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontWeight: 700, color: "#fff" }}>
            nexora<span style={{ color: "#6366f1" }}>.</span>digital
          </div>
          <div>
            Built by Blessed Ogobor · WhatsApp: 09069321502
          </div>
          <div>
            © {new Date().getFullYear()} Nexora Digital
          </div>
        </div>
      </footer>
    </div>
  );
}
