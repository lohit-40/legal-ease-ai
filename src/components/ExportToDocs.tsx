import React, { useState } from "react";

/**
 * ExportToDocs Component
 * Simulates exporting the analysis to Google Docs.
 */
export default function ExportToDocs({ content }: { content: string }) {
  const [status, setStatus] = useState<"idle" | "exporting" | "done">("idle");

  const handleExport = () => {
    setStatus("exporting");
    setTimeout(() => {
      setStatus("done");
    }, 2000);
  };

  if (status === "done") {
    return (
      <div style={{ padding: "12px", background: "var(--success-bg)", color: "var(--success)", borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", fontWeight: 600 }}>
        ✓ Successfully exported to Google Docs
        <a href="#" style={{ color: "var(--success)", textDecoration: "underline", marginLeft: "auto" }}>Open Doc</a>
      </div>
    );
  }

  return (
    <button 
      onClick={handleExport}
      className="btn-google"
      disabled={status === "exporting"}
      style={{ opacity: status === "exporting" ? 0.7 : 1 }}
    >
      <svg className="google-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path fill="#4285F4" d="M14.5 4H33l11 11v29H14.5z"/>
        <path fill="#E0E0E0" d="M33 4v11h11z"/>
        <path fill="#FFF" d="M20 22h16v3H20zm0 7h16v3H20zm0 7h10v3H20z"/>
      </svg>
      {status === "exporting" ? "Creating Doc..." : "Export to Google Docs"}
    </button>
  );
}
