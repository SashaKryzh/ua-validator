import { createTarget } from '@/server/service/target.service';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { CountryCode, JobCode, ViewOnWarCode } from "../../../shared/common_types";
import type { CreateTargetSchema } from '../schema/target.schema';

const transliterator = CyrillicToTranslit({ preset: 'uk' });

export const createTargetHandler = async ({
  input
}: {
  input: CreateTargetSchema;
}) => {
  try {
    // TODO: handle dublicate slugs
    // TODO: handle creation of slug from nickname if
    const slug = transliterator.transform(input.realName, '-').toLowerCase();

    const target = await createTarget({
      slug: slug,
      imageUrl: "imageUrl",
      realName: input.realName,
      nationality: {
        connect: {
          code: CountryCode.UA
        }
      },
      viewOnWar: {
        connect: {
          code: ViewOnWarCode.WITH_ORKY
        }
      },
      jobs: {
        connect: [
          {
            code: JobCode.OTHER,
          }
        ]
      },
      nicknames: {

      },
      evidences: {
        create: [
          {
            resume: "about",
            images: {
              create: {
                path: "url",
              }
            },
            creator: {
              connectOrCreate: {
                where: {
                  id: "id",
                },
                create: {
                  id: "id",
                  email: "email",
                },
              },
            },
          }
        ]
      },
      resources: {
        create: { url: "rl" }
      },
      creator: {
        connectOrCreate: {
          where: {
            id: "id",
          },
          create: {
            id: "id",
            email: "id",
          },
        },
      },
    });

    return target;
  } catch (e) {
    throw e; // TODO: turn into custom error
  }
};
