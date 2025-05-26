"use client";
import AnimatedBackground from "@/common/components/AnimatedBackground";
import Logo from "@/common/components/Logo";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  const words = ["Write", "Organize", "Create", "Plan"];
  return (
    <section className="flex min-h-dvh flex-col px-4 font-medium text-secondary">
      <AnimatedBackground />
      <header className="w-full py-4">
        <Logo />
      </header>
      <main className="z-20 mb-10 flex flex-1 flex-col items-center justify-center">
        <div className="mt-6 flex flex-col gap-3 text-center">
          <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            All your notes, in one place.
          </h2>
          <h3 className="text-3xl text-yellow-400 md:text-4xl lg:text-5xl">
            <Typewriter
              words={words}
              loop={true}
              cursor
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h3>
        </div>

        <div className="mt-10 flex flex-col md:flex-row">
          <Link
            href="/login"
            className="z-30 m-2 flex h-12 w-fit min-w-36 items-center justify-center self-center rounded-full bg-secondary px-4 text-xl text-primary duration-200 hover:scale-105 hover:bg-quaternary hover:text-secondary active:translate-y-0.5 md:text-2xl"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="m-2 flex h-12 w-fit min-w-36 items-center justify-center self-center rounded-full bg-tertiary px-4 text-xl text-secondary duration-200 hover:scale-105 hover:bg-quaternary active:translate-y-0.5 disabled:pointer-events-none md:text-2xl"
          >
            Sign Up
          </Link>
        </div>
      </main>
    </section>
  );
}
