"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import type { Business } from "@/types";

type ProjectType = "landing_page" | "booking_site" | "custom_platform" | "redesign";

export default function ProjectIntakePage() {
  const router = useRouter();
  const { add } = useStore();

  const [projectType, setProjectType] = useState<ProjectType>("landing_page");
  
  // General Fields
  const [businessName, setBusinessName] = useState("");
  const [githubRepo, setGithubRepo] = useState("");
  const [location, setLocation] = useState("");
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");

  // Landing Page Specific
  const [heroOffer, setHeroOffer] = useState("");
  const [servicesMenu, setServicesMenu] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [whatsappCta, setWhatsappCta] = useState("Hello! I want to enquire about your services.");

  // Booking / Multi-Page Specific
  const [pagesNeeded, setPagesNeeded] = useState("Home, About, Packages & Pricing, Booking, Contact");
  const [bookingType, setBookingType] = useState("Appointments & Bookings");
  const [needsQrCode, setNeedsQrCode] = useState(true);
  const [needsFlyers, setNeedsFlyers] = useState(true);

  // Platform Specific
  const [userRoles, setUserRoles] = useState("Admin, Staff, Customer");
  const [coreFeatures, setCoreFeatures] = useState("");
  const [paymentIntegration, setPaymentIntegration] = useState("MiniPay QR + OPay Bank Transfer");

  // Financials & Staff Assignment
  const [amountQuoted, setAmountQuoted] = useState("80000");
  const [amountPaid, setAmountPaid] = useState("40000");
  const [paymentChannel, setPaymentChannel] = useState("OPay Direct Transfer (6110509465)");
  const [deliveryDeadline, setDeliveryDeadline] = useState("");
  const [assignedStaff, setAssignedStaff] = useState("Ogobor Blessing");
  const [notes, setNotes] = useState("");

  const [copiedBrief, setCopiedBrief] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Automatically update suggested pricing when type changes
  const handleTypeChange = (type: ProjectType) => {
    setProjectType(type);
    if (type === "landing_page") {
      setAmountQuoted("80000");
      setAmountPaid("40000");
    } else if (type === "booking_site") {
      setAmountQuoted("120000");
      setAmountPaid("60000");
    } else if (type === "custom_platform") {
      setAmountQuoted("150000");
      setAmountPaid("75000");
    }
  };

  const generateStaffBrief = () => {
    return `📋 *NEXUS DIGITAL - PROJECT KICKOFF BRIEF*
🔒 *Confidential - Admin & Staff Use Only*

*1. BUSINESS OVERVIEW*
• Business Name: ${businessName || "Not specified"}
• Client Contact: ${clientName || "N/A"} (${phone || whatsapp || "No phone"})
• Location: ${location || "Not specified"}
• Address: ${address || "N/A"}
• Google Maps: ${googleMapsUrl || "N/A"}

*2. CODEBASE & REPOSITORY*
• GitHub Repository: ${githubRepo || "Pending setup (https://github.com/Bfranky/...)"}
• Assigned Lead/Staff: ${assignedStaff}

*3. PROJECT SCOPE & TYPE: ${projectType.toUpperCase().replace("_", " ")}*
${
  projectType === "landing_page"
    ? `• Headline Offer: ${heroOffer || "Standard festive promo headline"}
• Services / Menu Items: ${servicesMenu || "Standard service listing"}
• Opening Hours: ${openingHours || "Mon - Sat (8am - 8pm)"}
• WhatsApp CTA: ${whatsappCta}`
    : projectType === "booking_site"
    ? `• Pages Required: ${pagesNeeded}
• Booking / Reservation Type: ${bookingType}
• Table/Flyer QR Code Required: ${needsQrCode ? "Yes" : "No"}
• Promo Flyers: ${needsFlyers ? "Yes (2 designs)" : "No"}`
    : `• User Roles: ${userRoles}
• Core Platform Modules: ${coreFeatures || "Authentication, Dashboard, Database, Payment"}
• Payment Flow: ${paymentIntegration}`
}

*4. FINANCIALS & TIMELINE*
• Quoted Fee: ₦${Number(amountQuoted || 0).toLocaleString()}
• Deposit Paid: ₦${Number(amountPaid || 0).toLocaleString()} (${paymentChannel})
• Balance Due on Completion: ₦${(Number(amountQuoted || 0) - Number(amountPaid || 0)).toLocaleString()}
• Target Launch Deadline: ${deliveryDeadline || "5 business days from kickoff"}

*5. INTERNAL NOTES*
${notes || "None"}`;
  };

  const copyBriefToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateStaffBrief());
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      alert("Please enter the business name.");
      return;
    }

    const newProject: Business = {
      id: "proj_" + Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      name: businessName.trim(),
      address: address.trim() || location.trim() || null,
      phone: phone.trim() || null,
      whatsapp: whatsapp.trim() || phone.trim() || null,
      category: projectType.replace("_", " ").toUpperCase(),
      website: null,
      google_maps_url: googleMapsUrl.trim() || null,
      notes: `GitHub: ${githubRepo || "N/A"} | Assigned: ${assignedStaff} | Type: ${projectType} | ${notes}`,
      status: "project_in_progress",
      whatsapp_replied: true,
      payment_status: Number(amountPaid) > 0 ? "paid" : "pending",
      services_requested: [projectType, "responsive_design", "whatsapp_cta"],
      project_demo_url: githubRepo ? githubRepo : null,
      project_live_url: null,
      project_progress: 10,
      amount_quoted: Number(amountQuoted) || 0,
      amount_paid: Number(amountPaid) || 0,
      payment_date: new Date().toISOString().slice(0, 10),
    };

    add(newProject);
    setSavedSuccess(true);
    setTimeout(() => {
      router.push("/dashboard/projects");
    }, 1200);
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", paddingBottom: 60 }}>
      
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 20, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", color: "#818cf8", fontSize: "0.75rem", fontWeight: 600, marginBottom: 8 }}>
          <span>🔒</span> Private Staff &amp; Admin Intake Channel
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "#fff", letterSpacing: "-0.02em" }}>
          Client Project Intake Form
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginTop: 4 }}>
          Capture all required specifications, GitHub repo links, location data, and financial milestones before initiating work.
        </p>
      </div>

      {savedSuccess && (
        <div style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.4)", borderRadius: 12, padding: "14px 18px", color: "#4ade80", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: "1.2rem" }}>✓</span>
          <div>
            <strong>Project saved successfully!</strong> Redirecting you to the active projects board...
          </div>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSaveProject} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        
        {/* Section 1: Business Identity & Codebase */}
        <div className="glass" style={{ borderRadius: 16, padding: 22 }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <span>🏢</span> 1. Business &amp; GitHub Setup
          </h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>
                Business Name <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Merit Auto, Fishvile, Palm Spring Lounge"
                className="input"
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", fontSize: "0.88rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>
                GitHub Account / Repository Link
              </label>
              <input
                type="text"
                value={githubRepo}
                onChange={(e) => setGithubRepo(e.target.value)}
                placeholder="e.g. https://github.com/Bfranky/project-name"
                className="input"
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", fontSize: "0.88rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>
                Location / City
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Surulere, Lagos or Ogun State"
                className="input"
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", fontSize: "0.88rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>
                Physical Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 14 Admiralty Way, Lekki"
                className="input"
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", fontSize: "0.88rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>
                Client Contact Person
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Mr. Kunle, Dr. Chioma"
                className="input"
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", fontSize: "0.88rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>
                Client WhatsApp / Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (!whatsapp) setWhatsapp(e.target.value);
                }}
                placeholder="e.g. 08012345678"
                className="input"
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", fontSize: "0.88rem" }}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>
                Google Maps URL (for map embeds and reviews)
              </label>
              <input
                type="text"
                value={googleMapsUrl}
                onChange={(e) => setGoogleMapsUrl(e.target.value)}
                placeholder="https://maps.google.com/..."
                className="input"
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", fontSize: "0.88rem" }}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Project Category Selector */}
        <div className="glass" style={{ borderRadius: 16, padding: 22 }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <span>📦</span> 2. Project Category &amp; Specification Form
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, marginBottom: 18 }}>
            {[
              { id: "landing_page", title: "Landing Page", price: "₦80,000", desc: "Single page festive / conversion page with WhatsApp CTA" },
              { id: "booking_site", title: "Booking & Business", price: "₦120,000", desc: "Multi-page with reservation forms, QR code & menus" },
              { id: "custom_platform", title: "Custom Web App", price: "₦150,000+", desc: "Full-stack platform with auth, portal & database" },
              { id: "redesign", title: "Site Redesign", price: "Custom", desc: "Complete overhaul of existing legacy website" },
            ].map((pkg) => (
              <button
                key={pkg.id}
                type="button"
                onClick={() => handleTypeChange(pkg.id as ProjectType)}
                style={{
                  background: projectType === pkg.id ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.03)",
                  border: projectType === pkg.id ? "2px solid #6366f1" : "1px solid var(--border)",
                  borderRadius: 12,
                  padding: 14,
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{ fontWeight: 700, color: projectType === pkg.id ? "#818cf8" : "#fff", fontSize: "0.9rem" }}>
                  {pkg.title}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#4ade80", fontWeight: 700, margin: "2px 0 4px" }}>
                  {pkg.price}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.3 }}>
                  {pkg.desc}
                </div>
              </button>
            ))}
          </div>

          {/* DYNAMIC FIELDS: Based on Project Type */}
          <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 12, padding: 18, border: "1px solid var(--border)" }}>
            
            {projectType === "landing_page" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ fontWeight: 700, color: "#818cf8", fontSize: "0.88rem" }}>
                  ⚡ Specific Requirements: Single-Page / Landing Page
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>
                    Hero Headline / Primary Customer Offer
                  </label>
                  <input
                    type="text"
                    value={heroOffer}
                    onChange={(e) => setHeroOffer(e.target.value)}
                    placeholder="e.g. Lagos Premium Auto Repair — Fast Same-Day Diagnostics & Genuine Parts"
                    className="input"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>
                    Services / Products / Menu Items (comma or line separated)
                  </label>
                  <textarea
                    rows={3}
                    value={servicesMenu}
                    onChange={(e) => setServicesMenu(e.target.value)}
                    placeholder="1. Engine servicing&#10;2. Brake maintenance&#10;3. Transmission flush"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", fontSize: "0.85rem", resize: "vertical" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>
                      Opening Hours &amp; Working Days
                    </label>
                    <input
                      type="text"
                      value={openingHours}
                      onChange={(e) => setOpeningHours(e.target.value)}
                      placeholder="e.g. Mon–Sat: 8am–7pm · Sunday: Closed"
                      className="input"
                      style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", fontSize: "0.85rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>
                      WhatsApp Pre-filled Button Message
                    </label>
                    <input
                      type="text"
                      value={whatsappCta}
                      onChange={(e) => setWhatsappCta(e.target.value)}
                      placeholder="Hello! I want to book an inspection."
                      className="input"
                      style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", fontSize: "0.85rem" }}
                    />
                  </div>
                </div>
              </div>
            )}

            {projectType === "booking_site" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ fontWeight: 700, color: "#818cf8", fontSize: "0.88rem" }}>
                  📅 Specific Requirements: Multi-Page Booking &amp; Business Site
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>
                    Required Pages Structure
                  </label>
                  <input
                    type="text"
                    value={pagesNeeded}
                    onChange={(e) => setPagesNeeded(e.target.value)}
                    placeholder="Home, About Us, Services & Packages, Reservation Form, Gallery, Contact"
                    className="input"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>
                    Booking / Reservation Mechanism
                  </label>
                  <input
                    type="text"
                    value={bookingType}
                    onChange={(e) => setBookingType(e.target.value)}
                    placeholder="e.g. Hall date reservation, table booking, salon appointment"
                    className="input"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>

                <div style={{ display: "flex", gap: 20, flexWrap: "wrap", paddingTop: 4 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: "0.85rem", color: "#fff" }}>
                    <input
                      type="checkbox"
                      checked={needsQrCode}
                      onChange={(e) => setNeedsQrCode(e.target.checked)}
                      style={{ accentColor: "#6366f1", width: 16, height: 16 }}
                    />
                    Generate QR Code for table flyers / reception
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: "0.85rem", color: "#fff" }}>
                    <input
                      type="checkbox"
                      checked={needsFlyers}
                      onChange={(e) => setNeedsFlyers(e.target.checked)}
                      style={{ accentColor: "#6366f1", width: 16, height: 16 }}
                    />
                    Include 2 Social Media Flyer Graphics
                  </label>
                </div>
              </div>
            )}

            {(projectType === "custom_platform" || projectType === "redesign") && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ fontWeight: 700, color: "#818cf8", fontSize: "0.88rem" }}>
                  🚀 Specific Requirements: Custom Platform &amp; Web App
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>
                    Target User Roles &amp; Permissions
                  </label>
                  <input
                    type="text"
                    value={userRoles}
                    onChange={(e) => setUserRoles(e.target.value)}
                    placeholder="e.g. Super Admin, Sales Agent, Store Manager, Customer"
                    className="input"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>
                    Core Modules &amp; Database Entities
                  </label>
                  <textarea
                    rows={3}
                    value={coreFeatures}
                    onChange={(e) => setCoreFeatures(e.target.value)}
                    placeholder="e.g. Auth, Order Management, Customer CRM, Inventory Tracker, Automated Invoicing"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", fontSize: "0.85rem", resize: "vertical" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>
                    Payment Channel Integration
                  </label>
                  <input
                    type="text"
                    value={paymentIntegration}
                    onChange={(e) => setPaymentIntegration(e.target.value)}
                    placeholder="e.g. MiniPay QR Scan, OPay Direct Transfer, Webhook alerts"
                    className="input"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Section 3: Financials & Staff Assignment */}
        <div className="glass" style={{ borderRadius: 16, padding: 22 }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <span>💰</span> 3. Financials &amp; Staff Assignment
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>
                Quoted Total Price (₦)
              </label>
              <input
                type="number"
                value={amountQuoted}
                onChange={(e) => setAmountQuoted(e.target.value)}
                className="input"
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#4ade80", fontWeight: 700, fontSize: "0.95rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>
                Deposit Paid (₦)
              </label>
              <input
                type="number"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                className="input"
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#38bdf8", fontWeight: 700, fontSize: "0.95rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>
                Payment Method Used
              </label>
              <select
                value={paymentChannel}
                onChange={(e) => setPaymentChannel(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "#181926", border: "1px solid var(--border)", color: "#fff", fontSize: "0.85rem" }}
              >
                <option value="OPay Direct Transfer (6110509465)">OPay Direct Transfer (6110509465)</option>
                <option value="MiniPay Barcode / Phone (+234 812 141 4107)">MiniPay Barcode / Phone (+234 812 141 4107)</option>
                <option value="Cash / POS Deposit">Cash / POS Deposit</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>
                Target Delivery Deadline
              </label>
              <input
                type="date"
                value={deliveryDeadline}
                onChange={(e) => setDeliveryDeadline(e.target.value)}
                className="input"
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", fontSize: "0.85rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>
                Assigned Staff / Lead
              </label>
              <input
                type="text"
                value={assignedStaff}
                onChange={(e) => setAssignedStaff(e.target.value)}
                placeholder="e.g. Ogobor Blessing"
                className="input"
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", fontSize: "0.85rem" }}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>
                Additional Notes / Client Instructions
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specific color scheme, client preferences, or deadline urgency..."
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", fontSize: "0.85rem", resize: "vertical" }}
              />
            </div>
          </div>
        </div>

        {/* Section 4: Submission & Actions */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={copyBriefToClipboard}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid var(--border)",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: 10,
              fontSize: "0.88rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>{copiedBrief ? "✓" : "📋"}</span>
            {copiedBrief ? "Brief Copied!" : "Copy Staff Brief"}
          </button>

          <button
            type="submit"
            style={{
              background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              border: "none",
              color: "#fff",
              padding: "12px 28px",
              borderRadius: 10,
              fontSize: "0.9rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
            }}
          >
            ✓ Save Project to Active Pipeline
          </button>
        </div>

      </form>
    </div>
  );
}
