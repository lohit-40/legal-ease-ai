import { NextRequest, NextResponse } from "next/server";
import { GoogleCalendarService } from "@/lib/services/googleCalendarService";

export async function POST(_req: NextRequest) {
  try {
    console.log("Calendar Request received:", _req.url);
    // We could parse body here for topic, but keeping it simple
    const meetUrl = await GoogleCalendarService.bookConsultation("Urgent Legal Review");

    return NextResponse.json({ success: true, meetUrl });
  } catch (error: unknown) {
    console.error("Calendar Booking Error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to book consultation" }, { status: 500 });
  }
}
