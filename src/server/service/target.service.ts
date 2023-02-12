import type { Prisma, Target } from "@prisma/client";
import { prisma } from '@/server/db/client';

export const createTarget = async (input: Prisma.TargetCreateInput) => {
  return (await prisma.target.create({
    data: input,
  })) as Target;
};

export const findTarget = async (
  where: Partial<Prisma.TargetWhereInput>,
  select?: Prisma.TargetSelect
) => {
  return (await prisma.target.findFirst({
    where,
    select,
  })) as Target;
};

export const updateTarget = async (
  where: Prisma.TargetWhereUniqueInput,
  data: Prisma.TargetUpdateInput,
  select?: Prisma.TargetSelect
) => {
  return (await prisma.target.update({
    where,
    data,
    select,
  })) as Target;
};
