"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href:"/dashboard",            icon:"⬛", label:"Dashboard"    },
  { href:"/dashboard/businesses", icon:"🏢", label:"Businesses"   },
  { href:"/dashboard/import",     icon:"📋", label:"Import"       },
  { href:"/dashboard/projects",   icon:"📁", label:"Projects"     },
  { href:"/dashboard/payments",   icon:"💰", label:"Payments"     },
  { href:"/dashboard/analytics",  icon:"📊", label:"Analytics"    },
  { href:"/dashboard/ai",         icon:"✨", label:"AI Assistant" },
  { href:"/dashboard/settings",   icon:"⚙️", label:"Settings"     },
];

interface Props { open: boolean; onClose: () => void; }

export default function Sidebar({ open, onClose }: Props) {
  const pathname  = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // On desktop: normal sticky sidebar. On mobile: fixed drawer.
  const sidebarStyle: React.CSSProperties = isMobile
    ? {
        position: "fixed",
        top: 0, left: 0, bottom: 0,
        width: 220,
        background: "var(--bg-card)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        zIndex: 40,
        transform: open ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
      }
    : {
        width: 220,
        flexShrink: 0,
        background: "var(--bg-card)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
      };

  return (
    <>
      {/* Backdrop — only on mobile when open */}
      {isMobile && open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(2px)",
            zIndex: 39,
          }}
        />
      )}

      <aside style={sidebarStyle}>
        {/* Logo + close button */}
        <div style={{ padding:"18px 16px 14px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"1.05rem", letterSpacing:"-0.02em" }}>
            nexus<span style={{ color:"#818cf8" }}>.</span>digitals
          </span>
          {isMobile && (
            <button onClick={onClose} style={{ background:"none", border:"1px solid var(--border)", borderRadius:8, color:"var(--text-muted)", cursor:"pointer", width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.85rem" }}>
              ✕
            </button>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:"10px 8px", overflowY:"auto" }}>
          {LINKS.map(({ href, icon, label }) => {
            const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`nav-link${active ? " active" : ""}`}
                style={{ marginBottom:2, textDecoration:"none" }}
              >
                <span style={{ fontSize:"1rem", width:22, textAlign:"center", flexShrink:0 }}>{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div style={{ padding:"12px 14px", borderTop:"1px solid var(--border)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:"0.75rem", color:"#fff", flexShrink:0 }}>ND</div>
            <div>
              <div style={{ fontSize:"0.8rem", fontWeight:600, color:"var(--text)" }}>Admin</div>
              <div style={{ fontSize:"0.7rem", color:"var(--text-muted)" }}>nexus.digitals</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}