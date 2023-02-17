import {
  createTargetHandler,
  findTargetsHandler,
} from "@/server/controller/target.controller";
import type { CreateTargetSchema } from "@/server/schema/target.schema";
import { createTargetSchema } from "@/server/schema/target.schema";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  verifyAuth(req, res);

  switch (req.method) {
    case "GET": {
      const { name } = req.query;
      findTargetsHandler({ query: name as string }).then((data) => {
        res.status(200).json(data);
      });

      break;
    }

    case "POST": {
      const errorList: string[] = [];
      const failedTargets = [];
      let targetList: CreateTargetSchema[];

      try {
        targetList = createTargetSchema.array().parse(req.body);
      } catch (err) {
        console.log(err);
        res.status(400).json({ result: "Validation Error" });
        break;
      }

      for (const target of targetList) {
        try {
          await createTargetHandler({
            input: target,
            creatorEmail: "internal@mail.com",
          });
        } catch (err) {
          errorList.push(target.realName ?? target.nicknames[0] ?? "unknown");
          failedTargets.push(target);
        }
      }

      if (failedTargets.length > 0) {
        res.status(400).json({
          result: `Error: ${targetList.length}/${failedTargets.length} failed`,
          errorList: errorList,
          failedTargets: failedTargets,
        });
      } else {
        res.status(200).json({ result: "Success" });
      }

      break;
    }

    default:
      res.status(400).json({ result: "Error" });
  }
}

function verifyAuth(req: NextApiRequest, res: NextApiResponse) {
  if (req.headers["user_name"] !== process.env.USER_NAME) {
    res.status(401).json({ result: "Unauthorized" });
  }
}
