import { prisma } from '@/server/db/client';
import type { Target } from '@prisma/client';

export interface TargetFullData {
  id: string
  slug: string
  imageUrl: string
  realName: string
  nationality: {
    code: string
  },
  viewOnWar: {
    code: string
  },
  nicknames: {
    value: string,
  }[],
  jobs: {
    code: string,
  }[],
  mainEvidence: {
    resume: string,
    createdAt: Date,
    updatedAt: Date,
  } | null,
  creatorId: string
  createdAt: Date
  updatedAt: Date
}

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

export async function retrieveBySlug(slug: string): Promise<Target | null> {
  return prisma.target.findUnique({
    where: {
      slug,
    },
  });
}