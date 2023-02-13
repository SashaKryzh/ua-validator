import { z } from "zod";

export const createTargetSchema = z.object({
  realName: z.string(),
  resources: z.array(z.string().url()),
});

export type CreateTargetSchema = z.TypeOf<typeof createTargetSchema>;
