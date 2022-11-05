import Link from "next/link";
import Image from "next/image";

export interface TargetProps {
  target: string;
}

export default function Target({ target }: TargetProps) {
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
        <div>🇷🇺 Target name</div>
        <div>За мір</div>
      </div>
    </Link>
  );
}
