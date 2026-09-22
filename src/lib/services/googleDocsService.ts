/**
 * Google Docs Backend Service
 * Handles communication with the Google Docs API.
 */
export class GoogleDocsService {
  /**
   * Simulates exporting content to a new Google Doc.
   * @param content - The plain-text content to export.
   * @returns A promise resolving to a simulated Google Docs URL.
   */
  static async exportContent(content: string): Promise<string> {
    if (!content) {
      throw new Error("Content is required for export.");
    }

    // Simulate backend processing time and API latency
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("https://docs.google.com/document/d/mock-doc-id-12345/edit");
      }, 1500);
    });
  }
}
