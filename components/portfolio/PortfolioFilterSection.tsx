"use client";
import { useState } from "react";
import { PORTFOLIO_PROJECTS, type PortfolioProject } from "@/lib/portfolio-data";
import LivePreviewModal from "./LivePreviewModal";

export default function PortfolioFilterSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "🌟 All Works (" + PORTFOLIO_PROJECTS.length + ")" },
    { id: "platform", label: "🏢 Full Platforms (₦800k)" },
    { id: "booking", label: "🎄 Festive Booking (₦120k–₦200k)" },
    { id: "starter", label: "⚡ Festive Starter (₦80k)" },
    { id: "ecommerce", label: "🛍️ E-Commerce" },
  ];

  const filtered = PORTFOLIO_PROJECTS.filter(project => {
    const matchesCat = activeCategory === "all" || project.categorySlug === activeCategory;
    const matchesSearch =
      !searchQuery ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <section id="portfolio" style={{ padding: "80px 20px", maxWidth: 1240, margin: "0 auto" }}>
      {/* Section Header */}
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
          <span>💼 Proven Deliveries · Real Results</span>
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
          Works Done So Far
        </h2>
        <p style={{ color: "var(--text-muted)", maxWidth: 640, margin: "0 auto", fontSize: "0.95rem", lineHeight: 1.6 }}>
          Explore real client websites and platforms crafted by Blessed Ogobor. Click any project to inspect live preview, GitHub source code, turnaround speed, and real project costs.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 14,
          marginBottom: 36,
        }}
      >
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "8px 16px",
                borderRadius: 12,
                fontSize: "0.82rem",
                fontWeight: 600,
                border: "1px solid",
                cursor: "pointer",
                transition: "all 0.18s",
                borderColor: activeCategory === cat.id ? "#818cf8" : "var(--border)",
                background: activeCategory === cat.id ? "rgba(99,102,241,0.2)" : "var(--bg-raised)",
                color: activeCategory === cat.id ? "#fff" : "var(--text-muted)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <input
          className="field"
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by tech or keyword..."
          style={{ maxWidth: 260 }}
        />
      </div>

      {/* Projects Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: 24,
        }}
      >
        {filtered.map(project => {
          const waMessage = encodeURIComponent(
            `Hi Blessed! I was looking at "${project.title}" on Nexora Digital. I want a similar website for my business. What are the requirements to start?`
          );

          return (
            <div
              key={project.id}
              className="glass"
              style={{
                borderRadius: 20,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transition: "transform 0.2s, border-color 0.2s",
              }}
            >
              {/* Card Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#818cf8",
                  }}
                >
                  {project.category}
                </span>
                {project.badge && (
                  <span
                    className="badge"
                    style={{
                      background: "rgba(34,197,94,0.12)",
                      color: "#4ade80",
                      borderColor: "rgba(34,197,94,0.25)",
                      fontSize: "0.68rem",
                    }}
                  >
                    {project.badge}
                  </span>
                )}
              </div>

              {/* Title & Client */}
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  color: "#fff",
                  marginBottom: 6,
                  lineHeight: 1.3,
                }}
              >
                {project.title}
              </h3>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 14 }}>
                Client: <span style={{ color: "var(--text)" }}>{project.client}</span>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                  marginBottom: 18,
                  flex: 1,
                }}
              >
                {project.description}
              </p>

              {/* Impact Callout */}
              <div
                style={{
                  background: "rgba(99,102,241,0.07)",
                  border: "1px dashed rgba(99,102,241,0.25)",
                  borderRadius: 10,
                  padding: "8px 12px",
                  fontSize: "0.78rem",
                  color: "#e0e7ff",
                  marginBottom: 18,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span>📈</span>
                <span style={{ fontWeight: 600 }}>{project.impactMetric}</span>
              </div>

              {/* Deliverables Checklist */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                  Deliverables Included:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {project.deliverables.slice(0, 3).map((d, idx) => (
                    <div key={idx} style={{ fontSize: "0.78rem", color: "var(--text)", display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: "#4ade80" }}>✓</span>
                      <span>{d}</span>
                    </div>
                  ))}
                  {project.deliverables.length > 3 && (
                    <div style={{ fontSize: "0.72rem", color: "#818cf8" }}>
                      +{project.deliverables.length - 3} more features included
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Turnaround Box */}
              <div
                style={{
                  padding: "12px 14px",
                  background: "var(--bg-raised)",
                  borderRadius: 12,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                  border: "1px solid var(--border)",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Real Project Cost</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.05rem", color: "#4ade80" }}>
                    {project.priceRange}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Turnaround</div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#fff" }}>
                    ⚡ {project.turnaroundDays} Days
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                {project.tags.map(t => (
                  <span
                    key={t}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border)",
                      color: "var(--text-muted)",
                      borderRadius: 6,
                      padding: "2px 8px",
                      fontSize: "0.68rem",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="btn-primary"
                  style={{
                    padding: "9px 12px",
                    borderRadius: 10,
                    fontSize: "0.8rem",
                    justifyContent: "center",
                  }}
                >
                  👁️ Live Preview
                </button>
                <a
                  href={`https://wa.me/2349069321502?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{
                    padding: "9px 12px",
                    borderRadius: 10,
                    fontSize: "0.8rem",
                    justifyContent: "center",
                    textDecoration: "none",
                  }}
                >
                  💬 I Want This
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* GitHub Integration Notice & Quick Add */}
      <div
        className="glass"
        style={{
          marginTop: 48,
          borderRadius: 20,
          padding: "28px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
          border: "1px dashed rgba(99,102,241,0.35)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "rgba(99,102,241,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.6rem",
              flexShrink: 0,
            }}
          >
            🐙
          </div>
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: "#fff", marginBottom: 4 }}>
              Blessed Ogobor's GitHub Code Repositories
            </h4>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", maxWidth: 600 }}>
              All our code is written with clean architecture, modern React 19 / Next.js 16 conventions, and strict TypeScript. View the public source code, commits, and releases on GitHub.
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <a
            href="https://github.com/Bfranky"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ textDecoration: "none", fontSize: "0.85rem" }}
          >
            Visit Blessed's GitHub ↗
          </a>
        </div>
      </div>

      {/* Live Preview Modal */}
      <LivePreviewModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
