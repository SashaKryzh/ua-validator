import type { Job, Nationality, ViewOnWar } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { CountryCode, JobCode, ViewOnWarCode } from "../shared/common_types";

const prisma = new PrismaClient();

async function main() {
  // Nationalities

  const nationalities: { [key: string]: Nationality } = {};

  for (const code of Object.keys(CountryCode)) {
    nationalities[code] = await prisma.nationality.upsert({
      where: { code: code },
      update: {},
      create: {
        code: code,
      },
    });
  }

  // Jobs

  const jobs: { [key: string]: Job } = {};

  for (const code of Object.keys(JobCode)) {
    jobs[code] = await prisma.job.upsert({
      where: { code: code },
      update: {},
      create: {
        code: code,
      },
    });
  }

  // View on war

  const views: { [key: string]: ViewOnWar } = {};

  for (const code of Object.keys(ViewOnWarCode)) {
    views[code] = await prisma.viewOnWar.upsert({
      where: { code: code },
      update: {},
      create: {
        code: code,
      },
    });
  }

  // Creators

  const uav = await prisma.creator.upsert({
    where: { email: "admin@uav.com" },
    update: {},
    create: {
      email: "admin@uav.com",
    },
  });

  // Targets

  const target_ikak = await prisma.target.upsert({
    where: { slug: "i-kak-prosto" },
    update: {},
    create: {
      id: "stas",
      slug: "i-kak-prosto",
      imageUrl: "url",
      realName: "Стас Васильев",
      jobs: {
        connect: [{ id: jobs[JobCode.BLOGGER]?.id }],
      },
      nationality: {
        connect: { id: nationalities[CountryCode.RU]?.id },
      },
      viewOnWar: {
        connect: { id: views[ViewOnWarCode.WITH_ORKY]?.id },
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
        connect: { id: uav.id },
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
        connect: { id: uav.id },
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
        connect: { id: uav.id },
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
        connect: { id: uav.id },
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
