import { z } from "zod";

export const createModuleSchema = z.object({
  title: z.string().min(4),
  description: z.string().optional(),
});

export const getModuleParamsSchema = z.object({
  moduleId: z.string().uuid(),
});
