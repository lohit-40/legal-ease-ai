import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lexa | Legal Expert Assistant",
  description: "GenAI-powered solution that makes legal information and basic legal assistance more accessible.",
};

/**
 * Root Layout Component
 * Provides the semantic HTML structure and imports global styles.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="sr-only">Skip to main content</a>
        <header className="container animate-fade-in">
          <div>
            <h1>Lexa AI</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Making Legal Info Accessible</p>
          </div>
          <nav aria-label="Main Navigation">
            {/* Future navigation links */}
          </nav>
        </header>
        <main id="main-content" className="container animate-fade-in delay-100">
          {/* Mandatory Disclaimer for Legal AI Applications */}
          <div 
            role="alert" 
            aria-live="polite"
            style={{ 
              background: "var(--error-bg)", 
              borderLeft: "4px solid var(--error)", 
              padding: "16px", 
              borderRadius: "4px",
              marginBottom: "32px",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px"
            }}
          >
            <span aria-hidden="true" style={{ fontSize: "1.2rem" }}>⚠️</span>
            <div>
              <strong style={{ display: "block", marginBottom: "4px", color: "var(--error)" }}>NOT PROFESSIONAL LEGAL ADVICE</strong>
              <span style={{ fontSize: "0.9rem" }}>
                Lexa provides AI-generated informational assistance to help you understand legal documents. It is not a substitute for professional legal counsel. Always consult a qualified attorney for specific legal issues.
              </span>
            </div>
          </div>
          {children}
        </main>
        <footer className="container" style={{ textAlign: "center", padding: "48px 0", color: "var(--text-muted)", fontSize: "0.9rem" }}>
          <p>&copy; {new Date().getFullYear()} Lexa AI. For informational purposes only.</p>
        </footer>
      </body>
    </html>
  );
}
