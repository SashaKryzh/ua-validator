import { prisma } from '@/server/db/client';
import type { Target } from '@prisma/client';

// TODO: move these actions to new service and controller.

// Deprecated
export async function retrieveAllFullTarget() {
  return prisma.target.findMany({
    include: {
      resources: true,
      evidences: true,
      jobs: true,
      nationality: true,
      viewOnWar: true,
      mainEvidence: true,
      nicknames: true,
      review: true,
    }
  });
}

// Deprecated
export async function retrieveFullTargetByName(name: string) {
  return prisma.target.findMany({
    where: {
      OR: [
        {
          realName: {
            contains: name,
          },
        },
        {
          nicknames: {
            some: {
              value: {
                contains: name,
              },
            },
          },
        },
      ],
    },
    include: {
      resources: true,
      evidences: true,
      jobs: true,
      nationality: true,
      viewOnWar: true,
      mainEvidence: true,
      nicknames: true,
      review: true,
    }
  });
}

// Deprecated
export async function retrieveShortTargetByName(name: string): Promise<Target[]> {
  return prisma.target.findMany({
    where: {
      OR: [
        {
          realName: {
            contains: name,
          },
        },
        {
          nicknames: {
            some: {
              value: {
                contains: name,
              },
            },
          },
        },
      ],
    },
  })
}

// Deprecated
export async function retrieveBySlug(slug: string): Promise<Target | null> {
  return prisma.target.findUnique({
    where: {
      slug,
    },
  });
}