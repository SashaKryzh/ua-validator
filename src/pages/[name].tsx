import Layout from "@/components/Layout";
import { trpc } from "@/utils/trpc";
import { prisma } from '@/server/db/client';
import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { type NextPageWithLayout } from "./_app";

interface TargetPageProps {
  target: string;
}

const TargetPage: NextPageWithLayout<TargetPageProps> = ({ target }) => {
  // example of the runnable TRPC inside react page
  const userQuery = trpc.target.all.useQuery();
  userQuery.data?.forEach((user) => {
    console.log(user);
  });

  return (
    <div className="flex flex-col items-center px-2">
      <div className="flex w-full max-w-screen-md flex-col items-center">
        <div className="relative aspect-square w-full max-w-sm">
          <Image
            src="/img/stas.jpg"
            alt={`Фотографія ${"Target"}`}
            fill={true}
            className="overflow-hidden object-cover"
          />
        </div>
        <h1 className="text-2xl">🇷🇺 Справжнє імʼя, або перший Псевдонім</h1>
        <div>Псевдонім 1, 2, 3, 4</div>
        <div>Мір во всьом мірє</div>
        <p className="max-w-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sedconsectetur, nisl nec ultricies lacinia, nisl nunc aliquet nisl,
          nec
        </p>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          <div>Evidence photo</div>
          <div>Evidence photo</div>
          <div>Evidence photo</div>
          <div>Evidence photo</div>
        </div>
      </div>
    </div>
  );
};

TargetPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO: return existing slugs in DB
  return {
    paths: [{ params: { name: "i-kak-prosto" } }, { params: { name: "Target2" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<TargetPageProps> = async (
  context
) => {
  const slug: string = context.params?.name as string;

  // query example for prisma
  const result = await prisma.target.findUnique({
    where: {
      slug,
    },
  });
  console.log(result);


  // TODO: check slug in DB
  if (slug === "Target3") {
    return {
      notFound: true,
    };
  }

  // TODO: return Target from DB (prisma)

  return {
    props: {
      target: "i-kak-prosto",
    },
  };
};

export default TargetPage;
