import type { TargetFindTargets } from "@/server/controller/target.controller";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

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
            src={`/images/${target.imageUrl}`}
            alt={`Фотографія ${target.realName}`}
            fill={true}
            className="overflow-hidden object-cover"
          />
        </div>
        <div>
          {t(`CountryCode.${target.nationalityCode}`) + " "}
          {target.realName ?? target.nicknames[0]?.value}
        </div>
        <div>{t(`ViewOnWarCode.${target.viewOnWarCode}`)}</div>
      </div>
    </Link>
  );
}
