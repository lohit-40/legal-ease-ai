import { NextRequest, NextResponse } from "next/server";
import { GoogleDocsService } from "@/lib/services/googleDocsService";

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Missing content for export" }, { status: 400 });
    }

    const docUrl = await GoogleDocsService.exportContent(content);

    return NextResponse.json({ success: true, url: docUrl });
  } catch (error: unknown) {
    console.error("Docs Export Error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to export document" }, { status: 500 });
  }
}
