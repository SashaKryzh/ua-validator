import { prisma } from "@/server/db/client";
import { Prisma } from "@prisma/client";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import { z } from "zod";
import type { CreateTargetSchema } from "../schema/target.schema";

const transliterator = CyrillicToTranslit({ preset: "uk" });

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
              creator: tryConnectCreator(creatorEmail),
            },
          ],
        },
        resources: {
          create: input.resources.map((r) => ({ url: r })),
        },
        creator: tryConnectCreator(creatorEmail),
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
});

export const findTargetsHandler = async ({ query }: { query?: string }) => {
  query = query?.trim();

  if (!query) {
    return prisma.target.findMany({ include: FindTargetsInclude });
  }

  const isUrl = z.string().url().safeParse(query).success;

  return prisma.target.findMany({
    where: isUrl
      ? { resources: { some: { url: query } } }
      : {
          OR: [
            { realName: { contains: query } },
            { nicknames: { some: { value: { contains: query } } } },
          ],
        },
    include: FindTargetsInclude,
  });
};

export type TargetFindTargets = Prisma.PromiseReturnType<
  typeof findTargetsHandler
>[number];

/**
 * Converts target name to a slug.
 * Adding a number to the end if the slug is already taken.
 * @param input target data
 */
async function findAvailableSlug(input: CreateTargetSchema) {
  const knownName = input.realName ?? input.nicknames[0] ?? "unknown";
  let slug = transliterator.transform(knownName, "-").toLowerCase();

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
function tryConnectCreator(creatorEmail?: string) {
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
