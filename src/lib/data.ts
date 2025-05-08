import "server-only";

import { and, asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { materialsTable, notebooksTable } from "@/db/schema";
import { cache } from "react";
import { verifySession } from "./server-utils";

export const fetchNotebooks = cache(async () => {
  const session = await verifySession();

  const notebooks = await db.query.notebooksTable.findMany({
    where: eq(notebooksTable.userId, session.user.id),
    orderBy: [asc(notebooksTable.createdAt)],
  });

  return notebooks;
});

export async function fetchNotebookById(notebookId: string) {
  const session = await verifySession();

  const notebook = await db.query.notebooksTable.findFirst({
    where: and(
      eq(notebooksTable.userId, session.user.id),
      eq(notebooksTable.id, notebookId),
    ),
  });

  return notebook;
}

export async function fetchNotebookMaterials(notebookId: string) {
  await verifySession();

  const materials = await db.query.materialsTable.findMany({
    where: and(eq(materialsTable.notebookId, notebookId)),
    orderBy: [asc(materialsTable.createdAt)],
  });

  return materials;
}
