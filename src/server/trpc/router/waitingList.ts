import { publicProcedure, router } from '../trpc';
import { z } from 'zod';

export const waitingListRouter = router({
  add: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.prisma.waitingList.upsert({
        where: { email: input.email },
        update: {
          submitCount: {
            increment: 1,
          },
        },
        create: {
          email: input.email,
        },
      });
      console.log(result);
      // TODO: send email
    }),
});
