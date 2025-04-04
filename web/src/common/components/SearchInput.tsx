import { useSearchStore } from "@/store/useSearchStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import { clear } from "console";
import { set } from "zod";

export default function SearchInput() {
  const { searchValue, setSearchValue } = useSearchStore();
  const [placeholder, setPlaceholder] = useState("Search notes...");

  const placeholders = [
    "Write your note here...",
    "What's on your mind?",
    "Add a new note...",
    "Thoughts for today...",
    "Take a note...",
    "What's the plan?",
    "Quick reminder...",
    "Search notes...",
  ];

  return (
    <div
      role="search"
      className="relative h-14 w-full flex bg-secondary px-4 py-1 rounded-full  gap-2"
    >
      <Image
        src="images/search.svg"
        alt="Search input"
        width={20}
        height={20}
      />
      <input
        type="text"
        className="h-full w-full bg-transparent"
        placeholder={placeholder}
        aria-label="Search notes"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
    </div>
  );
}
