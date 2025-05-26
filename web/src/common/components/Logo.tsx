import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";

type LogoProps = ComponentProps<"a">;
export default function Logo(props: LogoProps) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 font-medium"
      {...props}
    >
      <Image
        src="images/notes.svg"
        alt="My Notes"
        aria-hidden="true"
        width="50"
        height="50"
        className="h-12 w-auto"
      />
      <h1 className="text-2xl">My Notes</h1>
    </Link>
  );
}
