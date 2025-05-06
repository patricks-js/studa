"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/db";
import { notebooksTable } from "@/db/schema";
import { type ActionResult, authActionClient } from "@/lib/safe-action";

const schema = z.object({
  notebookId: z.string(),
});

export const deleteNotebookAction = authActionClient
  .schema(schema)
  .action(async ({ ctx: { userId }, parsedInput }): Promise<ActionResult> => {
    try {
      await db
        .delete(notebooksTable)
        .where(
          and(
            eq(notebooksTable.userId, userId),
            eq(notebooksTable.id, parsedInput.notebookId),
          ),
        );

      revalidatePath("/(sidebar)", "layout");

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to delete notebook",
      };
    }
  });
