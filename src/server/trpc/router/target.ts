import { createTargetHandler } from '@/server/controller/target.controller';
import { createTargetSchema } from './../../schema/target.schema';

import { z } from "zod";

import { publicProcedure, router } from "../trpc";

export const targetRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.target.findMany();
  }),
  byName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ ctx, input }) => {
      const { name } = input;
      return ctx.prisma.target.findMany({
        where: {
          OR: [
            {
              realName: {
                contains: name,
              },
            },
            {
              nicknames: {
                some: {
                  value: {
                    contains: name,
                  },
                },
              },
            },
          ],
        },
      });
    }),
  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      const { slug } = input;
      return ctx.prisma.target.findUnique({
        where: { slug },
      });
    }),
  create: publicProcedure
    .input(createTargetSchema)
    .mutation(({ input }) => createTargetHandler({ input })),
});
