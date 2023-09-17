import { prisma } from '@/server/db/client';
import { Prisma } from '@prisma/client';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { z } from 'zod';
import type { CreateTargetSchema } from '../schema/target.schema';

const transliterator = CyrillicToTranslit({ preset: 'uk' });

export const createTargetHandler = async ({
  input,
  creatorEmail,
}: {
  input: CreateTargetSchema;
  creatorEmail?: string;
}) => {
  try {
    const slug = await findAvailableSlug(input);

    return await prisma.target.create({
      data: {
        slug: slug,
        imageUrl: input.imageUrl,
        realName: input.realName,
        nationality: {
          connect: {
            code: input.nationality,
          },
        },
        viewOnWar: {
          connect: {
            code: input.viewOnWar,
          },
        },
        jobs: {
          connect: [
            {
              code: input.job,
            },
          ],
        },
        nicknames: {
          create: input.nicknames.map((n) => ({ value: n })),
        },
        evidences: {
          create: [
            {
              resume: input.evidence.resume,
              images: {
                create: input.evidence.images.map((i) => ({ path: i })),
              },
              creator: connectIfAny(creatorEmail),
            },
          ],
        },
        resources: {
          create: input.resources.map((r) => ({ url: r })),
        },
        creator: connectIfAny(creatorEmail),
      },
    });
  } catch (e) {
    throw e; // TODO: turn into custom error
  }
};

const FindTargetsInclude = Prisma.validator<Prisma.TargetInclude>()({
  nicknames: true,
  resources: true,
  mainEvidence: true,
  jobs: true,
});

/**
 * Finds targets by name or resource.
 * NOTE: search will be case-insensitive with MySQL by default
 *       (use mode: 'insensitive' for PostgreSQL)
 * @param query target name or resource url
 * @param limit
 * @param cursor
 */
export const findTargetsHandler = async ({
  query,
  limit = 20,
  cursor,
}: {
  query?: string;
  limit?: number;
  cursor?: string;
}) => {
  query = query?.trim();

  const isUrl = z.string().url().safeParse(query).success;

  const where: Prisma.TargetWhereInput = isUrl
    ? { resources: { some: { url: query } }, deleted: false }
    : {
        OR: [
          { realName: { contains: query } },
          {
            nicknames: {
              some: { value: { contains: query } },
            },
          },
        ],
        deleted: false,
      };

  const targets = await prisma.target.findMany({
    where: query ? where : undefined,
    include: FindTargetsInclude,
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,
  });

  let nextCursor: string | undefined = undefined;
  if (targets.length > limit) {
    const nextTarget = targets.pop();
    nextCursor = nextTarget?.id;
  }

  return { targets, cursor: nextCursor };
};

export type TargetFindTargets = Prisma.PromiseReturnType<
  typeof findTargetsHandler
>['targets'][number];

const FindTargetInclude = Prisma.validator<Prisma.TargetInclude>()({
  nicknames: true,
  resources: true,
  mainEvidence: true,
  jobs: true,
  evidences: {
    include: {
      images: true,
    },
  },
});

/**
 * Finds a target by slug.
 * @param slug unique target identifier
 */
export const findTargetHandler = async ({ slug }: { slug: string }) => {
  slug = slug.trim();

  return prisma.target.findFirst({
    where: {
      slug: slug,
      deleted: false,
    },
    include: FindTargetInclude,
  });
};

export type TargetFindTarget = Prisma.PromiseReturnType<
  typeof findTargetHandler
>;

/**
 * Converts target name to a slug.
 * Adding a number to the end if the slug is already taken.
 * @param input target data
 */
async function findAvailableSlug(input: CreateTargetSchema) {
  const knownName = input.realName ?? input.nicknames[0] ?? 'unknown';
  let slug = transliterator.transform(knownName, '-').toLowerCase();

  // TODO: Improve checking for existing slug
  // AR: new slug = "stas" and we already have "stasiv" - contains "stas", so we will get "stas-1"
  // ER: new slug should be "stas"
  const existingTargets = await prisma.target.findMany({
    where: {
      slug: {
        contains: slug,
      },
    },
  });
  if (existingTargets.length > 0) {
    console.log(existingTargets.length);
    slug += `-${existingTargets.length}`;
  }
  return slug;
}

/**
 * Connects to a user if email is provided.
 * @param creatorEmail email of the user
 */
function connectIfAny(creatorEmail?: string) {
  if (!creatorEmail) return;

  return {
    connectOrCreate: {
      where: {
        email: creatorEmail,
      },
      create: {
        email: creatorEmail,
      },
    },
  };
}
