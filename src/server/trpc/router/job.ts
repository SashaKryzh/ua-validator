import { publicProcedure, router } from "../trpc";

export const jobRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.job.findMany();
  }),
});
