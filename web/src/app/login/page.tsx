import FormInput from "@/common/components/FormInput";
import Image from "next/image";
import Link from "next/link";

import { commonMetadata } from "@/common/shared-metadata";

export const metadata = {
  title: `${commonMetadata.title} Login`,
  description: "Login to my notes",
};

export default function Login() {
  return (
    <div className="relative grid min-h-[100dvh] grid-rows-authWrapper lg:grid-cols-authWrapper lg:grid-rows-none">
      <header className="my-auto ml-2 w-fit p-2 text-secondary lg:mx-auto lg:mt-14">
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
      </header>
      <main className="relative w-full max-w-screen-lg rounded-t-custom-authForm bg-secondary p-10 text-center md:py-20 lg:my-auto lg:rounded-custom-authForm lg:py-24">
        <Image
          src="images/notes.svg"
          width="240"
          height="200"
          alt="notes"
          className="absolute right-0 top-0 w-2/4 max-w-xs -translate-y-3/4 lg:bottom-0 lg:top-auto lg:translate-x-2/4 lg:translate-y-1/4"
          unoptimized
        />
        <form className="mx-auto flex max-w-sm flex-col items-start portrait:max-w-lg">
          <h2 className="mb-3 text-2xl font-semibold md:mb-6 md:text-3xl lg:self-center lg:text-4xl">
            Login
          </h2>
          <FormInput title="email" type="email" iconSrc="images/email.svg" />
          <FormInput
            title="password"
            type="password"
            iconSrc="images/password.svg"
            isRequired
          />
          <Link
            href="/"
            className="mb-7 block self-end text-base font-medium md:text-lg"
          >
            Forgot Password?
          </Link>
          <button className="self-center rounded-full bg-primary px-10 py-2 text-xl text-secondary md:text-2xl">
            Login
          </button>
          <p className="m-1 self-center text-base text-tertiary md:text-lg">
            Don't have account?
            <Link
              href="/"
              className="inline-block p-2 font-medium text-primary"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
