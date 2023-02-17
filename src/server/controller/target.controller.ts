import { createTarget, findTargets } from "@/server/service/target.service";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import { z } from "zod";
import type { CreateTargetSchema } from "../schema/target.schema";

const transliterator = CyrillicToTranslit({ preset: "uk" });

export const createTargetHandler = async ({
  input,
  creatorEmail,
}: {
  input: CreateTargetSchema;
  creatorEmail: string | null;
}) => {
  try {
    const slug = await findAvailableSlug(input);

    const target = await createTarget({
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
            creator: {
              connectOrCreate: {
                where: {
                  email: creatorEmail ?? "anonymous",
                },
                create: {
                  email: creatorEmail ?? "anonymous",
                },
              },
            },
          },
        ],
      },
      resources: {
        create: input.resources.map((r) => ({ url: r })),
      },
      creator: {
        connectOrCreate: {
          where: {
            email: creatorEmail ?? "anonymous",
          },
          create: {
            email: creatorEmail ?? "anonymous",
          },
        },
      },
    });

    return target;
  } catch (e) {
    throw e; // TODO: turn into custom error
  }
};

export const findTargetsHandler = async ({
  query = "",
  page = 1,
  limit = 10,
}: {
  query?: string;
  page?: number;
  limit?: number;
}) => {
  query = query.trim();

  const isUrl = z.string().url().safeParse(query).success;

  return findTargets({
    where: isUrl
      ? { resources: { some: { url: query } } }
      : {
          OR: [
            { realName: { contains: query } },
            { nicknames: { some: { value: { contains: query } } } },
          ],
        },
    take: limit,
    skip: (page - 1) * limit,
  });
};

/**
 * Converts target name to a slug.
 * Adding a number to the end if the slug is already taken.
 * @param input target data
 */
async function findAvailableSlug(input: CreateTargetSchema) {
  const knownName = input.realName ?? input.nicknames[0] ?? "unknown";
  let slug = transliterator.transform(knownName, "-").toLowerCase();

  const existingTargets = await findTargets({
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
