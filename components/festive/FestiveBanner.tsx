"use client";
import { useState } from "react";

export default function FestiveBanner() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <>
      {/* Top Banner */}
      {!dismissed && (
        <div
          style={{
            background: "linear-gradient(90deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)",
            color: "#fff",
            fontSize: "0.82rem",
            padding: "8px 16px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            position: "relative",
            zIndex: 60,
          }}
        >
          <span>
            🎄 <strong>Festive Season Rush:</strong> Lock in your website build now to go live in 5 days before holiday bookings peak!
          </span>
          <a
            href="https://wa.me/2349069321502?text=Hello%20Blessed!%20I%20want%20to%20claim%20the%20Festive%20Season%20Rush%20Website%20slot%20for%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "rgba(255,255,255,0.22)",
              color: "#fff",
              padding: "2px 10px",
              borderRadius: 99,
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "0.75rem",
              border: "1px solid rgba(255,255,255,0.4)",
            }}
          >
            Claim ₦80,000 Slot →
          </a>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Close banner"
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              fontSize: "0.9rem",
              padding: "0 4px",
              opacity: 0.8,
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/2349069321502?text=Hello%20Blessed!%20I%20am%20messaging%20from%20Nexora%20Digital.%20I%20would%20like%20to%20discuss%20a%20website%20for%20my%20business."
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 90,
          background: "#25D366",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 20px",
          borderRadius: 999,
          boxShadow: "0 10px 25px -5px rgba(37, 211, 102, 0.4)",
          textDecoration: "none",
          fontWeight: 700,
          fontSize: "0.9rem",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 15px 30px -5px rgba(37, 211, 102, 0.6)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(37, 211, 102, 0.4)";
        }}
      >
        <span style={{ fontSize: "1.2rem" }}>💬</span>
        <span>Chat on WhatsApp</span>
      </a>
    </>
  );
}
