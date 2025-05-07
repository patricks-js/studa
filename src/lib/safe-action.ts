import { createSafeActionClient } from "next-safe-action";
import { verifySession } from "./server-utils";

export const actionClient = createSafeActionClient();

export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await verifySession();

  return next({ ctx: { userId: session.user.id } });
});

export type ActionResult<TData = void, TError = string> =
  | { success: true; data?: TData }
  | { success: false; error: TError };
