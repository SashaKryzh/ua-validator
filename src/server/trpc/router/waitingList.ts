import { type Message, sendMail } from '@/server/sendMail';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { addToWaitListSchema } from '@/server/schema/waitList.schema';

export const waitingListRouter = router({
  add: publicProcedure
    .input(addToWaitListSchema)
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
