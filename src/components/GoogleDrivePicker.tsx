import React, { useState, useEffect } from "react";

/**
 * GoogleDrivePicker Component
 * Calls the backend API to fetch files and import documents from Google Drive.
 */
export default function GoogleDrivePicker({ onFileSelected }: { onFileSelected: (file: File) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      loadFiles();
    }
  }, [isOpen]);

  const loadFiles = async () => {
    setIsLoadingFiles(true);
    setError("");
    try {
      const res = await fetch("/api/drive/import");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setFiles(data.files || []);
    } catch (err: any) {
      setError("Failed to load Drive files.");
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleImport = async (fileId: string, fileName: string) => {
    setIsSimulating(true);
    try {
      const res = await fetch("/api/drive/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId, fileName })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Convert the fetched content into a File object for the app to process
      const mockFile = new File([data.content], data.fileName, { type: "text/plain" });
      onFileSelected(mockFile);
      setIsOpen(false);
    } catch (err) {
      setError("Failed to import file.");
    } finally {
      setIsSimulating(false);
    }
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
            
            {error && <p style={{ color: "var(--error)", marginBottom: "16px", fontSize: "0.8rem" }}>{error}</p>}
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px", textAlign: "left", minHeight: "100px" }}>
              {isLoadingFiles ? (
                <p style={{ textAlign: "center", color: "var(--text-muted)" }}>Loading files...</p>
              ) : (
                files.map(file => (
                  <div 
                    key={file.id}
                    style={{ 
                      padding: "12px", 
                      border: "1px solid var(--surface-border)", 
                      borderRadius: "8px", 
                      cursor: file.type === "document" ? "pointer" : "not-allowed",
                      background: file.type === "document" ? "hsla(210, 100%, 50%, 0.1)" : "transparent",
                      opacity: file.type === "document" ? 1 : 0.5
                    }}
                    onClick={() => file.type === "document" && !isSimulating && handleImport(file.id, file.name)}
                  >
                    {file.type === "document" ? "📄" : "📊"} {file.name}
                  </div>
                ))
              )}
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button className="btn-secondary" onClick={() => setIsOpen(false)} disabled={isSimulating}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
