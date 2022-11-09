import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const nationalityRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.nationality.findMany();
  }),
});
