"use client";
import FormInput from "@/common/components/FormInput";
import Navigation from "@/common/components/Navigation";
import Notes from "@/common/components/Notes";
import { NoteProps } from "@/common/types";
import { callApi } from "@/common/utils/axios";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [notes, setNotes] = useState<NoteProps[]>([]);

  const handleToggleNav = () => {
    setIsNavOpen((prevIsNavOpen) => !prevIsNavOpen);
  };

  const burgerSpanTransition = {
    y: { delay: isNavOpen ? 0 : 0.1, duration: 0.1 },
    rotate: { delay: isNavOpen ? 0.1 : 0, duration: 0.1 },
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await callApi({
        method: "GET",
        url: "/notes",
      });
      if (response) {
        setNotes(response.data);
      }
    };

    fetchNotes();
  }, []);

  return (
    <>
      <header className="bg-primary lg:grid-cols-custom-dashboard-header sticky top-0 z-10 grid w-full grid-cols-4 grid-rows-2 items-center p-2 lg:grid-rows-none lg:gap-5">
        <Link
          href="/"
          className="text-secondary col-span-2 col-start-1 ml-4 text-4xl font-semibold lg:col-span-1"
        >
          <h1>My notes</h1>
        </Link>

        <button
          onClick={handleToggleNav}
          aria-controls="navigation"
          aria-expanded={isNavOpen}
          aria-label={isNavOpen ? "Close navigation" : "Open navigation"}
          className="relative z-10 -col-start-2 row-start-1 flex h-16 w-16 flex-col items-center justify-center gap-2 justify-self-end"
        >
          <motion.span
            className="bg-secondary block h-1 w-4/6 origin-center rounded-full"
            animate={{
              rotate: isNavOpen ? 45 : 0,
              y: isNavOpen ? "150%" : "0",
            }}
            transition={burgerSpanTransition}
          ></motion.span>
          <motion.span
            className="bg-secondary block h-1 w-4/6 origin-center rounded-full"
            animate={{
              rotate: isNavOpen ? -45 : 0,
              y: isNavOpen ? "-150%" : "0",
            }}
            transition={burgerSpanTransition}
          ></motion.span>
        </button>

        <div className="col-span-full flex w-full max-w-screen-sm justify-between gap-1 lg:col-span-1 lg:col-start-2">
          <FormInput
            title="search"
            type="text"
            iconSrc="images/search.svg"
            value={searchValue}
            setValue={setSearchValue}
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

        <Navigation isNavOpen={isNavOpen} />
      </header>
      <Notes searchValue={searchValue} notes={notes} />
    </>
  );
}
