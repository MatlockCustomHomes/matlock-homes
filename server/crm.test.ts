import { describe, expect, it, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { createLead } from "./db";

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@example.com",
      name: "Admin User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  return {
    user: {
      id: 2,
      openId: "regular-user",
      email: "user@example.com",
      name: "Regular User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("CRM Procedures", () => {
  let testLeadId: number;

  beforeAll(async () => {
    // Create a test lead directly via db helper
    testLeadId = await createLead({
      name: "CRM Test Lead",
      email: "crmtest@example.com",
      phone: "555-123-4567",
      source: "contact",
      projectType: "Custom Home Build",
      budget: "$500k-$750k",
      timeline: "6-12 months",
      message: "Test message for CRM",
      metadata: { testKey: "testValue" },
    });
  });

  describe("Admin access", () => {
    it("lists leads", async () => {
      const caller = appRouter.createCaller(createAdminContext());
      const result = await caller.crm.list();
      expect(result).toHaveProperty("leads");
      expect(result).toHaveProperty("total");
      expect(Array.isArray(result.leads)).toBe(true);
      expect(result.total).toBeGreaterThan(0);
    });

    it("gets lead by ID", async () => {
      const caller = appRouter.createCaller(createAdminContext());
      const lead = await caller.crm.getById({ id: testLeadId });
      expect(lead).not.toBeNull();
      expect(lead!.name).toBe("CRM Test Lead");
      expect(lead!.email).toBe("crmtest@example.com");
      expect(lead!.source).toBe("contact");
      expect(lead!.notes).toBeDefined();
      expect(Array.isArray(lead!.notes)).toBe(true);
    });

    it("updates lead status", async () => {
      const caller = appRouter.createCaller(createAdminContext());
      const result = await caller.crm.updateStatus({
        id: testLeadId,
        status: "contacted",
      });
      expect(result.success).toBe(true);

      // Verify the status was updated
      const lead = await caller.crm.getById({ id: testLeadId });
      expect(lead!.status).toBe("contacted");
    });

    it("adds a note to a lead", async () => {
      const caller = appRouter.createCaller(createAdminContext());
      const result = await caller.crm.addNote({
        leadId: testLeadId,
        content: "Follow up call scheduled for next week",
      });
      expect(result.noteId).toBeDefined();
      expect(typeof result.noteId).toBe("number");

      // Verify note appears in lead detail
      const lead = await caller.crm.getById({ id: testLeadId });
      expect(lead!.notes.length).toBeGreaterThan(0);
      expect(lead!.notes.some((n) => n.content === "Follow up call scheduled for next week")).toBe(true);
    });

    it("gets lead pipeline stats", async () => {
      const caller = appRouter.createCaller(createAdminContext());
      const stats = await caller.crm.stats();
      expect(stats).toBeDefined();
      expect(typeof stats.total).toBe("number");
      expect(stats.total).toBeGreaterThan(0);
    });

    it("filters leads by source", async () => {
      const caller = appRouter.createCaller(createAdminContext());
      const result = await caller.crm.list({ source: "contact" });
      expect(Array.isArray(result.leads)).toBe(true);
      result.leads.forEach((lead) => {
        expect(lead.source).toBe("contact");
      });
    });

    it("filters leads by status", async () => {
      const caller = appRouter.createCaller(createAdminContext());
      const result = await caller.crm.list({ status: "contacted" });
      expect(Array.isArray(result.leads)).toBe(true);
      result.leads.forEach((lead) => {
        expect(lead.status).toBe("contacted");
      });
    });

    it("deletes a lead", async () => {
      const caller = appRouter.createCaller(createAdminContext());
      // Create a lead to delete
      const deleteLeadId = await createLead({
        name: "Delete Me",
        email: "delete@example.com",
        source: "contact",
      });
      const result = await caller.crm.delete({ id: deleteLeadId });
      expect(result.success).toBe(true);

      // Verify it's gone
      const lead = await caller.crm.getById({ id: deleteLeadId });
      expect(lead).toBeNull();
    });
  });

  describe("Non-admin access", () => {
    it("rejects non-admin user from listing leads", async () => {
      const caller = appRouter.createCaller(createUserContext());
      await expect(caller.crm.list()).rejects.toThrow();
    });

    it("rejects non-admin user from getting lead details", async () => {
      const caller = appRouter.createCaller(createUserContext());
      await expect(caller.crm.getById({ id: testLeadId })).rejects.toThrow();
    });

    it("rejects non-admin user from updating lead status", async () => {
      const caller = appRouter.createCaller(createUserContext());
      await expect(
        caller.crm.updateStatus({ id: testLeadId, status: "won" })
      ).rejects.toThrow();
    });
  });
});
