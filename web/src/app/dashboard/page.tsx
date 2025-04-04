"use client";
import Navigation from "@/common/components/Navigation";
import NavigationButton from "@/common/components/NavigationButton";
import Notes from "@/common/components/Notes";
import { useNav } from "@/common/hooks/useNav";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const { isNavOpen, toggleNav } = useNav();
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <>
      <header className="sticky top-0 z-10 grid w-full grid-cols-4 grid-rows-2 items-center bg-primary p-2 lg:grid-cols-custom-dashboard-header lg:grid-rows-none lg:gap-5">
        <Link
          href="/"
          className="col-span-2 col-start-1 ml-4 text-4xl font-semibold text-secondary lg:col-span-1"
        >
          <h1>My notes</h1>
        </Link>
        <div className="z-10 -col-start-2 row-start-1">
          <NavigationButton isNavOpen={isNavOpen} toggleNav={toggleNav} />
        </div>

        <div className="col-span-full flex w-full max-w-screen-sm justify-between gap-1 lg:col-span-1 lg:col-start-2">
          <input
            type="text"
            className="h-14 w-full p-4"
            placeholder="Search notes..."
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <button className="h-14 w-14">
            <Image
              src="images/add.svg"
              alt="add"
              width={45}
              height={45}
              className="h-full w-full"
            />
          </button>
        </div>
        <Navigation isNavOpen={isNavOpen} toggleNav={toggleNav} />
      </header>
      <Notes searchValue={searchValue} />
    </>
  );
}
