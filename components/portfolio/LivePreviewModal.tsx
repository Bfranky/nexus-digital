"use client";
import { useState } from "react";
import type { PortfolioProject } from "@/lib/portfolio-data";

interface Props {
  project: PortfolioProject | null;
  onClose: () => void;
}

export default function LivePreviewModal({ project, onClose }: Props) {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [iframeError, setIframeError] = useState(false);

  if (!project) return null;

  const deviceWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Blessed, I saw your "${project.title}" portfolio project on Nexora Digital and I would love a similar website for my business. Can we discuss?`
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        backgroundColor: "rgba(4, 4, 10, 0.88)",
        backdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        overflow: "hidden",
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "12px",
          borderBottom: "1px solid var(--border)",
          maxWidth: "1400px",
          width: "100%",
          margin: "0 auto",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={onClose}
            className="btn-ghost"
            style={{ padding: "6px 12px", fontSize: "0.8rem", borderRadius: 8 }}
          >
            ← Back to Works
          </button>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: "#fff" }}>
                {project.title}
              </h3>
              {project.badge && (
                <span
                  className="badge"
                  style={{
                    background: "rgba(99,102,241,0.18)",
                    color: "#818cf8",
                    borderColor: "rgba(99,102,241,0.3)",
                    fontSize: "0.68rem",
                  }}
                >
                  {project.badge}
                </span>
              )}
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              {project.client} · <span style={{ color: "#4ade80", fontWeight: 600 }}>{project.priceRange}</span>
            </div>
          </div>
        </div>

        {/* Device Switcher */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "var(--bg-raised)",
            padding: "3px",
            borderRadius: "10px",
            border: "1px solid var(--border)",
          }}
        >
          {(["desktop", "tablet", "mobile"] as const).map(d => (
            <button
              key={d}
              onClick={() => setDevice(d)}
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                border: "none",
                background: device === d ? "#6366f1" : "transparent",
                color: device === d ? "#fff" : "var(--text-muted)",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              {d === "desktop" ? "🖥️ Desktop" : d === "tablet" ? "📱 Tablet" : "📱 Mobile"}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ padding: "8px 14px", fontSize: "0.8rem", borderRadius: 10, textDecoration: "none" }}
            >
              💻 View GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ padding: "8px 14px", fontSize: "0.8rem", borderRadius: 10, textDecoration: "none" }}
            >
              ↗ Open In New Tab
            </a>
          )}
          <a
            href={`https://wa.me/2349069321502?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: "8px 16px", fontSize: "0.8rem", borderRadius: 10, textDecoration: "none" }}
          >
            💬 I Want This Website
          </a>
        </div>
      </div>

      {/* Frame Container */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          padding: "16px 0 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: deviceWidths[device],
            maxWidth: "100%",
            height: "100%",
            background: "#0c0d17",
            borderRadius: "16px",
            border: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
            transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Simulated Browser Top Bar */}
          <div
            style={{
              height: 38,
              background: "#131326",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              padding: "0 14px",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981" }} />
            </div>
            <div
              style={{
                flex: 1,
                background: "rgba(0,0,0,0.35)",
                borderRadius: 6,
                padding: "3px 12px",
                fontSize: "0.72rem",
                color: "var(--text-muted)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              🔒 {project.liveUrl || "https://nexusdigital.ng/preview/" + project.id}
            </div>
          </div>

          {/* Frame Content */}
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            {project.liveUrl && !iframeError ? (
              <iframe
                src={project.liveUrl}
                title={project.title}
                onError={() => setIframeError(true)}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  background: "#fff",
                }}
              />
            ) : (
              /* Fallback rich interactive preview card */
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "40px 20px",
                  textAlign: "center",
                  background: "radial-gradient(circle at 50% 30%, rgba(99,102,241,0.15) 0%, #0c0d17 70%)",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: 16 }}>🚀</div>
                <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", color: "#fff", marginBottom: 10 }}>
                  {project.title}
                </h4>
                <p style={{ maxWidth: 500, color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: 24 }}>
                  {project.description}
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 28 }}>
                  {project.deliverables.map((d, i) => (
                    <span
                      key={i}
                      style={{
                        background: "rgba(99,102,241,0.1)",
                        border: "1px solid rgba(99,102,241,0.25)",
                        color: "#818cf8",
                        borderRadius: 8,
                        padding: "4px 10px",
                        fontSize: "0.75rem",
                      }}
                    >
                      ✓ {d}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary glow"
                      style={{ textDecoration: "none" }}
                    >
                      Open Live Site Externally ↗
                    </a>
                  )}
                  <a
                    href={`https://wa.me/2349069321502?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                    style={{ textDecoration: "none" }}
                  >
                    Discuss On WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
