import { type InputTarget, createTargetHandler, getTargetHandler, updateTargetHandler } from '@/server/controller/target.controller';
import type { NextApiRequest, NextApiResponse } from 'next'
import { retrieveFullTargetByName, retrieveAllFullTarget } from '@/server/repository/target_actions';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  verifyAuth(req, res);

  switch (req.method) {
    case 'GET': {
      // TODO: move this shit to controller
      const { name } = req.query;
      if (name === undefined || name === '') {
        retrieveAllFullTarget().then((data) => {
          res.status(200).json(data);
        });
      } else {
        retrieveFullTargetByName(name as string).then((data) => {
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
        const creatorId = req.headers['user_name'] as string;

        try {
          // TODO: optimize this flow (looks like hits performance.)
          const exsitingTarget = await getTargetHandler({ realName: inputTarget.realName });

          if (exsitingTarget) {
            await updateTargetHandler({ targetId: exsitingTarget.id, input: inputTarget, creatorId: creatorId });
          } else {
            await createTargetHandler({ input: inputTarget, creatorId: creatorId });
          }

        } catch (e) {
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