import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const targetRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.target.findMany();
  }),
  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      const { slug } = input;
      return ctx.prisma.target.findUnique({
        where: { slug }      
      });
    }),
});
