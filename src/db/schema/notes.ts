import { pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { notebooksTable } from "./notebooks";
import { usersTable } from "./users";

export const notesTable = pgTable("notes", (t) => ({
  id: t.uuid().defaultRandom().primaryKey().notNull(),
  userId: t
    .text("user_id")
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  notebookId: t
    .uuid("notebook_id")
    .references(() => notebooksTable.id, { onDelete: "set null" })
    .notNull(),
  title: t.text().notNull(),
  content: t.text(),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at").defaultNow().notNull(),
}));

export const noteInsertSchema = createInsertSchema(notesTable);
