import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const jobRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.job.findMany();
  })
});
