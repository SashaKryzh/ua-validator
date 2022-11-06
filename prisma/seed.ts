import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // await prisma..upsert({
  //   where: { email: "user1@test.com" },
  //   update: {},
  //   create: {
  //     email: "user1@test.com",
  //     name: "User 1",
  //   },
  // });

  // console.log(user1);

  // await prisma.target.upsert({
  //   where: { slug: "target-1" },
  //   update: {},
  //   create: {
  //     name: "Target 1",
  //     slug: "target-1",
  //     verdict: {
  //       create: {
  //         name: "Verdict 1",
  //       },
  //     },
  //     resources: {
  //       create: [
  //         {
  //           name: "Resource 1",
  //           link: "https://example.com",
  //           main: true,
  //         },
  //       ],
  //     },
  //   },
  // });
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
