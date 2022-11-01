import { router } from "../trpc";
import { targetsRouter } from "./targets";

export const appRouter = router({
  targets: targetsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
