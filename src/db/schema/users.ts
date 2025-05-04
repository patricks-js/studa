import { pgTable } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", (t) => ({
  id: t.text().primaryKey().notNull(),
  name: t.text().notNull(),
  email: t.text().unique().notNull(),
  emailVerified: t.boolean("email_verified").notNull(),
  image: t.text(),
  createdAt: t.timestamp("created_at").notNull(),
  updatedAt: t.timestamp("updated_at").notNull(),
}));
