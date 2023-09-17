import { z } from 'zod';
import {
  CountryCode,
  JobCode,
  ViewOnWarCode,
} from '../../../shared/common_types';

export const createTargetSchema = z.object({
  job: z.nativeEnum(JobCode),
  nationality: z.nativeEnum(CountryCode),
  viewOnWar: z.nativeEnum(ViewOnWarCode),
  realName: z.string().nullish(),
  nicknames: z.array(z.string()).min(1),
  imageUrl: z.string(),
  evidence: z.object({
    resume: z.string(),
    images: z.array(z.string()),
  }),
  resources: z.array(z.string().url()),
});

export type CreateTargetSchema = z.TypeOf<typeof createTargetSchema>;
