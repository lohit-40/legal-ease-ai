import React, { useState } from "react";

interface Message {
  role: "user" | "ai";
  content: string;
}

/**
 * ChatInterface Component
 * Provides an accessible chat UI for users to ask questions about their legal document.
 */
export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hello! I've analyzed your document. What specific questions do you have about it?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      // API call to chat endpoint
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.ok) throw new Error("Failed to get response");
      const data = await res.json();
      
      setMessages(prev => [...prev, { role: "ai", content: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "ai", content: "Sorry, I encountered an error. Please try asking again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "400px", border: "1px solid var(--surface-border)", borderRadius: "var(--radius)", background: "var(--background)", overflow: "hidden" }}>
      <div 
        style={{ flex: 1, padding: "24px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px" }}
        aria-live="polite"
      >
        {messages.map((msg, i) => (
          <div 
            key={i} 
            style={{ 
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              background: msg.role === "user" ? "var(--primary)" : "var(--surface)",
              color: msg.role === "user" ? "white" : "var(--text-main)",
              padding: "12px 16px",
              borderRadius: "16px",
              maxWidth: "80%",
              borderBottomRightRadius: msg.role === "user" ? "4px" : "16px",
              borderBottomLeftRadius: msg.role === "ai" ? "4px" : "16px",
            }}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div style={{ alignSelf: "flex-start", color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Lexa is thinking...
          </div>
        )}
      </div>
      
      <form onSubmit={handleSend} style={{ display: "flex", padding: "16px", borderTop: "1px solid var(--surface-border)", background: "var(--surface)" }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., Can they terminate this contract without notice?"
          aria-label="Ask a question about the document"
          disabled={isLoading}
          style={{ 
            flex: 1, 
            padding: "12px", 
            borderRadius: "var(--radius) 0 0 var(--radius)", 
            border: "1px solid var(--surface-border)", 
            background: "var(--background)",
            color: "var(--text-main)",
            outline: "none"
          }}
        />
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="btn-primary"
          style={{ borderRadius: "0 var(--radius) var(--radius) 0" }}
          aria-label="Send message"
        >
          Send
        </button>
      </form>
    </div>
  );
}
