import { describe, expect, it, vi, beforeEach } from "vitest";

// Use vi.hoisted to create mock before module initialization
const { mockSend } = vi.hoisted(() => ({
  mockSend: vi.fn(),
}));

// Mock the Resend SDK
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: mockSend },
  })),
}));

// Mock the ENV
vi.mock("./_core/env", () => ({
  ENV: {
    resendApiKey: "re_test_key",
  },
}));

import { contactEmail, intakeEmail, chatEmail, lotFeasibilityEmail } from "./email";

describe("Email Integration (Resend)", () => {
  beforeEach(() => {
    mockSend.mockReset();
    mockSend.mockResolvedValue({ data: { id: "test-id" }, error: null });
  });

  describe("contactEmail", () => {
    it("sends a formatted contact email", async () => {
      const result = await contactEmail({
        name: "John Smith",
        email: "john@example.com",
        phone: "(727) 555-1234",
        message: "I want to build a custom home",
      });

      expect(result).toBe(true);
      expect(mockSend).toHaveBeenCalledOnce();

      const call = mockSend.mock.calls[0][0];
      expect(call.to).toBe("matlockhomes@icloud.com");
      expect(call.subject).toContain("John Smith");
      expect(call.html).toContain("John Smith");
      expect(call.html).toContain("john@example.com");
      expect(call.html).toContain("(727) 555-1234");
      expect(call.html).toContain("I want to build a custom home");
    });

    it("sends without phone number", async () => {
      const result = await contactEmail({
        name: "Jane Doe",
        email: "jane@example.com",
        message: "Interested in renovation",
      });

      expect(result).toBe(true);
      const call = mockSend.mock.calls[0][0];
      expect(call.html).toContain("Jane Doe");
    });
  });

  describe("intakeEmail", () => {
    it("sends a formatted intake/estimate email", async () => {
      const result = await intakeEmail({
        name: "Bob Builder",
        phone: "(727) 555-9999",
        email: "bob@example.com",
        projectType: "Looking to build a custom home",
        budget: "$500,000 – $750,000",
        timeline: "Ready to build now",
      });

      expect(result).toBe(true);
      const call = mockSend.mock.calls[0][0];
      expect(call.subject).toContain("Bob Builder");
      expect(call.html).toContain("Looking to build a custom home");
      expect(call.html).toContain("$500,000");
    });
  });

  describe("chatEmail", () => {
    it("sends a formatted chat transcript email", async () => {
      const result = await chatEmail({
        messages: [
          { role: "user", content: "Hi, I need a quote" },
          { role: "bot", content: "I'd be happy to help!" },
        ],
        userInfo: "John john@example.com",
      });

      expect(result).toBe(true);
      const call = mockSend.mock.calls[0][0];
      expect(call.subject).toContain("Chat Transcript");
      expect(call.html).toContain("Hi, I need a quote");
    });
  });

  describe("lotFeasibilityEmail", () => {
    it("sends a formatted lot feasibility email", async () => {
      const result = await lotFeasibilityEmail({
        address: "123 Main St, Tampa, FL",
        floodZone: "Zone X (Minimal Risk)",
        lotSize: "0.5 acres",
        hoa: "No",
        waterfront: "Not Waterfront",
        feasibility: "HIGH FEASIBILITY",
        considerations: ["Standard permitting process", "No flood insurance required"],
      });

      expect(result).toBe(true);
      const call = mockSend.mock.calls[0][0];
      expect(call.subject).toContain("123 Main St");
      expect(call.html).toContain("HIGH FEASIBILITY");
      expect(call.html).toContain("Standard permitting process");
    });
  });



  describe("error handling", () => {
    it("returns false when Resend returns an error", async () => {
      mockSend.mockResolvedValue({ data: null, error: { message: "Invalid API key" } });

      const result = await contactEmail({
        name: "Test",
        email: "test@test.com",
        message: "Test message",
      });

      expect(result).toBe(false);
    });

    it("returns false when Resend throws an exception", async () => {
      mockSend.mockRejectedValue(new Error("Network error"));

      const result = await contactEmail({
        name: "Test",
        email: "test@test.com",
        message: "Test message",
      });

      expect(result).toBe(false);
    });
  });
});
