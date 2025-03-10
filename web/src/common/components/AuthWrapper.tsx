import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Dots from "@/common/components/Dots";

type AuthWrapperProps = {
  children: ReactNode;
};

export default function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <div className="relative grid min-h-[100dvh] grid-rows-authWrapper lg:grid-cols-authWrapper lg:grid-rows-authWrapperDesktop">
      <header className="my-auto ml-2 w-fit p-2 text-secondary lg:col-span-2 lg:mb-0 lg:ml-5">
        <Link href="/">
          <h1 className="inline-block text-4xl md:text-5xl">
            Notes
            <span className="relative my-2 block h-0.5 w-full bg-secondary">
              <span className="absolute left-0 top-2/4 h-1 w-1 -translate-y-2/4 rotate-45 bg-secondary"></span>
              <span className="absolute right-0 top-2/4 h-1 w-1 -translate-y-2/4 rotate-45 bg-secondary"></span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl">
            a casual
            <span className="block">note taking app</span>
          </p>
        </Link>
      </header>
      <main className="relative w-full max-w-screen-lg rounded-t-custom-authForm bg-secondary p-10 text-center lg:col-start-2 lg:row-start-2 lg:rounded-custom-authForm lg:py-24">
        <Image
          src="images/notes.svg"
          width="240"
          height="200"
          alt="notes"
          className="absolute right-0 top-0 w-2/4 max-w-xs -translate-y-3/4 lg:bottom-0 lg:top-auto lg:translate-x-2/4 lg:translate-y-1/4"
          unoptimized
        />
        {children}
      </main>
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 hidden h-[300px] w-[300px] lg:block"
      >
        <Dots amount={49} multiplier={12} maxDotLength={30} minDotLength={10} />
      </div>

      <div
        aria-hidden="true"
        className="absolute right-0 top-0 hidden h-[300px] w-[300px] lg:block"
      >
        <Dots amount={49} multiplier={12} maxDotLength={30} minDotLength={10} />
      </div>
    </div>
  );
}
