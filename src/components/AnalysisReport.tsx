import React from "react";
import ChatInterface from "./ChatInterface";
import ExportToDocs from "./ExportToDocs";
import CalendarBooking from "./CalendarBooking";

export interface AnalysisResultData {
  summary: string;
  risks: string[];
  obligations: string[];
}

interface AnalysisReportProps {
  result: AnalysisResultData;
}

/**
 * AnalysisReport Component
 * Displays the AI-generated analysis in an accessible, readable format.
 */
export default function AnalysisReport({ result }: AnalysisReportProps) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ color: "var(--primary)", margin: 0 }}>Document Analysis</h2>
        <ExportToDocs content={result.summary} />
      </div>
      
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ marginBottom: "12px" }}>Plain-English Summary</h3>
        <p style={{ color: "var(--text-muted)", background: "hsla(0, 0%, 100%, 0.05)", padding: "16px", borderRadius: "8px" }}>
          {result.summary}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "48px" }}>
        <div>
          <h3 style={{ marginBottom: "12px", color: "var(--error)" }}>Identified Risks</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {result.risks.map((risk, idx) => (
              <li key={idx} style={{ marginBottom: "8px", background: "var(--error-bg)", padding: "12px", borderRadius: "8px", borderLeft: "4px solid var(--error)" }}>
                {risk}
              </li>
            ))}
            {result.risks.length === 0 && (
              <li style={{ color: "var(--text-muted)" }}>No major risks identified.</li>
            )}
          </ul>
        </div>

        <div>
          <h3 style={{ marginBottom: "12px", color: "var(--secondary)" }}>Key Obligations</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {result.obligations.map((ob, idx) => (
              <li key={idx} style={{ marginBottom: "8px", background: "hsla(280, 100%, 60%, 0.1)", padding: "12px", borderRadius: "8px", borderLeft: "4px solid var(--secondary)" }}>
                {ob}
              </li>
            ))}
            {result.obligations.length === 0 && (
              <li style={{ color: "var(--text-muted)" }}>No key obligations identified.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Conditionally render Calendar Booking if risks are high (mocked by array length) */}
      {result.risks.length > 0 && (
        <div style={{ marginBottom: "48px" }}>
          <CalendarBooking />
        </div>
      )}

      <hr style={{ border: "none", borderTop: "1px solid var(--surface-border)", marginBottom: "32px" }} />
      
      {/* Q&A Section */}
      <h3 style={{ marginBottom: "16px" }}>Ask Follow-up Questions</h3>
      <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
        Need clarification on a specific clause? Ask Lexa below.
      </p>
      <ChatInterface />
    </div>
  );
}
