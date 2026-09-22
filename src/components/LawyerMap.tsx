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
      
      <div className="map-container">
        {/* Simple iframe embedding Google Maps for "lawyers near me". 
            In a real app, this would use the Maps JavaScript API with proper keys. */}
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/search?key=YOUR_API_KEY&q=lawyers+near+me"
        ></iframe>
        
        {/* Fallback overlay since we don't have a real API key in this demo */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "var(--surface)",
          padding: "16px 24px",
          borderRadius: "8px",
          border: "1px solid var(--surface-border)",
          textAlign: "center"
        }}>
          <svg className="google-icon" style={{ margin: "0 auto 8px" }} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="#EA4335" d="M24 4C16.27 4 10 10.27 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
          </svg>
          <p style={{ fontWeight: 600 }}>Google Maps Directory</p>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>(Map Preview - API Key Required)</p>
        </div>
      </div>
    </div>
  );
}
