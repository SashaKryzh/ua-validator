import type { TargetFindTargets } from "@/server/controller/target.controller";
import Image from "next/image";
import Link from "next/link";

export interface TargetComponentProps {
  target: TargetFindTargets;
}

export default function TargetComponent({ target }: TargetComponentProps) {
  return (
    <Link href={`/${target.slug}`}>
      <div className="aspect-[3/4]">
        <div className="relative h-full bg-slate-400">
          <Image
            src="/img/stas.jpg"
            alt={`Фотографія ${"Target"}`}
            fill={true}
            className="overflow-hidden object-cover"
          />
        </div>
        <div>🇷🇺 {target.realName}</div>
        <div>За мір</div>
      </div>
    </Link>
  );
}
