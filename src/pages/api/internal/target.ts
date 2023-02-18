import { createTargetHandler } from '@/server/controller/target.controller';
import { retrieveAllFullTarget, retrieveFullTargetByName } from '@/server/repository/target_actions';
import type { CreateTargetSchema } from '@/server/schema/target.schema';
import { createTargetSchema } from '@/server/schema/target.schema';
import type { NextApiRequest, NextApiResponse } from 'next';

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
      const errorList: string[] = [];
      const failedTargets = [];

      const rawArray: [] = req.body;
      const targets: CreateTargetSchema[] = [];

      rawArray.forEach(e => {
        try {
          targets.push(createTargetSchema.parse(e));
        } catch (err) {
          console.log(err);
          
          failedTargets.push(e);
        }
      });

      for (const target of targets) {
        try {
          await createTargetHandler({ input: target });
        } catch (err) {
          errorList.push(target.realName);
          failedTargets.push(target);
        }
      }

      if (failedTargets.length > 0) {
        res.status(400).json({ result: `Error: ${rawArray.length}/${failedTargets.length} failed`, errorList: errorList, failedTargets: failedTargets, });
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
