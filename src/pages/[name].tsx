import { Head, Layout } from "@/components";
import { env } from "@/env/client.mjs";
import {
  findTargetHandler,
  type TargetFindTarget,
} from "@/server/controller/target.controller";
import { prisma } from "@/server/db/client";
import Spacer from "@/ui/Spacer";
import { EvidenceImage, type TargetResource } from "@prisma/client";
import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineLink } from "react-icons/ai";
import { IoIosResize } from "react-icons/io";
import { Lightbox } from "yet-another-react-lightbox";
import { type NextPageWithLayout } from "./_app";

interface TargetPageProps {
  target: NonNullable<TargetFindTarget>;
}

const TargetPage: NextPageWithLayout<TargetPageProps> = ({ target }) => {
  const { t } = useTranslation();

  const [lightboxOpen, setLightboxOpen] = useState(false);

  const evidenceImages = useMemo(
    () => target.evidences.flatMap((e) => e.images),
    [target.evidences]
  );

  let description = target.evidences
    .map((e) => e.resume)
    .reduce((acc, curr) => acc + curr, "");
  description =
    description.length > 100
      ? description.substring(0, 100).concat("...")
      : description;

  return (
    <>
      <Head
        title={`${target.realName ?? target.nicknames[0]?.value} – ${t(
          `OG.ViewOnWarCode.${target.viewOnWarCode}`
        )}`}
        description={description}
        imageUrl={`${env.NEXT_PUBLIC_IMAGE_BUCKET_URL}/${target.imageUrl}`}
      />
      <div className="flex flex-col items-center px-2 pb-10">
        <div className="flex w-full max-w-screen-md flex-col items-center">
          <div className="relative aspect-square w-full max-w-sm">
            <div className="absolute left-0 top-0 h-full w-full rounded-lg bg-red-700 blur-md" />
            <Image
              src={`${env.NEXT_PUBLIC_IMAGE_BUCKET_URL}/${target.imageUrl}`}
              alt={`Фотографія ${target.realName}`}
              fill={true}
              className="overflow-hidden rounded-lg object-cover"
            />
          </div>
          <Spacer className="h-6" />
          {/* View on war */}
          <div className="rounded-md border px-3 py-1">
            {t(`ViewOnWarCode.${target.viewOnWarCode}`)}
          </div>
          <Spacer className="h-4" />
          {/* Real name */}
          <h1 className="text-2xl">
            {t(`CountryCode.${target.nationalityCode}`) + " "}
            {target.realName ?? target.nicknames[0]?.value}
          </h1>
          <Spacer className="h-2" />
          {/* Jobs */}
          <h3>
            {target.jobs.map((job) => t(`JobCode.${job.code}`)).join(" / ")}
          </h3>
          <Spacer className="h-4" />
          {/* Resources */}
          <div className="flex gap-4">
            {target.resources.map((resource) => ResourceItem({ resource }))}
          </div>
          <Spacer className="h-4" />
          {/* Main evidence */}
          {target.evidences.map((evid) => (
            <p key={evid.id} className="max-w-xl">
              {evid.resume}
            </p>
          ))}
          <Spacer className="h-4" />
          {/* Evidences */}
          <div className="grid w-full max-w-xl grid-cols-2 gap-2 md:grid-cols-3">
            {evidenceImages.map((image, idx) => (
              <EvidenceImage
                key={image.id}
                index={idx}
                image={image}
                // onClick={() => setLightboxOpen(true)}
              />
            ))}
          </div>
          <Spacer className="h-6" />
          {/* Nicknames */}
          <p className="text-sm font-light italic">
            {target.nicknames.map((n) => n.value).join(", ")}
          </p>
        </div>
      </div>
      {/* TODO: Fix it (not working correctly) */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        // slides={evidenceImages.map((image) => ({
        //   src: `${env.NEXT_PUBLIC_IMAGE_BUCKET_URL}/${image.path}`,
        // }))}
        slides={[
          {
            src: "https://camo.githubusercontent.com/40c0380be796f32f9e65885e212c8512eb991b2c146b1dbb242c371b8d561a90/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f67657268796e65732f696d6167652f75706c6f61642f715f6175746f2f76313538373232353838302f53637265656e73686f745f323032302d30342d31385f52656163745f5461696c77696e645f47616c6c6572795f73767764746d2e6a7067",
          },
        ]}
        className="absolute left-0 top-0 z-50"
      />
    </>
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

const ResourceItem = (props: { resource: TargetResource }) => {
  return (
    <a href={props.resource.url} target="_blank" rel="noreferrer">
      <div className="flex aspect-square w-10 items-center justify-center rounded-full bg-gray-100">
        {/* TODO: Use different icons for instagram, telegram, website... */}
        <AiOutlineLink />
      </div>
    </a>
  );
};

const EvidenceImage = (props: {
  index: number;
  image: EvidenceImage;
  onClick?: () => void;
}) => {
  const { image } = props;
  return (
    <div className="relative aspect-square" onClick={props.onClick}>
      <Image
        src={`${env.NEXT_PUBLIC_IMAGE_BUCKET_URL}/${image.path}`}
        alt={`Фотографія ${props.index}`}
        fill={true}
        className="overflow-hidden object-cover"
      />
      <div className="duration-15 absolute flex h-full w-full items-center justify-center bg-gray-100 opacity-0 duration-150 hover:opacity-40">
        <IoIosResize size={25} />
      </div>
    </div>
  );
};
