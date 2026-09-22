import { NextResponse } from "next";
import { GoogleGenAI } from "@google/genai";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("document") as File;
    const targetLanguage = formData.get("targetLanguage") as string || "English";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Basic file validation
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Max 5MB." }, { status: 400 });
    }

    // Read file text
    const textContent = await file.text();
    // Sanitize input text to prevent injection or weird characters
    const sanitizedText = purify.sanitize(textContent);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Mock response if API key is missing (for testing/CI)
      return NextResponse.json({
        summary: "This is a mock summary of the uploaded document because no GEMINI_API_KEY was found in the environment. The document appears to be a standard agreement outlining various terms.",
        risks: [
          "Mock Risk: The governing law is set to a foreign jurisdiction.",
          "Mock Risk: There is an automatic renewal clause without prior notice."
        ],
        obligations: [
          "Mock Obligation: You must provide 30 days written notice for termination.",
          "Mock Obligation: Confidentiality must be maintained indefinitely."
        ]
      });
    }

    // Call Gemini API
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      You are an expert legal AI assistant. Analyze the following legal document and provide a JSON response with exactly three keys:
      1. "summary": A plain-English summary of the document (at an 8th-grade reading level).
      2. "risks": An array of strings highlighting potential risks or liabilities.
      3. "obligations": An array of strings highlighting key obligations.
      
      TRANSLATE all your output values into: ${targetLanguage}.
      
      Document Text:
      """
      ${sanitizedText.substring(0, 15000)} // Truncate to avoid context window issues
      """
      
      Output ONLY valid JSON.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const resultText = response.text();
    if (!resultText) {
      throw new Error("Failed to generate content.");
    }

    const parsedResult = JSON.parse(resultText);
    
    return NextResponse.json(parsedResult);
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
