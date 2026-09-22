import { POST as ChatPOST } from "@/app/api/chat/route";
import { GET as DriveGET } from "@/app/api/drive/import/route";

// Mock the Next Request
function createMockRequest(body?: any) {
  return new Request("http://localhost", {
    method: body ? "POST" : "GET",
    body: body ? JSON.stringify(body) : undefined,
  });
}

describe("API Routes Tests", () => {
  describe("Chat API", () => {
    it("returns 400 if message is missing", async () => {
      const req = createMockRequest({});
      const res = await ChatPOST(req);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toBe("Message is required");
    });
  });

  describe("Drive Import API", () => {
    it("handles GET request properly", async () => {
      // It mocks the drive service and returns 200
      const req = createMockRequest();
      const res = await DriveGET();
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(Array.isArray(data.files)).toBe(true);
    });
  });
});
