import Input from "@/common/components/Input";
import Image from "next/image";
import Link from "next/link";

import { commonMetadata } from "@/common/shared-metadata";

export const metadata = {
  title: `${commonMetadata.title} Login`,
  description: "Login to my notes",
};

export default function Login() {
  return (
    <div className="flex flex-col h-[100dvh]">
      <header className="h-2/6 mt-10 pt-20 pl-8 text-secondary">
        <h1 className="text-7xl mb-4">Notes</h1>
        <p className="text-2xl">
          a casual
          <span className="block m-1">note taking app</span>
        </p>
      </header>
      <main className="relative bg-secondary w-full h-4/6 rounded-t-[40px] p-16 text-center">
        <Image
          src="images/notes.svg"
          width="240"
          height="200"
          alt="notes"
          className="absolute right-0 top-0 -translate-y-3/4 w-2/4 max-w-[300px]"
        />
        <form className="flex flex-col text-left">
          <h2 className="text-5xl font-semibold mb-6">Login</h2>
          <Input title="email" iconSrc="images/email.svg" />
          <Input title="password" iconSrc="images/password.svg" />
          <Link href="/" className="block self-end font-medium text-2xl mb-8">
            Forgot Password?
          </Link>
          <button className="bg-primary text-secondary self-center w-4/6 my-4 py-6 rounded-full text-3xl">Login</button>
        </form>
        <p className="text-2xl text-tertiary">
          Don't have account?
          <Link href="/" className="inline-block text-primary p-2 font-medium">
            Sign Up
          </Link>
        </p>
      </main>
    </div>
  );
}
