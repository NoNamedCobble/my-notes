import Dots from "@/common/components/Dots";
import { LayoutProps } from "@/common/types";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="relative grid h-dvh grid-rows-3 lg:grid-cols-4 lg:grid-rows-5">
      <header className="my-auto ml-2 w-fit p-2 text-secondary lg:col-start-1 lg:mb-0 lg:ml-5">
        <Link href="/">
          <h1 className="inline-block text-4xl md:text-5xl">
            Notes
            <span className="relative my-2 block h-0.5 w-full bg-secondary">
              <span className="absolute left-0 top-2/4 h-1 w-1 -translate-y-2/4 rotate-45 bg-secondary"></span>
              <span className="absolute right-0 top-2/4 h-1 w-1 -translate-y-2/4 rotate-45 bg-secondary"></span>
            </span>
          </h1>
          <p className="text-xl leading-none md:text-2xl md:leading-none">
            a casual
            <span className="block">note taking app</span>
          </p>
        </Link>
      </header>
      <main className="relative row-span-2 w-full max-w-screen-lg justify-self-center rounded-t-custom-authForm bg-secondary p-8 text-center lg:col-span-2 lg:col-start-2 lg:row-span-full lg:my-auto lg:min-h-[30rem] lg:max-w-screen-sm lg:rounded-custom-authForm">
        {children}
        <Image
          src="images/notes.svg"
          width="200"
          height="200"
          alt="notes"
          className="absolute right-0 top-0 w-2/4 max-w-72 -translate-y-3/4 lg:bottom-0 lg:top-auto lg:translate-x-2/4 lg:translate-y-1/4"
        />
      </main>
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 hidden h-[200px] w-[200px] lg:block"
      >
        <Dots />
      </div>
    </div>
  );
}
