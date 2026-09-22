"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import AnalysisReport from "@/components/AnalysisReport";

/**
 * Main Dashboard Page
 * Orchestrates the file upload and analysis results display.
 */
export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles the file upload and triggers the backend analysis API.
   * @param {File} file - The uploaded document file.
   */
  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);

    try {
      // Create FormData to send the file to the API route
      const formData = new FormData();
      formData.append("document", file);

      // Call the API (simulated or real depending on backend implementation)
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to analyze the document. Please try again.");
      }

      const data = await res.json();
      setAnalysisResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <section className="glass-panel" aria-labelledby="upload-heading">
        <h2 id="upload-heading" style={{ marginBottom: "16px" }}>Analyze a Legal Document</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
          Upload your contract, NDA, or agreement to get a plain-English summary and risk analysis.
        </p>
        <FileUpload onUpload={handleFileUpload} disabled={isAnalyzing} />
        
        {isAnalyzing && (
          <div aria-live="polite" style={{ marginTop: "16px", color: "var(--primary)", fontWeight: "600" }}>
            Analyzing document with AI... Please wait.
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
  );
}
