import Link from "next/link";

export interface TargetProps {
  target: string;
}

export default function Target({ target }: TargetProps) {
  return (
    <Link href={`/${target}`}>
      <div>{target}</div>
    </Link>
  );
}
