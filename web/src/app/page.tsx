"use client";
import AnimatedBackground from "@/common/components/AnimatedBackground";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-dvh px-4 font-medium text-secondary">
      <AnimatedBackground />
      <header className="w-full py-4">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image
            src="images/notes.svg"
            alt="My Notes"
            width="50"
            height="50"
            className="h-13 w-13"
          />
          <h1 className="text-2xl">My Notes</h1>
        </Link>
      </header>
    </section>
  );
}
