import { describe, expect, it, vi, beforeEach } from "vitest";
import express from "express";
import request from "supertest";

// Mock the notification module
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

import formRoutes from "./formRoutes";
import { notifyOwner } from "./_core/notification";

const mockedNotifyOwner = vi.mocked(notifyOwner);

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/api/forms", formRoutes);
  return app;
}

describe("Form Submission API Routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("POST /api/forms/contact", () => {
    it("accepts valid contact form and sends notification", async () => {
      const app = createApp();
      const res = await request(app)
        .post("/api/forms/contact")
        .send({
          name: "John Smith",
          email: "john@example.com",
          phone: "(727) 555-1234",
          message: "I want to build a custom home",
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(mockedNotifyOwner).toHaveBeenCalledTimes(1);
      expect(mockedNotifyOwner).toHaveBeenCalledWith(
        expect.objectContaining({
          title: expect.stringContaining("John Smith"),
          content: expect.stringContaining("john@example.com"),
        })
      );
    });

    it("rejects contact form without required fields", async () => {
      const app = createApp();
      const res = await request(app)
        .post("/api/forms/contact")
        .send({ name: "John" });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it("includes phone when provided", async () => {
      const app = createApp();
      await request(app)
        .post("/api/forms/contact")
        .send({
          name: "Jane",
          email: "jane@test.com",
          phone: "(727) 485-5996",
          message: "Testing",
        });

      expect(mockedNotifyOwner).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.stringContaining("(727) 485-5996"),
        })
      );
    });
  });

  describe("POST /api/forms/intake", () => {
    it("accepts valid intake submission", async () => {
      const app = createApp();
      const res = await request(app)
        .post("/api/forms/intake")
        .send({
          answers: {
            purpose: "client_build",
            home_type: "coastal_florida",
            home_size: "3000_4000",
            budget: "500k_750k",
            stage: "have_land",
            referral: "google",
          },
          contactInfo: {
            name: "Test User",
            email: "test@example.com",
            phone: "(727) 555-0000",
            message: "I have a lot in New Port Richey",
          },
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(mockedNotifyOwner).toHaveBeenCalledTimes(1);
      expect(mockedNotifyOwner).toHaveBeenCalledWith(
        expect.objectContaining({
          title: expect.stringContaining("Test User"),
          content: expect.stringContaining("Coastal Florida Style"),
        })
      );
    });

    it("rejects intake without contact info", async () => {
      const app = createApp();
      const res = await request(app)
        .post("/api/forms/intake")
        .send({ answers: { purpose: "client_build" } });

      expect(res.status).toBe(400);
    });
  });

  describe("POST /api/forms/chat", () => {
    it("accepts valid chat transcript", async () => {
      const app = createApp();
      const res = await request(app)
        .post("/api/forms/chat")
        .send({
          messages: [
            { sender: "bot", text: "Welcome!" },
            { sender: "user", text: "I want to build a custom home" },
            { sender: "bot", text: "Great! Let's discuss." },
          ],
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(mockedNotifyOwner).toHaveBeenCalledTimes(1);
      expect(mockedNotifyOwner).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.stringContaining("I want to build a custom home"),
        })
      );
    });

    it("rejects empty messages", async () => {
      const app = createApp();
      const res = await request(app)
        .post("/api/forms/chat")
        .send({ messages: [] });

      expect(res.status).toBe(400);
    });
  });

  describe("POST /api/forms/lot-feasibility", () => {
    it("accepts valid lot feasibility submission", async () => {
      const app = createApp();
      const res = await request(app)
        .post("/api/forms/lot-feasibility")
        .send({
          formData: {
            address: "123 Main St, New Port Richey, FL",
            floodZone: "x",
            lotSize: "0.25",
            hoa: "no",
            waterfront: "no",
          },
          result: {
            score: "high",
            summary: "Strong buildability potential",
            permitting: ["FBC compliance required", "Soil report required"],
          },
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(mockedNotifyOwner).toHaveBeenCalledWith(
        expect.objectContaining({
          title: expect.stringContaining("123 Main St"),
          content: expect.stringContaining("HIGH FEASIBILITY"),
        })
      );
    });

    it("rejects without formData", async () => {
      const app = createApp();
      const res = await request(app)
        .post("/api/forms/lot-feasibility")
        .send({});

      expect(res.status).toBe(400);
    });
  });

  describe("POST /api/forms/renovate-or-rebuild", () => {
    it("accepts valid renovate/rebuild submission", async () => {
      const app = createApp();
      const res = await request(app)
        .post("/api/forms/renovate-or-rebuild")
        .send({
          formData: {
            homeAge: "30",
            squareFootage: "2000",
            desiredAddition: "500",
            budget: "250000",
          },
          result: {
            recommendation: "renovate",
            renovationLow: 180000,
            renovationHigh: 240000,
            rebuildLow: 400000,
            rebuildHigh: 560000,
            reasoning: ["Budget favors renovation", "Home age is manageable"],
          },
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(mockedNotifyOwner).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.stringContaining("$180,000"),
        })
      );
    });

    it("rejects without formData", async () => {
      const app = createApp();
      const res = await request(app)
        .post("/api/forms/renovate-or-rebuild")
        .send({});

      expect(res.status).toBe(400);
    });
  });

  describe("Notification failure handling", () => {
    it("still returns success even if notification fails", async () => {
      mockedNotifyOwner.mockResolvedValueOnce(false);
      const app = createApp();
      const res = await request(app)
        .post("/api/forms/contact")
        .send({
          name: "Test",
          email: "test@test.com",
          message: "Testing failure",
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
