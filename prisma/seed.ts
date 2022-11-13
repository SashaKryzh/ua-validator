import { PrismaClient } from "@prisma/client";
import { CountryCode, JobCode, ViewOnWarCode } from "../shared/common_types";

const prisma = new PrismaClient();

async function main() {
  const nationality_ua = await prisma.nationality.upsert({
    where: { code: CountryCode.UA },
    update: {},
    create: {
      code: CountryCode.UA,
    },
  });
  const nationality_ru = await prisma.nationality.upsert({
    where: { code: CountryCode.RU },
    update: {},
    create: {
      code: CountryCode.RU,
    },
  });
  const nationality_other = await prisma.nationality.upsert({
    where: { code: CountryCode.OTHER },
    update: {},
    create: {
      code: CountryCode.OTHER,
    },
  });

  const job_blogger = await prisma.job.upsert({
    where: { code: JobCode.BLOGGER },
    update: {},
    create: {
      code: JobCode.BLOGGER,
    },
  });
  const job_journalist = await prisma.job.upsert({
    where: { code: JobCode.JOURNALIST },
    update: {},
    create: {
      code: JobCode.JOURNALIST,
    },
  });
  const job_actor = await prisma.job.upsert({
    where: { code: JobCode.ACTOR },
    update: {},
    create: {
      code: JobCode.ACTOR,
    },
  });
  const job_singer = await prisma.job.upsert({
    where: { code: JobCode.SINGER },
    update: {},
    create: {
      code: JobCode.SINGER,
    },
  });
  const job_military = await prisma.job.upsert({
    where: { code: JobCode.MILITARY },
    update: {},
    create: {
      code: JobCode.MILITARY,
    },
  });
  const job_other = await prisma.job.upsert({
    where: { code: JobCode.OTHER },
    update: {},
    create: {
      code: JobCode.OTHER,
    },
  });

  const vow_ukraine = await prisma.viewOnWar.upsert({
    where: { code: ViewOnWarCode.WITH_UKRAINE },
    update: {},
    create: {
      code: ViewOnWarCode.WITH_UKRAINE,
    },
  });
  const vow_russia = await prisma.viewOnWar.upsert({
    where: { code: ViewOnWarCode.WITH_ORKY },
    update: {},
    create: {
      code: ViewOnWarCode.WITH_ORKY,
    },
  });
  const vow_quiet = await prisma.viewOnWar.upsert({
    where: { code: ViewOnWarCode.QUIET },
    update: {},
    create: {
      code: ViewOnWarCode.QUIET,
    },
  });
  const vow_peacedeath = await prisma.viewOnWar.upsert({
    where: { code: ViewOnWarCode.PEACE_DEATH },
    update: {},
    create: {
      code: ViewOnWarCode.PEACE_DEATH,
    },
  });

  const creator_denys = await prisma.creator.upsert({
    where: { email: "denys@uav.com" },
    update: {},
    create: {
      email: "denys@uav.com",
    },
  });
  const creator_alex = await prisma.creator.upsert({
    where: { email: "alex@uav.com" },
    update: {},
    create: {
      email: "alex@uav.com",
    },
  });

  const target_ikak = await prisma.target.upsert({
    where: { slug: "i-kak-prosto" },
    update: {},
    create: {
      id: "stas",
      slug: "i-kak-prosto",
      imageUrl: "url",
      realName: "Стас Васильев",
      jobs: {
        connect: [{ id: job_blogger.id }],
      },
      nationality: {
        connect: { id: nationality_ru.id },
      },
      viewOnWar: {
        connect: { id: vow_russia.id },
      },
      nicknames: {
        create: [
          {
            value: "ikakprosto",
          },
          {
            value: "stas",
          },
        ],
      },
      resources: {
        create: [
          {
            url: "https://example.com",
          },
        ],
      },
      creator: {
        connect: { id: creator_denys.id },
      },
    },
  });

  const evid_ikak = await prisma.evidence.upsert({
    where: { id: "stas_evid" },
    update: {},
    create: {
      id: "stas_evid",
      resume: "resume",
      target: {
        connect: { id: target_ikak.id },
      },
      targetMainEvidence: {
        connect: { id: target_ikak.id },
      },
      urls: {
        create: [],
      },
      images: {
        create: [],
      },
      creator: {
        connect: { id: creator_denys.id },
      },
    },
  });
  
  const evid_ikak_1 = await prisma.evidence.upsert({
    where: { id: "stas_evid_1" },
    update: {},
    create: {
      id: "stas_evid_1",
      resume: "resume",
      target: {
        connect: { id: target_ikak.id },
      },
      urls: {
        create: [],
      },
      images: {
        create: [],
      },
      creator: {
        connect: { id: creator_denys.id },
      },
    },
  });
  
  const evid_ikak_2 = await prisma.evidence.upsert({
    where: { id: "stas_evid_2" },
    update: {},
    create: {
      id: "stas_evid_2",
      resume: "resume",
      target: {
        connect: { id: target_ikak.id },
      },
      urls: {
        create: [],
      },
      images: {
        create: [],
      },
      creator: {
        connect: { id: creator_denys.id },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect;
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
