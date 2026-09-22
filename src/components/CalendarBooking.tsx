import React, { useState } from "react";

/**
 * CalendarBooking Component
 * Calls the backend API to book a consultation on Google Calendar / Meet.
 */
export default function CalendarBooking() {
  const [status, setStatus] = useState<"idle" | "booking" | "booked" | "error">("idle");
  const [meetUrl, setMeetUrl] = useState("");

  const handleBooking = async () => {
    setStatus("booking");
    try {
      const res = await fetch("/api/calendar/book", { method: "POST" });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      setMeetUrl(data.meetUrl);
      setStatus("booked");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (status === "booked") {
    return (
      <div className="glass-panel" style={{ textAlign: "center", border: "1px solid var(--success)" }}>
        <h3 style={{ color: "var(--success)", marginBottom: "8px" }}>Consultation Scheduled!</h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "16px" }}>A Google Meet invite has been added to your Google Calendar.</p>
        <a href={meetUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: "inline-block", textDecoration: "none" }}>
          Join Google Meet
        </a>
      </div>
    );
  }

  return (
    <div className="glass-panel">
      <h3 style={{ marginBottom: "16px" }}>Need Professional Advice?</h3>
      <p style={{ color: "var(--text-muted)", marginBottom: "24px", fontSize: "0.9rem" }}>
        Lexa identified high-risk clauses in this document. Schedule a quick review with a vetted legal professional.
      </p>
      {status === "error" && <p style={{ color: "var(--error)", marginBottom: "16px", fontSize: "0.8rem" }}>Failed to schedule. Please try again.</p>}
      <button 
        onClick={handleBooking}
        className="btn-google"
        disabled={status === "booking"}
        style={{ width: "100%", justifyContent: "center" }}
      >
        <svg className="google-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path fill="#4285F4" d="M10 10v28h28V10H10zm24 24H14V14h20v20z"/>
          <path fill="#34A853" d="M30 18h-4v4h4v-4z"/>
        </svg>
        {status === "booking" ? "Scheduling..." : "Schedule via Google Meet"}
      </button>
    </div>
  );
}
