import { Button } from "@/ui/Button";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="bg-white px-2 py-4">
        <div className="mx-auto flex max-w-screen-md flex-wrap items-center justify-between">
          <Link href="/">UA Validator</Link>
          <Button href="/add-target" variant="triatery">
            Додати
          </Button>
        </div>
      </nav>
    </header>
  );
}
