import { and, desc, eq, like, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, leads, leadNotes, InsertLead, InsertLeadNote } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ── CRM Lead Queries ──

export async function createLead(lead: InsertLead) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create lead: database not available");
    return null;
  }

  try {
    const result = await db.insert(leads).values(lead);
    console.log(`[CRM] Lead created: ${lead.name} (${lead.source})`);
    return result[0].insertId;
  } catch (error) {
    console.error("[CRM] Failed to create lead:", error);
    return null;
  }
}

export async function getLeads(filters?: {
  source?: string;
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  const db = await getDb();
  if (!db) return { leads: [], total: 0 };

  const conditions = [];

  if (filters?.source) {
    conditions.push(eq(leads.source, filters.source as any));
  }
  if (filters?.status) {
    conditions.push(eq(leads.status, filters.status as any));
  }
  if (filters?.search) {
    const searchTerm = `%${filters.search}%`;
    conditions.push(
      or(
        like(leads.name, searchTerm),
        like(leads.email, searchTerm),
        like(leads.phone, searchTerm),
        like(leads.message, searchTerm)
      )
    );
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [rows, countResult] = await Promise.all([
    db
      .select()
      .from(leads)
      .where(whereClause)
      .orderBy(desc(leads.createdAt))
      .limit(filters?.limit ?? 50)
      .offset(filters?.offset ?? 0),
    db
      .select({ count: sql<number>`count(*)` })
      .from(leads)
      .where(whereClause),
  ]);

  return { leads: rows, total: countResult[0]?.count ?? 0 };
}

export async function getLeadById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateLeadStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) return false;

  await db.update(leads).set({ status: status as any }).where(eq(leads.id, id));
  return true;
}

export async function deleteLead(id: number) {
  const db = await getDb();
  if (!db) return false;

  // Delete notes first, then the lead
  await db.delete(leadNotes).where(eq(leadNotes.leadId, id));
  await db.delete(leads).where(eq(leads.id, id));
  return true;
}

// ── Lead Notes ──

export async function addLeadNote(note: InsertLeadNote) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(leadNotes).values(note);
  return result[0].insertId;
}

export async function getLeadNotes(leadId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(leadNotes)
    .where(eq(leadNotes.leadId, leadId))
    .orderBy(desc(leadNotes.createdAt));
}

export async function getLeadStats() {
  const db = await getDb();
  if (!db) return { total: 0, new: 0, contacted: 0, qualified: 0, proposal: 0, won: 0, lost: 0 };

  const result = await db
    .select({
      status: leads.status,
      count: sql<number>`count(*)`,
    })
    .from(leads)
    .groupBy(leads.status);

  const stats: Record<string, number> = { total: 0, new: 0, contacted: 0, qualified: 0, proposal: 0, won: 0, lost: 0 };
  for (const row of result) {
    stats[row.status] = row.count;
    stats.total += row.count;
  }
  return stats;
}
