import Dots from "@/common/components/Dots";
import { LayoutProps } from "@/common/types";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer } from "react-toastify";

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="relative flex h-dvh min-h-fit flex-col justify-end gap-4 bg-custom-waves bg-cover bg-bottom bg-no-repeat lg:landscape:items-center lg:landscape:justify-center">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <header className="my-auto p-4 text-secondary lg:landscape:absolute lg:landscape:left-0 lg:landscape:top-0 lg:landscape:p-5">
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
      <main className="relative min-h-[65%] w-full rounded-t-custom-authForm bg-secondary p-7 lg:landscape:min-h-fit lg:landscape:max-w-xl lg:landscape:rounded-custom-authForm lg:landscape:p-9">
        {children}
        <Image
          src="images/notes.svg"
          width="200"
          height="200"
          alt="notes"
          priority
          className="absolute right-0 top-0 z-10 w-2/4 max-w-64 -translate-y-3/4 lg:max-w-72 lg:landscape:bottom-0 lg:landscape:top-auto lg:landscape:translate-x-2/4 lg:landscape:translate-y-[15%]"
        />
      </main>

      <div
        aria-hidden="true"
        className="absolute right-0 top-0 hidden h-52 w-52 lg:block"
      >
        <Dots />
      </div>
    </div>
  );
}
