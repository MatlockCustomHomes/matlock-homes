import { z } from "zod";
import { adminProcedure, router } from "../_core/trpc";
import {
  getLeads,
  getLeadById,
  updateLeadStatus,
  deleteLead,
  addLeadNote,
  getLeadNotes,
  getLeadStats,
} from "../db";

export const crmRouter = router({
  /** Get paginated list of leads with optional filters */
  list: adminProcedure
    .input(
      z.object({
        source: z.enum(["contact", "intake", "chat", "lot_feasibility"]).optional(),
        status: z.enum(["new", "contacted", "qualified", "proposal", "won", "lost"]).optional(),
        search: z.string().optional(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      return getLeads(input ?? undefined);
    }),

  /** Get a single lead by ID with its notes */
  getById: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const [lead, notes] = await Promise.all([
        getLeadById(input.id),
        getLeadNotes(input.id),
      ]);
      if (!lead) return null;
      const { metadata, ...rest } = lead;
      return { ...rest, metadata: metadata as Record<string, unknown> | null, notes };
    }),

  /** Update lead status */
  updateStatus: adminProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "contacted", "qualified", "proposal", "won", "lost"]),
      })
    )
    .mutation(async ({ input }) => {
      const success = await updateLeadStatus(input.id, input.status);
      return { success };
    }),

  /** Add a note to a lead */
  addNote: adminProcedure
    .input(
      z.object({
        leadId: z.number(),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const noteId = await addLeadNote({
        leadId: input.leadId,
        content: input.content,
        authorName: ctx.user.name ?? "Admin",
      });
      return { noteId };
    }),

  /** Delete a lead and its notes */
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const success = await deleteLead(input.id);
      return { success };
    }),

  /** Get lead pipeline stats */
  stats: adminProcedure.query(async () => {
    return getLeadStats();
  }),
});
