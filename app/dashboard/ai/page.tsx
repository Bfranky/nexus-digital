"use client";
import { useState } from "react";
import { useStore } from "@/store";

export default function AIAssistantPage() {
  const { businesses } = useStore();
  const [selectedBusiness, setSelectedBusiness] = useState(businesses[0]?.name || "");
  const [category, setCategory] = useState(businesses[0]?.category || "Restaurant & Lounge");
  const [location, setLocation] = useState(businesses[0]?.address || "Lagos, Nigeria");
  const [pitchType, setPitchType] = useState<"festive" | "standard" | "agent_welcome" | "quote">("festive");
  const [copied, setCopied] = useState(false);

  const generateMessage = () => {
    const biz = selectedBusiness || "[Business Name]";
    const loc = location || "Lagos";
    const cat = category || "Business";

    if (pitchType === "festive") {
      return `Good day. My name is Blessed, and I'm a web developer with Nexora Digital based in Lagos.

I came across ${biz} in ${loc} and noticed you don't have a dedicated website yet. December is the busiest time of the year, and customers will look online before they choose.

A fast website with your festive packages, opening hours, and an instant WhatsApp button means fewer repeated calls, faster table/service bookings, and more paying clients before Christmas & New Year.

We can have a festive version live in about 5 days (from ₦80,000).

Would you like a free preview with ${biz}'s name on it?
Thank you.
— Blessed Ogobor | Nexora Digital (09069321502)`;
    }

    if (pitchType === "quote") {
      return `Good day, thank you for your interest in Nexora Digital web solutions for ${biz}.

Here are our transparent pricing packages:

1. 🌟 Festive Starter (₦80,000):
   • High-speed one-page website on Vercel
   • Services / Menu showcase + photos
   • Location map & opening hours
   • WhatsApp floating button with pre-filled message
   • 5-day delivery guarantee

2. 🚀 Festive Booking / Business (₦120,000 – ₦150,000):
   • Multi-page website with gallery & pricing packages
   • Direct WhatsApp & email booking / inquiry form
   • Custom printable QR Code for flyers, menus, and tables
   • Basic Google SEO & social share previews
   • 2 complimentary social media promo flyers

3. 💼 Professional Platform (₦300,000 – ₦500,000):
   • Database-driven website + simple admin panel
   • MiniPay QR scan & direct OPay bank transfer integration
   • Manage bookings, services, and client inquiries

4. 🏢 Full Enterprise Platform (₦700,000 – ₦900,000):
   • Custom portal with user accounts, roles, dashboards, and automated workflows.

Payment terms: 50% deposit to start, 50% upon live launch and testing.
Official Bank Account: OPay (Paycom) - 6110509465 (Blessed Ogobor / Nexora Digital)

Which tier best fits ${biz}'s goals this season?`;
    }

    if (pitchType === "agent_welcome") {
      return `Welcome to the Nexora Digital Sales Team! 🚀

Nexora Digital builds high-performance websites for businesses across Nigeria (starting from ₦80,000 up to ₦800,000).

Here is how your commission works:
• 10% for every warm referral you introduce (when we close the sale)
• 20% when you close the sale yourself
• 25% on every sale after your 3rd paid client in a single month

Earning potential: ₦8,000 to over ₦80,000 per client paid within 48 hours of client payment.
Official Settlement: OPay Business 6110509465.
No capital, no registration fees, work remote on your own hours.

Your target: Reach out to 10 businesses daily using our proven scripts. Let's make this season profitable!`;
    }

    return `Hello ${biz} Team,

I noticed you have strong customer reviews in ${loc}, but new customers searching online might miss your full catalog and direct WhatsApp booking.

At Nexora Digital, we create sleek, mobile-friendly websites that showcase your ${cat} offerings, display transparent prices, and allow customers to place orders or make bookings straight into your WhatsApp.

Let me know if you would love a complimentary mockup link to preview how your website would look.

Best regards,
Blessed Ogobor — Nexora Digital
WhatsApp: 09069321502`;
  };

  const message = generateMessage();

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.6rem", color: "#fff" }}>
          AI Pitch & Message Generator
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: 4 }}>
          Generate customized festive proposals, cold outreach, and pricing breakdowns for Nigerian businesses.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
        {/* Controls */}
        <div className="glass" style={{ borderRadius: 16, padding: 22 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "#fff", marginBottom: 16 }}>
            Pitch Parameters
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: 6, fontWeight: 600 }}>
                SELECT OR ENTER BUSINESS
              </label>
              <input
                className="field"
                value={selectedBusiness}
                onChange={e => setSelectedBusiness(e.target.value)}
                placeholder="e.g. Lagos Royal Lounge"
              />
              {businesses.length > 0 && (
                <div style={{ marginTop: 6, display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {businesses.slice(0, 4).map(b => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        setSelectedBusiness(b.name);
                        setCategory(b.category || "Business");
                        setLocation(b.address || "Lagos");
                      }}
                      style={{
                        background: "rgba(99,102,241,0.1)",
                        border: "1px solid rgba(99,102,241,0.25)",
                        borderRadius: 6,
                        color: "#818cf8",
                        fontSize: "0.7rem",
                        padding: "3px 8px",
                        cursor: "pointer",
                      }}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: 6, fontWeight: 600 }}>
                CATEGORY / INDUSTRY
              </label>
              <input
                className="field"
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder="e.g. Event Centre, Salon, Clinic, Restaurant"
              />
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: 6, fontWeight: 600 }}>
                LOCATION
              </label>
              <input
                className="field"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Surulere, Ikeja, Lagos"
              />
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: 6, fontWeight: 600 }}>
                CAMPAIGN TEMPLATE
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { id: "festive", label: "🎄 Festive Rush" },
                  { id: "quote", label: "💰 Pricing Packages" },
                  { id: "standard", label: "💬 Standard Cold Pitch" },
                  { id: "agent_welcome", label: "🤝 Agent Welcome" },
                ].map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPitchType(p.id as any)}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 10,
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      border: "1px solid",
                      textAlign: "center",
                      borderColor: pitchType === p.id ? "#818cf8" : "var(--border)",
                      background: pitchType === p.id ? "rgba(99,102,241,0.18)" : "var(--bg-raised)",
                      color: pitchType === p.id ? "#fff" : "var(--text-muted)",
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="glass" style={{ borderRadius: 16, padding: 22, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "#fff" }}>
              Generated WhatsApp Message
            </h2>
            <button
              onClick={handleCopy}
              className="btn-primary"
              style={{ fontSize: "0.78rem", padding: "6px 14px", borderRadius: 8 }}
            >
              {copied ? "✓ Copied!" : "📋 Copy Message"}
            </button>
          </div>

          <textarea
            readOnly
            value={message}
            className="field"
            style={{
              flex: 1,
              minHeight: 280,
              resize: "none",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.8rem",
              lineHeight: 1.6,
              background: "rgba(0,0,0,0.25)",
            }}
          />

          <div style={{ marginTop: 14, display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ textDecoration: "none", fontSize: "0.8rem" }}
            >
              Open in WhatsApp Web ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
