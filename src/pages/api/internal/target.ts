import type { Target } from '@prisma/client';
import { prisma } from '@/server/db/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { type TargetFullData, retrieveFullTargetByName } from '@/server/repository/target_actions';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  verifyAuth(req, res);

  switch (req.method) {
    case 'GET': {
      const { name } = req.query;
      retrieveFullTargetByName(name as string).then((data) => {
        console.log(data[0] as TargetFullData); // HOW TO LIMIT NUMBER OF FIELDS
        
        res.status(200).json(data)
      });
      break;
    }
    case 'POST': {
      const target: Target = req.body;
      prisma.target.create({
        data: target,
      }).then((data) => {
        res.status(200).json(data)
      }).catch((err) => {
        res.status(400).json({ result: 'Error saving' })
      });
    }
    default:
      res.status(400).json({ result: 'Error' })
  }
}

function verifyAuth(req: NextApiRequest, res: NextApiResponse) {
  req.headers['user_name'] === process.env.USER_NAME ? null : res.status(401).json({ result: 'Error' });
}
