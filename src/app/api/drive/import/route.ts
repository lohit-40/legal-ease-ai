import { NextRequest, NextResponse } from "next/server";
import { GoogleDriveService } from "@/lib/services/googleDriveService";

export async function GET() {
  try {
    const files = await GoogleDriveService.listRecentFiles();
    return NextResponse.json({ success: true, files });
  } catch (error: unknown) {
    console.error("Drive List Error:", error);
    return NextResponse.json({ error: "Failed to list drive files" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { fileId, fileName } = await req.json();

    if (!fileId) {
      return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
    }

    const content = await GoogleDriveService.getFileContent(fileId);
    
    return NextResponse.json({ success: true, content, fileName });
  } catch (error: unknown) {
    console.error("Drive Import Error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to import file" }, { status: 500 });
  }
}
