# Create T3 App

This is an app bootstrapped according to the T3-Stack.

## What's next? How do I make an app with this?

Next steps:
`cd ua-validator`
`pnpm prisma db push`
`pnpm dev`

We try to keep this project as simple as possible, so you can start with the most basic configuration and then move on to more advanced configuration.

## How do I deploy this?

- register account at vercel.com
- install Vercel CLI: `pnpm i -g vercel`
- deploy with simple: `vercel`

## How to initialize DB?

- Update local prisma TS client: `pnpx prisma generate`
- To update actual DB schema:
  - simple: `pnpx prisma db push`
  - or: `pnpx prisma migrate dev --name MESSAGE`
- To populate DB with initial data: `pnpx prisma db seed`

### Other useful commands

- To format schema: `pnpx prisma format`
- To clear DB: `pnpx prisma migrate reset`

- To see DB via UI: `pnpx prisma studio`

### How to start with local DB?

- delete prisma/db.sqlite file
- `pnpx prisma generate`
- `pnpx prisma db push`
- `pnpx prisma db seed`
