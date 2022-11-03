import Layout from "@/components/Layout";
import type { GetStaticPaths, GetStaticProps } from "next";
import { type NextPageWithLayout } from "./_app";

interface TargetPageProps {
  target: string;
}

const TargetPage: NextPageWithLayout<TargetPageProps> = ({ target }) => {
  return <div>Target page</div>;
};

TargetPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO: return existing slugs in DB
  return {
    paths: [{ params: { name: "Target1" } }, { params: { name: "Target2" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<TargetPageProps> = async (
  context
) => {
  const name = context.params?.name;

  // TODO: check slug in DB
  if (name === "Target3") {
    return {
      notFound: true,
    };
  }

  // TODO: return Target from DB (prisma)

  return {
    props: {
      target: "Target1",
    },
  };
};

export default TargetPage;
