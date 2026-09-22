"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import AnalysisReport from "@/components/AnalysisReport";
import GoogleDrivePicker from "@/components/GoogleDrivePicker";
import LawyerMap from "@/components/LawyerMap";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Dashboard State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState("English");

  const handleFileUpload = async (file: File, overrideLanguage?: string) => {
    setIsAnalyzing(true);
    setError(null);
    if (!overrideLanguage) setAnalysisResult(null);

    try {
      const formData = new FormData();
      formData.append("document", file);
      formData.append("targetLanguage", overrideLanguage || language);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to analyze the document.");

      const data = await res.json();
      setAnalysisResult({ ...data, file });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    if (analysisResult?.file) {
      handleFileUpload(analysisResult.file, newLang);
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <h2 style={{ padding: "0 16px 24px", color: "var(--primary)" }}>Lexa Workspace</h2>
        
        <div 
          className={`sidebar-item ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          📄 Document Analysis
        </div>
        <div 
          className={`sidebar-item ${activeTab === "directory" ? "active" : ""}`}
          onClick={() => setActiveTab("directory")}
        >
          🗺️ Legal Directory
        </div>
        
        <div style={{ marginTop: "auto", borderTop: "1px solid var(--surface-border)", paddingTop: "24px" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", padding: "0 16px", marginBottom: "8px" }}>Language (Google Translate API)</p>
          <select 
            value={language} 
            onChange={handleLanguageChange}
            disabled={isAnalyzing}
            style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", background: "var(--surface)", color: "var(--text-main)", border: "1px solid var(--surface-border)" }}
          >
            <option value="English">English</option>
            <option value="Spanish">Español (Spanish)</option>
            <option value="French">Français (French)</option>
            <option value="Hindi">हिन्दी (Hindi)</option>
          </select>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        {activeTab === "dashboard" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <section className="glass-panel" aria-labelledby="upload-heading">
              <h2 id="upload-heading" style={{ marginBottom: "16px" }}>Analyze a Legal Document</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
                Upload a document locally, or import directly from Google Drive.
              </p>
              
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
                <FileUpload onUpload={(f) => handleFileUpload(f)} disabled={isAnalyzing} />
                <div style={{ borderLeft: "1px solid var(--surface-border)", paddingLeft: "24px" }}>
                  <h4 style={{ marginBottom: "8px" }}>Cloud Import</h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Securely import from your Google Workspace.</p>
                  <GoogleDrivePicker onFileSelected={(f) => handleFileUpload(f)} />
                </div>
              </div>
              
              {isAnalyzing && (
                <div aria-live="polite" style={{ marginTop: "24px", color: "var(--primary)", fontWeight: "600" }}>
                  Analyzing document with Gemini AI... Translating to {language}...
                </div>
              )}

              {error && (
                <div role="alert" aria-live="assertive" style={{ marginTop: "16px", color: "var(--error)" }}>
                  {error}
                </div>
              )}
            </section>

            {analysisResult && (
              <section className="glass-panel animate-fade-in delay-200" aria-labelledby="results-heading">
                <AnalysisReport result={analysisResult} />
              </section>
            )}
          </div>
        )}

        {activeTab === "directory" && (
          <div className="animate-fade-in">
            <LawyerMap />
          </div>
        )}
      </div>
    </div>
  );
}
