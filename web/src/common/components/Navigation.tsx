import Image from "next/image";
import Link from "next/link";

import FocusLock from "react-focus-lock";

type NavigationProps = {
  isNavOpen: boolean;
  toggleNav: () => void;
};

export default function Navigation({ isNavOpen, toggleNav }: NavigationProps) {
  return (
    <>
      {isNavOpen && (
        <FocusLock group="navigation">
          <nav
            id="navigation"
            className="bg-custom-nav fixed left-0 top-0 flex h-full w-full flex-col items-center bg-primary text-secondary"
          >
            <ul className="my-auto flex h-3/5 flex-col items-center justify-center gap-10 text-7xl lg:flex-row lg:gap-20">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/">Account</Link>
              </li>
              <li>
                <button className="stroke-text">Logout</button>
              </li>
            </ul>

            <Link
              href="https://github.com/NoNamedCobble"
              className="mb-4 flex gap-2 p-2"
            >
              <Image
                src="images/github.svg"
                alt="github"
                width="40"
                height="40"
                unoptimized
                className=""
              />
              <p className="flex flex-col justify-center text-sm leading-none">
                created by
                <span className="text-lg leading-none">nonamedcobble</span>
              </p>
            </Link>
          </nav>
        </FocusLock>
      )}
    </>
  );
}
