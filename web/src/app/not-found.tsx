import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="text-secondary flex h-dvh flex-col items-center justify-center bg-gradient-to-b from-[#2c2a4a] to-[#4f518c]">
      <h1 className="text-8xl font-medium leading-none lg:text-[12rem]">
        <span className="flex items-end">
          404
          <Image
            src="images/arrows-down.svg"
            alt="arrows down"
            aria-hidden="true"
            className="mx-auto inline-block w-28 self-end"
            width={120}
            height={50}
          />
        </span>
        <span className="block">SORRY</span>
      </h1>
      <Link
        href="/"
        className="text-primary bg-secondary mt-6 rounded-3xl px-4 py-2 text-2xl"
      >
        GO TO HOMEPAGE
      </Link>
    </main>
  );
}
