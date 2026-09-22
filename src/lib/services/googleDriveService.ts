export interface DriveFile {
  id: string;
  name: string;
  type: "document" | "spreadsheet";
  mockContent?: string;
}

/**
 * Google Drive Backend Service
 * Handles fetching files and content from Google Drive.
 */
export class GoogleDriveService {
  /**
   * Simulates fetching recent documents from Google Drive.
   */
  static async listRecentFiles(): Promise<DriveFile[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { 
            id: "file-1", 
            name: "Employment_Contract_2026.pdf", 
            type: "document",
            mockContent: "This is a mock contract imported from Google Drive.\n\nTerm: 5 Years.\nLiability: Uncapped."
          },
          { 
            id: "file-2", 
            name: "Q3_Financial_Report.xlsx", 
            type: "spreadsheet" 
          }
        ]);
      }, 800);
    });
  }

  /**
   * Simulates downloading a specific file's content from Drive.
   */
  static async getFileContent(fileId: string): Promise<string> {
    const files = await this.listRecentFiles();
    const file = files.find(f => f.id === fileId);
    
    if (!file || !file.mockContent) {
      throw new Error("File not found or format unsupported.");
    }

    return file.mockContent;
  }
}
