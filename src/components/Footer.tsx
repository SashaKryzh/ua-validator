import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4  md:flex md:items-center md:justify-between md:p-6">
      <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
        © {new Date().getFullYear() + " "}
        <Link href="/" className="hover:underline">
          UA Validator
        </Link>
        . All Rights Reserved.
      </span>
      <ul className="mt-3 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <Link href="#" className="mr-4 hover:underline md:mr-6 ">
            About
          </Link>
        </li>
        <li>
          <Link href="#" className="mr-4 hover:underline md:mr-6">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="#" className="mr-4 hover:underline md:mr-6">
            Licensing
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:underline">
            Contact
          </Link>
        </li>
      </ul>
    </footer>
  );
}
