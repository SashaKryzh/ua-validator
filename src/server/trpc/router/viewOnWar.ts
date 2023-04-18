import { publicProcedure, router } from "../trpc";

export const viewOnWarRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.viewOnWar.findMany();
  }),
});
