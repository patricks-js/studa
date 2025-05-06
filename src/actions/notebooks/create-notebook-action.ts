"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { notebookInsertSchema, notebooksTable } from "@/db/schema";
import { type ActionResult, authActionClient } from "@/lib/safe-action";

const schema = notebookInsertSchema.pick({
  title: true,
  description: true,
});

export const createNotebookAction = authActionClient
  .schema(schema)
  .action(async ({ ctx: { userId }, parsedInput }): Promise<ActionResult> => {
    const [result] = await db
      .insert(notebooksTable)
      .values({
        userId,
        ...parsedInput,
      })
      .returning({
        id: notebooksTable.id,
      });

    if (!result || !result.id) {
      return {
        success: false,
        error: "Failed to create notebook",
      };
    }

    revalidatePath("/(sidebar)", "layout");

    return {
      success: true,
    };
  });
