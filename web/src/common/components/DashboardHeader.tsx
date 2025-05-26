"use client";

import { useToggle } from "@/common/hooks/useToggle";
import { useNoteModalStore } from "@/store/useNoteModalStore";
import Image from "next/image";
import { useMediaQuery } from "../hooks/useMediaQuery";
import Logo from "./Logo";
import Navigation from "./Navigation";
import NavigationButton from "./NavigationButton";
import SearchInput from "./SearchInput";

export default function DashboardHeader() {
  const { openModal } = useNoteModalStore();
  const { toggle: toggleNav, isOpen: isNavOpen } = useToggle();
  const isDesktop = useMediaQuery(1024);

  return (
    <header className="sticky top-0 z-10 grid h-fit w-full grid-cols-4 grid-rows-2 place-items-center gap-2 bg-primary p-2 text-secondary lg:grid-cols-custom-dashboard-header lg:grid-rows-1">
      <div className="col-span-2 flex h-full items-center justify-center place-self-start px-1 lg:col-span-1">
        <Logo tabIndex={1} />
      </div>
      <div className="z-10 col-start-4 place-self-end">
        <NavigationButton toggleNav={toggleNav} isNavOpen={isNavOpen} />
      </div>
      <div className="col-span-4 flex h-full w-full items-center gap-1 place-self-start lg:col-span-2 lg:col-start-2 lg:row-start-1">
        <SearchInput tabIndex={isDesktop ? 1 : 0} />
        <button
          onClick={openModal}
          className="h-14 w-14 duration-75 hover:scale-105 active:translate-y-0.5"
          tabIndex={isDesktop ? 1 : 0}
        >
          <Image
            src="images/add.svg"
            alt="create note"
            width={45}
            height={45}
            className="h-full w-full"
          />
        </button>
      </div>
      <Navigation isNavOpen={isNavOpen} />
    </header>
  );
}
