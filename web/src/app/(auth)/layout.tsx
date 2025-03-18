import Dots from "@/common/components/Dots";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative grid h-dvh grid-rows-3 lg:grid-cols-4 lg:grid-rows-5">
      <header className="text-secondary my-auto ml-2 w-fit p-2 lg:col-start-1 lg:mb-0 lg:ml-5">
        <Link href="/">
          <h1 className="inline-block text-4xl md:text-5xl">
            Notes
            <span className="bg-secondary relative my-2 block h-0.5 w-full">
              <span className="bg-secondary absolute left-0 top-2/4 h-1 w-1 -translate-y-2/4 rotate-45"></span>
              <span className="bg-secondary absolute right-0 top-2/4 h-1 w-1 -translate-y-2/4 rotate-45"></span>
            </span>
          </h1>
          <p className="text-xl leading-none md:text-2xl md:leading-none">
            a casual
            <span className="block">note taking app</span>
          </p>
        </Link>
      </header>
      <main className="rounded-t-custom-authForm bg-secondary lg:rounded-custom-authForm relative row-span-2 w-full max-w-screen-lg justify-self-center p-10 text-center lg:col-span-2 lg:col-start-2 lg:row-span-full lg:my-auto lg:min-h-[30rem] lg:max-w-screen-sm">
        <Image
          src="images/notes.svg"
          width="200"
          height="200"
          alt="notes"
          className="absolute right-0 top-0 w-2/4 max-w-xs -translate-y-3/4 lg:bottom-0 lg:top-auto lg:translate-x-2/4 lg:translate-y-1/4"
          unoptimized
        />
        {children}
      </main>
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 hidden h-[200px] w-[200px] lg:block"
      >
        <Dots amount={49} multiplier={12} maxDotLength={20} minDotLength={4} />
      </div>
    </div>
  );
}
