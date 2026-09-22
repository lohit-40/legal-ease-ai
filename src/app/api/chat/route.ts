import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const sanitizedMessage = purify.sanitize(message);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply: "This is a mock reply because no GEMINI_API_KEY was found. A real AI assistant would answer your legal question here, highlighting relevant clauses from the document."
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      You are an expert legal AI assistant helping a user understand a document.
      The user asks: "${sanitizedMessage}"
      
      Provide a helpful, easy-to-understand answer. 
      Important: End your response with a brief reminder that you are an AI and this is not professional legal advice.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({ reply: response.text });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
