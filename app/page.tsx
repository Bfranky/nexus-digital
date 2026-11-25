"use client";
import Link from "next/link";
import { useState } from "react";
import FestiveBanner from "@/components/festive/FestiveBanner";
import PortfolioFilterSection from "@/components/portfolio/PortfolioFilterSection";
import PricingPackagesSection from "@/components/pricing/PricingPackagesSection";
import WebsiteCostCalculator from "@/components/calculator/WebsiteCostCalculator";
import RealTestimonialsSection from "@/components/testimonials/RealTestimonialsSection";
import AgentProgramSection from "@/components/agent/AgentProgramSection";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      {/* Festive Season Alert Bar */}
      <FestiveBanner />

      {/* Main Navigation */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          borderBottom: "1px solid var(--border)",
          background: "rgba(9,9,15,0.85)",
          backdropFilter: "blur(14px)",
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "0 20px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1.25rem",
              letterSpacing: "-0.02em",
              color: "#fff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            nexora<span style={{ color: "#818cf8" }}>.</span>digital
          </Link>

          {/* Desktop Links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
            }}
            className="hidden md:flex"
          >
            <a
              href="#portfolio"
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              Works Done
            </a>
            <a
              href="#pricing"
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              Packages &amp; Prices
            </a>
            <a
              href="#calculator"
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              Cost Estimator
            </a>
            <a
              href="#testimonials"
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              Testimonials
            </a>
            <a
              href="#agent"
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#4ade80",
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
            >
              Earn (10%–25%)
            </a>
            <Link
              href="/dashboard"
              style={{
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                textDecoration: "none",
                padding: "6px 12px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.05)",
              }}
            >
              Agency App ↗
            </Link>
            <a
              href="https://wa.me/2349069321502?text=Hello%20Blessed!%20I%20want%20to%20discuss%20a%20website%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                padding: "8px 16px",
                borderRadius: 10,
                fontSize: "0.82rem",
                textDecoration: "none",
              }}
            >
              💬 WhatsApp Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
            aria-label="Toggle navigation"
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "#fff",
              padding: "6px 10px",
              cursor: "pointer",
            }}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div
            style={{
              background: "var(--bg-card)",
              borderBottom: "1px solid var(--border)",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: "#fff", textDecoration: "none", fontSize: "0.9rem" }}
            >
              Works Done So Far
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: "#fff", textDecoration: "none", fontSize: "0.9rem" }}
            >
              Packages &amp; Prices
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: "#fff", textDecoration: "none", fontSize: "0.9rem" }}
            >
              Cost Estimator
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: "#fff", textDecoration: "none", fontSize: "0.9rem" }}
            >
              Client Testimonials
            </a>
            <a
              href="#agent"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: "#4ade80", textDecoration: "none", fontSize: "0.9rem" }}
            >
              Partner Program (Earn 10%–25%)
            </a>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-ghost"
                style={{ flex: 1, textDecoration: "none", justifyContent: "center" }}
              >
                Dashboard
              </Link>
              <a
                href="https://wa.me/2349069321502"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ flex: 1, textDecoration: "none", justifyContent: "center" }}
              >
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section style={{ padding: "100px 20px 70px", position: "relative", overflow: "hidden" }}>
        {/* Glow & Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.06) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -60,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(800px,100vw)",
            height: 480,
            background: "radial-gradient(ellipse,rgba(99,102,241,0.22) 0%,transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 99,
              marginBottom: 24,
              background: "rgba(99,102,241,0.12)",
              border: "1px solid rgba(99,102,241,0.3)",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#818cf8",
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
            Web Development by Blessed Ogobor · Lagos, Nigeria
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 7vw, 4.2rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              color: "#fff",
              marginBottom: 20,
            }}
          >
            High-Performance Websites That Turn Visitors Into{" "}
            <span style={{ color: "#818cf8" }}>Paying Clients.</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
              color: "var(--text-muted)",
              maxWidth: 680,
              margin: "0 auto 36px",
              lineHeight: 1.65,
            }}
          >
            From <strong style={{ color: "#fff" }}>₦80,000 Festive Landing Pages</strong> for restaurants, lounges, and salons to <strong style={{ color: "#fff" }}>full-blown ₦800,000 custom web platforms</strong> with user dashboards and payments. Fast 5-day delivery, ₦0 monthly hosting fees on Vercel, and direct WhatsApp booking.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <a
              href="#portfolio"
              className="btn-primary glow"
              style={{
                textDecoration: "none",
                fontSize: "1rem",
                padding: "13px 30px",
                borderRadius: 14,
                fontWeight: 700,
              }}
            >
              Explore Works Done So Far ↓
            </a>
            <a
              href="#calculator"
              className="btn-ghost"
              style={{
                textDecoration: "none",
                fontSize: "1rem",
                padding: "13px 26px",
                borderRadius: 14,
              }}
            >
              Calculate Your Cost →
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 12,
              padding: "18px 24px",
              background: "rgba(15,15,28,0.75)",
              border: "1px solid var(--border)",
              borderRadius: 18,
              backdropFilter: "blur(8px)",
            }}
          >
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "#4ade80", fontSize: "1.4rem" }}>
                ₦80,000
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                Starting Investment
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "#818cf8", fontSize: "1.4rem" }}>
                4 – 5 Days
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                Festive Turnaround
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "#fbbf24", fontSize: "1.4rem" }}>
                ₦0 / month
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                Hosting on Vercel
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "#e879f9", fontSize: "1.4rem" }}>
                100% Mobile
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                Responsive &amp; WhatsApp Ready
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars Section */}
      <section style={{ padding: "40px 20px 60px", maxWidth: 1180, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
          }}
        >
          {[
            {
              icon: "⚡",
              title: "Festive Season Urgency",
              desc: "December is the busiest month in Lagos and Nigeria. A live site with packages and a WhatsApp button answers questions automatically and books clients while competitors lose calls.",
            },
            {
              icon: "📱",
              title: "Mobile First & WhatsApp Routing",
              desc: "90% of Nigerian customers browse on smartphones. Inquiries, food orders, and reservations go directly into your WhatsApp with pre-filled details.",
            },
            {
              icon: "💰",
              title: "No WordPress Sluggishness",
              desc: "We handcraft custom sites using Next.js 16 and Vercel edge networks. No slow plugins, zero recurring hosting fees, and load times under 1.5 seconds.",
            },
            {
              icon: "🛡️",
              title: "Transparent 50/50 Payment",
              desc: "Pay 50% deposit to commence development and 50% only when the website is live, fully functional, and approved by you.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass"
              style={{
                borderRadius: 16,
                padding: 22,
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>{item.icon}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "#fff", marginBottom: 6 }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio: Works Done So Far */}
      <PortfolioFilterSection />

      {/* Pricing & Packages */}
      <PricingPackagesSection />

      {/* Interactive Website Cost Calculator */}
      <WebsiteCostCalculator />

      {/* Verified Real Testimonials */}
      <RealTestimonialsSection />

      {/* Remote Sales Agent / Partner Program */}
      <AgentProgramSection />

      {/* FAQ Section */}
      <section style={{ padding: "80px 20px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: "#fff", marginBottom: 10 }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Straightforward answers for business owners.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            {
              q: "How fast will my website be live?",
              a: "For our Festive Starter (₦80,000) and Festive Booking packages, turnaround is 4 to 7 working days once your deposit and content are confirmed. For large custom platforms (₦800,000), typical delivery is 20 to 25 working days.",
            },
            {
              q: "Do I have to pay monthly hosting fees?",
              a: "No! We deploy your website onto Vercel's global edge network, which provides ultra-fast enterprise-grade hosting with SSL encryption at zero monthly cost for small and medium business workloads.",
            },
            {
              q: "How does the WhatsApp button work?",
              a: "When a customer clicks the button on your website, it immediately opens WhatsApp on their phone with a pre-filled message (e.g. 'Hello, I want to book a table for 4 guests on Dec 24th'). You receive the lead instantly with zero friction.",
            },
            {
              q: "What is your payment structure?",
              a: "We work with a fair, transparent milestone schedule: 50% deposit to commence the project, and the remaining 50% only when the website is live, fully tested on mobile and desktop, and approved by you.",
            },
            {
              q: "Can I update prices and photos after the site is launched?",
              a: "Yes! All packages include 30 days of free changes. For businesses that update daily or weekly, our Professional and Custom Platform packages include a simple custom admin panel where you can edit content yourself without touching code.",
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="glass"
              style={{
                borderRadius: 14,
                padding: "20px 24px",
                border: "1px solid var(--border)",
              }}
            >
              <h4 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#fff", marginBottom: 8 }}>
                {faq.q}
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section
        style={{
          padding: "80px 20px",
          textAlign: "center",
          background: "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.2) 0%, transparent 70%)",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🎄 🚀</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.2rem", color: "#fff", marginBottom: 14 }}>
            Ready to Get Your Business Online?
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: 28, fontSize: "0.95rem", lineHeight: 1.6 }}>
            Don&apos;t let December bookings slip into your competitors&apos; hands. Send a WhatsApp message to Blessed Ogobor today for a free preview mockup with your business name.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://wa.me/2349069321502?text=Hello%20Blessed!%20I%20am%20ready%20to%20get%20my%20business%20website%20live.%20Can%20we%20talk?"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary glow"
              style={{
                textDecoration: "none",
                fontSize: "1rem",
                padding: "14px 34px",
                borderRadius: 14,
                fontWeight: 700,
              }}
            >
              Chat with Blessed on WhatsApp (09069321502) →
            </a>
          </div>
          <div style={{ marginTop: 14, fontSize: "0.78rem", color: "var(--text-muted)" }}>
            Email: <a href="mailto:blessedogobor@gmail.com" style={{ color: "#818cf8" }}>blessedogobor@gmail.com</a> · Lagos &amp; Ogun, Nigeria
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "36px 20px",
          textAlign: "center",
          fontSize: "0.82rem",
          color: "var(--text-muted)",
          background: "rgba(9,9,15,0.9)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "#fff", fontSize: "1rem" }}>
            nexora<span style={{ color: "#818cf8" }}>.</span>digital
          </div>
          <div style={{ display: "flex", gap: 20, fontSize: "0.8rem" }}>
            <a href="#portfolio" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Works</a>
            <a href="#pricing" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Pricing</a>
            <a href="#calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Calculator</a>
            <a href="#agent" style={{ color: "#4ade80", textDecoration: "none" }}>Sales Agents</a>
            <Link href="/dashboard" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Dashboard</Link>
          </div>
          <div>
            © {new Date().getFullYear()} Nexora Digital · Built by Blessed Ogobor
          </div>
        </div>
      </footer>
    </div>
  );
}
