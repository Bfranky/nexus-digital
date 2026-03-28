"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Link from "next/link";
import { useStore } from "@/store";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile]       = useState(false);
  const { fetch }                     = useStore();

  // ── Fetch businesses ONCE when dashboard first loads ──────────────────────
  // Zustand store keeps data in memory — navigating between pages is instant.
  // Uses store.fetched flag so it never fires twice.
  useEffect(() => { fetch(); }, [fetch]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"var(--bg)" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column" }}>

        {/* Mobile top bar */}
        {isMobile && (
          <header style={{
            position:"sticky", top:0, height:56,
            background:"var(--bg-card)", borderBottom:"1px solid var(--border)",
            display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"0 16px", zIndex:30, flexShrink:0,
          }}>
            <button onClick={() => setSidebarOpen(true)}
              style={{ background:"none", border:"1px solid var(--border)", borderRadius:10, color:"var(--text-muted)", cursor:"pointer", width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem" }}
              aria-label="Open menu">
              ☰
            </button>
            <span style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"1rem", letterSpacing:"-0.02em" }}>
              nexus<span style={{ color:"#818cf8" }}>.</span>digitals
            </span>
            <Link href="/dashboard/import"
              style={{ background:"none", border:"1px solid var(--border)", borderRadius:10, color:"var(--text-muted)", textDecoration:"none", width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.9rem" }}
              title="Import">
              📋
            </Link>
          </header>
        )}

        {/* Page content */}
        <main style={{ flex:1, overflowY:"auto", padding: isMobile ? "16px 14px" : "32px 28px" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }} className="page-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}