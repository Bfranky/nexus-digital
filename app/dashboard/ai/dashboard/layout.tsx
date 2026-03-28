"use client";
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"var(--bg)" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column" }}>
        {/* Mobile header */}
        <header className="mobile-header">
          <button
            onClick={() => setSidebarOpen(true)}
            className="btn-icon"
            style={{ fontSize:"1.1rem" }}
            aria-label="Open menu"
          >☰</button>
          <span style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"1rem", letterSpacing:"-0.02em" }}>
            nexus<span style={{ color:"#818cf8" }}>.</span>digitals
          </span>
          <Link href="/dashboard/import" className="btn-icon" title="Import" style={{ fontSize:"0.9rem" }}>📋</Link>
        </header>

        {/* Page content */}
        <main style={{ flex:1, overflowY:"auto", padding:"20px 16px" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }} className="page-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
