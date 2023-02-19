import { PrismaClient } from "@prisma/client";
import { CountryCode, JobCode, ViewOnWarCode } from "../shared/common_types";

const prisma = new PrismaClient();

/* eslint-disable @typescript-eslint/no-unused-vars */
async function main() {
  // Nationalities

  for (const code of Object.keys(CountryCode)) {
    await prisma.nationality.upsert({
      where: { code: code },
      update: {},
      create: {
        code: code,
      },
    });
  }

  // Jobs

  for (const code of Object.keys(JobCode)) {
    await prisma.job.upsert({
      where: { code: code },
      update: {},
      create: {
        code: code,
      },
    });
  }

  // View on war

  for (const code of Object.keys(ViewOnWarCode)) {
    await prisma.viewOnWar.upsert({
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
      imageUrl: "",
      realName: "Стас Васильев",
      jobs: {
        connect: [{ code: JobCode.BLOGGER }],
      },
      nationality: {
        connect: { code: CountryCode.RU },
      },
      viewOnWar: {
        connect: { code: ViewOnWarCode.WITH_ORKY },
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

  const target_putin = await prisma.target.upsert({
    where: { slug: "putin-huy" },
    update: {},
    create: {
      id: "putin-huy",
      slug: "putin-huy",
      imageUrl: "",
      realName: "Путин",
      jobs: {
        connect: [{ code: JobCode.POLITICIAN }],
      },
      nationality: {
        connect: { code: CountryCode.RU },
      },
      viewOnWar: {
        connect: { code: ViewOnWarCode.WITH_ORKY },
      },
      nicknames: {
        create: [
          {
            value: "putinhuy",
          },
          {
            value: "putin",
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

  // Evidences

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
