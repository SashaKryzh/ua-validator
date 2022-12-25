import Link from "next/link";
import Image from "next/image";

export interface TargetComponentProps {
  target?: string;
}

export default function TargetComponent({ target }: TargetComponentProps) {
  return (
    <Link href={`/${target}`}>
      <div className="aspect-[3/4]">
        <div className="relative h-full bg-slate-400">
          <Image
            src="/img/stas.jpg"
            alt={`Фотографія ${"Target"}`}
            fill={true}
            className="overflow-hidden object-cover"
          />
        </div>
        <div>🇷🇺 {target}</div>
        <div>За мір</div>
      </div>
    </Link>
  );
}
