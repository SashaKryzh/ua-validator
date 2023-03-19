import Layout from "@/components/Layout";
import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { type NextPageWithLayout } from "./_app";
import { prisma } from "@/server/db/client";
import { useTranslation } from "react-i18next";
import {
  findTargetHandler,
  type TargetFindTarget,
} from "@/server/controller/target.controller";

interface TargetPageProps {
  target: NonNullable<TargetFindTarget>;
}

const TargetPage: NextPageWithLayout<TargetPageProps> = ({ target }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center px-2 pb-10">
      <div className="flex w-full max-w-screen-md flex-col items-center">
        <div className="relative aspect-square w-full max-w-sm">
          <Image
            src="/img/stas.jpg"
            alt={`Фотографія ${target.realName}`}
            fill={true}
            className="overflow-hidden object-cover"
          />
        </div>
        <h1 className="text-2xl">
          {t(`CountryCode.${target.nationalityCode}`) + " "}
          {target.realName ?? target.nicknames[0]?.value}
        </h1>
        <div>({target.nicknames.map((n) => n.value).join("; ")})</div>
        <div>{t(`ViewOnWarCode.${target.viewOnWarCode}`)}</div>
        {target.evidences.map((evid) => (
          <p key={evid.id} className="max-w-xl">
            {evid.resume}
          </p>
        ))}
        <div className="grid w-full max-w-xl grid-cols-2 gap-2 md:grid-cols-3">
          {target.evidences
            .flatMap((e) => e.images)
            .map((image, idx) => (
              <div key={image.id} className="relative aspect-square">
                <Image
                  src={"/img/stas.jpg"}
                  alt={`Фотографія ${idx}`}
                  fill={true}
                  className="overflow-hidden object-cover"
                />
              </div>
            ))}
        </div>
        <div>
          {target.resources.map((resource) => (
            <div key={resource.id}>
              <a
                key={resource.id}
                href={resource.url}
                className="text-blue-500"
              >
                {resource.url}
              </a>
            </div>
          ))}
        </div>
      </div>
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

/**
 * Prepares non-nullable data for the page.
 * When target is not found, redirect to another page.
 * @param context
 */
export const getStaticProps: GetStaticProps<TargetPageProps> = async (
  context
) => {
  const slug = context.params?.name as string;

  const target = await findTargetHandler({ slug });
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
