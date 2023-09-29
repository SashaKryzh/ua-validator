# 🇺🇦 UA Validator

![UA Validator preview](resources/preview.jpg)

⭐️ **[uavalidator.com](https://uavalidator.com/)**

Проект створений [@sashakryzh](https://github.com/SashaKryzh) та [@denitdao](https://github.com/denitdao) з метою вивчення web-розробки. І якщо він допоможе комусь уникнути перегляду орків - це буде найкращим результатом.

[TODOs.md](TODOs.md) - список для вдосконалення.

> За дані вдячні сайту [TheyLoveWar.com](https://theylovewar.com/).

## How to run

This is an app bootstrapped according to the T3-Stack.

### What's next? How do I make an app with this?

Next steps:
`cd ua-validator`
`pnpm prisma db push`
`pnpm dev`

### How do I deploy this?

- register account at vercel.com
- install Vercel CLI: `pnpm i -g vercel`
- deploy with simple: `vercel`

### How to initialize DB?

- Update local prisma TS client: `pnpx prisma generate`
- To update actual DB schema:
  - simple: `pnpx prisma db push`
  - or: `pnpx prisma migrate dev --name MESSAGE`
- To populate DB with initial data: `pnpx prisma db seed`

#### Other useful commands

- To format schema: `pnpx prisma format`
- To clear DB: `pnpx prisma migrate reset`

- To see DB via UI: `pnpx prisma studio`

#### How to start with local DB?

- delete prisma/db.sqlite file
- `pnpx prisma generate`
- `pnpx prisma db push`
- `pnpx prisma db seed`
