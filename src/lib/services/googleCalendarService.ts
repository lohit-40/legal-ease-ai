/**
 * Google Calendar Backend Service
 * Handles communication with the Google Calendar API for booking consultations.
 */
export class GoogleCalendarService {
  /**
   * Simulates booking a consultation and generating a Google Meet link.
   * @param topic - The topic of the consultation.
   * @returns A promise resolving to a simulated Google Meet URL.
   */
  static async bookConsultation(topic: string = "Legal Review"): Promise<string> {
    // Simulate backend processing time and API latency
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("https://meet.google.com/abc-defg-hij");
      }, 1200);
    });
  }
}
