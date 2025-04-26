"use server";

import { and, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { db } from "../db";
import {
  modulesTable,
  resourceInsertSchema,
  resourcesTable,
} from "../db/schema";
import { auth } from "../lib/auth";
import { authActionClient } from "../lib/safe-action";
import { createModuleSchema, getModuleParamsSchema } from "./schema";

export async function getAllModulesAction() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const modules = await db
    .select({
      id: modulesTable.id,
      title: modulesTable.title,
      description: modulesTable.description,
      createdAt: modulesTable.createdAt,
      lastVisited: modulesTable.lastVisited,
    })
    .from(modulesTable)
    .orderBy(desc(modulesTable.createdAt))
    .where(eq(modulesTable.userId, session.user.id));

  return modules;
}

export const createResourceAction = authActionClient
  .schema(resourceInsertSchema)
  .action(async ({ ctx: { userId }, parsedInput }) => {
    const [moduleFound] = await db
      .select({ id: modulesTable.id })
      .from(modulesTable)
      .where(
        and(
          eq(modulesTable.userId, userId),
          eq(modulesTable.id, parsedInput.moduleId),
        ),
      );

    if (!moduleFound) {
      throw new Error("Module not found");
    }

    const [result] = await db
      .insert(resourcesTable)
      .values({
        moduleId: moduleFound.id,
        title: parsedInput.title,
        content: parsedInput.content,
        type: parsedInput.type,
      })
      .returning({
        id: resourcesTable.id,
      });

    if (!result) {
      throw new Error("Failed to create resource");
    }

    revalidatePath("/(app)", "layout");

    return result;
  });

export async function getAllResourcesByModuleIdAction(moduleId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const resources = await db
    .select({
      id: resourcesTable.id,
      title: resourcesTable.title,
      type: resourcesTable.type,
      content: resourcesTable.content,
      createdAt: resourcesTable.createdAt,
    })
    .from(resourcesTable)
    .where(eq(resourcesTable.moduleId, moduleId));

  return resources;
}

export const createModuleAction = authActionClient
  .schema(createModuleSchema)
  .action(async ({ ctx: { userId }, parsedInput }) => {
    const [result] = await db
      .insert(modulesTable)
      .values({
        userId,
        ...parsedInput,
      })
      .returning({
        id: modulesTable.id,
      });

    if (!result) {
      throw new Error("Failed to create module");
    }

    revalidatePath("/(app)", "layout");

    return result;
  });

export async function getModuleByIdAction(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const [moduleFound] = await db
    .select({
      id: modulesTable.id,
      title: modulesTable.title,
      description: modulesTable.description,
      createdAt: modulesTable.createdAt,
    })
    .from(modulesTable)
    .where(
      and(eq(modulesTable.userId, session.user.id), eq(modulesTable.id, id)),
    );

  if (!moduleFound) {
    throw new Error("Module not found");
  }

  return moduleFound;
}

export const deleteModuleAction = authActionClient
  .schema(getModuleParamsSchema)
  .action(async ({ ctx: { userId }, parsedInput }) => {
    await db
      .delete(modulesTable)
      .where(
        and(
          eq(modulesTable.userId, userId),
          eq(modulesTable.id, parsedInput.moduleId),
        ),
      );

    revalidatePath("/modules", "page");
  });
