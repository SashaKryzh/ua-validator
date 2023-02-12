import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { CountryCode, JobCode, ViewOnWarCode } from "../../../shared/common_types";
import { createTarget, findTarget, updateTarget } from '@/server/service/target.service';
import { randomUUID } from 'crypto';

const transliterator = CyrillicToTranslit({ preset: 'uk' });

export const createTargetHandler = async ({
  input,
  creatorId
}: {
  input: InputTarget; // TODO: use domain type here (see below)
  creatorId: string;
}) => {
  try {
    const slug = transliterator.transform(input.realName, '-').toLowerCase();

    const target = await createTarget({
      id: randomUUID(),
      slug: slug,
      imageUrl: input.photo,
      realName: input.realName,
      nationality: {
        connect: {
          code: mapToCountryCode(input.nationality)
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
            code: mapToJobCode(input.job)
          }
        ]
      },
      nicknames: {

      },
      evidences: {
        create: [
          {
            resume: input.proof,
            images: {
              create: input.photos.map(photo => {
                return { path: photo }
              })
            },
            creator: {
              connectOrCreate: {
                where: {
                  id: creatorId,
                },
                create: {
                  id: creatorId,
                  email: creatorId,
                },
              },
            },
          }
        ]
      },
      resources: {
        create: input.resourceLinks.map(rl => {
          return { url: rl }
        })
      },
      creator: {
        connectOrCreate: {
          where: {
            id: creatorId,
          },
          create: {
            id: creatorId,
            email: creatorId,
          },
        },
      },
    });

    return target; // TODO: discuss to return something better.
  } catch (e) {
    console.error(e);
    throw e; // TODO: turn into custom error
  }
};


export const getTargetHandler = async ({
  realName, // TODO: not really good to base on name only (add more unique params)
}: {
  realName: string;
}) => {
  try {
    const slug = transliterator.transform(realName, '-').toLowerCase();

    const target = await findTarget({ slug: slug });

    if (!target) {
      return null;
    }

    return target;
  } catch (e) {
    console.error(e);
    throw e;
  }
};


export const updateTargetHandler = async ({
  targetId,
  input,
  creatorId
}: {
  targetId: string;
  input: InputTarget; // TODO: use domain type here (see below)
  creatorId: string;
}) => {
  try {
    const slug = transliterator.transform(input.realName, '-').toLowerCase();

    const target = await updateTarget({
      id: targetId,
    }, {
      review: undefined,
      slug: slug,
      imageUrl: input.photo,
      realName: input.realName,
      nationality: {
        connect: {
          code: mapToCountryCode(input.nationality)
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
            code: mapToJobCode(input.job)
          }
        ]
      },
      nicknames: {

      },
      evidences: {
        create: [ // TODO: rethink what to do with existing evidences
          {
            resume: input.proof,
            images: {
              create: input.photos.map(photo => {
                return { path: photo }
              })
            },
            creator: {
              connectOrCreate: {
                where: {
                  id: creatorId,
                },
                create: {
                  id: creatorId,
                  email: creatorId,
                },
              },
            },
          }
        ]
      },
      resources: {
        create: input.resourceLinks.map(rl => {
          return { url: rl }
        })
      },
      creator: {
        connectOrCreate: {
          where: {
            id: creatorId,
          },
          create: {
            id: creatorId,
            email: creatorId,
          },
        },
      },
    });

    if (!target) {
      throw new Error('Target not found');
    }

    return target; // TODO: discuss to return something better.
  } catch (e) {
    console.error(e);
    throw e; // TODO: turn into custom error
  }
}


/*-------------------------------WE CAN DO BETTER---------------------------------*/

// TODO: use more generic type instead of InputTarget. 
//  Add transpformers for different places (API, forms), and put mappers in them.
function mapToCountryCode(country: string): CountryCode {
  return nationalityMap[country as keyof typeof nationalityMap] || CountryCode.OTHER;
}

const nationalityMap = {
  'uk': CountryCode.UA,
  'ru': CountryCode.RU,
};

function mapToJobCode(job: string): JobCode {
  return jobMap[job as keyof typeof jobMap] || JobCode.OTHER;
}

const jobMap = {
  'Політичні діячі': JobCode.POLITICIAN,
  'Influencers': JobCode.BLOGGER,
  'Артисти': JobCode.ACTOR,
  'other': JobCode.OTHER,
}

// TODO: move this to other place. 
//  Split into DomainTarget type (used in controller logic) and some ApiInputTarget type (for API)
//  later add FormInputTarget type (for forms)
export interface InputTarget {
  realName: string;
  proof: string;
  resourceLinks: string[];
  nationality: string;
  job: string;
  photo: string;
  photos: string[]; // evidences
}
