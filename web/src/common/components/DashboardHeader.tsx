import Navigation from "@/common/components/Navigation";
import NavigationButton from "@/common/components/NavigationButton";
import SearchInput from "@/common/components/SearchInput";
import { useNoteModalStore } from "@/store/useNoteModalStore";
import Image from "next/image";
import Link from "next/link";
import { useToggle } from "@/common/hooks/useToggle";

export default function DashboardHeader() {
  const { openModal } = useNoteModalStore();
  const { toggle: toggleNav, isOpen: isNavOpen } = useToggle();

  return (
    <header className="sticky top-0 z-10 grid h-fit w-full grid-cols-4 grid-rows-2 items-center bg-primary p-2 lg:grid-cols-custom-dashboard-header lg:grid-rows-1 lg:gap-x-5">
      <Link
        href="/"
        className="col-span-2 col-start-1 ml-4 text-4xl font-semibold text-secondary lg:col-span-1"
      >
        <h1>My notes</h1>
      </Link>
      <div className="z-10 -col-start-2 row-start-1">
        <NavigationButton toggleNav={toggleNav} isNavOpen={isNavOpen} />
      </div>
      <div className="col-span-full flex w-full max-w-screen-sm justify-between gap-1 lg:col-span-1 lg:col-start-2">
        <SearchInput />
        <button
          onClick={openModal}
          className="h-14 w-14 duration-75 hover:scale-105 active:translate-y-0.5"
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
