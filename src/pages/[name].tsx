import Layout from "@/components/Layout";
import { trpc } from "@/utils/trpc";
import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { type NextPageWithLayout } from "./_app";
import { retrieveBySlug } from "@/server/repository/target_actions";
import type { Target } from "@prisma/client";

interface TargetPageProps {
  target: Target;
}

const TargetPage: NextPageWithLayout<TargetPageProps> = ({ target }) => {
  // TODO: remove this example of the runnable TRPC inside react page
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
            alt={`Фотографія ${target.realName}`}
            fill={true}
            className="overflow-hidden object-cover"
          />
        </div>
        <h1 className="text-2xl">🇷🇺 {target.realName}</h1>
        <div>Псевдонім 1, 2, 3, 4 (in progress)</div>
        <div>{target.viewOnWarId} Мір во всьом мірє</div>
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

  const result = await retrieveBySlug(slug);
  if (!result) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      target: JSON.parse(JSON.stringify(result)) as Target,
    },
  };
};

export default TargetPage;
