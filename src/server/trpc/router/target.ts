import {
  createTargetHandler,
  findTargetsHandler,
} from "@/server/controller/target.controller";
import { createTargetSchema } from "./../../schema/target.schema";

import { z } from "zod";

import { publicProcedure, router } from "../trpc";

export const targetRouter = router({
  // TODO: somehow prevent targets with deleted = true from being returned
  // Maybe we could create some middleware for this purpose
  find: publicProcedure
    .input(z.object({ query: z.string().optional() }))
    .query(({ input }) => findTargetsHandler({ query: input.query })),
  create: publicProcedure
    .input(createTargetSchema)
    .mutation(({ input }) => createTargetHandler({ input })),
});
