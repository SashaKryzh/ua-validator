import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="bg-white px-2 py-4">
        <div className="mx-auto flex max-w-screen-md flex-wrap items-center justify-between">
          <Link href="/">UA Validator</Link>
          <Button variant="ghost" asChild>
            <Link href="/add-target">Додати</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
