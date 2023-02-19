import Layout from "@/components/Layout";
import type { Target } from "@prisma/client";
import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { type NextPageWithLayout } from "./_app";
import { prisma } from "@/server/db/client";

interface TargetPageProps {
  target: Target;
}

const TargetPage: NextPageWithLayout<TargetPageProps> = ({ target }) => {
  return (
    <div className="flex flex-col items-center px-2">
      <div className="flex w-full max-w-screen-md flex-col items-center">
        <div className="relative aspect-square w-full max-w-sm">
          <Image
            src="/img/stas.jpg"
            alt={`Фотографія ${target.realName}`}
            fill={true}
            className="overflow-hidden object-cover"
          />
        </div>
        <h1 className="text-2xl">🇷🇺 {target.realName}</h1>
        <div>Псевдонім 1, 2, 3, 4 (in progress)</div>
        <div>{target.viewOnWarCode} Мір во всьом мірє</div>
        <p className="max-w-xl">
          {target.mainEvidenceId}
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
      {JSON.stringify(target)}
    </div>
  );
};

TargetPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const targets = await prisma.target.findMany({ select: { slug: true } });

  return {
    paths: targets.map((target) => ({ params: { name: target.slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<TargetPageProps> = async (
  context
) => {
  const slug = context.params?.name as string;

  const target = await prisma.target.findUnique({ where: { slug: slug } });
  if (!target) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      target: target,
    },
  };
};

export default TargetPage;
