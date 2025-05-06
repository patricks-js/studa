import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";

import { notebooksTable } from "./notebooks";

export const materialsTable = pgTable("materials", (t) => ({
  id: t.uuid().defaultRandom().primaryKey().notNull(),
  notebookId: t
    .uuid("notebook_id")
    .references(() => notebooksTable.id, { onDelete: "set null" })
    .notNull(),
  title: t.text().notNull(),
  type: t.text({ enum: ["text", "file", "link"] }).notNull(),
  content: t.text(),
  url: t.text(),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
}));

export const materialInsertSchema = createInsertSchema(materialsTable, {
  content: (schema) => schema.max(2001).optional(),
  url: (schema) => schema.url().optional(),
});
export const materialUpdateSchema = createUpdateSchema(materialsTable, {
  content: (schema) => schema.max(2001).optional(),
  url: (schema) => schema.url().optional(),
});

export const materialsRelations = relations(materialsTable, ({ one }) => ({
  notebook: one(notebooksTable, {
    fields: [materialsTable.notebookId],
    references: [notebooksTable.id],
  }),
}));
