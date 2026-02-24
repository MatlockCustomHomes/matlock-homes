import { int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Leads table — stores all form submissions as CRM leads.
 * Each submission (contact, intake, chat, lot feasibility) creates one lead.
 */
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  /** Lead's full name */
  name: varchar("name", { length: 255 }).notNull(),
  /** Lead's email address */
  email: varchar("email", { length: 320 }),
  /** Lead's phone number */
  phone: varchar("phone", { length: 32 }),
  /** Which form generated this lead */
  source: mysqlEnum("source", ["contact", "intake", "chat", "lot_feasibility"]).notNull(),
  /** Pipeline status */
  status: mysqlEnum("status", ["new", "contacted", "qualified", "proposal", "won", "lost"]).default("new").notNull(),
  /** Project type if applicable (e.g., "Custom Home Build", "Full Home Rebuild") */
  projectType: varchar("projectType", { length: 255 }),
  /** Budget range if provided */
  budget: varchar("budget", { length: 255 }),
  /** Timeline/stage if provided */
  timeline: varchar("timeline", { length: 255 }),
  /** Property address if provided */
  address: text("address"),
  /** Primary message or details from the submission */
  message: text("message"),
  /** JSON blob for any extra data (chat messages, lot feasibility results, etc.) */
  metadata: json("metadata").$type<Record<string, unknown> | null>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

/**
 * Lead notes — follow-up notes and activity log for each lead.
 */
export const leadNotes = mysqlTable("lead_notes", {
  id: int("id").autoincrement().primaryKey(),
  /** Foreign key to leads table */
  leadId: int("leadId").notNull(),
  /** The note content */
  content: text("content").notNull(),
  /** Who wrote the note (admin user name) */
  authorName: varchar("authorName", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type LeadNote = typeof leadNotes.$inferSelect;
export type InsertLeadNote = typeof leadNotes.$inferInsert;
