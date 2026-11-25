"use client";
import { useState } from "react";
import { formatMoney } from "@/lib/utils";
import { BRAND } from "@/lib/brand-config";

interface TierOption {
  id: string;
  name: string;
  basePrice: number;
  days: number;
  desc: string;
}

const BASE_TIERS: TierOption[] = [
  {
    id: "starter",
    name: "Festive Starter (1-Page)",
    basePrice: 80000,
    days: 5,
    desc: "Single-page conversion website with services, location, photos & WhatsApp ordering",
  },
  {
    id: "booking",
    name: "Festive Booking (Multi-Page)",
    basePrice: 135000,
    days: 7,
    desc: "Multi-page site with packages, photo gallery, inquiry form & table QR code",
  },
  {
    id: "professional",
    name: "Professional Platform (Database)",
    basePrice: 350000,
    days: 14,
    desc: "Dynamic site with database, admin CMS, customer management & appointment booking",
  },
  {
    id: "enterprise",
    name: "Full Custom Platform (Enterprise)",
    basePrice: 800000,
    days: 25,
    desc: "Bespoke platform with user accounts, role dashboards & multi-tier workflows (e.g. UGET Academy)",
  },
];

interface Addon {
  id: string;
  name: string;
  price: number;
  days: number;
  includedInTiers?: string[];
  desc: string;
}

const ADDONS: Addon[] = [
  {
    id: "whatsapp",
    name: "WhatsApp Click-to-Chat & Pre-filled Message",
    price: 0,
    days: 0,
    desc: "Direct conversion flow routing leads into your phone",
  },
  {
    id: "hosting",
    name: "Vercel Ultra-Fast Global CDN Hosting",
    price: 0,
    days: 0,
    desc: "₦0 monthly hosting fees on modern edge servers",
  },
  {
    id: "minipay_opay",
    name: "MiniPay QR Scan & OPay Direct Checkout",
    price: 0,
    days: 0,
    desc: "Instant QR scan payments via MiniPay (+234 812 141 4107) + OPay transfer in Naira",
  },
  {
    id: "qr",
    name: "Custom Printable QR Code for Flyers & Tables",
    price: 15000,
    days: 0,
    desc: "High-res vector QR code linked directly to your site or menu",
  },
  {
    id: "flyers",
    name: "2 Custom Festive Social Media Promo Flyers",
    price: 20000,
    days: 1,
    desc: "Tailored branded graphics for Instagram & WhatsApp status",
  },
  {
    id: "admin",
    name: "Custom Admin Panel / Content CMS",
    price: 75000,
    days: 4,
    desc: "Edit prices, upload new photos, and view bookings yourself",
  },
  {
    id: "seo",
    name: "Google Business & Google Maps Local SEO",
    price: 25000,
    days: 1,
    desc: "Verify and optimize your Google profile for local searchers",
  },
  {
    id: "express",
    name: "Express Rush Delivery (Priority Sprint)",
    price: 30000,
    days: -2,
    desc: "Accelerated production to get live in record time",
  },
];

export default function WebsiteCostCalculator() {
  const [selectedTierId, setSelectedTierId] = useState<string>("booking");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["whatsapp", "hosting", "qr"]);
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("Lounge / Restaurant");

  const selectedTier = BASE_TIERS.find(t => t.id === selectedTierId) || BASE_TIERS[1];

  const toggleAddon = (id: string) => {
    if (id === "whatsapp" || id === "hosting") return; // always included
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = ADDONS.find(a => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const totalPrice = selectedTier.basePrice + addonsTotal;
  const totalDays = Math.max(
    3,
    selectedTier.days +
      selectedAddons.reduce((sum, id) => {
        const addon = ADDONS.find(a => a.id === id);
        return sum + (addon ? addon.days : 0);
      }, 0)
  );

  const depositToStart = Math.round(totalPrice * 0.5);
  const balanceOnDelivery = totalPrice - depositToStart;

  const waPitch = encodeURIComponent(
    `Hello Blessed! I used the ${BRAND.name} Cost Calculator for my business:
• Business: ${businessName || "My Business"} (${businessType})
• Package: ${selectedTier.name}
• Estimated Total: ${formatMoney(totalPrice)} (Deposit: ${formatMoney(depositToStart)})
• Turnaround Target: ~${totalDays} Days
• Selected Options: ${selectedAddons.map(id => ADDONS.find(a => a.id === id)?.name).filter(Boolean).join(", ")}
• Payment Method: OPay Account (${BRAND.payment.opayBusiness.accountNumber}) / MiniPay / Monnify

I would like to confirm availability and get started!`
  );

  return (
    <section id="calculator" style={{ padding: "80px 20px", maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 14px",
            borderRadius: 99,
            marginBottom: 16,
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.25)",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#818cf8",
          }}
        >
          <span>⚡ 100% Transparent Pricing</span>
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
          Calculate Your Website Cost
        </h2>
        <p style={{ color: "var(--text-muted)", maxWidth: 620, margin: "0 auto", fontSize: "0.95rem", lineHeight: 1.6 }}>
          No hidden charges or unexpected surprises. Select the package and features your business needs and receive an instant accurate estimate with milestone payment terms.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
        {/* Left: Configuration Controls */}
        <div className="glass" style={{ borderRadius: 20, padding: 28 }}>
          {/* Quick Business Details */}
          <div style={{ marginBottom: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: 6, fontWeight: 700, textTransform: "uppercase" }}>
                Your Business Name
              </label>
              <input
                className="field"
                placeholder="e.g. Oasis Lounge"
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: 6, fontWeight: 700, textTransform: "uppercase" }}>
                Industry / Category
              </label>
              <select
                className="field"
                value={businessType}
                onChange={e => setBusinessType(e.target.value)}
              >
                <option value="Event Centre & Lounge">Event Centre & Lounge</option>
                <option value="Restaurant & Food">Restaurant & Food</option>
                <option value="Hotel & Hospitality">Hotel & Hospitality</option>
                <option value="Beauty, Salon & Spa">Beauty, Salon & Spa</option>
                <option value="Medical & Clinic">Medical & Clinic</option>
                <option value="School & Academy">School & Academy</option>
                <option value="Retail & Boutique">Retail & Boutique</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Other Business">Other Business</option>
              </select>
            </div>
          </div>

          {/* Select Base Tier */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: 10, fontWeight: 700, textTransform: "uppercase" }}>
              1. Choose Your Website Tier
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {BASE_TIERS.map(tier => (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTierId(tier.id)}
                  style={{
                    padding: "14px 16px",
                    borderRadius: 14,
                    border: "1px solid",
                    borderColor: selectedTierId === tier.id ? "#818cf8" : "var(--border)",
                    background: selectedTierId === tier.id ? "rgba(99,102,241,0.14)" : "var(--bg-raised)",
                    cursor: "pointer",
                    transition: "all 0.18s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#fff" }}>
                      {tier.name}
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "#4ade80", fontSize: "1rem" }}>
                      {formatMoney(tier.basePrice)}
                    </div>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    {tier.desc} · <span style={{ color: "#e0e7ff" }}>~{tier.days} days</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Select Add-ons */}
          <div>
            <label style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: 10, fontWeight: 700, textTransform: "uppercase" }}>
              2. Add-ons & Superchargers
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>
              {ADDONS.map(addon => {
                const isSelected = selectedAddons.includes(addon.id);
                const isFree = addon.price === 0;

                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: 12,
                      border: "1px solid",
                      borderColor: isSelected ? "rgba(99,102,241,0.5)" : "var(--border)",
                      background: isSelected ? "rgba(99,102,241,0.08)" : "transparent",
                      cursor: isFree ? "default" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleAddon(addon.id)}
                        disabled={isFree}
                        style={{ accentColor: "#6366f1", width: 16, height: 16, cursor: "pointer" }}
                      />
                      <div>
                        <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#fff" }}>
                          {addon.name}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                          {addon.desc}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: isFree ? "#4ade80" : "#818cf8", whiteSpace: "nowrap" }}>
                      {isFree ? "FREE" : `+${formatMoney(addon.price)}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Live Summary & WhatsApp Instant Action */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            className="glass glow"
            style={{
              borderRadius: 20,
              padding: 28,
              background: "linear-gradient(180deg, #121326 0%, #0d0e1c 100%)",
              border: "1px solid rgba(99,102,241,0.35)",
            }}
          >
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#818cf8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
              Project Investment Summary
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.4rem", color: "#4ade80", lineHeight: 1.1, marginBottom: 8 }}>
              {formatMoney(totalPrice)}
            </div>
            <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: 20 }}>
              Estimated Delivery: <strong style={{ color: "#fff" }}>{totalDays} Working Days</strong>
            </div>

            {/* Payment Milestone Box */}
            <div
              style={{
                background: "rgba(0,0,0,0.3)",
                borderRadius: 14,
                padding: "16px",
                border: "1px solid var(--border)",
                marginBottom: 24,
              }}
            >
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#fff", marginBottom: 10 }}>
                Transparent 50/50 Payment Schedule:
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: 6 }}>
                <span style={{ color: "var(--text-muted)" }}>1. Initial Deposit (To start build):</span>
                <span style={{ fontWeight: 700, color: "#fff" }}>{formatMoney(depositToStart)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                <span style={{ color: "var(--text-muted)" }}>2. Final Balance (After live review):</span>
                <span style={{ fontWeight: 700, color: "#4ade80" }}>{formatMoney(balanceOnDelivery)}</span>
              </div>
            </div>

            {/* Included in this quote */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 8 }}>
                Includes:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: "0.8rem", color: "var(--text)" }}>
                <div>✓ {selectedTier.name}</div>
                <div>✓ 100% Mobile Responsive on iOS & Android</div>
                <div>✓ Free High-Speed Vercel Hosting (₦0/month)</div>
                <div>✓ Direct WhatsApp Lead Routing with Blessed Ogobor</div>
                <div>✓ 30 Days Free Post-Launch Support</div>
              </div>
            </div>

            {/* Supported Payment Channels */}
            <div
              style={{
                marginBottom: 20,
                background: "rgba(99,102,241,0.06)",
                border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: 12,
                padding: "14px 16px",
              }}
            >
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#818cf8", textTransform: "uppercase", marginBottom: 8 }}>
                Official Payment Accounts (Zero Card Declines):
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: "0.78rem" }}>
                <div style={{ background: "rgba(0,0,0,0.3)", padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ color: "#4ade80", fontWeight: 700 }}>🏦 OPay Business: </span>
                  <code style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>{BRAND.payment.opayBusiness.accountNumber}</code>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{BRAND.payment.opayBusiness.accountName}</div>
                </div>
                <div style={{ background: "rgba(0,0,0,0.3)", padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ color: "#38bdf8", fontWeight: 700 }}>📱 MiniPay Scan QR: </span>
                  <code style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>{BRAND.payment.miniPay.number}</code>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Scan QR Code or send to MiniPay number</div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <a
              href={`https://wa.me/2349069321502?text=${waPitch}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary glow"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 14,
                fontSize: "0.95rem",
                fontWeight: 700,
                justifyContent: "center",
                textDecoration: "none",
                display: "flex",
              }}
            >
              💬 Lock In Quote on WhatsApp →
            </a>
            <div style={{ textAlign: "center", fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 10 }}>
              Direct line to Blessed Ogobor (09069321502) · No obligation
            </div>
          </div>

          {/* Festive Guarantee Callout */}
          <div
            className="glass"
            style={{
              borderRadius: 16,
              padding: 20,
              background: "rgba(34,197,94,0.05)",
              border: "1px solid rgba(34,197,94,0.25)",
            }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ fontSize: "1.8rem" }}>🎄</span>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#4ade80" }}>
                  Festive Delivery Commitment
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 2 }}>
                  We keep hard deadlines so your website is live before holiday bookings peak. Confirm early to secure your build slot.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
