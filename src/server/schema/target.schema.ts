import { z } from "zod";
import {
  CountryCode,
  JobCode,
  ViewOnWarCode,
} from "../../../shared/common_types";

export const createTargetSchema = z.object({
  job: z.enum([
    JobCode.UNEMPLOYED,
    JobCode.BLOGGER,
    JobCode.JOURNALIST,
    JobCode.POLITICIAN,
    JobCode.MILITARY,
    JobCode.SINGER,
    JobCode.ACTOR,
    JobCode.SPORTSMAN,
    JobCode.OTHER,
  ]),
  nationality: z.enum([CountryCode.UA, CountryCode.RU, CountryCode.OTHER]),
  viewOnWar: z.enum([
    ViewOnWarCode.WITH_ORKY,
    ViewOnWarCode.WITH_UKRAINE,
    ViewOnWarCode.QUIET,
    ViewOnWarCode.PEACE_DEATH,
  ]),
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
