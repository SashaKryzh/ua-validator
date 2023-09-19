import { type Message, sendMail } from '@/server/sendMail';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const waitingListRouter = router({
  add: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.waitingList.upsert({
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

      const message: Message = {
        to: input.email,
        subject: 'Вітаємо! Вас додано до списку очікування | 🇺🇦 UA validator',
        text: 'Ми повідомимо Ваc, коли буде можливо додавати людей до списку.\n\n🇺🇦 UA validator',
      };

      sendMail(message);
    }),
});
