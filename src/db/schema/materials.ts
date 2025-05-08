import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";

import { notebooksTable } from "./notebooks";

export const materialsTable = pgTable("materials", (t) => ({
  id: t.uuid().defaultRandom().primaryKey().notNull(),
  notebookId: t
    .uuid("notebook_id")
    .references(() => notebooksTable.id, { onDelete: "cascade" })
    .notNull(),
  title: t.text().notNull(),
  type: t.text({ enum: ["text", "file", "link"] }).notNull(),

  // * Content of different sources (text, file, link)
  rawContent: t.text("raw_content"),
  fileUrl: t.text("file_url"),
  linkUrl: t.text("link_url"),
  // * Processed text content to be used by the AI
  processedTextContent: t.text("processed_text_content"),

  // * Additional metadata for file and link types
  metadata: t.jsonb(), // ? Ex: { filename: "example.pdf", size: 123456 }

  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at").defaultNow().notNull(),
}));

export const materialInsertSchema = createInsertSchema(materialsTable, {
  rawContent: (schema) => schema.max(2001).optional(),
  linkUrl: (schema) => schema.url().optional(),
  fileUrl: (schema) => schema.url().optional(),
});
export const materialUpdateSchema = createUpdateSchema(materialsTable, {
  rawContent: (schema) => schema.max(2001).optional(),
  linkUrl: (schema) => schema.url().optional(),
  fileUrl: (schema) => schema.url().optional(),
});

export const materialsRelations = relations(materialsTable, ({ one }) => ({
  notebook: one(notebooksTable, {
    fields: [materialsTable.notebookId],
    references: [notebooksTable.id],
  }),
}));
