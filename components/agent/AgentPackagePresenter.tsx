"use client";
import { useState } from "react";
import { PRICING_PACKAGES, type PackageTier } from "@/lib/portfolio-data";
import { BRAND } from "@/lib/brand-config";
import { formatMoney } from "@/lib/utils";

export default function AgentPackagePresenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<PackageTier>(PRICING_PACKAGES[1]); // default Festive Booking
  const [paymentMethod, setPaymentMethod] = useState<"minipay" | "monnify" | "bank_transfer">("bank_transfer");
  const [copied, setCopied] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);

  const referralCommission = Math.round(selectedPkg.priceNumeric * 0.1);
  const closingCommission = Math.round(selectedPkg.priceNumeric * 0.2);

  const getPaymentDetails = () => {
    if (paymentMethod === "minipay") {
      return {
        title: "MiniPay (Scan-to-Pay QR)",
        desc: `Client scans the MiniPay QR code with Opera Mini or any smartphone. They pay in Naira (NGN), and it auto-settles directly into your OPay business account (${BRAND.payment.opayBusiness.accountNumber}).`,
        badge: "⚡ Instant Scan QR",
        accountSnippet: `OPay Business Account: ${BRAND.payment.opayBusiness.accountNumber} (${BRAND.payment.opayBusiness.accountName})`,
      };
    }
    if (paymentMethod === "monnify") {
      return {
        title: "Monnify Automated Bank Transfer",
        desc: `Generates a dedicated instant virtual account number (Wema / Moniepoint) for each client. Transfers auto-confirm in seconds and settle directly into your OPay account (${BRAND.payment.opayBusiness.accountNumber}).`,
        badge: "🏦 Virtual Account Transfer",
        accountSnippet: `OPay Settlement: ${BRAND.payment.opayBusiness.accountNumber} (${BRAND.payment.opayBusiness.accountName})`,
      };
    }
    return {
      title: "Direct OPay Bank Transfer",
      desc: `Direct bank transfer to OPay Account: ${BRAND.payment.opayBusiness.accountNumber} (${BRAND.payment.opayBusiness.accountName}). Client sends receipt on WhatsApp for instant project kick-off.`,
      badge: "💳 Instant Bank Deposit",
      accountSnippet: `Bank: ${BRAND.payment.opayBusiness.bankName}\nAccount Number: ${BRAND.payment.opayBusiness.accountNumber}\nAccount Name: ${BRAND.payment.opayBusiness.accountName}`,
    };
  };

  const payment = getPaymentDetails();

  const clientPitchText = `Hello! Here is the package breakdown for your website from ${BRAND.name}:

📦 Package: ${selectedPkg.name}
💰 Price: ${selectedPkg.price} (50% deposit to commence, 50% upon live launch)
⏱️ Turnaround: ${selectedPkg.timeline}

Deliverables Included:
${selectedPkg.features.map(f => `• ${f}`).join("\n")}

💳 Payment Details (Instant Confirmation):
• ${payment.title}
• ${payment.accountSnippet}

Contact & Developer: ${BRAND.developerName} (${BRAND.name})
WhatsApp: ${BRAND.phone} | Email: ${BRAND.email}
Live Portfolio: ${BRAND.portfolioDemoUrl}

Would you like us to generate a free preview mockup with your business name?`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(clientPitchText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(BRAND.payment.opayBusiness.accountNumber);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  return (
    <>
      {/* Trigger Button inside Agent Section */}
      <div style={{ marginTop: 20 }}>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="btn-primary"
          style={{
            background: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
            border: "none",
            borderRadius: 12,
            padding: "10px 20px",
            fontSize: "0.85rem",
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>📱 Open Agent Package & Payment Pitcher</span>
        </button>
      </div>

      {/* Modal / Slide-out */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 110,
            background: "rgba(4, 4, 10, 0.85)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            className="glass"
            style={{
              width: "100%",
              maxWidth: 760,
              maxHeight: "90vh",
              borderRadius: 20,
              padding: "24px 28px",
              background: "#0d0e1c",
              border: "1px solid rgba(99,102,241,0.3)",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, borderBottom: "1px solid var(--border)", paddingBottom: 14 }}>
              <div>
                <div style={{ fontSize: "0.72rem", color: "#4ade80", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Agent Sales Pitch &amp; Payment Desk
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", color: "#fff" }}>
                  Showcase Packages &amp; Close Deals
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close modal"
                style={{
                  background: "transparent",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  color: "var(--text-muted)",
                  width: 32,
                  height: 32,
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                ✕
              </button>
            </div>

            {/* Step 1: Select Package */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: 8, fontWeight: 700 }}>
                1. SELECT CLIENT PACKAGE TO SHOW
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8 }}>
                {PRICING_PACKAGES.map(pkg => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPkg(pkg)}
                    style={{
                      padding: "10px",
                      borderRadius: 10,
                      border: "1px solid",
                      borderColor: selectedPkg.id === pkg.id ? "#818cf8" : "var(--border)",
                      background: selectedPkg.id === pkg.id ? "rgba(99,102,241,0.18)" : "var(--bg-raised)",
                      color: selectedPkg.id === pkg.id ? "#fff" : "var(--text-muted)",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ fontSize: "0.8rem", fontWeight: 700 }}>{pkg.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "#4ade80", marginTop: 2 }}>{pkg.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Agent Commission Earned on this deal */}
            <div
              style={{
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.25)",
                borderRadius: 14,
                padding: "14px 18px",
                marginBottom: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontSize: "0.72rem", color: "#4ade80", fontWeight: 700, textTransform: "uppercase" }}>
                  Your Earnings On This Deal
                </div>
                <div style={{ fontSize: "0.82rem", color: "#e2e8f0", marginTop: 2 }}>
                  For <strong style={{ color: "#fff" }}>{selectedPkg.name} ({selectedPkg.price})</strong>
                </div>
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>10% REFERRAL</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: "#818cf8" }}>
                    {formatMoney(referralCommission)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>20% DIRECT CLOSE</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: "#4ade80" }}>
                    {formatMoney(closingCommission)}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method Details */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: 8, fontWeight: 700 }}>
                2. EXPLAIN HOW CLIENT CAN PAY (NO REGISTRATION BOTTLENECKS)
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8, marginBottom: 12 }}>
                {[
                  { id: "minipay", label: "📱 MiniPay App (Scan QR)", badge: "Instant Scan" },
                  { id: "monnify", label: "🏦 Monnify Transfer", badge: "Auto-Confirm" },
                  { id: "bank_transfer", label: "💳 Direct Bank Deposit", badge: "Direct NGN" },
                ].map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: "1px solid",
                      borderColor: paymentMethod === m.id ? "#06b6d4" : "var(--border)",
                      background: paymentMethod === m.id ? "rgba(6,182,212,0.14)" : "var(--bg-raised)",
                      color: paymentMethod === m.id ? "#fff" : "var(--text-muted)",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                    }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Active Payment Explanation Card */}
              <div
                style={{
                  background: "var(--bg-raised)",
                  borderRadius: 12,
                  padding: "14px 16px",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#fff" }}>
                    {payment.title}
                  </div>
                  <span
                    className="badge"
                    style={{
                      background: "rgba(6,182,212,0.15)",
                      color: "#38bdf8",
                      borderColor: "rgba(6,182,212,0.3)",
                      fontSize: "0.68rem",
                    }}
                  >
                    {payment.badge}
                  </span>
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: 10 }}>
                  {payment.desc}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    background: "rgba(0,0,0,0.35)",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div style={{ fontSize: "0.78rem", color: "#fff" }}>
                    🏦 <strong>OPay:</strong> <code style={{ color: "#4ade80", fontSize: "0.88rem" }}>{BRAND.payment.opayBusiness.accountNumber}</code> ({BRAND.payment.opayBusiness.accountName})
                  </div>
                  <button
                    type="button"
                    onClick={copyAccountNumber}
                    style={{
                      background: "rgba(34,197,94,0.15)",
                      border: "1px solid rgba(34,197,94,0.3)",
                      borderRadius: 6,
                      color: "#4ade80",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      padding: "4px 10px",
                      cursor: "pointer",
                    }}
                  >
                    {copiedAccount ? "✓ Copied Account!" : "📋 Copy Account"}
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3: Message to Share with Client */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700 }}>
                  3. READY-TO-SEND CLIENT PROPOSAL MESSAGE
                </label>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="btn-ghost"
                  style={{ fontSize: "0.75rem", padding: "4px 10px", borderRadius: 6 }}
                >
                  {copied ? "✓ Copied!" : "📋 Copy Text"}
                </button>
              </div>
              <textarea
                readOnly
                value={clientPitchText}
                style={{
                  width: "100%",
                  minHeight: 140,
                  fontSize: "0.78rem",
                  fontFamily: "var(--font-mono, monospace)",
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  color: "var(--text)",
                  padding: "10px 12px",
                  lineHeight: 1.5,
                  resize: "none",
                }}
              />
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="btn-ghost"
                style={{ fontSize: "0.82rem", padding: "8px 16px" }}
              >
                Close
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(clientPitchText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ fontSize: "0.82rem", padding: "8px 18px", textDecoration: "none" }}
              >
                Send to Client via WhatsApp ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
