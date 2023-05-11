import type { TargetFindTargets } from "@/server/controller/target.controller";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { env } from "@/env/client.mjs";

export interface TargetComponentProps {
  target: TargetFindTargets;
}

export default function TargetComponent({ target }: TargetComponentProps) {
  const { t } = useTranslation();

  return (
    <Link href={`/${target.slug}`}>
      <div className="aspect-[3/4]">
        <div className="relative h-full bg-slate-400">
          <Image
            src={`${env.NEXT_PUBLIC_IMAGE_BUCKET_URL}/${target.imageUrl}`}
            alt={`Фотографія ${target.realName}`}
            fill={true}
            className="overflow-hidden object-cover"
          />
          <div className="absolute bottom-3 left-[0.5rem] rounded-full bg-white px-3 py-1 text-sm opacity-90">
            {t(`CountryCode.${target.nationalityCode}`) +
              " " +
              t(`JobCode.${target.jobs[0]?.code}`)}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center py-2">
        <div className="text-lg">
          {target.realName ?? target.nicknames[0]?.value}
        </div>
        <div className="text-md font-light">
          {t(`ViewOnWarCode.${target.viewOnWarCode}`)}
        </div>
      </div>
    </Link>
  );
}
