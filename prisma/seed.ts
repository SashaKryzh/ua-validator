import { PrismaClient } from "@prisma/client";
import { CountryCode, JobCode, ViewOnWarCode } from "../shared/common_types";

const prisma = new PrismaClient();

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
