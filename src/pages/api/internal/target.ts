import type { Target } from '@prisma/client';
import { CountryCode, JobCode, ViewOnWarCode } from "../../../../shared/common_types";
import { prisma } from '@/server/db/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { retrieveFullTargetByName, retrieveAllFullTarget } from '@/server/repository/target_actions';
import { randomUUID } from 'crypto';

export default function handler(
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
          // TODO: HOW TO LIMIT NUMBER OF FIELDS RETURNED? REMOVE IDS
          res.status(200).json(data);
        });
      }
      break;
    }
    case 'POST': {
      const inputTarget: InputTarget = req.body;

      // TODO: processing to convert nationality, job... into correct Enum values
      const slug = inputTarget.realName.toLowerCase().replace(/ /g, '-');

      prisma.target.upsert({
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
              code: CountryCode.RU
            }
          },
          viewOnWar: {
            connect: {
              code: ViewOnWarCode.PEACE_DEATH
            }
          },
          jobs: {
            connect: [
              {
                code: JobCode.BLOGGER
              }
            ]
          },
          nicknames: {

          },
          evidences: {

          },
          resources: {
            create: inputTarget.resourceLinks.map(rl => {
              return {
                url: rl
              }
            })
          },
          creator: {
            connectOrCreate: {
              where: {
                id: req.headers['user_name'] as string,
              },
              create: {
                id: req.headers['user_name'] as string,
                email: req.headers['user_name'] as string,
              },
            },
          },
        },
        update: {
          imageUrl: inputTarget.photo,
          realName: inputTarget.realName,

          resources: {
            create: inputTarget.resourceLinks.map(rl => {
              return {
                url: rl
              }
            })
          },

          review: undefined,
        }
      }).then((data) => {
        res.status(200).json(data)
      }).catch((err) => {
        res.status(400).json({ result: 'Error saving' })
      });
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