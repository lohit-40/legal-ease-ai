import React from "react";

/**
 * LawyerMap Component
 * Integrates Google Maps to find local legal representation.
 */
export default function LawyerMap() {
  return (
    <div className="glass-panel" style={{ marginTop: "32px" }}>
      <h2 style={{ marginBottom: "16px" }}>Find Local Representation</h2>
      <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
        Need more than just AI? Search the Google Maps directory for highly-rated legal professionals near you.
      </p>
      
      <div className="map-container" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        background: "linear-gradient(135deg, hsla(230, 20%, 15%, 0.8), hsla(190, 100%, 20%, 0.4))",
        backgroundSize: "cover",
        position: "relative",
        border: "1px solid var(--glass-border)",
        borderRadius: "12px",
        boxShadow: "inset 0 0 40px rgba(0,0,0,0.8)"
      }}>
        {/* Fallback overlay since we don't have a real API key in this demo */}
        <div style={{
          background: "rgba(0,0,0,0.6)",
          padding: "24px 48px",
          borderRadius: "16px",
          backdropFilter: "blur(12px)",
          border: "1px solid var(--glass-border)",
          textAlign: "center"
        }}>
          <span style={{ fontSize: "2.5rem", marginBottom: "8px", display: "block" }}>📍</span>
          <h3 style={{ color: "white", marginBottom: "4px" }}>Google Maps Integrated Directory</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>(Requires API Key for Live Map Preview)</p>
        </div>
      </div>
    </div>
  );
}
