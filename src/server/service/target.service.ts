import { prisma } from "@/server/db/client";
import type { Prisma, Target } from "@prisma/client";

export const createTarget = async (input: Prisma.TargetCreateInput) => {
  return (await prisma.target.create({
    data: input,
  })) as Target;
};

export const findTargets = async ({
  where,
  select,
  take,
  skip,
}: {
  where?: Partial<Prisma.TargetWhereInput>;
  select?: Prisma.TargetSelect;
  take?: number;
  skip?: number;
}) => {
  const targets = await prisma.target.findMany({
    where,
    select,
    take,
    skip,
  });
  return targets && (targets as Target[]);
};

export const findFirstTarget = async (
  where: Partial<Prisma.TargetWhereInput>,
  select?: Prisma.TargetSelect
) => {
  const target = await prisma.target.findFirst({
    where,
    select,
  });
  return target && (target as Target);
};

export const findUniqueTarget = async (
  where: Partial<Prisma.TargetWhereUniqueInput>,
  select?: Prisma.TargetSelect
) => {
  const target = await prisma.target.findUnique({
    where,
    select,
  });
  return target && (target as Target);
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
