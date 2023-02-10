import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { CountryCode, JobCode, ViewOnWarCode } from "../../../../shared/common_types";
import { prisma } from '@/server/db/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { retrieveFullTargetByName, retrieveAllFullTarget } from '@/server/repository/target_actions';
import { randomUUID } from 'crypto';

const transliterator = CyrillicToTranslit({ preset: 'uk' });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  verifyAuth(req, res);

  switch (req.method) {
    case 'GET': {
      const { name } = req.query;
      if (name === undefined || name === '') {
        retrieveAllFullTarget().then((data) => {
          res.status(200).json(data);
        });
      } else {
        retrieveFullTargetByName(name as string).then((data) => {
          // TODO: INVESTIGATE HOW TO LIMIT NUMBER OF FIELDS RETURNED? (REMOVE IDS)
          res.status(200).json(data);
        });
      }
      break;
    }
    case 'POST': {
      const inputTargets: InputTarget[] = req.body;
      const errorList: string[] = [];
      const failedTargets: InputTarget[] = [];

      for (const inputTarget of inputTargets) {
        // TODO: processing to convert nationality, job... into correct Enum values
        const slug = transliterator.transform(inputTarget.realName, '-').toLowerCase();
        const creatorId = req.headers['user_name'] as string;

        try {
          const target = await prisma.target.upsert({
            where: {
              slug: slug,
            },
            create: {
              id: randomUUID(),
              slug: slug,
              imageUrl: inputTarget.photo,
              realName: inputTarget.realName,
              nationality: {
                connect: {
                  code: mapToCountryCode(inputTarget.nationality)
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
                    code: mapToJobCode(inputTarget.job)
                  }
                ]
              },
              nicknames: {

              },
              evidences: {
                create: [
                  {
                    resume: inputTarget.proof,
                    images: {
                      create: inputTarget.photos.map(photo => {
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
                create: inputTarget.resourceLinks.map(rl => {
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
            },
            update: {
              review: undefined,
              slug: slug,
              imageUrl: inputTarget.photo,
              realName: inputTarget.realName,
              nationality: {
                connect: {
                  code: mapToCountryCode(inputTarget.nationality)
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
                    code: mapToJobCode(inputTarget.job)
                  }
                ]
              },
              nicknames: {

              },
              evidences: {
                create: [
                  {
                    resume: inputTarget.proof,
                    images: {
                      create: inputTarget.photos.map(photo => {
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
                create: inputTarget.resourceLinks.map(rl => {
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
            }
          });
        } catch (e) {
          console.log(e);
          errorList.push(inputTarget.realName);
          failedTargets.push(inputTarget);
        }
      }
      if (errorList.length > 0) {
        res.status(400).json({ result: 'Error', errorList: errorList, failedTargets: failedTargets });
      } else {
        res.status(200).json({ result: 'Success' });
      }
      break;
    }
    default:
      res.status(400).json({ result: 'Error' })
  }
}

function verifyAuth(req: NextApiRequest, res: NextApiResponse) {
  req.headers['user_name'] === process.env.USER_NAME ? null : res.status(401).json({ result: 'Error' });
}

interface InputTarget {
  realName: string;
  proof: string;
  resourceLinks: string[];
  nationality: string;
  job: string;
  photo: string;
  photos: string[]; // evidences
}

// MAPPERS

function mapToCountryCode(country: string): CountryCode {
  return nationalityMap[country as keyof typeof nationalityMap] || CountryCode.OTHER;
}

const nationalityMap = {
  'uk': CountryCode.UA,
  'ru': CountryCode.RU,
};
// uk
// ru
// by

function mapToJobCode(job: string): JobCode {
  return jobMap[job as keyof typeof jobMap] || JobCode.OTHER;
}

const jobMap = {
  'Політичні діячі': JobCode.POLITICIAN,
  'Influencers': JobCode.BLOGGER,
  'Артисти': JobCode.ACTOR,
  'other': JobCode.OTHER,
}
// Артисти
// Політичні діячі
// Influencers
// Спортсмени



// "job": "Артисти",
// "nationality": "uk",
// "realName": "Ані Лорак",
// "proof": "Замовчування агресора та реальної ситуації в Україні. Мовчазна підтримка путінського режиму.",
// "resourceLinks": [],
// "photo": "/media/brand/img_4615.jpg",
// "photos": [
// 	"/media/brand/2_XgH6CjM.jpg",
// 	"/media/brand/1_Db9UCuo.jpg"
// ]