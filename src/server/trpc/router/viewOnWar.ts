import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const viewOnWarRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.viewOnWar.findMany();
  }),
});
