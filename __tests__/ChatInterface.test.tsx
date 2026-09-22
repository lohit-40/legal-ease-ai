import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChatInterface from "@/components/ChatInterface";

// Mock fetch globally
global.fetch = jest.fn() as jest.Mock;

describe("ChatInterface", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it("renders the chat interface", () => {
    render(<ChatInterface />);
    expect(screen.getByPlaceholderText(/e.g., Can they terminate this contract without notice/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send/i })).toBeInTheDocument();
  });

  it("allows typing and sending a message", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ reply: "This is a mock AI response." }),
    });

    render(<ChatInterface />);
    
    const input = screen.getByPlaceholderText(/e.g., Can they terminate this contract without notice/i);
    const button = screen.getByRole("button", { name: /Send/i });

    fireEvent.change(input, { target: { value: "What is an NDA?" } });
    fireEvent.click(button);

    // Should show user message immediately
    expect(screen.getByText("What is an NDA?")).toBeInTheDocument();

    // Should resolve and show AI message
    await waitFor(() => {
      expect(screen.getByText("This is a mock AI response.")).toBeInTheDocument();
    });
  });

  it("handles API errors gracefully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<ChatInterface />);
    
    const input = screen.getByPlaceholderText(/e.g., Can they terminate this contract without notice/i);
    const button = screen.getByRole("button", { name: /Send/i });

    fireEvent.change(input, { target: { value: "Error test" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Sorry, I encountered an error/i)).toBeInTheDocument();
    });
  });
});
