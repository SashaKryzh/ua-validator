import { Button } from "@/ui/Button";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="bg-white px-2 py-4">
        <div className="mx-auto flex max-w-screen-md flex-wrap items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="h-3 self-center whitespace-nowrap">
              UA Validator
            </Link>
          </div>
          <div className="flex items-center">
            <Button href="/add-target" variant="triatery">
              Додати
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
