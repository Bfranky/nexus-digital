"use client";
import { useState } from "react";

const TABS = ["Profile", "Integrations", "Notifications"];

export default function SettingsPage() {
  const [tab, setTab] = useState("Profile");
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.6rem", color: "#fff" }}>Settings</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: 4 }}>Manage your account and integrations</p>
      </div>

      {/* Tab nav */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: "1px solid var(--border)", paddingBottom: 0 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{
              padding: "9px 18px", background: "none", border: "none", cursor: "pointer",
              fontFamily: "inherit", fontSize: "0.875rem", fontWeight: 600, transition: "all 0.15s",
              borderBottom: tab === t ? "2px solid #6366f1" : "2px solid transparent",
              color: tab === t ? "#818cf8" : "var(--text-muted)",
              marginBottom: -1,
            }}>
            {t}
          </button>
        ))}
      </div>

      {/* Profile */}
      {tab === "Profile" && (
        <div className="glass" style={{ borderRadius: 16, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: "1.3rem", color: "#fff",
            }}>ND</div>
            <div>
              <button className="btn-ghost" style={{ padding: "6px 14px", fontSize: "0.8rem" }}>Change Photo</button>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 6 }}>JPG or PNG · max 2MB</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "Full Name",    placeholder: "Your name",           defaultValue: "Admin User" },
              { label: "Email",        placeholder: "you@example.com",     defaultValue: "admin@nexus.digitals" },
              { label: "Phone",        placeholder: "+234 800 000 0000",   defaultValue: "" },
              { label: "Agency Name",  placeholder: "Your agency",         defaultValue: "Nexus Digitals" },
            ].map(f => (
              <div key={f.label}>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 8 }}>{f.label}</label>
                <input className="field" defaultValue={f.defaultValue} placeholder={f.placeholder} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20 }}>
            <button className="btn-primary" onClick={save}>
              {saved ? "✓ Saved!" : "Save Changes"}
            </button>
          </div>
        </div>
      )}

      {/* Integrations */}
      {tab === "Integrations" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            {
              name: "Supabase",
              desc: "Database & real-time sync. Required for all data storage.",
              status: process.env.NEXT_PUBLIC_SUPABASE_URL ? "connected" : "not_set",
              color: "#4ade80", icon: "🗄",
            },
            {
              name: "Anthropic AI",
              desc: "Powers the AI Assistant. Add ANTHROPIC_API_KEY to .env.local.",
              status: "manual",
              color: "#818cf8", icon: "✨",
            },
            {
              name: "WhatsApp Business API",
              desc: "Auto-send and receive WhatsApp messages. Coming soon.",
              status: "coming_soon",
              color: "#fbbf24", icon: "💬",
            },
            {
              name: "Google Maps API",
              desc: "Auto-scrape businesses. Coming soon.",
              status: "coming_soon",
              color: "#fbbf24", icon: "🗺",
            },
          ].map(({ name, desc, status, color, icon }) => (
            <div key={name} className="glass" style={{ borderRadius: 14, padding: "18px 20px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: "1.5rem", width: 40, textAlign: "center" }}>{icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.9rem" }}>{name}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 3 }}>{desc}</div>
              </div>
              <span className="badge" style={{
                background: status === "connected" ? "rgba(34,197,94,0.1)" : status === "coming_soon" ? "rgba(245,158,11,0.1)" : "rgba(99,102,241,0.1)",
                color: status === "connected" ? "#4ade80" : status === "coming_soon" ? "#fbbf24" : "#818cf8",
                borderColor: status === "connected" ? "rgba(34,197,94,0.25)" : status === "coming_soon" ? "rgba(245,158,11,0.25)" : "rgba(99,102,241,0.25)",
                whiteSpace: "nowrap",
              }}>
                {status === "connected" ? "✓ Connected" : status === "coming_soon" ? "Coming Soon" : "Set in .env"}
              </span>
            </div>
          ))}

          {/* .env reminder */}
          <div style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 14, padding: 18 }}>
            <p style={{ fontWeight: 700, color: "#818cf8", fontSize: "0.875rem", marginBottom: 10 }}>📄 .env.local reference</p>
            <pre style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.8, margin: 0 }}>
{`NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
ANTHROPIC_API_KEY=sk-ant-xxxx`}
            </pre>
          </div>
        </div>
      )}

      {/* Notifications */}
      {tab === "Notifications" && (
        <div className="glass" style={{ borderRadius: 16, padding: 24 }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: 20 }}>Choose what you want to be notified about.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              { label: "New WhatsApp reply",     desc: "When a business replies to your message", default: true  },
              { label: "Payment received",        desc: "When a client pays",                      default: true  },
              { label: "Project completed",       desc: "When a project is marked 100% done",      default: true  },
              { label: "Follow-up reminder",      desc: "Daily digest of leads to chase",          default: false },
              { label: "Weekly revenue summary",  desc: "Every Monday morning",                    default: false },
            ].map(({ label, desc, default: on }) => {
              const [checked, setChecked] = useState(on);
              return (
                <label key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", gap: 16 }}>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff" }}>{label}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 2 }}>{desc}</div>
                  </div>
                  <div style={{ position: "relative", flexShrink: 0 }} onClick={() => setChecked(!checked)}>
                    <div style={{
                      width: 40, height: 22, borderRadius: 99, transition: "background 0.2s",
                      background: checked ? "#6366f1" : "rgba(255,255,255,0.1)",
                    }} />
                    <div style={{
                      position: "absolute", top: 3, left: checked ? 21 : 3,
                      width: 16, height: 16, borderRadius: "50%", background: "#fff",
                      transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                    }} />
                  </div>
                </label>
              );
            })}
          </div>
          <div style={{ marginTop: 24 }}>
            <button className="btn-primary" onClick={save}>{saved ? "✓ Saved!" : "Save Preferences"}</button>
          </div>
        </div>
      )}
    </div>
  );
}
