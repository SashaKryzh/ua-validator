import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const nationality_ua = await prisma.nationality.upsert({
    where: { code: "UA" },
    update: {},
    create: {
      code: "UA",
    },
  });
  const nationality_ru = await prisma.nationality.upsert({
    where: { code: "RU" },
    update: {},
    create: {
      code: "RU",
    },
  });
  const nationality_other = await prisma.nationality.upsert({
    where: { code: "OTHER" },
    update: {},
    create: {
      code: "OTHER",
    },
  });

  const job_blogger = await prisma.job.upsert({
    where: { code: "BLOGGER" },
    update: {},
    create: {
      code: "BLOGGER",
    },
  });
  const job_journalist = await prisma.job.upsert({
    where: { code: "JOURNALIST" },
    update: {},
    create: {
      code: "JOURNALIST",
    },
  });
  const job_actor = await prisma.job.upsert({
    where: { code: "ACTOR" },
    update: {},
    create: {
      code: "ACTOR",
    },
  });
  const job_singer = await prisma.job.upsert({
    where: { code: "SINGER" },
    update: {},
    create: {
      code: "SINGER",
    },
  });
  const job_military = await prisma.job.upsert({
    where: { code: "MILITARY" },
    update: {},
    create: {
      code: "MILITARY",
    },
  });
  const job_other = await prisma.job.upsert({
    where: { code: "OTHER" },
    update: {},
    create: {
      code: "OTHER",
    },
  });

  const vow_ukraine = await prisma.viewOnWar.upsert({
    where: { code: "UKRAINE" },
    update: {},
    create: {
      code: "UKRAINE",
    },
  });
  const vow_russia = await prisma.viewOnWar.upsert({
    where: { code: "RUSSIA" },
    update: {},
    create: {
      code: "RUSSIA",
    },
  });
  const vow_quiet = await prisma.viewOnWar.upsert({
    where: { code: "QUIET" },
    update: {},
    create: {
      code: "QUIET",
    },
  });
  const vow_peacedeath = await prisma.viewOnWar.upsert({
    where: { code: "PEACE_DEATH" },
    update: {},
    create: {
      code: "PEACE_DEATH",
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
