import React, { useState } from "react";

/**
 * GoogleDrivePicker Component
 * Simulates a Google Drive integration for importing legal documents.
 */
export default function GoogleDrivePicker({ onFileSelected }: { onFileSelected: (file: File) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulatedImport = () => {
    setIsSimulating(true);
    // Simulate network delay for picking a file
    setTimeout(() => {
      const mockFile = new File(["This is a mock contract imported from Google Drive.\n\nTerm: 5 Years.\nLiability: Uncapped."], "Drive_Contract_Export.txt", { type: "text/plain" });
      onFileSelected(mockFile);
      setIsSimulating(false);
      setIsOpen(false);
    }, 1500);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="btn-google"
        style={{ width: "100%", justifyContent: "center", marginTop: "16px" }}
      >
        <svg className="google-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FFC107" d="M17 6l11 19-11 19-11-19z"/>
          <path fill="#1976D2" d="M39 6L28 25H6L17 6z"/>
          <path fill="#4CAF50" d="M28 25l11 19H17l11-19z"/>
        </svg>
        Import from Google Drive
      </button>

      {isOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.7)", zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div className="glass-panel" style={{ width: "400px", textAlign: "center" }}>
            <h3 style={{ marginBottom: "16px" }}>Google Drive</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
              Select a legal document from your Drive.
            </p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px", textAlign: "left" }}>
              <div 
                style={{ padding: "12px", border: "1px solid var(--primary)", borderRadius: "8px", background: "hsla(210, 100%, 50%, 0.1)", cursor: "pointer" }}
                onClick={handleSimulatedImport}
              >
                📄 Employment_Contract_2026.pdf
              </div>
              <div style={{ padding: "12px", border: "1px solid var(--surface-border)", borderRadius: "8px", opacity: 0.5 }}>
                📊 Q3_Financial_Report.xlsx
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button className="btn-secondary" onClick={() => setIsOpen(false)} disabled={isSimulating}>Cancel</button>
              <button className="btn-primary" onClick={handleSimulatedImport} disabled={isSimulating}>
                {isSimulating ? "Importing..." : "Select"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
