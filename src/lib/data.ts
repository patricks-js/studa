import "server-only";

import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { notebooksTable } from "@/db/schema";
import { verifySession } from "./server-utils";
import { sleep } from "./utils";

export async function fetchNotebooks() {
  await sleep(3000);
  const session = await verifySession();

  const notebooks = await db
    .select()
    .from(notebooksTable)
    .where(eq(notebooksTable.userId, session.user.id))
    .orderBy(notebooksTable.createdAt);

  return notebooks;
}

export async function fetchNotebookById(notebookId: string) {
  const session = await verifySession();

  const [notebook] = await db
    .select()
    .from(notebooksTable)
    .where(
      and(
        eq(notebooksTable.userId, session.user.id),
        eq(notebooksTable.id, notebookId),
      ),
    );

  return notebook;
}
